const fs = require('fs-extra');
const path = require('path');

const { saveJson } = require('./lib/fs');
const enrich = require('./lib/enrichers');
const { importer } = require('dive-log-importer');
const pdfkit = require('./lib/pdfkit');
const { set } = require('./lib/options');

const EMPTY_LOGBOOK = {
    dives: [
        {
            gases: [{ pressureStart: '', pressureEnd: '' }],
            tags: [],
            entry: '',
            date: null,
            location: {},
            types: [],
            samples: [],
            entry_time: null
        }
    ]
};

async function readFile(file) {
    return fs.readFile(file, 'utf8').then(xml => importer(xml));
}

function folderFromDest(dest) {
    return dest.substring(0, dest.lastIndexOf('/'));
}

async function convert(file, dest, options) {
    const logbook = await readFile(file);

    return process(logbook, dest, options);
}

async function convertEmpty(dest, options) {
    if (options.verbose) {
        console.log('Rendering empty template');
    }

    return process(EMPTY_LOGBOOK, dest, options);
}

async function process(logbook, dest, { debug }) {
    const destFolder = path.resolve(path.dirname(dest));
    const cacheDir = path.join(destFolder, '.cache');
    await fs.ensureDir(cacheDir);
    set('cacheDir', cacheDir);

    const enriched = await enrich(logbook);

    pdfkit(enriched, dest, cacheDir);
    if (debug) {
        await saveJson(folderFromDest(dest), 'logbook', enriched);
    }
}

module.exports = {
    convert,
    convertEmpty
};

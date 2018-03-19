# Logbook F.I.P.S.A.S

Un template per [DivingLog][divinglog] per stampare i [logbook F.I.P.S.A.S.][fipsas] precompilati

## Installazione

&Egrave; necessario avere installato [nodejs][node] con npm

```
npm i -g logbook-fipsas
```

## Utilizzo

1.  Esportate da DivingLog le vostre immersione in un file xml
2.  da un terminale lanciate

    ```sh
    tofipsas <file>

    # tofipsas diving.xml
    ```

Verrà creato un file index.html contenente tutto il necessario nella cartella corrente.

Per ulteriori parametri lanciare

```sh
tofipsas --help
```

[divinglog]: http://divinglog.de/
[fipsas]: http://www.fipsas.it/didattica/didattica-subacquea/documenti-didattica-subacquea/logbook
[node]: https://nodejs.org

# Stampa

1. Stampare il html in pdf senza margini
2. Per stampare il PDF scegliere il formato di carta A5 e impostare la scala al 100%
3. Stampare solo i fogli dispari, girare e quindi i fogli pari.
![print conf](docs/conf_print.png)

# Changelog

*   1.2.0 - L'opzione `--empty` stampa una schedina vuota
*   1.1.0 - L'opzione `--dest` ora specifica una cartella dove salvare l'output

# ReHack - Documentazione del Progetto
## Descrizione
ReHack è un'applicazione web sviluppata con React che permette agli utenti di navigare, cercare e interagire con una vasta libreria di videogiochi. Gli utenti possono esplorare un ampio catalogo di giochi, filtrare i risultati in base a vari parametri, visualizzare dettagli sui giochi, aggiungerli o rimuoverli dai preferiti, leggere e partecipare a recensioni e chat dal vivo. Se autenticato, un utente può anche scrivere recensioni e inviare messaggi nella chat in tempo reale. Inoltre, l'app consente di visualizzare e modificare i propri dati e attività tramite la dashboard dell'account.

## API
Il progetto utilizza l'API di Rawg.io (https://rawg.io/apidocs) per ottenere i dati relativi ai videogiochi, e Supabase come Backend-as-a-Service (BaaS) per l'autenticazione degli utenti, la gestione del database e la chat in tempo reale.

## Stile
L'applicazione utilizza CSS e Bootstrap 5.3 per lo stile e il layout responsive.

## Pagine
Home Page: Elenco dei videogiochi con la possibilità di filtrarli in base a diversi parametri.

Pagina Dettaglio: Dettagli del gioco selezionato, con la possibilità di aggiungerlo ai preferiti, visualizzare immagini e recensioni, e partecipare alla chat in tempo reale.

Risultati di Ricerca: Visualizza i giochi in base ai criteri di ricerca come nome, genere, piattaforma, popolarità, punteggio, e così via.

Pagine di Autenticazione: Pagine per la registrazione e il login dell'utente.

Pagina Profilo: Visualizza le informazioni dell'utente, i giochi preferiti, le recensioni scritte e consente la modifica dei dati utente.

## Interazioni Utente
Utenti non autenticati:

Esplorare l'elenco dei giochi.

Cercare giochi per nome o altri criteri.

Filtrare i giochi per genere, piattaforma, ecc.

Visualizzare informazioni dettagliate sui giochi.

Leggere le recensioni e la chat in tempo reale di altri utenti.

Registrarsi o accedere tramite email e password.

## Utenti autenticati:

Aggiungere o rimuovere giochi dai preferiti.

Scrivere recensioni.

Partecipare alla chat in tempo reale.

Visualizzare e modificare le informazioni del proprio profilo.

## Context
L'applicazione utilizza diversi Context Provider di React per gestire lo stato globale:

SessionContext: Gestisce i dati della sessione dell'utente.

FavContext: Gestisce i giochi salvati nei preferiti.

## Dipendenze
Le principali dipendenze utilizzate nel progetto sono:

@supabase/supabase-js

bootstrap

bootstrap-icons

@vercel/analytics

dayjs

prime-react

react

react-dom

react-router-dom

react-spinners

## Funzionalità principali
Sistema di autenticazione: Registrazione e login degli utenti tramite email e password.

Chat in tempo reale: Funzionalità di chat in tempo reale per la comunicazione tra gli utenti.

Filtro giochi: Filtraggio avanzato per generi, nome, piattaforme, ecc.

Design responsive: L'app è completamente responsive, adattandosi a schermi di dimensioni piccole, medie e grandi.

Recensioni utente: Gli utenti possono leggere e scrivere recensioni sui giochi.

Gestione dei preferiti: Gli utenti possono salvare i giochi nella loro lista di preferiti.

L'applicazione segue le migliori pratiche di sviluppo, tra cui l'uso di custom hooks, Context API e un design a componenti, per un codice pulito, modulare e facilmente manutenibile.

## Struttura del progetto
Il progetto è organizzato in diverse cartelle per facilitare la gestione del codice:

Cartella components: Contiene i componenti UI riutilizzabili (Navbar, Sidebar, Dropdowns, Footer, ecc.).

Cartella pages: Contiene le viste principali dell'applicazione.

Cartella context: Gestisce i context per l'autenticazione, i preferiti, ecc.

Cartella hooks: Contiene i custom hooks.

Cartella utils: Funzioni di utilità (ad esempio per il formato delle date).

Cartella markup: Gestisce il layout e le strutture generali.

Link del progetto
Puoi trovare il progetto live a questo indirizzo: https://rehacktor-game.vercel.app/


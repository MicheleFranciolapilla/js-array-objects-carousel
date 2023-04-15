# CAROSELLO (SLIDER DI IMMAGINI) CON ARRAY DI OGGETTI #
---
## Esercizio che ricalca il precedente esercizio del carosello, con l'aggiunta della funzione di autoplay e, soprattutto, l'utilizzo di un array di oggetti (immagine, titolo, testo) al posto del precedente array (solo immagine) ##
---

**A differenza del precedente esercizio, in cui il cambio di immagine attiva veniva gestito verificando direttamente la presenza o meno delle classi `.first`, `.last` ed `.active`, passando in rassegna le immagini in quanto elementi del DOM, nell'attuale esercizio, l'immagine attiva viene gestita dall'indice (variabile globale) *current_active* al punto che non sono state utilizzate affatto le classi `.first` e `.last` e la stessa classe `.active` ha solo una funzione stilistica.**

**Nell'ultimo esercizio sono inoltre state utilizzate le arrow functions `() =>`, alcuni *if ternari* ed il metodo `forEach()`, oltre, ovviamente alle funzioni `setInterval()` e `clearInterval()` per la gestione dell'autoplay.**

#### Autoplay: ####

**La funzionalità *"autoplay"* è stata implementata con l'ausilio di variabili e costanti (di controllo o di puro valore semantico) e da una serie di funzioni ad hoc...**

*   **`function initialize_autoplay()`:** *invocata all'inizio della sequenza principale del programma (essendo l'autoplay attivo per default) e dopo ogni riattivazione dovuta a click su "play".*
*   **`function autoplay() {(autoplay_how == autoplay_random) ? going_random() : (autoplay_how == autoplay_next) ? going_next() : going_prev();}
`:** *che è, in sostanza la funzione parametro di `setInterval()` e `clearInterval()`.*
*   **`function stop_autoplay()`:** *funzione simmetrica a `function initialize_autoplay()`, invocata ad ogni click su "pause".*
*   **`function reset_autoplay_timer()`:** *invocata dopo ogni modifica di parametri legati all'autoplay e dopo ogni cambio di immagine attiva (per garantire all'immagine appena selezionata dall'utente una permanenza in attività non inferiore al tempo stabilito dalla specifica variabile globale). Questa funzione invoca, in sequenza le funzioni di "stop" e "initialize", previo check dello stato di attivazione dell'autoplay.*
*   **`function manage_start_stop()`:** *funzione deputata a gestire le azioni di "pause" e "play" da un punto di vista funzionale e visuale (attivando/disattivando) le opportune icone font awesome sul pulsante.*
*   **`function manage_timer_range()`:** *utilizzata per settare la variabile globale indicante la durata dello stato "active" delle immagini, a seguito della modifica di tale valore mediante pannello di controllo dell'autoplay (`input range`).*
*   **`function mode_changed()`:** *invocata al cambio della modalità dell'autoplay (casuale, seguente, precedente) da parte dell'utente, sul pannello di controllo (`radio button`).*

---

**Per le altre funzioni relative al progetto, incluse le funzioni di call back dei vari event listener, si rimanda al file** ***main.js***

##### Risorse esterne: #####
**Nel progetto sono state utilizzate risorse esterne quali** ***Bootstrap 5*** **e** ***Font Awesome 6.3***

---
---
---


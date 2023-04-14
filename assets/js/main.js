// Consegna (Seconda versione - con object):
// Dato un array di oggetti letterali con:
//  - url dell’immagine
//  - titolo
//  - descrizione
// Creare un carosello come nella foto allegata.
// Milestone 0:
// Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
// Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
// Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
// Milestone 2:
// Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
// BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
// BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
// BONUS 3:
// Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.

// *******************************************************************


// *****************************************************************************************************
// SECONDA VERSIONE: CON OBJECTS

// Costanti e Variabili globali:
// Percorso per la cartella delle immagini
const   img_folder_path = "assets/";
// Array di oggetti (immagine, titolo, testo)
const   images          = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, 
    {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, 
    {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, 
    {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, 
    {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];
// Costanti e variabili relative alla funzione autoplay
// Costanti di valore puramente semantico riferite alla modalità dell'autoplay: casuale, a sinistra, a destra
const   autoplay_prev   = 0;  
const   autoplay_random = 1;
const   autoplay_next   = 2;
// Variabile di riferimento per la modalità di autoplay
let     autoplay_how    = autoplay_random; 
// Variabile di riferimento per il tempo di transizione nello sliding in autoplay
let     autoplay_time   = 3000; 
// Variabile booleana di stato dell'autoplay (on/off)
let     autoplay_on     = true;  
// Variabile utilizzata per l'attivazione e la disattivazione dell'autoplay
let     autoplay_go; 
// Associazione con i controlli dell'autoplay in index.html ......
// ...... pulsante play/stop
let     autoplay_btn    = document.getElementById("start_stop");
// ...... radio buttons (previous, random, next)
let     autoplay_mode   = document.getElementsByClassName("form-check-input"); 
// ...... tempo di transizione immagine (in autoplay)
let     autoplay_timer  = document.getElementById("autoplay_timing");  
// Costanti associate agli elementi freccia (indietro e avanti)
const   prev_arrow      = document.getElementById("prev");
const   next_arrow      = document.getElementById("next"); 
// Associazione con i due contenitori di immagini, carosello e miniature
let     carousel_set    = document.getElementById("carousel");
let     thumbnails_set  = document.getElementById("thumbnail");
// Variabili utilizzate nei cambi di immagine attiva; current_active è l'indice dell'immagine attiva al momento
let     current_active  = 0; 
let     previous_active = 0;
// Lista delle immagini nei due contenitori
let     img_in_carousel;
let     img_in_thumb; 


// ***************************** FUNZIONI ******************************

// Set di funzioni inerenti l'autoplay
// Funzione di inizializzazione. Evocata nella sequenza principale del programma e ad ogni riattivazione dell'autoplay, dopo eventuali stop
function initialize_autoplay()
{
    autoplay_go = setInterval(autoplay, autoplay_time);
}

// Funzione principale dell'autoplay. A seconda della modalità di autoplay (valore di autoplay_how) invoca la corretta funzione
// ***** Funzione con if ternario: *****
function autoplay() {(autoplay_how == autoplay_random) ? going_random() : (autoplay_how == autoplay_next) ? going_next() : going_prev();}

// Funzione che si occupa della rimozione della funzione di autoplay
function stop_autoplay()
{
    clearInterval(autoplay_go);
}

// Funzione evocata ad ogni modifica dei parametri relativi all'autoplay e dopo ogni cambio immagine, per garantire alla nuova immagine una permanenza non inferiore al tempo impostato
function reset_autoplay_timer()
{
    // Funzione operante solo con autoplay attivo
    if (autoplay_on)
    {
        stop_autoplay();
        initialize_autoplay();
    }
}

// Funzione che gestisce lo switch di attivazione/disattivazione dell'autoplay, funzionalmente e visualmente (invertendo l'icona sul pulsante)
function manage_start_stop()
{
    // Switch delle icone "play" e "pause" che si alternano sul pulsante
    autoplay_btn.querySelectorAll("i").forEach((element) => element.classList.toggle("d-none"));
    // Inversione dello stato della variabile booleana specifica 
    autoplay_on = !autoplay_on;
    // Invocazione della funzione richiesta
    autoplay_on ? initialize_autoplay() : stop_autoplay();
}

// Funzione evocata ad ogni modifica del tempo di transizione tra le immagini mediante input range
function manage_timer_range()
{
    autoplay_time = autoplay_timer.value;
    reset_autoplay_timer();
}

// Funzione evocata ad ogni modifica della modalità di autoplay mediante radio buttons
function mode_changed()
{
    let index = -1;
    do
    {
        index++;
    } while (!autoplay_mode[index].checked);
    autoplay_how = index;
    reset_autoplay_timer();
}

// Funzione che crea la stringa appropriata a rappresentare la/e classe/i da assegnare alle immagini in fase di inizializzazione
function img_class_str(index) {return (index == 0) ? ("image active") : ("image")}

// Funzione collegata all'eventlistener del click sulle miniature; consente il cambio dell'immagine attiva
function direct_click(index)
{
    if (index != current_active)
    {
        previous_active = current_active;
        current_active = index;
        update_active_img();
    }
    reset_autoplay_timer();
}

// Funzione che crea gli elementi immagine e li collega al contenitore di riferimento (carosello o miniature)
function initialize_img_sets()
{
    for (let i = 0; i < images.length; i++)
    {
        // Creiamo ed assegnamo contestualmente gli elementi immagine, con gli opportuni attributi, ai due contenitori di riferimento
        let current_str = `<img src="${img_folder_path}${images[i].image}" alt="Immagine ${i + 1}" class="${img_class_str(i)}">`;
        carousel_set.innerHTML += ` ${current_str}
                                    <div class="img_text position-absolute bottom-0 end-0 w-75 pe-3 pb-3 text-end text-white">
                                        <h2>${images[i]["title"]}</h2>
                                        <h5>${images[i]["text"]}</h5>
                                    </div>`; 
        thumbnails_set.innerHTML += current_str;
    }
    // Acquisizione delle due liste di immagini e riposizionamento di alcune di esse
    img_in_carousel = carousel_set.querySelectorAll(".image");
    img_in_carousel[2].setAttribute("style","object-position: right center;");
    img_in_carousel[4].setAttribute("style","object-position: center;");
    img_in_thumb = thumbnails_set.querySelectorAll(".image");
    // Attribuzione dell'addEventListener("click") a ciascuna immagine del thumbnail
    img_in_thumb.forEach((element, index) => {element.addEventListener("click", function() {direct_click(index);});});
}

// Generatore di interi randomici
function int_random(max)
{
    return Math.floor(Math.random() * max);
}

// Funzione utilizzata per il cambio immagini nella modalità random dell'autoplay
function going_random()
{
    let random_img  = 0;
    previous_active = current_active;
    do
    {
        random_img = int_random(images.length);
    } while (random_img == current_active);
    current_active = random_img;
    update_active_img();
}

// Funzione utilizzata per il cambio immagini nella modalità "da sinistra a destra" dell'autoplay
function going_next()
{
    previous_active = current_active;
    (current_active == images.length - 1) ? (current_active = 0) : (current_active++)
    update_active_img();
}

// Funzione utilizzata per il cambio immagini nella modalità "da destra a sinistra" dell'autoplay
function going_prev()
{
    previous_active = current_active;
    (current_active == 0) ? (current_active = images.length - 1) : (current_active--)
    update_active_img();
}

// Funzione che effettua concretamente il cambio dell'immagine attiva
function update_active_img()
{
    img_in_carousel[previous_active].classList.remove("active");
    img_in_thumb[previous_active].classList.remove("active");
    img_in_carousel[current_active].classList.add("active");
    img_in_thumb[current_active].classList.add("active");
}

// Event listener relativo al click sulla freccia sinistra
prev_arrow.addEventListener("click", () => {going_prev(); reset_autoplay_timer();});

// Event listener relativo al click sulla freccia destra
next_arrow.addEventListener("click", () => {going_next(); reset_autoplay_timer();});

// Event listener relativo al click sul pulsante "play"-"pause"
autoplay_btn.addEventListener("click", () => {manage_start_stop()});

// Event listener relativo al cambio del tempo di transizione, mediante input range
autoplay_timer.addEventListener("change", () => {manage_timer_range()});

// Sequenza principale
// Inizializzazione e caricamento delle immagini nei due contenitori "carousel" e "thumbnails"
initialize_img_sets();
// Inizializzazione della funzione di autoplay
initialize_autoplay();
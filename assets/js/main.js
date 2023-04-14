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
const   autoplay_random = 0;
const   autoplay_next   = 1;
const   autoplay_prev   = 2;  
let     autoplay_time   = 3000; 
let     autoplay_how    = autoplay_random; 
let     autoplay_on     = true;  
let     autoplay_go; 
let     autoplay_btn    = document.getElementById("start_stop");
let     autoplay_mode   = document.getElementsByName("autoplay_mode");
let     autoplay_timer  = document.getElementById("autoplay_timing");  
// Costanti associate agli elementi freccia (indietro e avanti)
const   prev_arrow      = document.getElementById("prev");
const   next_arrow      = document.getElementById("next"); 
let     carousel_set    = document.getElementById("carousel");
let     thumbnails_set  = document.getElementById("thumbnail");
let     current_active  = 0; 
let     previous_active = 0;
let     img_in_carousel;
let     img_in_thumb; 

// Funzione che crea la stringa appropriata a rappresentare la/e classe/i da assegnare alle immagini in fase di inizializzazione
function img_class_str(index)
{
    // Classe generale
    let final_str = "image";
    if (index == 0)
    {
        // Aggiunta della classe active alla prima immagine
        final_str += " active";
    }
    return final_str;
}

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
    img_in_carousel = carousel_set.querySelectorAll(".image");
    img_in_carousel[2].setAttribute("style","object-position: right center;");
    img_in_carousel[4].setAttribute("style","object-position: center;");
    img_in_thumb = thumbnails_set.querySelectorAll(".image");
    img_in_thumb.forEach((element, index) => {element.addEventListener("click", function()
    {
        direct_click(index);
    });});
}

function int_random(max)
{
    return Math.floor(Math.random() * max);
}

function going_random()
{
    let random_img = 0;
    previous_active = current_active;
    do
    {
        random_img = int_random(images.length);
    } while (random_img == current_active);
    current_active = random_img;
    update_active_img();
}

function going_next()
{
    previous_active = current_active;
    if (current_active == images.length - 1)
    {
        current_active = 0;
    }
    else
    {
        current_active++;
    }
    update_active_img();
}

function going_prev()
{
    previous_active = current_active;
    if (current_active == 0)
    {
        current_active = images.length - 1;
    }
    else
    {
        current_active--;
    }
    update_active_img();
}

function autoplay()
{
    switch (autoplay_how)
    {
        case autoplay_random:
            going_random();
            break;
        case autoplay_next:
            going_next();
            break;
        case autoplay_prev:
            going_prev();
            break;
    }

}

function reset_autoplay_timer()
{
    if (autoplay_on)
    {
        stop_autoplay();
        initialize_autoplay();
    }
}

function stop_autoplay()
{
    clearInterval(autoplay_go);
}

function initialize_autoplay()
{
    autoplay_go = setInterval(autoplay, autoplay_time);
}

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

function manage_start_stop()
{
    autoplay_btn.querySelectorAll("i").forEach((element) => element.classList.toggle("d-none"));
    autoplay_on = !autoplay_on;
    if (autoplay_on)
    {
        initialize_autoplay();
    }
    else
    {
        stop_autoplay();
    }
    console.log(autoplay_on);
}

function manage_timer_range()
{
    autoplay_time = autoplay_timer.value;
    reset_autoplay_timer();
    console.log(autoplay_time);
}

autoplay_btn.addEventListener("click", () => {manage_start_stop()});
autoplay_timer.addEventListener("change", () => {manage_timer_range()});
// Sequenza principale

initialize_img_sets();
initialize_autoplay();
console.log(autoplay_mode);
console.log(autoplay_timer);
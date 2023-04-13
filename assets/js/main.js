// Consegna (Prima versione - senza object):
// Dato un array contenente una lista di cinque immagini, creare un carosello come nello screenshot allegato.
// MILESTONE 1
// Per prima cosa, creiamo il markup statico: costruiamo il container e inseriamo un'immagine grande al centro: avremo così la struttura base e gli stili pronti per poterci poi concentrare solamente sull'aspetto logico.
// MILESTONE 2
// Adesso rimuoviamo tutto il markup statico e inseriamo tutte le immagini dinamicamente servendoci dell'array fornito e un semplice ciclo for che concatena un template literal.
// Tutte le immagini saranno nascoste, tranne la prima, che avrà una classe specifica che la renderà visibile.
// Al termine di questa fase ci ritroveremo con lo stesso slider stilato nella milestone 1, ma costruito dinamicamente attraverso JavaScript.
// MILESTONE 3
// Al click dell'utente sulle frecce, il programma cambierà l’immagine attiva, che quindi verrà visualizzata al posto della precedente.
// BONUS 1:
// Aggiungere il ciclo infinito del carosello. Ovvero se è attiva la prima immagine e l'utente clicca la freccia per andare all’immagine precedente, dovrà comparire l’ultima immagine dell’array e viceversa.
// BONUS 2:
// Aggiungere la visualizzazione di tutte le thumbnails sulla destra dell’immagine grande attiva, come nello screenshot proposto. Tutte le miniature avranno un layer di opacità scura, tranne quella corrispondente all’immagine attiva, che invece avrà un bordo colorato.
// Al click delle frecce, oltre al cambio di immagine attiva, gestire il cambio di miniatura attiva.
// Prima di partire a scrivere codice:
// Non lasciamoci spaventare dalla complessità apparente dell'esercizio, ma analizziamo prima, come abbiamo fatto sempre, cosa ci potrebbe aspettare. Abbiamo completato ormai da qualche giorno la sessione HTML e CSS, se non ci ricordiamo qualcosa andiamo pure a riguardare alcuni argomenti. Non dedichiamo però al ripasso più di una mezz'ora, così da non perdere di vista il focus dell'esercizio.
// Consigli del giorno:
// 1. Costruiamo del carosello una versione statica contenente solamente un'immagine. Di questa versione statica al momento opportuno commenteremo (oscureremo) alcuni elementi per poterli riprodurre dinamicamente in js. Potremo quindi usarli come "template".
// 2. Scriviamo sempre prima per punti il nostro algoritmo in italiano per capire cosa vogliamo fare
// 3. Al momento giusto (ihihhi starà a voi capire quale) rispondete a questa domanda: "Quanti cicli servono?"


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


// PRIMA VERSIONE: NO OBJECTS
// // COSTANTI GLOBALI
// // Array con gli url locali delle immagini
// const   img_array   = [ "assets/img/01.webp",
//                         "assets/img/02.webp",
//                         "assets/img/03.webp", 
//                         "assets/img/04.webp", 
//                         "assets/img/05.webp"];
// // Elementi "frecce di scorrimento del carosello"
// const   prev_arrow  = document.getElementById("prev");
// const   next_arrow  = document.getElementById("next"); 

// // Funzione che inizializza gli array delle immagini: l'array del carosello e quello del thumbnail
// // Il parametro "where_to_append" identifica l'id (carousel o thumbnail) mentre "array" si riferisce sempre a "img_array"
// function init_img_array(where_to_append, array)
// {
//     let container = document.querySelector(where_to_append);
//     for (let i = 0; i < array.length; i++)
//     {
//         let img_item = document.createElement("img");
//         img_item.setAttribute("src",array[i]);
//         img_item.setAttribute("alt",`Foto nr ${i + 1}`);
//         img_item.className = "image";
//         switch (i)
//         {
//             case 0:
//                 img_item.classList.add("first","active");
//                 break;
//             case (array.length - 1):
//                 img_item.classList.add("last");
//         }
//         container.append(img_item);
//     }
// }

// // Funzione utilizzata per consentire l'attivazione dell'immagine nel carosello, direttamente da thumbnail
// // L'attivazione dell'immagine passa attraverso le funzioni "set_thumbnail_img_onclick" e "thumbnail_img_clicked.
// // "set_thumbnail_img_onclick" inserisce l'attributo "onclick" in tutti i tag "img" del thumbnail, passando la posizione dell'immagine cliccata attraverso parametro alla funzione "thumbnail_img_clicked"
// function set_thumbnail_img_onclick()
// {
//     let thumbnail_img_set = document.querySelectorAll("#thumbnail .image");
//     for (let i = 0; i < thumbnail_img_set.length; i++)
//     {
//         thumbnail_img_set[i].setAttribute("onclick",`thumbnail_img_clicked(${i})`);
//     }
// }

// // "thumbnail_img_clicked" viene evocata al click sulle immagini del thumbnail, ricevendo la posizione dell'immagine stessa, direttamente come parametro.
// function thumbnail_img_clicked(img_index)
// {
//     // Variabili "array di elementi" dei due contenitori principali carosello (#carousel) e miniature (#thumbnail)
//     let img_carousel = document.querySelectorAll("#carousel .image");
//     let img_thumbnail = document.querySelectorAll("#thumbnail .image");
//     // If che verifica che la miniatura cliccata non sia gia' attiva, nel qual caso la funzione passa oltre
//     if (!img_carousel[img_index].classList.contains("active"))
//     {
//         // Caso in cui la miniatura cliccata non sia quella gia' attiva
//         for (let i = 0; i < img_carousel.length; i++)
//         {
//             // Si individua la posizione dell'immagine attiva (in entrambi i contenitori) e la si disattiva
//             if (img_carousel[i].classList.contains("active"))
//             {
//                 img_carousel[i].classList.remove("active");
//                 img_thumbnail[i].classList.remove("active");
//             }
//         }
//         // Solo alla fine del ciclo di individuazione dell'immagine attiva e della conseguente disattivazione, si attiva quella cliccata
//         img_carousel[img_index].classList.add("active");
//         img_thumbnail[img_index].classList.add("active");   
//     }
// }

// // Event listener relativo al click sulla freccia sinistra
// prev_arrow.addEventListener("click", function()
// {
//     let active_img = document.querySelectorAll(".active");
//     let new_active = [];
//     if (active_img[0].classList.contains("first"))
//     {
//         new_active = document.querySelectorAll(".last");
//     }
//     else
//     {
//         new_active.push(active_img[0].previousElementSibling, active_img[1].previousElementSibling);
//     }
//     for (let i = 0; i < active_img.length; i++)
//     {
//         active_img[i].classList.remove("active");
//         new_active[i].classList.add("active");
//     }
// });

// // Event listener relativo al click sulla freccia destra
// next_arrow.addEventListener("click", function()
// {
//     let active_img = document.querySelectorAll(".active");
//     let new_active = [];
//     if (active_img[0].classList.contains("last"))
//     {
//         new_active = document.querySelectorAll(".first");
//     }
//     else
//     {
//         new_active.push(active_img[0].nextElementSibling, active_img[1].nextElementSibling);
//     }
//     for (let i = 0; i < active_img.length; i++)
//     {
//         active_img[i].classList.remove("active");
//         new_active[i].classList.add("active");
//     }
// });

// // Sequenza principale
// // Inizializzazione dei due array (carosello e miniature)
// init_img_array("#carousel",img_array);
// init_img_array("#thumbnail",img_array);
// // Inserimento dell'evento "onlick" nelle immagini in miniatura e della relativa funzione parametrica
// set_thumbnail_img_onclick();
// // Centratura, nel carosello, delle immagini nr 3 e 5
// let image_set = document.querySelectorAll(".image");
// image_set[2].setAttribute("style","object-position: right center;");
// image_set[4].setAttribute("style","object-position: center;");



// *****************************************************************************************************
// SECONDA VERSIONE: CON OBJECTS

// Costanti e Variabili globali:
// Percorso per la cartella delle immagini
const img_folder_path   = "assets/";
// Array di oggetti (immagine, titolo, testo)
const images            = [
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
// Costanti associate agli elementi freccia (indietro e avanti)
const   prev_arrow      = document.getElementById("prev");
const   next_arrow      = document.getElementById("next"); 

// Funzione che crea la stringa appropriata a rappresentare la/e classe/i da assegnare alle immagini in fase di inizializzazione
function img_class_str(index)
{
    // Classe generale
    let final_str = "image";
    if (index == 0)
    {
        // Classi ulteriori della prima immagine
        final_str += " first active";
    }
    else if (index == images.length - 1)
    {
        // Classe ulteriore dell'ultima immagine
        final_str += " last";
    }
    return final_str;
}

// Funzione che crea gli elementi immagine e li collega al contenitore di riferimento (carosello o miniature)
function initialize_img_sets()
{
    let carousel_set    = document.getElementById("carousel");
    let thumbnails_set  = document.getElementById("thumbnail");
    for (let i = 0; i < images.length; i++)
    {
        // Creiamo ed assegnamo contestualmente gli elementi immagine, con gli opportuni attributi, ai due contenitori di riferimento
        let current_str = `<img src="${img_folder_path}${images[i].image}" alt="Immagine ${i + 1}" class="${img_class_str(i)}">`;
        carousel_set.innerHTML += ` ${current_str}
                                    <div class="img_text position-absolute bottom-0 end-0 w-75 pe-3 pb-3 text-end text-white">
                                        <h2>${images[i]["title"]}</h2>
                                        <h5>${images[i]["text"]}</h5>
                                    </div>
                                    `; 
        thumbnails_set.innerHTML += current_str;
    }
    console.log(carousel_set);
    console.log(thumbnails_set);
}

// Sequenza principale

initialize_img_sets();
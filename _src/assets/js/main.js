/* eslint-disable no-inner-declarations */
'use strict';

const button = document.querySelector('.search');
const input = document.querySelector('.input');
const list = document.querySelector('.list');
const containerLeft = document.querySelector('.container_left');
let listFavourites = document.querySelector ('.myFavourites');
const imgDefault = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let favourites = [];

const savedFavourites = JSON.parse(localStorage.getItem('favourites'));
if (savedFavourites) {
  saveData();
}

function search () {
  list.innerHTML = '';
  const url = `http://api.tvmaze.com/search/shows?q=${input.value}`;
  fetch(url)
    .then (response => response.json())
    .then (data => {
      for (const result of data) {
        if (result.show.image === null) {
          list.innerHTML += `<li class="serie"><img class="photo" src="${imgDefault}"<br><h3 class="title_serie">${result.show.name}</h3></li>`;
        } else {
          list.innerHTML += `<li class="serie"><img class="photo" src="${result.show.image.medium}"<br><h3 class="title_serie">${result.show.name}</h3></li>`;
        }
      }
      const everyShow = document.querySelectorAll('li');
      for (const li of everyShow) {
        li.addEventListener('click', fav);
      }
    });
}

button.addEventListener('click', search);

function fav(event) {
  const li = event.currentTarget;
  const photo = li.querySelector('.photo').src;
  const titleSerie = li.querySelector('.title_serie').innerHTML;
  li.classList.toggle('favourite');
  if (li.classList.contains('favourite')) {
    favourites.push({photo, titleSerie});
  }
  listFavourites.innerHTML = '';
  for (let i=0; i<favourites.length; i++) {
    listFavourites.innerHTML += `<br><li class="favourite_serie"><img class="favourite_photo" src="${favourites[i].photo}"><h3 class="favourite_title_serie">${favourites[i].titleSerie}</h3><i class="fas fa-times-circle"></i></li>`;
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }
}

function saveData() {
  const savedFavourites = JSON.parse(localStorage.getItem('favourites'));
  if (listFavourites.innerHTML === ''){
    favourites = savedFavourites;
    for (let i=0; i<savedFavourites.length; i++) {
      listFavourites.innerHTML += `<br><li class="favourite_serie"><img class="favourite_photo" src="${savedFavourites[i].photo}"><h3 class="favourite_title_serie">${savedFavourites[i].titleSerie}</h3><i class="fas fa-times-circle"></i></li>`;
    }
  }
}

const newItem = document.createElement('button');
const newContent = document.createTextNode('Borrar favoritos');
newItem.appendChild(newContent);
newItem.classList.add('erase_button');
containerLeft.appendChild(newItem);
const eraseBtn = document.querySelector('.erase_button');

function eraseAllFav() {
  localStorage.removeItem('favourites');
  listFavourites.innerHTML = '';
}

eraseBtn.addEventListener('click', eraseAllFav);

//La función eraseFav borra el elemento de la lista pero no de localstorage. Además, deja de funcionar tras ejecutar la función eraseAllFav y realizar una nueva búsqueda (hasta que no volvemos a actualizar la página, que entonces sí que vuelve a funcionar).

function eraseFav(event) {
  const cross = event.currentTarget;
  const eraseSerie = cross.parentElement;
  eraseSerie.remove();
}

const crosses = document.querySelectorAll('.fas');
for (const cross of crosses) {
  cross.addEventListener('click', eraseFav);
}
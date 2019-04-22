/* eslint-disable no-inner-declarations */
'use strict';

const button = document.querySelector('.search');
const input = document.querySelector('.input');
const list = document.querySelector('.list');
let listFavourites = document.querySelector ('.myFavourites');
const imgDefault = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let favourites = [];

function search () {
  list.innerHTML = '';
  const url = `http://api.tvmaze.com/search/shows?q=${input.value}`;
  fetch(url)
    .then (response => response.json())
    .then (data => {
      console.log(data);

      for (const result of data) {
        if (result.show.image === null) {
          list.innerHTML += `<li class="serie"><img class="photo" src="${imgDefault}"<br><h3>${result.show.name}</h3></li>`;
        } else {
          list.innerHTML += `<li class="serie"><img class="photo" src="${result.show.image.medium}"<br><h3>${result.show.name}</h3></li>`;
        }
        const everyShow = document.querySelectorAll('li');
       
        for (const li of everyShow) {
          function fav() {
            li.classList.toggle('favourite');
            if (li.classList.contains('favourite')) {
              favourites.push(li);
              console.log(favourites);
            }
            listFavourites.innerHTML = '';
            for (let i=0; i<favourites.length; i++) {
              listFavourites.innerHTML += `<li class="favourite_serie">${favourites[i].innerHTML}</li>`;
              //   const newItem = document.createElement('li');
              //   const newContent = document.createTextNode(`${favourites[i].innerHTML}`);
              //   newItem.appendChild(newContent);
              //   listFavourites.appendChild(newItem);
              localStorage.setItem('favourites', JSON.stringify(favourites));
              const savedFavourites = JSON.parse(localStorage.getItem('favourites'));
              console.log(savedFavourites.length);
            //   if (listFavourites.innerHTML === ''){
            //     listFavourites.innerHTML = savedFavourites;
            //   }
            }
          }
          li.addEventListener('click', fav);
        }
      }
    });
}

button.addEventListener('click', search);

//node modules
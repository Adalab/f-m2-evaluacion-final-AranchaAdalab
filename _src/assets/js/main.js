'use strict';

const button = document.querySelector('.search');
const input = document.querySelector('.input');
const list = document.querySelector('.list');
const imgDefault = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

function search () {
    list.innerHTML = '';
    const url = `http://api.tvmaze.com/search/shows?q=${input.value}`;
    fetch(url)
        .then (response => response.json())
        .then (data => {
            console.log(data);
            for (const result of data) {
                if (result.show.image === null) {
                    list.innerHTML += `<li><img class="photo" src="${imgDefault}"<br>${result.show.name}</li>`;
                } else {
                    list.innerHTML += `<li><img class="photo" src="${result.show.image.medium}"<br>${result.show.name}</li>`;
                }
            }
        });
}

button.addEventListener('click', search);


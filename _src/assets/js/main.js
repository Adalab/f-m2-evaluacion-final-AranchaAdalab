'use strict';

const button = document.querySelector('.search');
const input = document.querySelector('.input');
const list = document.querySelector('.list');

function search () {
    const url = `http://api.tvmaze.com/search/shows?q=${input.value}`;
    fetch(url)
        .then (response => response.json())
        .then (data => {
            console.log(data);
            for (const result of data) {
                list.innerHTML += `<li><img class="photo" src="${result.show.image.medium}"<br>${result.show.name}</li>`;
                if (result.show.image.medium === null) {
                    list.innerHTML += `<li><img class="photo" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"<br>${result.show.name}</li>`;
                }
            }
        });
}

button.addEventListener('click', search);


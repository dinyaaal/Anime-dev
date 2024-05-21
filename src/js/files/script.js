// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";
import axios from "axios";
// import fs from "fs";



const apiUrl = 'http://localhost:5050';


axios.get(`${apiUrl}/animes`)
  .then((response) => {
    const animes = response.data;
    const animeItemsContainer = document.querySelector('.anime__items');

    animes.forEach((anime) => {
      const animeItem = document.createElement('a');
      animeItem.href = '#';
      animeItem.classList.add('item-anime');
    
      animeItem.innerHTML = `
        <div class="item-anime__image">
          <img class="ibg" src="${apiUrl}${anime.image}" alt="Image">
          <div class="item-anime__rating"><span>${anime.rating}</span></div>
        </div>
        <div class="item-anime__body">
          <p class="item-anime__name">${anime.name}</p>
          <div class="item-anime__genre">${anime.genre}</div>
        </div>
      `;
    
      animeItemsContainer.appendChild(animeItem);
    });
    
  })
  .catch((error) => {
    // handle error
    console.log(error);
});

const saveButton = document.querySelector('.add-anime__save');
document.addEventListener('DOMContentLoaded', () => {
  if(saveButton){

    // Добавляем обработчик события на кнопку "Save"
    saveButton.addEventListener('click', async () => {
      const animeName = document.querySelector('.input-box:nth-child(1) .input').value;
      const animeGenre = document.querySelector('.input-box:nth-child(2) .input').value;
      const animeRating = document.getElementById('input-rating').value;
  
      // Получаем выбранное изображение
      const imageInput = document.getElementById('add-anime-image');
      const imageFile = imageInput.files[0]; // Первый файл изображения, если выбрано несколько файлов
      if (!imageFile) {
        alert('Please select an image');
        return;
      }
  
      // Создаем объект FormData
      const formData = new FormData();
      
      // Добавляем данные JSON в FormData
      const jsonData = {
        name: animeName,
        genre: animeGenre,
        rating: animeRating
      };
      
      // Добавляем файл изображения в FormData
      formData.append('file', imageFile);
      formData.append('data', JSON.stringify(jsonData));
      console.log(formData);
      try {
        // Отправляем данные на сервер
        await axios.post(`${apiUrl}/animes`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Anime saved successfully!');
      } catch (error) {
        console.error('Error saving anime:', error);
        alert('Failed to save anime. Please try again.');
      }
    });
  }
});







// =========================================================================================================
const genreCheckboxes = document.querySelectorAll('.real-checkbox');

genreCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    const selectedGenres = Array.from(genreCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.getAttribute('name').toLowerCase()); // Преобразуем к нижнему регистру

    const animeItems = document.querySelectorAll('.item-anime');
    animeItems.forEach((animeItem) => {
      const genre = animeItem.querySelector('.item-anime__genre').textContent.trim().toLowerCase(); // Преобразуем к нижнему регистру
      if (selectedGenres.length === 0 || selectedGenres.includes(genre)) {
        animeItem.style.display = 'grid';
      } else {
        animeItem.style.display = 'none';
      }
    });
  });
});



document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('.anime__search');
  const animeItems = document.querySelectorAll('.item-anime');

  searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase().trim();

    animeItems.forEach(function (item) {
      const animeName = item.querySelector('.item-anime__name').textContent.toLowerCase();

      if (animeName.includes(searchTerm)) {
        item.style.display = 'grid';
      } else {
        item.style.display = 'none';
      }
    });
  });
});




// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";
import axios from "axios";




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

    saveButton.addEventListener('click', async () => {
      const animeName = document.querySelector('.input-box:nth-child(1) .input').value;
      const animeGenre = document.querySelector('.input-box:nth-child(2) .input').value;
      const animeRating = document.getElementById('input-rating').value;
  
      const imageInput = document.getElementById('add-anime-image');
      const imageFile = imageInput.files[0]; 
      if (!imageFile) {
        alert('Please select an image');
        return;
      }
  
      const formData = new FormData();
      
      const jsonData = {
        name: animeName,
        genre: animeGenre,
        rating: animeRating
      };
      
      formData.append('file', imageFile);
      formData.append('data', JSON.stringify(jsonData));
      console.log(formData);
      try {
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




// =========================================================================================================


document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent default form submission

      // Gather form data
      const username = document.getElementById('username').value;
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // Create request payload
      const data = {
        username,
        name,
        email,
        password
      };

      try {
        // Send POST request to add a new user
        const response = await axios.post(`${apiUrl}/users`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        alert(response.data.message); // Show success message
      } catch (error) {
        console.error('Error registering user:', error);
        alert('Failed to register user. Please try again.');
      }
    });
  }
});




document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      const data = {
        email,
        password
      };

      try {
        const loginResponse = await axios.post(`${apiUrl}/users`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const userId = loginResponse.data[0].id;

        // Теперь, когда у нас есть ID пользователя, отправляем запрос для получения полной информации о пользователе
        const userResponse = await axios.get(`${apiUrl}/users/${userId}`);

        const userData = userResponse.data;
        if (userData.length > 0) {
          // Сохраняем данные пользователя в локальном хранилище
          localStorage.setItem('userData', JSON.stringify(userData[0]));
          
          alert('Login successful!');
          window.location.href = 'user.html';
        } else {
          alert('Invalid email or password');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please try again.');
      }
    });
  }
});






document.addEventListener('DOMContentLoaded', () => {
  const userEmailInput = document.getElementById('userEmail');
  const userNicknameInput = document.getElementById('userNickname');
  const userNameInput = document.getElementById('userName');
  const userPasswordInput = document.getElementById('userPassword');
  const saveButton = document.getElementById('saveButton');
  const deleteButton = document.getElementById('deleteButton');

  const userData = JSON.parse(localStorage.getItem('userData'));

  if (userData) {
    userEmailInput.value = userData.email;
    userNicknameInput.value = userData.username;
    userNameInput.value = userData.name;
    userPasswordInput.value = userData.password;
  } else {
    console.error('User data not found in local storage');
  }

  if (saveButton) {
    saveButton.addEventListener('click', async () => {
      const userId = userData.id;
      const updatedEmail = userEmailInput.value;
      const updatedNickname = userNicknameInput.value;
      const updatedName = userNameInput.value;
      const updatedPassword = userPasswordInput.value;

      if (updatedEmail && updatedNickname && updatedName && updatedPassword && userId) {
        const updatedUserData = {
          id: userId,
          email: updatedEmail,
          username: updatedNickname,
          name: updatedName,
          password: updatedPassword
        };

        try {
          const response = await axios.put(`${apiUrl}/users/${userId}`, updatedUserData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const updatedUserDataFromServer = response.data;
          localStorage.setItem('userData', JSON.stringify(updatedUserDataFromServer));
          alert('User data updated successfully!');
        } catch (error) {
          console.error('Error updating user data:', error);
          alert('Failed to update user data. Please try again.');
        }
      } else {
        alert('Please fill in all required fields.');
      }
    });
  }

  if (deleteButton) {
    deleteButton.addEventListener('click', async () => {
      const userId = userData.id;

      if (userId) {
        try {
          await axios.delete(`${apiUrl}/users/${userId}`);
          alert('User deleted successfully!');
          localStorage.removeItem('userData');
          window.location.href = '/login'; // Перенаправление на страницу входа после удаления аккаунта
        } catch (error) {
          console.error('Error deleting user:', error);
          alert('Failed to delete user. Please try again.');
        }
      } else {
        console.error('User ID not found in local storage');
        alert('User ID not found. Please log in again.');
      }
    });
  }
});












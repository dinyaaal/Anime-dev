// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.anime__search');
    const animeItems = document.querySelectorAll('.item-anime');
    if(searchInput){

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
    }
  });
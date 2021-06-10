const MAGNETIC_MELON_URI = 'https://magnetic-melon-yam.glitch.me/';

// variables
const task1 = document.querySelector('#task_1');
const vipCheckbox = document.querySelector('#vip');
const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#search');

// events
document.addEventListener('DOMContentLoaded', loadList);
vipCheckbox.addEventListener('change', filterVip);
searchForm.addEventListener('submit', searchForName);

// function
function loadList() {
  fetch(MAGNETIC_MELON_URI)
    .then((response) => response.json())
    .then((result) => {
      let output = `
    <table>
        <tr>
            <th>ID</th>
            <th>Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Favourit Color</th>
        </tr>
    </table>
    `;

      // sumazinam masyvo dydi
      let items = result.slice(0, 50);

      // prafiltruojam ar yra masyve vip
      if (vipCheckbox.checked) {
        items = items.filter((item) => item.vip);
      }

      // ieskom pagal varda ar pavarde userio
      if (searchInput.value) {
        items = items.filter(
          (item) =>
            item.name.split(' ')[0] == searchInput.value ||
            item.name.split(' ')[1] == searchInput.value ||
            item.name == searchInput.value
        );
      }

      if (items.length !== 0) {
        // viskas kas atititok atvaizduojam
        for (let item of items) {
          task1.innerHTML = output += `
                  <tr>
                      <td>${item.id}</td>
                      <td><img src='${item.image}'</td>
                      <td>${item.name.split(' ')[0]}</td>
                      <td>${item.name.split(' ')[1]}</td>
                      <td>${item.city}</td>
                      <td>${item.fav_color}</td>
                  </tr>
                  `;
        }
      } else {
        task1.innerHTML = 'Sorry, we didint found what are you looking for :(';
      }

      return output;
    });
}

function filterVip() {
  loadList();
}

function searchForName(event) {
  event.preventDefault();

  loadList();
}

// Получение данных о пользователе
const userLogin = localStorage.getItem('userLogin');
document.getElementById('user-login').innerText = userLogin;

// Обработка кнопки выхода
document.getElementById('logout-button').addEventListener('click', () => {
  localStorage.removeItem('userLogin');
  window.location.href = '/login.html';
});

// Моковые данные (заменить на запрос к API)
const familyMembers = [
  { id: 1, firstName: 'John', lastName: 'Doe', birthDate: '1980-05-15', gender: 'Male' },
  { id: 2, firstName: 'Jane', lastName: 'Doe', birthDate: '1982-08-22', gender: 'Female' },
  { id: 3, firstName: 'Alice', lastName: 'Doe', birthDate: '2010-03-10', gender: 'Female' },
  { id: 4, firstName: 'Bob', lastName: 'Doe', birthDate: '2008-11-05', gender: 'Male' }
];

// Отображение карточек
const treeContainer = document.querySelector('.tree-container');

familyMembers.forEach((member, index) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.top = `${50 + index * 80}px`; // Задаём начальную позицию по Y
  card.style.left = `${50 + index * 80}px`; // Задаём начальную позицию по X
  card.setAttribute('draggable', true); // Включаем перетаскивание

  card.innerHTML = `
    <div class="name">${member.firstName} ${member.lastName}</div>
    <div class="birth-date">${member.birthDate}</div>
  `;

  // Добавление функциональности drag-and-drop
  let offsetX = 0;
  let offsetY = 0;

  card.addEventListener('dragstart', (e) => {
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    e.target.style.opacity = '0.5';
  });

  card.addEventListener('dragend', (e) => {
    e.target.style.opacity = '1';
    const rect = treeContainer.getBoundingClientRect();
    const newX = e.pageX - rect.left - offsetX;
    const newY = e.pageY - rect.top - offsetY;

    e.target.style.left = `${newX}px`;
    e.target.style.top = `${newY}px`;
  });

  treeContainer.appendChild(card);
});

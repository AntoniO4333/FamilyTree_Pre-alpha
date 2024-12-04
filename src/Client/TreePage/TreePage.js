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

familyMembers.forEach(member => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="name">${member.firstName} ${member.lastName}</div>
    <div class="birth-date">${member.birthDate}</div>
  `;
  treeContainer.appendChild(card);
});

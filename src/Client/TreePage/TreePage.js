// Получение данных о пользователе
const userLogin = localStorage.getItem('userLogin');
document.getElementById('user-login').innerText = userLogin;

// Обработка кнопки выхода
document.getElementById('logout-button').addEventListener('click', () => {
  localStorage.removeItem('userLogin');
  window.location.href = '/login.html';
});

// Моковые данные о членах семьи
const familyMembers = [
  { id: 1, firstName: 'John', lastName: 'Doe', birthDate: '1980-05-15', gender: 'Male' },
  { id: 2, firstName: 'Jane', lastName: 'Doe', birthDate: '1982-08-22', gender: 'Female' },
  { id: 3, firstName: 'Alice', lastName: 'Doe', birthDate: '2010-03-10', gender: 'Female' },
  { id: 4, firstName: 'Bob', lastName: 'Doe', birthDate: '2008-11-05', gender: 'Male' }
];

// Моковые данные о связях
const relationships = [
  { member1Id: 1, member2Id: 2, type: 'Spouse' },
  { member1Id: 1, member2Id: 3, type: 'Parent' },
  { member1Id: 1, member2Id: 4, type: 'Parent' },
  { member1Id: 2, member2Id: 3, type: 'Parent' },
  { member1Id: 2, member2Id: 4, type: 'Parent' }
];

// Отображение карточек
const treeContainer = document.querySelector('.tree-container');
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
treeContainer.appendChild(svg);

const memberCards = {};

familyMembers.forEach((member, index) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.top = `${50 + index * 80}px`; // Начальная позиция Y
  card.style.left = `${50 + index * 80}px`; // Начальная позиция X
  card.setAttribute('draggable', true); // Включаем перетаскивание
  card.dataset.id = member.id;

  card.innerHTML = `
    <div class="name">${member.firstName} ${member.lastName}</div>
    <div class="birth-date">${member.birthDate}</div>
  `;

  // Сохранение ссылки на карточку
  memberCards[member.id] = card;

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

    updateLines();
  });

  treeContainer.appendChild(card);
});

// Функция для обновления линий
function updateLines() {
  svg.innerHTML = ''; // Очистка старых линий

  relationships.forEach((relation) => {
    const card1 = memberCards[relation.member1Id];
    const card2 = memberCards[relation.member2Id];

    if (card1 && card2) {
      const rect1 = card1.getBoundingClientRect();
      const rect2 = card2.getBoundingClientRect();

      const x1 = rect1.left + rect1.width / 2 - treeContainer.getBoundingClientRect().left;
      const y1 = rect1.top + rect1.height / 2 - treeContainer.getBoundingClientRect().top;

      const x2 = rect2.left + rect2.width / 2 - treeContainer.getBoundingClientRect().left;
      const y2 = rect2.top + rect2.height / 2 - treeContainer.getBoundingClientRect().top;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.classList.add('line');

      svg.appendChild(line);
    }
  });
}

// Первичная отрисовка линий
updateLines();

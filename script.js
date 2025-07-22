// Заглушечные данные маршрутов и расписания
const routes = [
  { id: 1, name: 'Маршрут 1' },
  { id: 2, name: 'Маршрут 2' },
  { id: 3, name: 'Маршрут 3' },
];

const scheduleData = {
  1: ['08:00', '10:00', '12:00'],
  2: ['09:30', '11:30', '14:00'],
  3: ['07:45', '13:00', '16:00'],
};

const raidStatusElem = document.getElementById('raid-status');
const routesContainer = document.getElementById('routes');
const scheduleContainer = document.getElementById('schedule');
const refreshBtn = document.getElementById('refresh-btn');

let activeRouteId = routes[0].id;

function renderRoutes() {
  routesContainer.innerHTML = '';
  routes.forEach(route => {
    const div = document.createElement('div');
    div.className = 'route-item' + (route.id === activeRouteId ? ' active' : '');
    div.textContent = route.name;
    div.onclick = () => {
      activeRouteId = route.id;
      renderRoutes();
      renderSchedule();
    };
    routesContainer.appendChild(div);
  });
}

function renderSchedule() {
  const schedule = scheduleData[activeRouteId] || [];
  if (schedule.length === 0) {
    scheduleContainer.textContent = 'Расписание не найдено.';
  } else {
    scheduleContainer.textContent = schedule.join(' — ');
  }
}

function refreshData() {
  // Здесь позже будет реальное обновление данных с сервера
  raidStatusElem.textContent = 'Статус рейда: открыт';
  renderSchedule();
  alert('Данные обновлены (заглушка)');
}

refreshBtn.onclick = refreshData;

renderRoutes();
renderSchedule();

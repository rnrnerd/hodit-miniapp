const routes = [
  { id: 'route1', name: 'Маршрут 1', icon: '🛥️', schedule: ['08:00', '12:00', '16:00'], status: 'closed' },
  { id: 'route2', name: 'Маршрут 2', icon: '⛴️', schedule: ['09:00', '13:00', '17:00'], status: 'open' },
  { id: 'route3', name: 'Маршрут 3', icon: '🚤', schedule: ['10:00', '14:00', '18:00'], status: 'closed' },
];


const routeListEl = document.getElementById('route-list');
const scheduleEl = document.getElementById('schedule');
const refreshBtn = document.getElementById('refresh-btn');

let selectedRouteId = null;

function renderRoutes() {
  routeListEl.innerHTML = '';
  routes.forEach(route => {
    const div = document.createElement('div');
    div.className = 'route-item';
    div.dataset.id = route.id;

    div.innerHTML = `
      <span class="route-icon">${route.icon}</span> 
      <span class="route-name">${route.name}</span>
      <span class="route-status ${route.status === 'open' ? 'status-open' : 'status-closed'}">
        ${route.status === 'open' ? 'Открыт' : 'Закрыт'}
      </span>
    `;

    if (route.id === selectedRouteId) div.classList.add('selected');

    div.addEventListener('click', () => {
      selectedRouteId = route.id;
      renderRoutes();
      renderSchedule();
    });

    routeListEl.appendChild(div);
  });
}


function renderSchedule() {
  if (!selectedRouteId) {
    scheduleEl.innerHTML = '<p>Выберите маршрут для просмотра расписания</p>';
    return;
  }
  const route = routes.find(r => r.id === selectedRouteId);
  scheduleEl.innerHTML = `
    <h3>${route.icon} ${route.name}</h3>
    <ul>
      ${route.schedule.map(time => `<li>${time}</li>`).join('')}
    </ul>
  `;
}

refreshBtn.addEventListener('click', () => {
  alert('Обновление данных пока не реализовано');
});

renderRoutes();
renderSchedule();

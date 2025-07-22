const routesButtonsContainer = document.getElementById('routes-buttons');
const scheduleSection = document.getElementById('schedule');

const routes = [
  { id: 'sever', name: 'Северная', icon: '🚤', raidOpen: true },
  { id: 'parom', name: 'Паром', icon: '⛴️', raidOpen: false },
  { id: 'inkerman', name: 'Инкерман', icon: '🛥️', raidOpen: true },
  { id: 'grafskaya', name: 'Графская пристань', icon: '🛳️', raidOpen: true }
];

const schedules = {
  sever: {
    north: [
      "5:00", "10:00", "15:10", "19:10",
      "5:30", "10:20", "15:25", "19:25",
      "6:00", "10:40", "15:40", "19:40",
      "6:25", "11:00", "15:55", "20:00",
      "6:40", "11:20", "16:10", "20:20",
      "6:55", "11:40", "16:25", "20:40",
      "7:10", "12:00", "16:40", "21:00",
      "7:25", "12:20", "16:55", "21:20",
      "7:40", "12:40", "17:10", "21:45",
      "7:55", "13:00", "17:25", "22:15",
      "8:10", "13:20", "17:40", "22:55",
      "8:25", "13:40", "17:55", "23:30",
      "8:40", "14:00", "18:10",
      "9:00", "14:20", "18:25",
      "9:20", "14:40", "18:40",
      "9:40", "14:55", "18:55"
    ],
    grafskaya: [
      "5:00", "10:00", "14:40", "19:20",
      "5:30", "10:20", "15:00", "19:40",
      "6:00", "10:40", "15:20", "20:00",
      "6:20", "11:00", "15:40", "20:20",
      "6:40", "11:20", "16:00", "20:40",
      "7:00", "11:40", "16:20", "21:00",
      "7:20", "12:00", "16:40", "21:20",
      "7:40", "12:20", "17:00", "21:45",
      "8:00", "12:40", "17:20", "22:15",
      "8:20", "13:00", "17:40", "22:55",
      "8:40", "13:20", "18:00", "23:30",
      "9:00", "13:40", "18:20",
      "9:20", "14:00", "18:40",
      "9:40", "14:20", "19:00"
    ]
  },
  parom: {
    times: ["6:00", "9:00", "12:00", "15:00", "18:00"]
  },
  inkerman: {
    times: ["7:00", "10:00", "13:00", "16:00", "19:00"]
  },
  grafskaya: {
    times: [
      "5:00", "10:00", "14:40", "19:20",
      "5:30", "10:20", "15:00", "19:40",
      "6:00", "10:40", "15:20", "20:00",
      "6:20", "11:00", "15:40", "20:20",
      "6:40", "11:20", "16:00", "20:40",
      "7:00", "11:40", "16:20", "21:00",
      "7:20", "12:00", "16:40", "21:20",
      "7:40", "12:20", "17:00", "21:45",
      "8:00", "12:40", "17:20", "22:15",
      "8:20", "13:00", "17:40", "22:55",
      "8:40", "13:20", "18:00", "23:30",
      "9:00", "13:40", "18:20",
      "9:20", "14:00", "18:40",
      "9:40", "14:20", "19:00"
    ]
  }
};

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function getNextTrips(times) {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const futureTrips = times
    .map(t => ({ time: t, minutes: timeToMinutes(t) }))
    .filter(t => t.minutes >= nowMinutes);

  if (futureTrips.length) {
    return futureTrips.slice(0, 3);
  }
  // Если рейсов больше нет — показать первые 3 с начала
  return times.slice(0, 3).map(t => ({ time: t, minutes: timeToMinutes(t) }));
}

function renderTable(title, times) {
  return `
    <div>
      <h3>${title}</h3>
      <table class="schedule-table">
        <thead>
          <tr><th>Время</th></tr>
        </thead>
        <tbody>
          ${times.map(t => `<tr><td><strong>${t.time}</strong></td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderFullTable(title, times) {
  const rows = [];
  for(let i = 0; i < times.length; i += 4){
    rows.push(times.slice(i, i + 4));
  }
  return `
    <div>
      <h4>${title}</h4>
      <table class="schedule-table full-schedule">
        <tbody>
          ${rows.map(row => `
            <tr>
              ${row.map(time => `<td>${time}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function showSchedule(routeId) {
  document.querySelectorAll('.route-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.route === routeId);
  });

  if (!schedules[routeId]) {
    scheduleSection.innerHTML = `<p>Расписание для выбранного маршрута недоступно</p>`;
    return;
  }

  let nextTripsHtml = '';
  let fullScheduleHtml = '';

  if (routeId === 'sever') {
    const northTimes = schedules.sever.north;
    const grafskayaTimes = schedules.sever.grafskaya;

    const nextNorth = getNextTrips(northTimes);
    const nextGrafskaya = getNextTrips(grafskayaTimes);

    nextTripsHtml = `
      <div class="next-trips">
        ${renderTable('Ближайшие рейсы с Северной', nextNorth)}
        ${renderTable('Ближайшие рейсы с Графской', nextGrafskaya)}
      </div>
    `;

    fullScheduleHtml = `
      <hr/>
      <div class="full-schedule-wrapper">
        ${renderFullTable('Полное расписание с Северной', northTimes)}
        ${renderFullTable('Полное расписание с Графской', grafskayaTimes)}
      </div>
    `;
  } else {
    const times = schedules[routeId].times || [];
    const next = getNextTrips(times);

    nextTripsHtml = `
      <div class="next-trips">
        ${renderTable(`Ближайшие рейсы с ${routes.find(r => r.id === routeId).name}`, next)}
      </div>
    `;

    fullScheduleHtml = `
      <hr/>
      <div class="full-schedule-wrapper">
        ${renderFullTable(`Полное расписание с ${routes.find(r => r.id === routeId).name}`, times)}
      </div>
    `;
  }

  scheduleSection.innerHTML = nextTripsHtml + fullScheduleHtml;
}

function renderRoutesButtons() {
  routesButtonsContainer.innerHTML = routes.map(route => `
    <button class="route-btn" data-route="${route.id}" title="${route.name}">
      <span class="icon">${route.icon}</span>
      ${route.name}
      <span class="raid-status" title="Статус рейда">
        ${route.raidOpen ? '🟢' : '🔴'}
      </span>
    </button>
  `).join('');

  document.querySelectorAll('.route-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const routeId = btn.dataset.route;
      showSchedule(routeId);
    });
  });
}

function init() {
  renderRoutesButtons();
  showSchedule(routes[0].id); // По умолчанию первый маршрут
}

init();

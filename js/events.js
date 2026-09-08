const eventsList = document.querySelector('#events-list');

function formatDate(dateString) {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${dateString}T12:00:00`));
}

function renderEvents(events) {
    if (!eventsList) return;
    const upcoming = events
        .filter((event) => new Date(`${event.date}T23:59:59`) >= new Date())
        .sort((first, second) => first.date.localeCompare(second.date));

    if (!upcoming.length) {
        eventsList.innerHTML = '<p class="loading-message">No upcoming events are posted right now. Check back soon.</p>';
        return;
    }

    eventsList.innerHTML = upcoming.map((event) => `
    <article class="event-row">
      <time class="event-date" datetime="${event.date}">${formatDate(event.date)}</time>
      <div><h3 class="event-title">${event.title}</h3><p class="event-description">${event.description}</p></div>
      <p class="event-meta">${event.time}<br>${event.location}${event.link ? `<br><a class="event-link" href="${event.link}">Details →</a>` : ''}</p>
    </article>
  `).join('');
}

if (eventsList) {
    fetch('data/events.json')
        .then((response) => {
            if (!response.ok) throw new Error('Events could not be loaded');
            return response.json();
        })
        .then(renderEvents)
        .catch(() => {
            eventsList.innerHTML = '<p class="loading-message">Events are temporarily unavailable. Please check the GSO calendar.</p>';
        });
}

// Get references to the form and event container
const addEventForm = document.getElementById('add-event-form');
const eventContainer = document.getElementById('event-container');

// Function to handle event creation
function addEvent() {
  const titleInput = document.getElementById('title');
  const descriptionInput = document.getElementById('description');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const locationInput = document.getElementById('location');

  const event = {
    title: titleInput.value,
    description: descriptionInput.value,
    date: dateInput.value,
    time: timeInput.value,
    location: locationInput.value,
  };

  // Send a request to the server to store the event in the PostgreSQL database
  fetch('/store-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then(response => response.json())
    .then(data => {
      const eventElement = document.createElement('div');
      eventElement.classList.add('event');
      eventElement.innerHTML = `
        <h3>${event.title}</h3>
        <p>Description: ${event.description}</p>
        <p>Date: ${event.date}</p>
        <p>Time: ${event.time}</p>
        <p>Location: ${event.location}</p>
        <button onclick="deleteEvent(${data.id})">Delete</button>
      `;

      eventContainer.appendChild(eventElement);

      // Clear the form inputs
      titleInput.value = '';
      descriptionInput.value = '';
      dateInput.value = '';
      timeInput.value = '';
      locationInput.value = '';

      // Call a function to display the events
      displayEvents();
    })
    .catch(error => {
      // Handle the error if the event storage fails
      console.error('Error storing event:', error);
    });
}

function deleteEvent(eventId) {
  fetch(`/events/${eventId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        displayEvents(); // Call displayEvents() to update the displayed events
      } else {
        console.error('Error deleting event:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error deleting event:', error);
    });
}


function displayEvents() {
  fetch('/events')
    .then(response => response.json())
    .then(events => {
      eventContainer.innerHTML = '';

      if (events.length > 0) {
        events.forEach(event => {
          const eventElement = document.createElement('div');
          eventElement.classList.add('event');
          eventElement.innerHTML = `
            <h3>${event.title}</h3>
            <p>Description: ${event.description}</p>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <p>Location: ${event.location}</p>
            <button onclick="deleteEvent(${event.id})">Delete</button>
          `;

          eventContainer.appendChild(eventElement);
        });
      } else {
        const noEventsElement = document.createElement('p');
        noEventsElement.textContent = 'No events found.';
        eventContainer.appendChild(noEventsElement);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// Add an event listener to the form submission
addEventForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  addEvent(); // Call the addEvent function to handle event creation
});

function getEvents() {
  fetch('/events')
    .then(response => response.json())
    .then(events => {
      const eventsList = document.getElementById('events-list');
      eventsList.innerHTML = '';

      if (events.length > 0) {
        events.forEach(event => {
          const li = document.createElement('li');
          li.textContent = event.name;
          eventsList.appendChild(li);
        });
      } else {
        const li = document.createElement('li');
        li.textContent = 'No events found.';
        eventsList.appendChild(li);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// After the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Other code...

  // Call getEvents function to fetch and display events
  getEvents();
});

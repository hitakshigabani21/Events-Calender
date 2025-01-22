# Calendar Application

This is a functional calendar application that allows users to:

- View a monthly calendar.
- Add and delete events.
- Store events in local storage for persistence.
- Display Indian holidays (via API, though the current API is non-functional).

## Features

- **Interactive Calendar**: Navigate between months and years.
- **Add Events**: Click on a day to open a modal and add an event for that specific date.
- **Delete Events**: Remove the last added event.
- **Event Persistence**: Events are stored in the browser's local storage.
- **API Integration**: Fetch Indian holidays using an external API (currently non-functional).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/calendar-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd calendar-app
   ```

3. Open the `index.html` file in your browser to run the application.

## Usage

1. **View Calendar**: The current month and year are displayed by default. Use the navigation buttons to switch between months.
2. **Add Events**:
   - Click on any day to open the event modal.
   - Enter an event name and submit it.
   - The event will be saved and displayed on the calendar.
3. **Delete Events**:
   - Click the "Delete" button to remove the most recently added event.
   - The calendar will refresh to reflect the changes.
4. **Navigate to Today**:
   - Click the "Today" button to jump back to the current month and year.

## Local Storage

- Events are saved in the browser's local storage under the key `events`.
- Local storage ensures that events persist even after the page is refreshed.

## API Integration

- The application attempts to fetch Indian holidays from the following API:
  ```
  https://mocki.io/v1/7b47d683-984a-4fe8-9d40-4fc57a71145a
  ```
- Due to API issues, holidays are not currently displayed. You can update the `URL` constant with a functional API.

## Files

- `index.html`: The main HTML file for the calendar interface.
- `style.css`: Stylesheet for the application.
- `app.js`: JavaScript logic for rendering the calendar and managing events.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push the changes:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.



const daysContainer = document.querySelector(".days");    //container of days
const nextBtn = document.querySelector(".nextBtn");       // next button
const prevBtn = document.querySelector(".prevBtn");       //prev button
const todayBtn = document.querySelector(".today");
let month = document.querySelector(".month");
let data;

const eventModal = document.getElementById("eventModal");           //this is the div which contains the pop up content, headings,form,etc.
const eventForm = document.getElementById("eventForm");             //this is the form which contains an input that takes event title and has an input hidden for taking the current date 
const closeBtn = document.querySelector(".close-btn");               //it is for closing the pop-up
let eventslocal = JSON.parse(localStorage.getItem('events')) || [];  // Load events from localStorage

// Load events from localStorage, this is an array. it is initialized by either retrieving the existing data from localStorage (if it exists) or as an empty array.
//This means that when the page is first loaded, eventslocal will try to fetch and parse any existing event data from localStorage. If no data is found (i.e., the key 'events' doesn't exist in localStorage), it initializes as an empty array ([]).

//the array eventslocal holds the event objects, which have properties like event date, event name that users input through the event form.

// adding event listener to the close button in the pop-up to close it.
closeBtn.addEventListener("click", () => {
    eventModal.classList.remove("active");
});

//After submitting the form this should take place.
let submitbtn = document.querySelector(".submit");
submitbtn.addEventListener("click", () => {
        // e.preventDefault();
        const eventName = document.getElementById("eventName").value;       //storing the event name that the user will enter by input.value, the id of the input is eventName.
        const eventDate = document.getElementById("eventDate").value;         //storing the value of event date by accessing the data from hidden input value.
    
        // Save event to localStorage
        const newEvent = { date: eventDate, name: eventName};               // making a object that stores eventdate and event name as properties.
        eventslocal.push(newEvent);                                     //adding the object in the localsevent array.
        localStorage.setItem('events', JSON.stringify(eventslocal));        //setItem() method is used to store a value in local storage. this method takes two parameters : 1.string (in this case 'events') 2. the data you want to store. 
    
    //JSON.stringify() is a method that converts a JavaScript object or array into a JSON-formatted string.
        //In this case, eventslocal is a JavaScript array, and JSON.stringify(eventslocal) converts it into a JSON string that can be stored in localStorage, because localStorage can only store strings.

        // Hide modal and re-render calendar
        eventModal.classList.remove("active");
        renderCalender();
    });



const URL = "https://mocki.io/v1/7b47d683-984a-4fe8-9d40-4fc57a71145a";     // link to fetch data from this site.

let boxes = document.querySelectorAll(".days");

let eventsApi = [];

const getEvents = async ()=>{
    let promise =  await fetch(URL);
    data = await promise.json();
    eventsApi = data.response.holidays;
};

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

//get current date
const currentDate = new Date();

// get current month
let currentMonth = currentDate.getMonth();

// get current year
let currentYear = currentDate.getFullYear();
function checkForEvent(day, month, year) {
    const apiEvents = eventsApi.filter(event => {
        const eventDate = new Date(event.date.iso);
        
        return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === 2019;
    });

    
    const localEvents = eventslocal.filter(event => {
        const eventDate = new Date(event.date);
        
        return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });
    return [ ...apiEvents, ...localEvents];
}


// function to add days of current month.
function renderCalender(){
    //get prev month, current month and next month days
    currentDate.setDate(1);
    const firstDay = new Date(currentYear, currentMonth,1);     // gets first day of current month
    const lastDay = new Date(currentYear,currentMonth+1,0);     //gets current month's last day date
    const lastDayIndex = lastDay.getDay();                      //gets the week day number of last date of current month.
    const lastDayDate = lastDay.getDate();                      //gets the date of the last day of current month
    const prevLastDay = new Date(currentYear, currentMonth,0);  //gets previous month's last day date eg- 30,31,28
    const prevLastDate = prevLastDay.getDate();                 //gets prev month's last day's date / day of month
    const nextDays = 7 - lastDayIndex - 1;

    //update current month and year to render
    month.innerHTML = `${months[currentMonth]}, ${currentYear}`;

    //add days to days container
    let days = " ";
    //prev days html
    for(let i= firstDay.getDay(); i>0; i--){
        days += `<div class="day prev"><p>${prevLastDate - i +1}</p></div>`;
    }
    // current months days
     //current days of the month
     for (let i = 1; i <= lastDayDate; i++) {
        let paddedMonth = (currentMonth + 1).toString().padStart(2, "0");
        let paddedDay = i.toString().padStart(2, "0");

        const events = checkForEvent(i, currentMonth,currentYear); // Get events from both API and localStorage
        console.log(events);
        if (events.length > 0) {
            // If there are events on this day, display them
            let eventDetails = events.map(event => {
                return `<span class="event-name event-style">${event.name}</span>`;
            }).join('<br/>');
            days += `<div class="day event-day" data-date="${currentYear}-${paddedMonth}-${paddedDay}">${i}<br/>${eventDetails}</div>`;
        } else {
            days += `<div class="day" data-date="${currentYear}-${paddedMonth}-${paddedDay}">${i}</div>`;
        }
    }
    
    // next days 
    for(let j=1; j<= nextDays; j++){
        days += `<div class="day next"><p>${j}</p></div>`;
    }
    daysContainer.innerHTML = days;
    // Add click event to open event form on day click
    document.querySelectorAll(".day").forEach(day => {
        day.addEventListener("click", function() {
            const selectedDate = this.getAttribute("data-date");
            document.getElementById("eventDate").value = selectedDate;
            eventModal.classList.add("active");
        });
    });
}

// getEvents().then(() => {
//     renderCalender();
// });
renderCalender();



nextBtn.addEventListener("click",()=>{
    //increase currentMonth by 1
    currentMonth++;
    if(currentMonth>11){
        //if month > 11
        currentMonth = 0;
        currentYear++;
    }
    renderCalender();
});

prevBtn.addEventListener("click",()=>{
    currentMonth--;
    if(currentMonth<0){
        currentMonth = 11;
        currentYear--;
    }
    renderCalender();
});

todayBtn.addEventListener("click",()=>{
    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();
    renderCalender();
});


let deleteBtn = document.querySelector("#deletebtn");

deleteBtn.addEventListener("click", () => {
    if (eventslocal.length > 0) {
        // Remove the last event
        eventslocal.pop();
        
        // Update localStorage
        localStorage.setItem('events', JSON.stringify(eventslocal));
        
        // Re-render the calendar to reflect the changes
        renderCalender();
        
        console.log("Last event deleted");
    } else {
        console.log("No events to delete");
    }
    eventModal.classList.remove("active");
});

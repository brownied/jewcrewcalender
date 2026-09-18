const events = [
    {
        date: "2026-08-09",
        name: "Welcome BBQ",
        time: "6 p.m.",
        location: "Posner House",
        description: "Eat great food and meet other people before the school yeare!"

    },

    {
        date: "2026-09-01",
        name: "Jew Crew Kick off meeting",
        time: "All lunch periods",
        location: "Skyloft",
        description: "Have some apples and honey while learning about Rosh Hashanah!"

    },

    {
        date: "2026-09-22",
        name: "Build the Sukkah!",
        time: "After School",
        location: "Lunch Court",
        description: "Help build the sukkah in the outdoor space outside the cafeteria!"

    },

    {
        date: "2026-09-29",
        name: "Lunch in the Sukkah!",
        time: "All Lunch Periods",
        location: "Lunch Court",
        description: "Eat great food in the Sukkah!"

    },

    {
        date: "2026-10-13",
        name: "Meeting!",
        time: "All Lunch Periods",
        location: "TBD",
        description: "Learn about Judaism"
    },

    {
        date: "2026-10-27",
        name: "Food Sale! 🍇",
        time: "All Lunch Periods",
        location: "Concession Stand",
        description: "Sign up to volunteer at the food stand or come by and buy some food and learn about Judaism!"
    },

    {
        date: "2026-11-10",
        name: "Meeting!",
        time: "All Lunch Periods",
        location: "TBD",
        description: ""
    },

    {
        date: "2026-11-20",
        name: "Jew Crew Shabbat",
        time: "TBD",
        location: "TBD",
        description: ""
    },

    {
        date: "2026-12-01",
        name: "Meeting!",
        time: "All Lunch Periods",
        location: "TBD",
        description: ""
    },

    {
        date: "2026-12-08",
        name: "Food Sale!",
        time: "All Lunch Periods",
        location: "Concession Stand",
        description: "Sign up to volunteer at the food stand or come by and buy some food and learn about Judaism!"
    }


]



const eventContainer = document.getElementById('event-container');
eventContainer.style.display = "none";





const monthYearElement = document.getElementById('monthYear');
const datesYearElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');


let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 0);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    const monthYearString = currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
    monthYearElement.textContent = monthYearString;

    let datesHTML = '';

    for(let i = firstDayIndex; i > 0; i--) {
        const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
        datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
    }

    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

        let eventClass = "";
        for (let j = 0; j < events.length; j++){
            if (events[j].date == dateString){
                eventClass = "fill";
            }
        }
        
        datesHTML += `<div class="date ${activeClass} ${eventClass}" data-date="${dateString}">${i}</div>`;
        
    }

    for(let i = 1; i <= 7 - lastDayIndex; i++){
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        datesHTML += `<div class = "date inactive">${nextDate.getDate()}</div>`;

    }

    datesYearElement.innerHTML = datesHTML;

    const dateElements = document.querySelectorAll(".date");

    dateElements.forEach(dateElement => {

        dateElement.addEventListener("click", () => {
            document.getElementById('event-container').style.display = "block";
            const clickedDate = dateElement.dataset.date;

            const event = events.find(event => event.date === clickedDate);

            if (event) {

            document.getElementById("event-name").textContent = event.name;
            document.getElementById("event-time").textContent = event.time;
            document.getElementById("event-location").textContent = `📍 ${event.location}`;
            document.getElementById("event-description").textContent = event.description;

            } else {

            document.getElementById("event-name").textContent = "No Event";
            document.getElementById("event-time").textContent = "";
            document.getElementById("event-location").textContent = "";
            document.getElementById("event-description").textContent = "There is no Jew Crew event scheduled for this day.";

            }

        });

    });

} 

prevBtn.addEventListener('click', () => {
    eventContainer.style.display = "none";
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
})

nextBtn.addEventListener('click', () => {
    eventContainer.style.display = "none";
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
})

updateCalendar();
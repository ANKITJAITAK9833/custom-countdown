const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.querySelector('.countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;
// Set min date to today
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

// Updates DOM
function updateDOM(){
 countdownActive = setInterval(() => {
   const now = new Date().getTime();
   const distance = countdownValue - now;

   let days = Math.floor(distance / day);
   let hours = Math.floor((distance % day) / hour);
   let minutes = Math.floor((distance % hour) / minute);
   let seconds = Math.floor((distance % minute) / second);
   if(days<10){
       days = `0${days}`;
   }
   if(hours<10){
       hours = `0${hours}`;
   }
   if (minutes < 10) {
     minutes = `0${minutes}`;
   }
   if (seconds < 10) {
     seconds = `0${seconds}`;
   }

   //  Hide Input
   inputContainer.hidden = true;

   if(distance < 0){
       countdownEl.hidden = true;
       clearInterval(countdownActive);
       completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
       completeEl.hidden = false;
   } else {
   countdownElTitle.textContent = `${countdownTitle}`;
   timeElements[0].textContent = `${days}`;
   timeElements[1].textContent = `${hours}`;
   timeElements[2].textContent = `${minutes}`;
   timeElements[3].textContent = `${seconds}`;
   completeEl.hidden = true;
   countdownEl.hidden = false;
   }
 }, second);

}

// Resets all values
function reset(){
    // Hide Countdowns, show Input container
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    //  Stop the counter
    clearInterval(countdownActive);
    localStorage.removeItem('countdown');
    // Reset values
    countdownTitle = '';
    countdownDate = '';
}
// Takes value from form Input
function updateCountdown(e){
    e.preventDefault();
   countdownTitle = e.srcElement[0].value;
   countdownDate = e.srcElement[1].value;
   savedCountdown = {
       title: countdownTitle,
       date:countdownDate
   }
   localStorage.setItem('countdown',JSON.stringify(savedCountdown));
    e.srcElement[0].value = '';
    e.srcElement[1].value = '';
   if(countdownTitle ==='' || countdownDate ===''){
       alert("Please fill valid data in fields");
   } else{
     // Get number version of current Date, update DOM
     countdownValue = new Date(countdownDate).getTime();
     updateDOM();
   }
}

// Restore previous countdown
function restorePreviousCountdown(){
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listeners
countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click',reset);


// On load, check local storage
restorePreviousCountdown();
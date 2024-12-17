// Calculate bedtimes based on wake-up time
function calculateBedtime() {
  const wakeTimeInput = document.getElementById('wakeTime').value;
  if (!wakeTimeInput) {
    alert('Please select a wake-up time!');
    return;
  }

  const wakeTime = new Date(`1970-01-01T${wakeTimeInput}:00`);
  const sleepCycles = 6; // Number of sleep cycles to calculate
  const cycleDuration = 90 * 60 * 1000; // 90 minutes in milliseconds
  const fallAsleepBuffer = 15 * 60 * 1000; // 15-minute buffer for falling asleep

  const bedtimeList = [];
  for (let i = 1; i <= sleepCycles; i++) {
    const bedtime = new Date(wakeTime - i * cycleDuration - fallAsleepBuffer);
    bedtimeList.push(formatTime(bedtime));
  }

  displayResults(bedtimeList);
}

// Calculate wake-up times based on the current time
function calculateWakeTimes() {
  const currentTime = new Date();
  const sleepCycles = 6; // Number of sleep cycles to calculate
  const cycleDuration = 90 * 60 * 1000; // 90 minutes in milliseconds

  const wakeupList = [];
  for (let i = 1; i <= sleepCycles; i++) {
    const wakeTime = new Date(currentTime.getTime() + i * cycleDuration);
    wakeupList.push(formatTime(wakeTime));
  }

  displayResults(wakeupList);
}

// Format time into HH:MM AM/PM format
function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format
  return `${hours}:${minutes} ${ampm}`;
}

// Display calculated results in separate columns
function displayResults(times) {
  const resultsSection = document.getElementById('results-section');
  const inputSection = document.getElementById('input-section');
  const timeRow = document.getElementById('timeRow');

  // Populate the row with time columns
  timeRow.innerHTML = times
    .map(
      (time, index) =>
        `<div class="time-column ${index === 3 || index === 4 ? 'optimal' : ''}">
          ${index === 3 || index === 4 ? '' : ''} 
          ${time}
        </div>`
    )
    .join('');

  resultsSection.classList.remove('hidden');
  inputSection.classList.add('hidden');
}

// Reset the calculator to its initial state
function resetCalculator() {
  const resultsSection = document.getElementById('results-section');
  const inputSection = document.getElementById('input-section');
  const wakeTimeInput = document.getElementById('wakeTime');

  wakeTimeInput.value = ''; // Clear input
  resultsSection.classList.add('hidden');
  inputSection.classList.remove('hidden');
}

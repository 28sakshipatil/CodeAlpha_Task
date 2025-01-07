function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  }

//   Services 
const optionRadios = document.querySelectorAll('input[name="option"]');
const dateInput = document.getElementById('date-input');
const yearInput = document.getElementById('year-input');
const dateTimeInputs = document.getElementById('date-time-inputs');
const calculateButton = document.getElementById('calculate-button');
const resultSection = document.getElementById('result-section');
const resultDisplay = document.getElementById('result');
const funFactDisplay = document.getElementById('fun-fact');
const emojiContainer = document.getElementById('emoji-container');

let selectedOption = '';

optionRadios.forEach((radio) => {
  radio.addEventListener('change', (e) => {
    selectedOption = e.target.value;
    updateInputVisibility();
  });
});

const updateInputVisibility = () => {
  dateInput.style.display = selectedOption === 'date-month-year' ? 'block' : 'none';
  yearInput.style.display = selectedOption === 'year-only' ? 'block' : 'none';
  dateTimeInputs.style.display = selectedOption === 'date-month-year-time' ? 'block' : 'none';
};

const calculateAge = () => {
  const now = new Date();
  let output = '';

  if (selectedOption === 'date-month-year') {
    const birthDate = new Date(dateInput.value);
    const diff = now - birthDate;
    const ageDate = new Date(diff);
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;
    output = `${years} years, ${months} months, ${days} days`;
  } else if (selectedOption === 'year-only') {
    const age = now.getFullYear() - parseInt(yearInput.value);
    output = `${age} years`;
  } else if (selectedOption === 'date-month-year-time') {
    const datePart = document.getElementById('date-time-date').value;
    const timePart = document.getElementById('date-time-time').value;
    const birthDate = new Date(`${datePart}T${timePart}`);
    const diff = now - birthDate;
    const ageDate = new Date(diff);
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;
    const hours = ageDate.getUTCHours();
    const minutes = ageDate.getUTCMinutes();
    output = `${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes`;
  }

  resultDisplay.textContent = output;
  generateFunFact(output);
  resultSection.style.display = 'block';
  showRandomEmojis();
};

const generateFunFact = (ageDescription) => {
  const funFacts = [
    "Did you know? A year on Venus is shorter than a day on Venus!",
    "Age is merely the number of laps you've taken around the sun!",
    "In your lifetime, your heart will beat over 2.5 billion times!",
    "Every seven years, your body replaces every cell! You're literally a new person!",
  ];
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
  funFactDisplay.textContent = `${randomFact} Also, your calculated age: ${ageDescription}`;
};

const showRandomEmojis = () => {
const emojiContainer = document.getElementById('emoji-container'); // This is the container where the emojis will pop
emojiContainer.innerHTML = ''; // Clear previous emojis

const numberOfEmojis = 8; // Number of emojis to show

// Create and position each emoji at a random location inside the container
for (let i = 0; i < numberOfEmojis; i++) {
const emoji = document.createElement('div');
emoji.className = 'emoji-popup';
emoji.style.left = `${Math.random() * 90}%`; // Random horizontal position
emoji.style.top = `${Math.random() * 80}%`;  // Random vertical position
emoji.innerHTML = '<span role="img" aria-label="emoji">🎉</span>';
emojiContainer.appendChild(emoji);
}

// Remove emojis after 3 seconds
setTimeout(() => {
emojiContainer.innerHTML = ''; // Clear emojis after they are shown
}, 3000);
};



calculateButton.addEventListener('click', calculateAge);

document.getElementById('share-button').addEventListener('click', function () {
  if (navigator.share) {
    navigator.share({
      title: 'Check out this awesome Age Calculator!',
      text: 'I just used this cool Age Calculator and thought you might like it too. It shows your exact age in years, months, days, hours, and even seconds! Take a look at this website:',
      url: 'https://28sakshipatil.github.io/Codealpha_task/'
    })
    .then(() => console.log('Thanks for sharing!'))
    .catch((error) => console.log('Error sharing:', error));
  } else {
    // Fallback if Web Share API is not supported
    alert('Your browser does not support the Web Share API. You can still manually share this link: https://28sakshipatil.github.io/Codealpha_task/');
  }
});

// Hamburder menu
const hamburger = document.querySelector('.hamburger'),
      space = document.querySelector('.menu__overlay'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close'),
      menuItem = document.querySelectorAll('.menu__link');

const HamFunc = (elem, addRem = true) => {
    elem.addEventListener('click', () => {
        if (addRem) menu.classList.add('active');
        else menu.classList.remove('active');
    });
}

HamFunc(hamburger);
HamFunc(closeElem, false);
HamFunc(space, false);
menuItem.forEach(item => { HamFunc(item, false)});



// Scrolling Animation 
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
});
document.querySelectorAll('.hidden-element').forEach((el) => observer.observe(el));



// Dark theme mode
document.querySelector('#icon').onclick = function() {
    document.body.classList.toggle('dark-theme');
    const icon = document.querySelector('.dark_mode-icon');
    if(document.body.classList.contains('dark-theme')) {
      icon.src = "img/Modes/primary.svg";
    } else {
      icon.src = "img/Modes/Moon.svg";
    }
};


// Page up & smooth scrolling
window.addEventListener('scroll', function() {
  const pageBtn = document.querySelector('.pageup');
  if (window.scrollY > 1500 && pageBtn) {
    pageBtn.style.display = 'block';
  } else {
    pageBtn.style.display = 'none';
  }
});

document.querySelector('a[href="#up"]').addEventListener('click', function(e) {
  e.preventDefault();
  const target = document.querySelector(this.getAttribute('href'));
  window.scrollTo({
    top: target.offsetTop,
    behavior: 'smooth'
  });
});


// Contact form
document.querySelector('#contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get the form data
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const statusElement = document.getElementById('status');
  
    // Check if all fields are filled
    if (!email || !name || !message) {
      statusElement.innerText = "Please fill in all fields.";
      statusElement.classList.remove('success');
      statusElement.classList.add('error');
      return;
    }
  
    // Clear previous status message
    statusElement.innerText = "";
    statusElement.classList.remove('error', 'success');
  
    // Send the data using the Fetch API
    fetch('https://script.google.com/macros/s/AKfycbyxLO8-XP2U6du_3V3wy3qmCGkzCEGMPT5nRulPkUum4uwmq5-ejcg_mRgIQAos9Que/exec', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`
    })
    .then(response => response.text())
    .then(result => {
      // Show success message
      statusElement.innerText = "Message sent successfully!";
      statusElement.classList.remove('error');
      statusElement.classList.add('success');
      // Optionally clear the form
      document.getElementById('contactForm').reset();
    })
    .catch(error => {
      // Show error message
      statusElement.innerText = "Error sending message. Please try again.";
      statusElement.classList.remove('success');
      statusElement.classList.add('error');
      console.warn("Error sending message:", error);
    });
});

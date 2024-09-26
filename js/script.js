const hamburger = document.querySelector('.hamburger'),
    space = document.querySelector('.menu__overlay'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close'),
    menuItem = document.querySelectorAll('.menu__link');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

space.addEventListener('click', () => {
    menu.classList.remove('active');
});

menuItem.forEach((item, i) => {
    item.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

// Procent Counter ont the skills section
// Function to check if an element is in the viewport
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Function to handle the scroll event
const handleScroll = () => {
    document.querySelectorAll('.skills__ratings-item').forEach((item, i) => {
        // Check if the item is in the viewport and not yet animated
        if (isInViewport(item) && !item.dataset.animated) {
            const targetCounter = item.querySelector('.skills__ratings-counter');
            const targetLine = item.querySelector('.skills__ratings-line span');

            // Get the target width from the counter value
            const targetWidth = parseFloat(targetCounter.dataset.percent); 
            let currentWidth = 0;
            let currentValue = 0;

            const interval = setInterval(() => {
                // Increment the width and value gradually
                currentWidth += 1;
                currentValue += 1;

                // Update the progress bar width and counter value
                targetLine.style.width = currentWidth + '%';
                targetCounter.textContent = currentValue + '%';
                item.dataset.animated = true; // Mark the item as animated

                // Check if reached the target width
                if (currentWidth >= targetWidth) {
                    clearInterval(interval); // Stop the interval
                }
            }, 1); // Adjust the interval time for smoother animation
        }
    });
};

// Attach scroll event listener
window.addEventListener('scroll', handleScroll);

// Scrolling Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        //console.log(entry);
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });

});
    
const hiddenElements = document.querySelectorAll('.hidden-element');
hiddenElements.forEach((el) => observer.observe(el));

//
const icon = document.getElementById('icon');
icon.onclick = function() {
    document.body.classList.toggle('dark-theme');
    if(document.body.classList.contains('dark-theme')) {
        icon.src = "img/modes/primary.svg";
    }else {
        icon.src = "img/modes/Moon.svg";
    }
};

$('.contacts__form').validate();

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent the default form submission

  // Get the form data
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  // Check if all fields are filled
  if (!email || !name || !message) {
    document.getElementById('status').innerText = "Please fill in all fields and accept the terms and conditions.";
    return;
  }

  // Clear previous status message
  document.getElementById('status').innerText = "";

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
    document.getElementById('status').innerText = "Message sent successfully!";
    // Optionally clear the form
    document.getElementById('contactForm').reset();
  })
  .catch(error => {
    // Show error message
    document.getElementById('status').innerText = "Error sending message. Please try again.";
    console.warn("Error sending message:", error);
  });
});

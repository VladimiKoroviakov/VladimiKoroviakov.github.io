const hamburger = document.querySelector('.hamburger'),
    space =document.querySelector('.menu__overlay'),
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
            const targetWidth = parseFloat(targetCounter.textContent); 
            let currentWidth = 0;
            let currentValue = 0;

            const interval = setInterval(() => {
                // Increment the width and value gradually
                currentWidth += 1;
                currentValue += 1;

                // Update the progress bar width and counter value
                targetLine.style.width = currentWidth + '%';
                targetCounter.textContent = currentValue + '%';

                // Check if reached the target width
                if (currentWidth >= targetWidth) {
                    clearInterval(interval); // Stop the interval
                    item.dataset.animated = true; // Mark the item as animated
                }
            }, 10); // Adjust the interval time for smoother animation
        }
    });
};

// Attach scroll event listener
window.addEventListener('scroll', handleScroll);

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

$('from').submit(function(e) {
    e.preventDefault();

    if(!$(this).validate()) {
        return;
    }

    $.ajax({
        type:'POST',
        url: 'mailer/smart.php',
        data: $(this).serialize()
    }).done(function() {
        $(this).find('input').val('');

        $('form').trigger('reset');
    });
    return false;
});

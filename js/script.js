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

const counters = document.querySelectorAll('.skills__ratings-counter'),
      lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});

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

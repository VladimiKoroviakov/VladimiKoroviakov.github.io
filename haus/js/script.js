const closeElem = document.querySelector('.add__close'),
    add = document.querySelector('.add');

closeElem.addEventListener('click', () => {
    add.classList.add('hidden');
});
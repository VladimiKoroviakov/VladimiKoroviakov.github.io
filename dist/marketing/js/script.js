window.addEventListener('DOMContentLoaded', () => {
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

    // Tabs 
    const tabs = document.querySelectorAll(".pricing__tabs_option");
    const prices = document.querySelectorAll(".block__item_price");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            tabs.forEach(tab => tab.classList.remove("btn"));
            tab.classList.add("btn");

            if (index === 0) {
                // Monthly Pricing
                prices.forEach(price => {
                    if (price.textContent.includes("$")) {
                        const annualPrice = parseFloat(price.textContent.replace("$", ""));
                        const monthlyPrice = (annualPrice / 12).toFixed(2);
                        price.innerHTML = `$${monthlyPrice} <span>/ month</span>`;
                    }
                });
            } else if (index === 1) {
                // Yearly Pricing
                prices.forEach(price => {
                    if (price.textContent.includes("/ month")) {
                        const monthlyPrice = parseFloat(price.textContent.replace("$", "").replace("/ month", ""));
                        const annualPrice = (monthlyPrice * 12).toFixed(0);
                        price.innerHTML = `$${annualPrice} <span>/ year</span>`;
                    }
                });
            }
        });
    });

    // Accordion FAQ
    const faqItems = document.querySelectorAll(".faq__board_item");

    faqItems.forEach(item => {
        const head = item.querySelector(".faq__board_item-head");
        const answer = item.querySelector(".faq__board_answer");
        const icon = head.querySelector("svg");
        const iconBar = icon.querySelector("rect:nth-child(2)");

        head.addEventListener("click", () => {
            const isActive = answer.style.display === "block";
            answer.style.display = isActive ? "none" : "block";
            iconBar.style.display = isActive ? "block" : "none";
        });
    });
});
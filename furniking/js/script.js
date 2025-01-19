$(document).ready(function() {
	$('.feedback__slider').slick({  
		speed: 1200,
		adaptiveHeight: true,
		slidesToScroll: 1,
		infinite: true,
		slidesToShow: 1,
		draggable: false,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
			dots: true,
			prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
		    nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
			}
		}] 
	});
});

document.addEventListener("DOMContentLoaded", function () {
    // ------------------------------------------- Products Tabs  -----------------------------------------------
    function activateElements(tabSelector, dotSelector) {
        const tabs = document.querySelector(tabSelector);
        const dots = document.querySelector(dotSelector);
    
        const updateActiveState = (index) => {
            const updateActiveClass = (parent, className, selector) => {
                if (parent) {
                    const elements = Array.from(parent.children);
                    elements.forEach(el => el.classList.remove(className));
                    if (elements[index]) elements[index].classList.add(className);
    
                    if (selector && parent === tabs) {
                        const container = tabs.closest(".container");
                        const contents = container.querySelectorAll(selector);
                        contents.forEach(content => content.classList.remove(`${selector.slice(1)}_active`));
                        if (contents[index]) contents[index].classList.add(`${selector.slice(1)}_active`);
                    }
                }
            };
    
            updateActiveClass(tabs, "catalog__tab_active", ".catalog__content");
            updateActiveClass(dots, "active-dot");
        };
    
        const addClickListener = (element, selector, callback) => {
            if (element) {
                element.addEventListener("click", (event) => {
                    const target = event.target.closest(selector);
                    if (!target) return;
    
                    const allElements = Array.from(element.children);
                    const index = allElements.indexOf(target);
                    if (index >= 0) callback(index);
                });
            }
        };
    
        addClickListener(tabs, "li:not(.catalog__tab_active)", updateActiveState);
        addClickListener(dots, "svg", updateActiveState);
    }
    // Initializing tabs and dots
    activateElements(".catalog__tabs", ".catalog__dots");
    activateElements(".catalog__tabs-4");
    
    // --------------------------------------- Hero section slider --------------------------------------- 
    const cardItems = document.querySelectorAll(".promo__cards-item");
    const images = document.querySelectorAll(".promo__img img");
    const dots = document.querySelectorAll(".promo__main_dots .dot");

    let currentIndex = 0, autoSwitch;

    const switchTab = (index) => {
        cardItems.forEach(item => item.classList.remove("item-active"));
        images.forEach(img => img.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("dot-active"));
        cardItems[index].classList.add("item-active");
        images[index].classList.add("active");
        dots[index].classList.add("dot-active");
    };

    const startAutoSwitch = () => {
        autoSwitch = setInterval(() => {
            currentIndex = (currentIndex + 1) % cardItems.length;
            switchTab(currentIndex);
        }, 7000);
    };

    const stopAutoSwitch = () => clearInterval(autoSwitch);

    const addClickEvents = (elements) => {
        elements.forEach((element, index) => {
            element.addEventListener("click", () => {
                stopAutoSwitch();
                currentIndex = index;
                switchTab(currentIndex);
                startAutoSwitch();
            });
        });
    };

    addClickEvents(cardItems);
    addClickEvents(dots);
    startAutoSwitch();

    // -------------------------- CART & FAVOURITES Open/Close functionality --------------------------
    // Function to open sidepanel 
    const openSidepanel = (elem, cart, addRem = true) => {
        elem.addEventListener('click', () => {
            if (addRem){
                cart.classList.add('active');
                this.body.classList.add('no-scroll');
            } else {
                cart.classList.remove('active');
                this.body.classList.remove('no-scroll');
            } 
        });
    }
    // Cart
    const cartTrigger = document.querySelector('#bag'),
          cartOverlay = document.querySelector('.cart__overlay'),
          cart = document.querySelector('.cart'),
          cartCloseElem = document.querySelector('.cart__close');

    openSidepanel(cartTrigger, cart);
    openSidepanel(cartCloseElem,cart, false);
    openSidepanel(cartOverlay, cart, false);

    // Favourites 
    const favTrigger = document.querySelector('#heart'),
          favcartCloseElem = document.querySelector('.favourites__close'),
          favOverlay = document.querySelector('.favourites__overlay'),
          fav = document.querySelector('.favourites');
    openSidepanel(favTrigger, fav);
    openSidepanel(favcartCloseElem, fav, false);
    openSidepanel(favOverlay, fav, false);


    // -------------------------- CART & FAVOURITES Product Adding functionality  --------------------------
    // Function to update product count in header
    function updateProductCount(count, selector) {
        const item = document.querySelector(selector);
        if (count > 0) {
            item.style.display = 'flex';
            item.textContent = `${count}`;
        } else {
            item.style.display = 'none';
        }
    }

    // Toggle cart or favourites visibility
    const toggleVisibility = (selector, addRem = true) => {
        const item = document.querySelector(selector);
        if (addRem) {
            item.classList.add('active');
            this.body.classList.add('no-scroll');
        } else {
            item.classList.remove('active');
            this.body.classList.remove('no-scroll');
        }
    };  
   
    // Product numbers for Cart & Favourites
    let productCount = favouriteCount = 0;

    // Updating Cart & Favourites UI Based on whether they're empty or not
    function updateSidepanelUI(element, totalCost = 0) {
        const block = document.querySelector(`.${element}__block`);
        const productsContainer = block.querySelector(`.${element}__products`);
        const checkoutButton = document.createElement("button");
        checkoutButton.className = "cart__block_btn";
    
        // Check if the emptyCartMessage already exists
        let emptyCartMessage = productsContainer.querySelector(`.${element}__empty-message`);
        if (!emptyCartMessage) {
            emptyCartMessage = document.createElement("div");
            emptyCartMessage.className = `${element}__empty-message`;
            emptyCartMessage.innerHTML = `Your cart is empty. <a class="${element}__catalog_link" href="#catalog">Go to the Catalog</a>`;
        }
    
        const productsInCart = block.querySelectorAll(`.${element}__product`).length;
    
        if (productsInCart > 0) {
            // Remove emptyCartMessage if it exists in the DOM
            if (productsContainer.contains(emptyCartMessage)) {
                emptyCartMessage.remove();
            }
    
            // Add checkout button if it doesn't already exist
            if (element === "cart") {
                if (!block.querySelector(".cart__block_btn")) {
                    checkoutButton.textContent = totalCost > 0 
                    ? `Check out $${totalCost}` 
                    : "Check out";
                block.appendChild(checkoutButton);
                } else {
                    const buttonText = block.querySelector(".cart__block_btn").textContent,
                          numberMatch = buttonText.match(/\d+/),
                          oldPrice = numberMatch ? parseInt(numberMatch[0], 10) : null;
                    block.querySelector(".cart__block_btn").textContent = `Check out $${totalCost + oldPrice}`;
                }
                
            }
        } else {
            // Add emptyCartMessage if it doesn't already exist
            if (!productsContainer.contains(emptyCartMessage)) {
                productsContainer.appendChild(emptyCartMessage);
            }
    
            // Remove the checkout button if it exists
            const existingButton = block.querySelector(".cart__block_btn");
            if (existingButton) {
                existingButton.remove();
            }
        }
    }

    // Adding products to Cart & Favourites
    function addProduct(product, destination) {
        const { name, category, price, imgSrc } = product;

        const block = document.querySelector(`.${destination}__block`),
              productsContainer = block.querySelector(`.${destination}__products`);

        const existingProduct = Array.from(block.querySelectorAll(`.${destination}__product`)).find(cartItem => {
            const productName = cartItem.querySelector(`.${destination}__product_name`).textContent.trim();
            const truncatedName = name.length > 19 ? `${name.slice(0, 16)}...` : name;
            return productName === truncatedName;
        });

        if (existingProduct) {
            if(destination === 'cart') {
                const quantitySpan = existingProduct.querySelector('.cart__product_counter span');
                const priceElement = existingProduct.querySelector('.cart__product_price');
                let quantity = parseInt(quantitySpan.textContent);
    
                if (quantity < 50) {
                    quantity++;
                    quantitySpan.textContent = quantity;
    
                    const basePrice = parseFloat(priceElement.getAttribute('data-base-price'));
                    priceElement.textContent = `$${(basePrice * quantity)}`;

                    // Add to the price in the button 
                    updateSidepanelUI('cart', (basePrice * quantity) - (basePrice  * (quantity - 1)));
                }
            } else if (destination === 'favourites') {
                existingProduct.remove();
                updateProductCount(--favouriteCount, '#favourites-counter');

                const catalogProducts = document.querySelectorAll('.catalog-item');
                catalogProducts.forEach(product => {
                    const catalogProductCategory = product.querySelector('.catalog-item__title').textContent,
                        catalogProductName = product.querySelector('.catalog-item__descr').textContent;
                    
                    if(name === catalogProductName && category === catalogProductCategory) {
                        const hoverBlock = product.querySelector('.catalog-item__hover'),
                            favIcon = hoverBlock.querySelector('.catalog-item__circle');
                        favIcon.classList.remove('active');
                    }
                });
                updateSidepanelUI('favourites');
                if (destination === 'favourites') {
                    setTimeout(() => { toggleVisibility('.favourites', false) }, 3000); 
                }
            }
        } else {
            if (destination === 'cart') {
                updateProductCount(++productCount, `#cart-counter`);
            } else if (destination === 'favourites') {
                updateProductCount(++favouriteCount, `#favourites-counter`);
            }
            
            const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));
            const productHTML = `
                <div class="${destination}__product">
                    <img src="${imgSrc}" alt="Product Image" class="${destination}__product_img">
                    <h3 class="${destination}__product_name">${name.length > 19 ? `${name.slice(0, 16)}...` : name}</h3>
                    <p class="${destination}__product_category">${category}</p>
                    <div class="${destination}__product_price" data-base-price="${numericPrice}">$${numericPrice}</div>  
                    ${destination === 'cart' ? '<div class="cart__product_counter"><button class="up"><svg fill="#000" width="800px" height="800px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M0.256 23.481c0 0.269 0.106 0.544 0.313 0.75 0.412 0.413 1.087 0.413 1.5 0l14.119-14.119 13.913 13.912c0.413 0.413 1.087 0.413 1.5 0s0.413-1.087 0-1.5l-14.663-14.669c-0.413-0.412-1.088-0.412-1.5 0l-14.869 14.869c-0.213 0.212-0.313 0.481-0.313 0.756z"></path></svg></button><span>1</span><button class="down"><svg fill="#000" width="800px" height="800px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M0.256 8.606c0-0.269 0.106-0.544 0.313-0.75 0.412-0.412 1.087-0.412 1.5 0l14.119 14.119 13.913-13.912c0.413-0.412 1.087-0.412 1.5 0s0.413 1.088 0 1.5l-14.663 14.669c-0.413 0.413-1.088 0.413-1.5 0l-14.869-14.869c-0.213-0.213-0.313-0.481-0.313-0.756z"></path></svg></button></div>' : '<div class="favourites__product_cart"></div>'}
                    <svg class="${destination}__product_bin" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 408.483 408.483" xml:space="preserve">
                        <g>
                            <g>
                                <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316
                                    H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293
                                    c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329
                                    c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355
                                    c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356
                                    c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"/>
                                <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916
                                    c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"/>
                            </g>
                        </g>
                    </svg>
                </div>
            `;
            productsContainer.insertAdjacentHTML("beforeend", productHTML);
            updateSidepanelUI(`${destination}`, numericPrice);

            const catalogProducts = document.querySelectorAll('.catalog-item');
            catalogProducts.forEach(product => {
                const catalogProductCategory = product.querySelector('.catalog-item__title').textContent,
                      catalogProductName = product.querySelector('.catalog-item__descr').textContent;
                
                if(name === catalogProductName && category === catalogProductCategory) {
                    const hoverBlock = product.querySelector('.catalog-item__hover');
                    const sufix = destination === 'cart' ? '[data-key="cart"]' : '';
                    const productIcon = hoverBlock.querySelector(`.catalog-item__circle${sufix}`);
                    productIcon.classList.add('active');
                }
            });
        }
    }

    // Function to handle adding products
    const setupProductClicks = (buttons, destination) => {
        buttons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.stopPropagation();
                const catalogItem = event.target.closest('.catalog-item');
                const imgSrc = catalogItem.querySelector('.catalog-item__img').src;
                const category = catalogItem.querySelector('.catalog-item__title').textContent;
                const name = catalogItem.querySelector('.catalog-item__descr').textContent;
                const price = catalogItem.querySelector('.catalog-item__price').textContent;
    
                addProduct({ imgSrc, name, category, price }, `${destination}`);
                toggleVisibility(`.${destination}`);
            });
        });
    }

    // Cart & Favourites Product Card Buttons 
    const cartButtons = document.querySelectorAll('.catalog-item__circle[data-key="cart"]');
    const hoverBlocks = document.querySelectorAll('.catalog-item__hover');
    const firstCircles = Array.from(hoverBlocks).map(block => block.querySelector('.catalog-item__circle'));

    setupProductClicks(cartButtons, 'cart');
    setupProductClicks(firstCircles, 'favourites');

    // -------------------------------  Cart products manipulations  -------------------------------  
    const updateCatalogState = (cartProductName, cartProductCategory) => {
        const catalogProducts = document.querySelectorAll('.catalog-item');
        catalogProducts.forEach(product => {
            const catalogProductCategory = product.querySelector('.catalog-item__title').textContent,
                catalogProductName = product.querySelector('.catalog-item__descr').textContent,
                truncatedName = catalogProductName.length > 19 ? `${catalogProductName.slice(0, 16)}...` : catalogProductName,
                hoverBlock = product.querySelector('.catalog-item__hover'),
                cartIcon = hoverBlock.querySelector('.catalog-item__circle');
            
            if(truncatedName === cartProductName  && catalogProductCategory === cartProductCategory && cartIcon.classList.contains('active')) {
                cartIcon.classList.remove('active');
            }
        });
    }

    // UP / DOWN / BIN Buttons functionality for Cart & Favourites
    const productItemFunctionality = (destination) => {
        document.querySelector(`.${destination}__block`).addEventListener('click', event => {
            const target = event.target;
            const product = target.closest(`.${destination}__product`);
           
            if(destination === 'cart') {
                // Handle quantity increment
                if (target.closest('.up')) {
                    event.preventDefault();
                    const counter = product.querySelector('.cart__product_counter');
                    const quantitySpan = counter.querySelector('span');
                    const priceElement = product.querySelector('.cart__product_price');
                    
                    let quantity = parseInt(quantitySpan.textContent);
                    if (quantity < 50) {
                        quantity++;
                        quantitySpan.textContent = quantity;
                        
                        const basePrice = parseInt(priceElement.getAttribute('data-base-price'));
                        priceElement.textContent = `$${(basePrice * quantity)}`;
        
                        updateSidepanelUI('cart', (basePrice * quantity) - (basePrice  * (quantity - 1)));
                    }
                }

                // Handle quantity decrement
                if (target.closest('.down')) {
                    const counter = product.querySelector('.cart__product_counter');
                    const quantitySpan = counter.querySelector('span');
                    const priceElement = product.querySelector('.cart__product_price');
                    let quantity = parseInt(quantitySpan.textContent);
                    if (quantity > 1) {
                        quantity--;
                        quantitySpan.textContent = quantity;
                        
                        const basePrice = parseFloat(priceElement.getAttribute('data-base-price'));
                        priceElement.textContent = `$${(basePrice * quantity)}`;
        
                        updateSidepanelUI('cart', -basePrice);
                    }
                }
            }

            if(destination === 'favourites') {
                if (target.closest('.favourites__product_cart')) {
                    event.preventDefault();
                    const favProductName = product.querySelector(`.favourites__product_name`).textContent,
                        favProductCategory = product.querySelector(`.favourites__product_category`).textContent,
                        favProductPrice = product.querySelector(`.favourites__product_price`).textContent,
                        favProductImg = product.querySelector('.favourites__product_img').src,
                        numberMatch = favProductPrice.match(/\d+/),
                        productPrice = numberMatch ? parseInt(numberMatch[0], 10) : null;
                    
                    updateCatalogState(favProductName, favProductCategory);

                    if (product) {
                        product.remove();
                        updateSidepanelUI('favourites');
                        updateProductCount(--favouriteCount, '#favourites-counter');
                        addProduct({ 
                            name: favProductName, 
                            category: favProductCategory, 
                            price: favProductPrice, 
                            imgSrc: favProductImg 
                        }, 'cart');
                    }
                }
            }
        
            // Handle product removal
            if (target.closest(`.${destination}__product_bin`)) {
                event.preventDefault();
                const cartProductName = product.querySelector(`.${destination}__product_name`).textContent,
                    cartProductCategory = product.querySelector(`.${destination}__product_category`).textContent,
                    cartProductPrice = product.querySelector(`.${destination}__product_price`).textContent,
                    numberMatch = cartProductPrice.match(/\d+/),
                    productPrice = numberMatch ? parseInt(numberMatch[0], 10) : null;
    
                const catalogProducts = document.querySelectorAll('.catalog-item');
                catalogProducts.forEach(product => {
                    const catalogProductCategory = product.querySelector('.catalog-item__title').textContent,
                        catalogProductName = product.querySelector('.catalog-item__descr').textContent,
                        hoverBlock = product.querySelector('.catalog-item__hover'),
                        sufix = destination === 'cart' ? '[data-key="cart"]' : '';
                        cartIcon = hoverBlock.querySelector(`.catalog-item__circle${sufix}`);
                    
                    if(catalogProductName === cartProductName  && catalogProductCategory === cartProductCategory && cartIcon.classList.contains('active')) {
                        cartIcon.classList.remove('active');
                    }
                });
    
                if (product) {
                    product.remove();
                    if (destination === 'cart') {
                        updateProductCount(--productCount, `#${destination}-counter`);
                    } else {
                        updateProductCount(--favouriteCount, `#${destination}-counter`);
                    }
                    
                    updateSidepanelUI(`${destination}`, -productPrice);
                }
            }
    
            if (target.closest(`.${destination}__catalog_link`)) {
                setTimeout(() => { toggleVisibility(`.${destination}`, false) }, 100); 
            }
            if (target.closest('.cart__block_btn')) {
                alert('This store has been made for demonstrtion purposes only.'); 
            }
        });
    }
    // -------------------------- Initial Setup --------------------------
    // Setting counter to 0 and Cart & Favourites to empty state
    updateSidepanelUI('cart');
    updateSidepanelUI('favourites');
    updateProductCount(0, '#cart-counter');
    updateProductCount(0, '#favourites-counter');

    // Calling functions for Cart & Favourites
    productItemFunctionality('cart');
    productItemFunctionality('favourites');
});

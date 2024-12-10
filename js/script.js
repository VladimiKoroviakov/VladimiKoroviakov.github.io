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

// ------------------- LANGUAGE SWITCHING LOGIC -------------------
const languageSwitcher = document.getElementById("languageIcon");
const languageMain = document.querySelector(".language_main");
const languageDropdown = document.querySelector(".language_dropdown");
const languageOptions = document.querySelectorAll(".language_option");

const translations = {
    en: {
        mainTitle: "Hey! I’m Vladimir",
        mainSubtitle: "I’m a web-developer from Ukraine",
		portfolio: "Portfolio",
		aboutMe: "About Me",
		socialMedia: "<span>My social media</span>",
		myName: "My name is Vladimir",
		myStory: "As a proficient web developer, I help companies and individuals make a bold statement in the digital world. Using the most advanced technologies such as HTML5, CSS3, JavaScript, jQuery, Bootstrap, Gulp, WordPress, GPT. I develop websites that are not only visually striking, but also extremely functional, intuitive, and user-friendly. Whether you're an entrepreneur looking to promote your brand or an individual dreaming of a personalised online space, I create customised solutions that meet your goals. Let's join forces to bring your wildest ideas to life and create an online presence that captivates and inspires!",
        skillName1: "Web Development",
		skillDescr1: "Unleashing the potential<br> of code to craft captivating and<br> dynamic websites that make a lasting impression.",
		skillName2: "Translation",
		skillDescr2: "Breaking down language barriers with relevant and culturally attuned translations to empower a global audience to seamlessly access and connect with information.",
		skillName3: "UI/UX Design",
		skillDescr3: "Artfully merging creativity with functionality, specializing in the creation of intuitive interfaces and immersive user experiences that captivate and engage.",
		experience: "Experience",
		background: "My background",
        education: "Education",
        university: "Sumy State University",
        faculty: "IT faculty",
        universityDescr: "Gaining comprehensive knowledge and practical skills, preparing to thrive in the dynamic realm of information technology world.",
        udemySubtitle: "Web-development courses",
        udemyDescr: "Empowered myself with industry-leading knowledge and cutting-edge practical skills through immersive online courses, fostering hands-on learning experiences.",
        workExperience: "Work experience",
        webDev: "Web Development",
        position: "WordPress Developer at <a href='https://enxoo.com/' target='_blank'>Enxoo</a> (2023-present)",
        positionDescr: "Leveraged WordPress expertise to develop and maintain dynamic website, integrating technologies like Google Analytics, Salesforce Pardot, and MS Clarity. Strategically optimized performance and user experience.",
        freelance: "Freelance projects",
        freelanceSubtitle: "Web Dev + Translating (2018-2023)",
        freelanceDescr: "Simultaneously managed web development and translation projects, crafting engaging websites and delivering precise translations of various types of content in Ukrainian and Russian.",
        skillSet: "Skill set",
        stack: "What do I use?",
        html: "Is a markup language used for structuring and presenting content on the Web. The fifth version allows me to create a better SEO-optimized products.",
        css: "Is a stylesheet language used to describe the presentation of a document written in HTML. Supports CSS Grids, Animations and lots of other features.",
        js: "Is programming language that allows to bring anything to life: sliders, windows, tooltips, tabs, sending data to the server, etc.",
        wordpress: "A versatile and widely-used content management system (CMS) known for its flexibility and ease of use.",
        chatGPT: "Is a powerfull tool that helps developers write the code faster, make it more reliable and learn interesting features along the way.", 
        jquery: "This library will speed up the development process. Although it's not a compulsary technology, sometimes it really helps a lot.",
        bootstrap: "Is a feature-packed frontend toolkit, that helps to build anything from prototype to production in minutes.",
        gulp: "Is a task execution program. It helps to run external tasks and large scale web applications.",
        development: "Development",
        creativity: "Creativity",
        translation: "Multilingual support",
        seo: "Search Engine Optimization",
        design: "Design",
        softSkills: "Soft skills",
        samplesOfWork: "Samples of my work",
        priceList: "Price List",
        landingPage: "Landing-page",
        landingPagePrice: "starting at $300",
        landingPageDescr: "Fully responsive landing page with engaging animations, customizable contact form and a popup.",
        webDesign: "UI/UX Design",
        designPrice: "Individually",
        designDescr: "Fully responsive intuitive, user-friendly visually appealing interfaces, designed with the latest trends.",

        corporateWebsite: "Corporate website",
        corporateWebsitePrice: "starting at $800",
        corporateWebsiteDescr: "Fully responsive website (5 pages), with all landing page components included, plus WordPress admin panel.",

        webTranslation: "Content Creation/Translation",
        translationPrice: "Individually",
        translationDescr: "High-quality, localized content that resonates with your audience, ensuring your message is clear and relevant.",

        onlineStore: "Online Store",
        onlineStorePrice: "starting at $1200",
        onlineStoreDescr: "Online store on WordPress with all essential eCommerce features: product listings, shopping cart, secure checkout, and inventory management.",

        otherProjects: "Other web projects", 
        otherProjectsPrice: "Individually", 
        otherProjectsDescr: "Custom solutions for your existing website. Whether it’s making changes, adding new features, or integrating technologies like Google Analytics, Clarity, or other tools.", 

        contact: "Contact",
        contactTitle: "Contact me",
        contactSubtitle: "In any convenient way:",
        contactMessage: "Or leave your contact info and I’ll text you:",
        name: "Your name",
        email: "E-mail address",
        message: "Your message",
        sendMessage: "Send a message",
        terms: "I agree to all <a href='/policy.html'>terms & conditions</a>",
    },
    pl: {
        mainTitle: "Cześć! Nazywam się Wolodymyr",
        mainSubtitle: "Jestem web deweloperem  z Ukrainy",
		portfolio: "Portfolio",
		aboutMe: "Moja historia",
		socialMedia: "<span>Media społeczne</span>",
		myName: "Nazywam się Wolodymyr",
		myStory: "Witaj na mojej stronie portfolio! Jako biegły deweloper webowy, posługuję się solidnym zestawem najnowszych technologii, od HTML5 i CSS3, po JavaScript, jQuery, Bootstrap, Gulp, WordPress, GPT. Moja specjalność to tworzenie dynamicznych, wizualnie oszałamiających stron internetowych, dostosowanych do potrzeb firm i osób, które pragną wyróżnić się w cyfrowym świecie. Niezależnie od tego, czy jesteś przedsiębiorcą, który chce umocnić obecność swojej marki w internecie, czy osobą poszukującą osobistego zakątka w sieci, oferuję indywidualne rozwiązania, które odpowiadają Twoim celom. Połączmy siły, aby przekształcić Twoją wizję w rzeczywistość, zapewniając, że Twoja obecność online będzie przyciągać uwagę i trwać!",
        skillName1: "Tworzenie stron internetowych",
		skillDescr1: "Uwalnianie potencjału kodu<br> do tworzenia fascynujących i dynamicznych stron interneto-<br>wych, które zostawiają trwałe wrażenie.",
		skillName2: "Tłumaczenie",
		skillDescr2: "Przełamywanie barier językowych dzięki precyzyjnym i kulturowo dopasowanym tłumaczeniom, umożliwiając globalnym odbiorcom bezproblemowy dostęp i połączenie z informacjami.",
		skillName3: "UI/UX Design",
		skillDescr3: "Artystyczne połączenie kreaty-<br>wności z funkcjonalnością, specjalizując się w tworzeniu intuicyjnych interfejsów i wciągających doświadczeń użytkownika, które fascynują i angażują.",
		experience: "Doświadczenie",
		background: "Moja historia",
        education: "Edukacja",
        university: "Państwowy Uniwersytet w Sumach",
        faculty: "Wydział Technologii Informatycznych",
        universityDescr: "Zdobywanie wszechstronnej wiedzy i praktycznych umiejętności, przygotowanie do sukcesu w dynamicznym świecie technologii informacyjnych.",
        udemySubtitle: "Kursy tworzenia stron internetowych",
        udemyDescr: "Zdobyłem wiodącą w branży wiedzę i nowoczesne umiejętności praktyczne dzięki intensywnym kursom online, wspierającym naukę przez doświadczenie.",
        workExperience: "Doświadczenie zawodowe",
        webDev: "Tworzenie stron internetowych",
        position: "WordPress Deweloper w <a href='https://enxoo.com/' target='_blank'>Enxoo</a> (2023–obecnie)",
        positionDescr: "Wykorzystałem wiedzę z zakresu WordPress do tworzenia i utrzymywania dynamicznych stron internetowych, integrując technologie takie jak Google Analytics, Salesforce Pardot i MS Clarity. Strategicznie optymalizowałem wydajność i doświadczenie użytkowników.",
        freelance: "Projekty freelancerskie",
        freelanceSubtitle: "Tworzenie stron internetowych + Tłumaczenie (2018–2023)",
        freelanceDescr: "Jednocześnie zarządzałem projektami tworzenia stron internetowych i tłumaczeń, tworząc angażujące strony internetowe i dostarczając precyzyjne tłumaczenia różnych rodzajów treści na język ukraiński i rosyjski.",
        skillSet: "Umiejętności",
        stack: "Mój stos technologiczny",
        html: "Język znaczników używany do strukturyzacji i prezentacji treści w Internecie. Piąta wersja pozwala mi tworzyć bardziej zoptymalizo-<br>wane pod kątem SEO produkty.",
        css: "Język arkuszy stylów używany do opisywania prezentacji dokumentu napisanego w HTML. Obsługuje CSS Grid, animacje i wiele innych funkcji.",
        js: "Język programowania, który pozwala ożywić wszystko: suwaki, okna, podpowiedzi, zakładki, wysyłanie danych na serwer itp.",
        wordpress: "Wszechstronny i powszechnie używany system zarządzania treścią (CMS), znany ze swojej elastyczności i łatwości obsługi.",
        chatGPT: "Potężne narzędzie, które pomaga programistom pisać kod szybciej, czyni go bardziej niezawodnym i pozwala odkrywać ciekawe funkcje w trakcie pracy.", 
        jquery: "Ta biblioteka przyspieszy proces tworzenia. Chociaż nie jest to obowiązkowa technologia, czasami naprawdę bardzo pomaga.",
        bootstrap: "Bogaty w funkcje zestaw narzędzi frontendowych, który pozwala stworzyć wszystko — od prototypu po produkt końcowy w kilka minut.",
        gulp: "Program do wykonywania zadań. Pomaga uruchamiać zadania zewnętrzne i aplikacje internetowe na dużą skalę.",
        development: "Tworzenie stron internetowych",
        creativity: "Kreatywność",
        translation: "Wsparcie wielojęzyczne",
        seo: "Optymalizacja pod kątem wyszukiwarek",
        design: "Projektowanie",
        softSkills: "Zdolności osobiste",
        samplesOfWork: "Przykłady mojej pracy",
        priceList: "Cennik",
        
        landingPage: "Strona docelowa (Landing)",
        landingPagePrice: "od $300",
        landingPageDescr: "W pełni responsywna strona docelowa z atrakcyjnymi animacjami, konfigurowalnym formularzem kontaktowym i okienkiem popup.",
        webDesign: "Projektowanie UI/UX",
        designPrice: "Indywidualnie",
        designDescr: "W pełni responsywne, intuicyjne, przyjazne dla użytkownika i wizualnie atrakcyjne interfejsy, zaprojektowane zgodnie z najnowszymi trendami.",
        corporateWebsite: "Strona internetowa firmy",
        corporateWebsitePrice: "od $800",
        corporateWebsiteDescr: "W pełni responsywna strona internetowa (5 stron) ze wszystkimi elementami landingu oraz panelem administracyjnym WordPress.",
        webTranslation: "Tworzenie/Tłumaczenie treści",
        translationPrice: "Indywidualnie",
        translationDescr: "Wysokiej jakości, lokalizowana treść, która trafia do Twojej grupy docelowej, zapewniając jasny i trafny przekaz.”",
        onlineStore: "Sklep internetowy ",
        onlineStorePrice: "od $1200",
        onlineStoreDescr: "Sklep internetowy na WordPress ze wszystkimi niezbędnymi funkcjami eCommerce: lista produktów, koszyk, bezpieczna realizacja transakcji i zarządzanie zapasami.",
        otherProjects: "Inne projekty internetowe.", 
        otherProjectsPrice: "Indywidualnie", 
        otherProjectsDescr: "Indywidualne rozwiązania dla już istniejącej strony internetowej. Wprowadzenie zmian, dodanie nowych funkcji, czy integrację z zewnętrznymi technologiami", 
        contact: "Kontakt",
        contactTitle: "Skontaktuj się ze mną",
        contactSubtitle: "W dowolny wygodny sposób:",
        contactMessage: "Lub zostaw swoje dane kontaktowe, a ja do Ciebie napiszę:",
        name: "Imię",
        email: "Adres e-mail",
        message: "Wiadomość",
        sendMessage: "Wyślij wiadomość",
        terms: "Akceptuję wszystkie <a href='/policy-pl.html'>warunki i politykę prywatności</a>",
    },
    ua: {
        mainTitle: "Вітаю! Мене звати Володимир",
        mainSubtitle: "Я веброзробник <br> з України",
		portfolio: "Портфоліо",
		aboutMe: "Про мене",
		socialMedia: "<span>Cоціальні мережі</span>",
		myName: "Мене звати Володимир",
		myStory: "Як професійний веброзробник, я допомагаю компаніям і приватним особам  сміливо заявляти про себе в цифровому світі. Використовуючи найсучасніші технології, такі як HTML5, CSS3, JavaScript, Bootstrap, jQuery, Gulp, WordPress та GPT я розробляю вебсайти, які не лише вражають візуально, але є надзвичайно функціональними, інтуїтивно зрозумілими та зручними. Незалежно від того, чи ви підприємець, який прагне просувати свій бренд, чи приватна особа, яка мріє про персоналізований онлайн-простір, я допоможу Вам створити індивідуальне рішення, яке відповідатиме вашим цілям. Об'єднаймо зусилля, аби втілити Ваші найсміливіші ідеї в життя і створити онлайн-платформу, яка зачаровує і надихає!",
        skillName1: "Веброзробка",
		skillDescr1: "Розкриваю потенціал коду для створення захоплюючих і динамічних вебсайтів, які справляють незабутнє враження.",
		skillName2: "Переклад",
		skillDescr2: "Руйную мовні бар'єри за допомогою релевантних та нативних перекладів, що дають можливість глобальній аудиторії легко сприймати інформацією та взаємодіяти з нею.",
		skillName3: "UI/UX Дизайн",
		skillDescr3: "Майстерно поєднаную творчість з функціональністю, спеціалізую-<br>чись на створенні інтуїтивно зро-<br>зумілих інтерфейсів і захоплю-<br>ючого користувацького досвіду.",
		experience: "Досвід",
		background: "Моя історія",
        education: "Освіта",
        university: "СумДУ",
        faculty: "Факультет інформаційних технологій",
        universityDescr: "Отримую ґрунтовні знання та практичні навички, щоб гарантувати успіх в динамічному світі інформаційних технологій.",
        udemySubtitle: "Курси веброзробки",
        udemyDescr: "Отримав передові знання та практичні навички завдяки різним онлайн-курсам, що спрямовані на закірпленні знань практиці.",
        workExperience: "Досвід роботи",
        webDev: "Веброзробка",
        position: "WordPress Розробник в <a href='https://enxoo.com/' target='_blank'>Enxoo</a> (2023–дотепер)",
        positionDescr: " Використовував знання WordPress для розробки та підтримки динамічних вебсайтів, інтегруючи технології, такі як Google Analytics, Salesforce Pardot та MS Clarity. Оптимізував продуктивність та досвід користувачів.",
        freelance: "Фриланс-проєкти",
        freelanceSubtitle: "Веброзробка + Переклад (2018–2023)",
        freelanceDescr: "Одночасно займався проєктами веброзробки та перекладу, створюючи цікаві та інтерактивні вебсайти та надаючи точні переклади різного роду контенту англійською, українською та російською мовами.",
        skillSet: "Мій стек",
        stack: "Що я використовую?",
        html: "Мова розмітки, яка використовує-<br>ться для структурування та представлення контенту в Інтернеті. П'ята версія дозволяє створювати більш SEO-оптимізовані продукти.",
        css: "Мова стилів, яка використовується для опису представлення докумен-<br>та, написаного в HTML. Підтримує CSS-сітки, анімацію та багато інших можливостей.",
        js: "Мова програмування, що дозволяє оживити будь-що: слайдери, вікна, підказки, вкладки, відправлення даних на сервер тощо.",
        wordpress: "Універсальна та широко викори-<br>стовувана система управління контентом (CMS), відома своєю гнучкістю та простотою використання.",
        chatGPT: "Потужний інструмент, який допомагає розробникам швидше писати код, робити його більш надійним і вивчати цікаві функції у ході роботи.", 
        jquery: "Бібліотека, яка прискорює процес розробки. Хоча це не обов'язкова технологія, іноді вона дійсно дуже допомагає.",
        bootstrap: "Багатофункціональний інструмен-<br>тарій для фронтенд-розробки, який допомагає створювати будь-що: від прототипу до продукту, лише за декілька хвилин.",
        gulp: "Програма для виконання завдань. Вона допомагає запускати зовнішні завдання та масштабні вебдодатки.",
        development: "Веброзробка",
        creativity: "Креативність",
        translation: "Переклад",
        seo: "Пошукова оптимізація (SEO)",
        design: "Дизайн",
        softSkills: "Софт скіли",
        samplesOfWork: "Приклади робіт",
        priceList: "Прайс-лист",
        
        landingPage: "Односторінковий сайт",
        landingPagePrice: "Від $300",
        landingPageDescr: "Повністю адаптивна лендинг-сторінка з привабливими анімаціями, налаштованою формою зворотного зв’язку та спливаючим вікном.",
        webDesign: "UI/UX Дизайн",
        designPrice: "Індивідуально",
        designDescr: "Повністю адаптивні, інтуїтивно зрозумілі, зручні та візуально привабливі інтерфейси, створені з урахуванням останніх тенденцій.",
        corporateWebsite: "Корпоративний вебсайт",
        corporateWebsitePrice: "Від $800",
        corporateWebsiteDescr: "Повністю адаптивний вебсайт (5 сторінок) з усіма компонентами лендінгу, а також адміністративною панеллю WordPress.",
        webTranslation: "Створення/Переклад контенту",
        translationPrice: "Індивідуально",
        translationDescr: "Високоякісний локалізований контент, що відгукується у вашої аудиторії, забезпечуючи чіткість та актуальність вашого повідомлення.",
        onlineStore: "Інтернет Магазин",
        onlineStorePrice: "Від $1200",
        onlineStoreDescr: "Інтернет-магазин на WordPress з усіма необхідними функціями для eCommerce: каталог товарів, кошик, безпечна оплата та управління запасами.",
        otherProjects: "Інші веб проєкти", 
        otherProjectsPrice: "Індивідуально", 
        otherProjectsDescr: "Індивідуальні рішення для вашого існуючого вебсайту. Наприклад зміни існуючих чи додавання нових функцій або інтеграція певних сторонніх сервісів чи технологій.", 
        
        contact: "Контакти",
        contactTitle: "Звʼяжіться зі мною",
        contactSubtitle: "Через соцмережі: ",
        contactMessage: " Або залиште свої контактні дані, і я напишу вам:",
        name: "Ваше імʼя",
        email: "Адреса поштової скриньки",
        message: "Ваше повідомлення",
        sendMessage: "Відправити повідомлення",
        terms: "Я погоджуюсь з усіма <a href='/policy-ua.html'>умовами та положеннями</a>",
    }
};

languageDropdown.classList.add("hidden-element");

function loadLanguage() {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
        setLanguage(storedLanguage);
    } else {
        setLanguage('en');
    }
}

function setLanguage(language) {
    languageMain.textContent = language.toUpperCase();

    const elements = document.querySelectorAll("[data-key]");
    elements.forEach(element => {
        const key = element.getAttribute("data-key");
        element.innerHTML = translations[language][key];
    });

    languageOptions.forEach(option => {
        if (option.getAttribute("data-lang") === language) {
            option.style.display = "none";
        } else {
            option.style.display = "flex";
        }
    });
}

function changeLanguage(language) {
    localStorage.setItem('language', language);
    setLanguage(language);
}

languageSwitcher.addEventListener("click", () => {
    languageDropdown.classList.toggle("hidden-element");
});

languageOptions.forEach(option => {
    option.addEventListener("click", (event) => {
        const selectedLang = option.getAttribute("data-lang");
        changeLanguage(selectedLang);

        languageDropdown.classList.add("hidden-element");

        event.stopPropagation();
    });
});

document.addEventListener("click", (event) => {
    if (!languageDropdown.contains(event.target) && !languageSwitcher.contains(event.target)) {
        languageDropdown.classList.add("hidden-element");
    }
});

window.onload = loadLanguage;
// ------------------- LANGUAGE SWITCHING LOGIC END -------------------


// Numbers animation 
document.addEventListener('DOMContentLoaded', function () {
  	// Select all the rating items
  	const ratingItems = document.querySelectorAll('.skills__ratings-item');

  	// Function to start the counter and animation
  	function startRatingAnimation(item) {
      	const counter = item.querySelector('.skills__ratings-counter');
      	const bar = item.querySelector('.skills__ratings-line span');
      	const percent = parseInt(counter.getAttribute('data-percent'));

      	let count = 0;
      	const interval = setInterval(() => {
          	if (count <= percent) {
				counter.textContent = `${count}%`;
				bar.style.width = `${count}%`;
				count++;
          	} else {
              	clearInterval(interval);
          	}
      	}, 20); 
  	}

  	// Setup IntersectionObserver
  	const observerOptions = { threshold: 0.4 };

  	const observer = new IntersectionObserver((entries, observer) => {
      	entries.forEach(entry => {
          	if (entry.isIntersecting) {
              	startRatingAnimation(entry.target);
              	observer.unobserve(entry.target); // Stop observing once animation starts
          	}
     	 });
  	}, observerOptions);

  	// Observe each rating item
  	ratingItems.forEach(item => {
      	observer.observe(item);
  	});
});


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

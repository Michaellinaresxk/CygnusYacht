/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 70) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')

}
window.addEventListener('scroll', scrollHeader)


/*==================== SWIPER VIDEOS ====================*/
let swiper1 = new Swiper(".discover__container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 32,
    coverflowEffect: {
        rotate: 0,
    },
})

let swiper = new Swiper(".mySwiper", {
	spaceBetween: 10,
	slidesPerView: 4,
	freeMode: true,
	watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
	spaceBetween: 10,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	thumbs: {
		swiper: swiper,
	},
});

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollUp.classList.add('show-scroll'); 
    else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
    // reset: true,
})


sr.reveal(`.home__data, .home__social-link, .home__info,
           .container__yachtsmain, .superyachts,
           .discover__container,
           .experience__data, .experience__overlay,
           .place__card,
           .yacht-card__container,
           .destination-container,
           .destination-p,
           .yacht-gallery,
           .yacht__description,
           .footer__data, .footer__rights`,{
    origin: 'top',
    interval: 100,
})

sr.reveal(`.about__data, 
           .video__description,
           .banner2-img,
           .img-rounded,
           .logo-cygnus,
           .yacht__caracteristic,
           .subscribe__description`,{
    origin: 'left',
})

sr.reveal(`.about__img-overlay, 
           .video__content,
           .about-page-banner2-info,
           .service-info-content,
           .contact__quotes,
           .subscribe__form`,{
    origin: 'right',
    interval: 100,
})

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
  // slides[slideIndex-1].style.display = "block";
}




/*==================== GET LOCALE TRADUCTION ====================*/

class Translator {
  constructor(options = {}) {
    this._options = Object.assign({}, this.defaultConfig, options);
    this._elements = document.querySelectorAll("[data-i18n]");
    this._cache = new Map();

    if (this._options.detectLanguage) {
      this._options.defaultLanguage = this._detectLanguage();
    }

    if (
      this._options.defaultLanguage &&
      typeof this._options.defaultLanguage == "string"
    ) {
      this._getResource(this._options.defaultLanguage);
    }
  }

  _detectLanguage() {
    var stored = localStorage.getItem("language");

    if (this._options.persist && stored) {
      return stored;
    }

    var lang = navigator.languages
      ? navigator.languages[0]
      : navigator.language;

    return lang
  }


  _fetchLocal(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest
        xhr.onload = function () {
            resolve(new Response(xhr.response, { status: xhr.status }))
        }
        xhr.onerror = function () {
            reject(new TypeError('Local request failed'))
        }
        xhr.open('GET', url)
        xhr.responseType = "arraybuffer";
        xhr.send(null)
    })
};

  _fetch(path) {
    return this._fetchLocal(path)
      .then(response => response.json())
      .catch(() => {
        console.error(
          `Could not load ${path}. Please make sure that the file exists.`
        );
      });
  }  
  
  async _getResource(lang) {
    if (this._cache.has(lang)) {
      return JSON.parse(this._cache.get(lang));
    }

    var translation = await this._fetch(
      `${this._options.filesLocation}/${lang}.json`
    );

    if (!this._cache.has(lang)) {
      this._cache.set(lang, JSON.stringify(translation));
    }

    return translation;
  }

  async load(lang) {
    if (!this._options.languages.includes(lang)) {
      return;
    }

    this._translate(await this._getResource(lang));

    document.documentElement.lang = lang;

    if (this._options.persist) {
      localStorage.setItem("language", lang);
    }
  }

  async getTranslationByKey(lang, key) {
    if (!key) throw new Error("Expected a key to translate, got nothing.");

    if (typeof key != "string")
      throw new Error(
        `Expected a string for the key parameter, got ${typeof key} instead.`
      );

    var translation = await this._getResource(lang);

    return this._getValueFromJSON(key, translation, true);
  }

  _getValueFromJSON(key, json, fallback) {
    var text = key.split(".").reduce((obj, i) => obj[i], json);

    if (!text && this._options.defaultLanguage && fallback) {
      let fallbackTranslation = JSON.parse(
        this._cache.get(this._options.defaultLanguage)
      );

      text = this._getValueFromJSON(key, fallbackTranslation, false);
    } else if (!text) {
      text = key;
      console.warn(`Could not find text for attribute "${key}".`);
    }

    return text;
  }

  _translate(translation) {
    var zip = (keys, values) => keys.map((key, i) => [key, values[i]]);
    var nullSafeSplit = (str, separator) => (str ? str.split(separator) : null);

    var replace = element => {
      var keys = nullSafeSplit(element.getAttribute("data-i18n"), " ") || [];
      var properties = nullSafeSplit(
        element.getAttribute("data-i18n-attr"),
        " "
      ) || ["innerHTML"];

      if (keys.length > 0 && keys.length !== properties.length) {
        console.error(
          "data-i18n and data-i18n-attr must contain the same number of items"
        );
      } else {
        var pairs = zip(keys, properties);
        pairs.forEach(pair => {
          const [key, property] = pair;
          var text = this._getValueFromJSON(key, translation, true);

          if (text) {
            element[property] = text;
            element.setAttribute(property, text);
          } else {
            console.error(`Could not find text for attribute "${key}".`);
          }
        });
      }
    };

    this._elements.forEach(replace);
  }

  get defaultConfig() {
    return {
      persist: false,
      languages: ["en"],
      defaultLanguage: "en",
      detectLanguage: true,
      filesLocation: "/assets/js/locale"
    };
  }
}

const translator = new Translator({
  persist: false,
  languages: ["en", "es"],
  defaultLanguage: "en",
  detectLanguage: true,
  filesLocation: "/assets/js/locale"
});

translator.load();


// select feature

document.getElementById("select-lang").addEventListener("change", function(e) {
  let langSelected = e.target.value;
  translator.load(langSelected);

  setLangInLocalStorage(langSelected)
});


function setLangInLocalStorage(language) {
  localStorage.setItem('langChosen', language)
}

(function() {
  if(localStorage.getItem('langChosen') === null || localStorage.getItem('langChosen') === undefined) {
   
    localStorage.setItem('langChosen', "en")
  }
})();

(function() {
  let getLang = localStorage.getItem('langChosen');
  translator.load(getLang);
  updateSelect(getLang)
})();

function updateSelect(getLang) {
  document.getElementById("select-lang").value = getLang;
}

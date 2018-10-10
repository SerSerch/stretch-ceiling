  var viewElement,
    gallery = {};

  //олучаем имя картинки

  function nameImg(elem) {
    let reg = /([A-z]+)([0-9]+)s?(\.[A-z]+)/g;
    let img = elem.querySelector('.preview');
    let res = img.src || img.getAttribute('data-src');
    return reg.exec(res);
  }

  //открываем картинку на весь экран

  function openView(elem) {
    let imgView = nameImg(elem);
    document.querySelector('.img-view__img').src = 'wp-content/uploads/' + imgView[1] + imgView[2] + imgView[3];
    document.querySelector('.img-view').classList.add('_active');
    document.querySelector('body').classList.add('hidden');
    let slider = (imgView[1] + 's');

    if (slider) {
      viewElement = [slider, elem];
    }

  }

  function prevView() {
    gallery[viewElement[0]].slidePrev();
    let elem = viewElement[1].previousElementSibling || viewElement[1].parentElement.lastElementChild;
    openView(elem);
  }

  function nextView() {
    gallery[viewElement[0]].slideNext();
    let elem = viewElement[1].nextElementSibling || viewElement[1].parentElement.firstElementChild;
    openView(elem);
  }

  function closeView(event) {
    event = event || window.event;

    document.querySelector('.img-view').classList.remove('_active');
    document.querySelector('body').classList.remove('hidden');
  }


  function feedback(event) {
    event = event || window.event;

    let btn = event.currentTarget;
    let reg = /[0-9]+$/;
    let regTel = /^\+\d\(\d{3}\)\d{3}-\d{4}$/;
    let btnNumb = reg.exec(btn.id);

    let name = document.querySelector("#feedback-n" + btnNumb[0]).value;
    let phone = document.querySelector("#feedback-t" + btnNumb[0]).value;

    let xhttp;
    if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest();
    } else {
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onreadystatechange = function () {
      if (xhttp.readyState == 4 && xhttp.status == 200)
        if (+xhttp.responseText == 1) {
          alert("Ваше сообщение отправлено!");
        } else {
          alert("Возникла ошибка. Возможно вы уже отправляли письмо, попробуйте позже.");
        }
    }
    if (name.length > 1 && regTel.test(phone)) {
      xhttp.open("GET", "wp-content/themes/mesmerize/single.php?name=" + name + "&phone=" + phone + "&r=" + Math.random(), true);
      xhttp.send();
    } else {
      alert("Заполните поля\nВаше имя\nВаш номер телефона");
    }
  }

  function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', selectionEnd);
      range.moveStart('character', selectionStart);
      range.select();
    }
  }

  function setCaretToPos(input, pos) {
    setSelectionRange(input, pos, pos);
  }

  function clickPhone(e) {
    let element = e.currentTarget;
    let mask = '+7(___)___-____';
    if (!element.value) {
      element.value = mask;
    }
    setCaretToPos(element, element.value.search("_"));
  }

  function blurPhone(e) {
    let element = e.currentTarget;
    let numberPhone = element.value.match(/(\d)/g);
    if (numberPhone && numberPhone.length <= 1) {
      element.value = '';
    }
  }

  function inputPhone(e) {
    let element = e.currentTarget;
    let mask = '+7(___)___-____',
      numberPhone = element.value.match(/(\d)/g);
    if (numberPhone && element.value.length != mask.length) {
      let reg1 = /\)/g,
        reg2 = /\-/g;
      numberPhone.splice(0, 1);

      if (!reg1.test(element.value)) {
        numberPhone.splice(2, 1);
      }
      if (!reg2.test(element.value)) {
        numberPhone.splice(5, 1);
      }
      while (numberPhone.length < 10) {
        numberPhone.push('_');
      }
      numberPhone.splice(10, numberPhone.length);
      numberPhone.splice(6, 0, '-');
      numberPhone.splice(3, 0, ')');
      numberPhone.splice(0, 0, '+7(');
      element.value = numberPhone.join('');
      setCaretToPos(element, element.value.search("_"));
    }
  }

  function price(event) {
    event = event || window.event;
    let valueEvent = event.target.value;
    let nameEvent = (/([a-z]+)(\d)/g).exec(event.target.name);
    let numBox = nameEvent[2] == 2 ? 1 : 2;
    let manufacturer;
    const [...manufRadio] = document.getElementsByName('manufacturer' + nameEvent[2]);
    let manufRadioItem;
    
    if (isNaN(valueEvent) || valueEvent < 0) {
      event.target.value = '';
      valueEvent = '';
    }
    
    manufRadio.forEach((item, i) => {
      if (item.checked) {
        manufacturer = +item.dataset.value;
        manufRadioItem = i;
      }
    });
    
    
    if (event.target.type == 'text') {
      document.getElementsByName(nameEvent[1] + numBox)[0].value = valueEvent;
    } else {
      document.getElementsByName(nameEvent[1] + numBox)[manufRadioItem].checked = true;
    }
    
    let area = +document.getElementsByName('area1')[0].value;
    let corner = document.getElementsByName('corner1')[0];
    let cornice = document.getElementsByName('cornice1')[0];
    let lamp = document.getElementsByName('lamp1')[0];
    let chandelier = document.getElementsByName('chandelier1')[0];
    let res = manufacturer * area +
      corner.value * corner.dataset.value +
      cornice.value * cornice.dataset.value +
      lamp.value * lamp.dataset.value +
      chandelier.value * chandelier.dataset.value;
    
    document.querySelector('#calculator1 .calculator__price').innerText = isNaN(res) ? 'Неверные параметры' : `Сумма: ${res} руб.`;
    document.querySelector('#calculator2 .calculator__price').innerText = isNaN(res) ? 'Неверные параметры' : `Сумма: ${res} руб.`;
  }

  window.onload = function () {

    /**
    /* gallery */

    gallery.jumbotron = new Swiper('.jumbotron', {
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 1
      },
      watchSlidesVisibility: true,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: true,
      },
      navigation: {
        nextEl: '.swiper-button-next._jumbotron',
        prevEl: '.swiper-button-prev._jumbotron',
      },
      breakpoints: {
        991: {
          autoplay: false
        }
      }
    });

    gallery.workss = new Swiper('.our-works-slider', {
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 1
      },
      watchSlidesVisibility: true,
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next._our-works',
        prevEl: '.swiper-button-prev._our-works',
      },
      breakpoints: {
        400: {
          slidesPerView: 1
        }
      }
    });

    gallery.invoicess = new Swiper('.invoices-slider', {
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 1
      },
      watchSlidesVisibility: true,
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next._invoices',
        prevEl: '.swiper-button-prev._invoices',
      },
      breakpoints: {
        400: {
          slidesPerView: 1
        }
      }
    });

    gallery.lamps = new Swiper('.lamp-slider', {
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 1
      },
      watchSlidesVisibility: true,
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next._lamp',
        prevEl: '.swiper-button-prev._lamp',
      },
      breakpoints: {
        400: {
          slidesPerView: 1
        }
      }
    });

    gallery.technologys = new Swiper('.technology-slider', {
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 1
      },
      watchSlidesVisibility: true,
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next._technology',
        prevEl: '.swiper-button-prev._technology',
      },
      breakpoints: {
        400: {
          slidesPerView: 1
        }
      }
    });

    document.querySelector('.img-view__bg').addEventListener('click', closeView);
    document.querySelector('.img-view__close').addEventListener('click', closeView);
    document.querySelector('.img-view__prev').addEventListener('click', prevView);
    document.querySelector('.img-view__next').addEventListener('click', nextView);
    document.querySelector('.img-view__img').addEventListener('click', nextView);


    let viewEl = document.querySelectorAll('.swiper-slide._our-works');
    for (let l = viewEl.length - 1; l >= 0; l--) {
      viewEl[l].addEventListener('click', function (event) {
        event = event || window.event;
        openView(event.currentTarget);
      });
    }

    let viewEl2 = document.querySelectorAll('.swiper-slide._technology');
    for (let l = viewEl2.length - 1; l >= 0; l--) {
      viewEl2[l].addEventListener('click', function (event) {
        event = event || window.event;
        openView(event.currentTarget);
      });
    }

    let viewEl3 = document.querySelectorAll('.swiper-slide._invoices');
    for (let l = viewEl3.length - 1; l >= 0; l--) {
      viewEl3[l].addEventListener('click', function (event) {
        event = event || window.event;
        openView(event.currentTarget);
      });
    }

    let viewEl4 = document.querySelectorAll('.swiper-slide._lamp');
    for (let l = viewEl4.length - 1; l >= 0; l--) {
      viewEl4[l].addEventListener('click', function (event) {
        event = event || window.event;
        openView(event.currentTarget);
      });
    }



    let feedback_b = document.querySelectorAll(".feedback__button");
    for (let b of feedback_b) {
      b.addEventListener('click', feedback);
    }

    let phoneInput = document.querySelectorAll('.feedback__input._tel');
    for (let i of phoneInput) {
      i.addEventListener("click", clickPhone);
      i.addEventListener("focus", clickPhone);
      i.addEventListener("blur", blurPhone);
      i.addEventListener('input', inputPhone);
    }

    const [...calcInput1] = document.querySelector('#calculator1').querySelectorAll('input');
    calcInput1.map(input => input.addEventListener('change', price));
    const [...calcInput2] = document.querySelector('#calculator2').querySelectorAll('input');
    calcInput2.map(input => input.addEventListener('change', price));
  };

/**
/* gallery */

new Swiper('.jumbotron', {
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: '.swiper-button-next._jumbotron',
    prevEl: '.swiper-button-prev._jumbotron',
  },
});

var works = new Swiper('.our-works-slider', {
  loop: true,
  slidesPerView: 'auto',
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: '.swiper-button-next._our-works',
    prevEl: '.swiper-button-prev._our-works',
  },
});

var lamps = new Swiper('.lamp-slider', {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: '.swiper-button-next._lamp',
    prevEl: '.swiper-button-prev._lamp',
  },
});

var technology = new Swiper('.technology-slider', {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: '.swiper-button-next._technology',
    prevEl: '.swiper-button-prev._technology',
  }
});

//олучаем имя картинки

function nameImg(elem) {
  let reg = /wp-content\/uploads\/([A-z]+)[0-9]+\.[A-z]+/;
  return reg.exec(elem.querySelector('.preview').src);
}

//открываем картинку на весь экран

function openView(event) {
  event = event || window.event;
  let imgView = nameImg(event.currentTarget);
  document.querySelector('.img-view__img').src = imgView[0];
  document.querySelector('.img-view').classList.add('_active');
  document.querySelector('body').classList.add('hidden');
  window[imgView[1]].autoplay.stop();
}

let viewEl = document.querySelectorAll('.swiper-slide._our-works');
for (let l = viewEl.length - 1; l >= 0; l--) {
  viewEl[l].addEventListener('click', openView);
}

let viewEl2 = document.querySelectorAll('.swiper-slide._technology');
for (let l = viewEl2.length - 1; l >= 0; l--) {
  viewEl2[l].addEventListener('click', openView);
}

let viewEl3 = document.querySelectorAll('.invoices__item');
for (let l = viewEl3.length - 1; l >= 0; l--) {
  viewEl3[l].addEventListener('click', openView);
}

function closeView(event) {
  event = event || window.event;

  document.querySelector('.img-view').classList.remove('_active');
  document.querySelector('body').classList.remove('hidden');
}

document.querySelector('.img-view__bg').addEventListener('click', closeView);


function feedback(event) {
  event = event || window.event;

  let btn = event.currentTarget;
  let reg = /[0-9]+$/;
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
  if (name.length > 1 && phone.length >= 10) {
    xhttp.open("GET", "wp-content/themes/mesmerize/single.php?name=" + name + "&phone=" + phone + "&r=" + Math.random(), true);
    xhttp.send();
  }
}

let feedback_b = document.querySelectorAll(".feedback__button");
for (let l = feedback_b.length - 1; l >= 0; l--) {
  feedback_b[l].addEventListener('click', feedback);
}

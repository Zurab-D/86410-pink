/**
* Отправка формы по AJAX
*/
/*(function () {
  var form = document.querySelector("#form");
  if (!("FormData" in window) || (!form)) {
    return;
  }
  var urlBase = "https://echo.htmlacademy.ru/adaptive&";
  var successDlg = document.querySelector(".success");

  // запрашиваем по Ajax
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    request(data, urlBase, function (response) {
      console.log("server response: \"" + response+"\"");
    })
  });

  // функция запроса по Ajax
  function request (dataQS, url, func) {
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();
    var url = urlBase + time;
    xhr.open("post", url);
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        func(xhr.responseText);
      };
    });
    xhr.send(dataQS);

    showSuccessDlg();
  };



  // функция показа диалога успеха
  function showSuccessDlg() {
    showOverlay();
    !!successDlg && successDlg.classList.remove("success--hidden");
  };
  // функция закрытия диалога успеха
  function hideSuccessDlg() {
    !!successDlg && successDlg.classList.add("success--hidden");
    hideOverlay();
  };
})();*/
//---------------------------------------------------------------------------



/**
* Обработка кнопок, переключателей и пр.
*/
(function () {
  "use strict";
  var
    DIRECTION_LEFT = 0,
    DIRECTION_RIGHT = 1,
    priceSwitch = document.querySelector(".switch--prices"),
    priceSwitchLabels = !!priceSwitch && priceSwitch.querySelectorAll(".switch__label"),
    menuBtn = document.querySelector("#menu_btn"),
    successDlg = document.querySelector(".success"),
    successBtnClose = document.querySelector(".success__btn"),
    //formBtnSubmit = document.querySelector(".submit__btn"),
    daysCount = document.querySelector("#days_count"),
    daysCountMinus = document.querySelector("#days_count_minus"),
    daysCountPlus = document.querySelector("#days_count_plus"),
    personsCount = document.querySelector("#persons_count"),
    personsCountMinus = document.querySelector("#persons_count_minus"),
    personsCountPlus = document.querySelector("#persons_count_plus"),
    sliderReviewArrowLeft = document.querySelector(".slider-review__arrow--left"),
    sliderReviewArrowRight = document.querySelector(".slider-review__arrow--right")
  ;



  // показать полупрозрачную вуаль
  function showOverlay() {
    document.querySelector("body").classList.add("show-overlay");
  };
  // скрыть полупрозрачную вуаль
  function hideOverlay() {
    document.querySelector("body").classList.remove("show-overlay");
  };



  // обработчик переключателей слайдера
  function switchItemsListener(self) {
    var tablePrice = document.querySelector(".prices__table");
    if (!!tablePrice) {
      removePriceSwitchClasses();
      tablePrice.classList.add(self.id);
      self.parentNode.classList.add("switch__item--active");

      // удаляем пометки (классы) активности у таблицы и у переключателей слайдера цен
      function removePriceSwitchClasses() {
        var priceSwitchItems = !!priceSwitch && priceSwitch.querySelectorAll(".switch__item");
        tablePrice.className = "prices__table";
        for (var i = 0; i < priceSwitchItems.length; i++) {
          priceSwitchItems[i].classList.remove("switch__item--active");
        }
      }
    }
  }



  // назначаем обработчики переключателям слайдера цен
  if (!!priceSwitchLabels) {
    for (var i = 0; i < priceSwitchLabels.length; i++) {
      priceSwitchLabels[i].addEventListener("click", function(event) {
        event.preventDefault();
        switchItemsListener(this);
      })
  }};



  // спрятать / показать мобильное меню
  !!menuBtn && menuBtn.addEventListener("click", function(event){
    var nav = document.querySelector(".nav");
    event.preventDefault();
    nav.classList.toggle("nav--expand");
    menuBtn.classList.toggle("menu-btn--close");
    document.querySelector("body").classList.toggle("show-overlay");
  });



  // функция показа диалога успеха
  function showSuccessDlg() {
    showOverlay();
    !!successDlg && successDlg.classList.remove("success--hidden");
  };
  // функция закрытия диалога успеха
  function hideSuccessDlg() {
    !!successDlg && successDlg.classList.add("success--hidden");
    hideOverlay();
  };



  // показать диалог успеха
  /*!!formBtnSubmit && formBtnSubmit.addEventListener("click", function(event) {
    event.preventDefault();
    showSuccessDlg();
  });*/
  // закрыть диалог успеха
  !!successBtnClose && successBtnClose.addEventListener("click", function(event) {
    event.preventDefault();
    hideSuccessDlg();
  });



  // увеличить значение поля input.value
  function inputValueInc(input) {
    if (!!input) {
      var sum = parseInt(input.value);
      !!sum || sum === 0 ? sum = sum + 1 : null;
      !!sum ? input.value = sum : null;
    }
  };
  // уменьшить значение поля input.value
  function inputValueDec(input) {
    if (!!input) {
      var sum = parseInt(input.value);
      !!sum ? sum = sum - 1 : null;
      !!sum || sum === 0 ? input.value = sum : null;
    }
  };



  // количество дней - минус
  !!daysCountMinus && daysCountMinus.addEventListener("click", function(event) {
    event.preventDefault();
    inputValueDec(daysCount);
  });
  // количество дней - плюс
  !!daysCountPlus && daysCountPlus.addEventListener("click", function(event) {
    event.preventDefault();
    inputValueInc(daysCount);
  });



  // количество попутчиков - минус
  !!personsCountMinus && personsCountMinus.addEventListener("click", function(event) {
    event.preventDefault();
    inputValueDec(personsCount);
  });
  // количество попутчиков - плюс
  !!personsCountPlus && personsCountPlus.addEventListener("click", function(event) {
    event.preventDefault();
    inputValueInc(personsCount);
  });



  // индекс предыдущей страницы слайдера
  function getSliderPrevIndex (currentIndex, sliderItemCount) {
    currentIndex = currentIndex - 1;
    if (currentIndex < 0) {currentIndex = sliderItemCount - 1}
    return currentIndex;
  };
  // индекс следующей страницы слайдера
  function getSliderNextIndex(currentIndex, sliderItemCount) {
    return (currentIndex + 1) % sliderItemCount;
  };



  // процедура сдвига слайдера на input[type=radio] - вправо
  // direction: DIRECTION_LEFT, DIRECTION_RIGHT; default value: DIRECTION_LEFT
  function switchSlider (switchClassSelector, direction) {
    var switches = document.querySelectorAll(switchClassSelector);
    if (direction === undefined) {
      direction = DIRECTION_LEFT;
    };
    for (var i = 0; i < switches.length; i++) {
      if (switches[i].checked) {
        var newIndex;
        direction === DIRECTION_LEFT ?
          newIndex = getSliderPrevIndex(i, 3) :
          newIndex = getSliderNextIndex(i, 3)
        ;
        switches[newIndex].checked = 1;
        return newIndex;
      }
    }
  };



  // слайдер slider-review - влево
  !!sliderReviewArrowLeft && sliderReviewArrowLeft.addEventListener("click", function(event) {
    event.preventDefault();
    switchSlider(".switch__radio", DIRECTION_LEFT);
  });
  // слайдер slider-review - вправо
  !!sliderReviewArrowRight && sliderReviewArrowRight.addEventListener("click", function(event) {
    event.preventDefault();
    switchSlider(".switch__radio", DIRECTION_RIGHT);
  });



  // === Отправка формы по AJAX ======================================
  var form = document.querySelector("#form");
  if (!("FormData" in window) || (!form)) {
    return;
  }
  var urlBase = "https://echo.htmlacademy.ru/adaptive&";

  // запрашиваем по Ajax
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    request(data, urlBase, function (response) {
      console.log("server response: \"" + response+"\"");
    })
  });

  // функция запроса по Ajax
  function request (dataQS, url, func) {
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();
    var url = urlBase + time;
    xhr.open("post", url);
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        func(xhr.responseText);
      };
    });
    xhr.send(dataQS);

    showSuccessDlg();
  };

}());

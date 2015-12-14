/*** Общие функции ************************************************************/
(function () {
  "use strict";
  var
    DIRECTION_LEFT = 0,
    DIRECTION_RIGHT = 1,
    pink = function () {},
    successDlg = document.querySelector(".success")
  ;


  // функция показа полупрозрачной вуали
  pink.showOverlay = function () {
    document.querySelector("body").classList.add("show-overlay");
  };
  // функция скрытия полупрозрачной вуали
  pink.hideOverlay = function () {
    document.querySelector("body").classList.remove("show-overlay");
  };


  // функция показа диалога успеха
  pink.showSuccessDlg = function () {
    !!successDlg && successDlg.classList.remove("success--hidden");
    pink.showOverlay();
  };
  // функция закрытия диалога успеха
  pink.hideSuccessDlg = function () {
    !!successDlg && successDlg.classList.add("success--hidden");
    pink.hideOverlay();
  };


  // функция увеличения значения поля input.value
  pink.inputValueInc = function (input) {
    if (!!input) {
      var sum = parseInt(input.value);
      !!sum || sum === 0 ? sum = sum + 1 : null;
      !!sum ? input.value = sum : null;
    }
  };
  // функция уменьшения значения поля input.value
  pink.inputValueDec = function (input) {
    if (!!input) {
      var sum = parseInt(input.value);
      !!sum ? sum = sum - 1 : null;
      !!sum || sum === 0 ? input.value = sum : null;
    }
  };


  // функция получения индекса предыдущей страницы слайдера
  pink.getSliderPrevIndex = function (currentIndex, sliderItemCount) {
    currentIndex = currentIndex - 1;
    if (currentIndex < 0) {currentIndex = sliderItemCount - 1}
    return currentIndex;
  };
  // функция получения индекса следующей страницы слайдера
  pink.getSliderNextIndex = function (currentIndex, sliderItemCount) {
    return (currentIndex + 1) % sliderItemCount;
  };


  // функция переключения радио-инпутов (для сдвига слайдера на инпутах - input[type=radio] )
  // direction: DIRECTION_LEFT, DIRECTION_RIGHT; default value: DIRECTION_LEFT
  pink.switchSlider = function (switchClassSelector, direction) {
    var switches = document.querySelectorAll(switchClassSelector);
    if (direction === undefined) {
      direction = pink.DIRECTION_LEFT;
    };
    for (var i = 0; i < switches.length; i++) {
      if (switches[i].checked) {
        var newIndex;
        direction === pink.DIRECTION_LEFT ?
          newIndex = pink.getSliderPrevIndex(i, 3) :
          newIndex = pink.getSliderNextIndex(i, 3)
        ;
        switches[newIndex].checked = 1;
        return newIndex;
      }
    }
  };


  window.pink = pink;
  return pink;
}());
//------------------------------------------------------------------------------





/*** Обработка кнопок, переключателей и пр. ***********************************/
(function () {
  "use strict";
  var
    menuBtn = document.querySelector("#menu_btn"),
    priceSwitch = document.querySelector(".switch--prices"),
    priceSwitchLabels = !!priceSwitch && priceSwitch.querySelectorAll(".switch__label"),
    //successDlg = document.querySelector(".success"),
    successBtnClose = document.querySelector(".success__btn"),
    //formBtnSubmit = document.querySelector(".submit__btn"),
    sliderReviewArrowLeft = document.querySelector(".slider-review__arrow--left"),
    sliderReviewArrowRight = document.querySelector(".slider-review__arrow--right")
  ;



  // спрятать / показать мобильное меню
  !!menuBtn && menuBtn.addEventListener("click", function(event){
    var nav = document.querySelector(".nav");
    event.preventDefault();
    nav.classList.toggle("nav--expand");
    menuBtn.classList.toggle("menu-btn--close");
    document.querySelector("body").classList.toggle("show-overlay");
  });



  // слайдер slider-review - влево
  !!sliderReviewArrowLeft && sliderReviewArrowLeft.addEventListener("click", function(event) {
    event.preventDefault();
    pink.switchSlider(".switch__radio", pink.DIRECTION_LEFT);
  });
  // слайдер slider-review - вправо
  !!sliderReviewArrowRight && sliderReviewArrowRight.addEventListener("click", function(event) {
    event.preventDefault();
    pink.switchSlider(".switch__radio", pink.DIRECTION_RIGHT);
  });



  // обработчик переключателей слайдера цен
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



  // показать диалог успеха
  /*!!formBtnSubmit && formBtnSubmit.addEventListener("click", function(event) {
    event.preventDefault();
    pink.showSuccessDlg();
  });*/
  // закрыть диалог успеха
  !!successBtnClose && successBtnClose.addEventListener("click", function(event) {
    event.preventDefault();
    pink.hideSuccessDlg();
  });

}());
//------------------------------------------------------------------------------





/*** Отправка формы по AJAX ***************************************************/
(function () {
  var form = document.querySelector("#form");
  if (!("FormData" in window) || (!form)) {
    return;
  }
  var urlBase = "https://echo.htmlacademy.ru/adaptive&",
      successDlg = document.querySelector(".success")
  ;

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
    var
      xhr = new XMLHttpRequest(),
      time = (new Date()).getTime(),
      url = urlBase + time;
    xhr.open("post", url);
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        func(xhr.responseText);
      };
    });
    xhr.send(dataQS);

    pink.showSuccessDlg();
  };
})();
//------------------------------------------------------------------------------





/*** Количество дней ***********************************************************/
(function () {
  "use strict";
  var
    daysCount = document.querySelector("#days_count"),
    daysCountMinus = document.querySelector("#days_count_minus"),
    daysCountPlus = document.querySelector("#days_count_plus")
  ;
  // количество дней - минус
  !!daysCountMinus && daysCountMinus.addEventListener("click", function(event) {
    event.preventDefault();
    pink.inputValueDec(daysCount);
  });
  // количество дней - плюс
  !!daysCountPlus && daysCountPlus.addEventListener("click", function(event) {
    event.preventDefault();
    pink.inputValueInc(daysCount);
  });
  
})();
//------------------------------------------------------------------------------





/*** Попутчики ****************************************************************/
(function () {
  "use strict";
  var
    personsArea = document.querySelector(".fieldset--travelers .persons"),
    personsCount = document.querySelector("#persons_count"),
    personsCountMinus = document.querySelector("#persons_count_minus"),
    personsCountPlus = document.querySelector("#persons_count_plus")
  ;

  // количество попутчиков - плюс
  !!personsCountPlus && personsCountPlus.addEventListener("click", function(event) {
    event.preventDefault();
    addPerson();
  });

  // количество попутчиков - минус
  !!personsCountMinus && personsCountMinus.addEventListener("click", function(event) {
    event.preventDefault();
    delPerson();
  });

  // функция добавления попутчика
  function addPerson() {
    var
      templatePerson = document.querySelector("#person-template").innerHTML,
      personNum = personsArea.querySelectorAll(".fieldset--travelers .person").length + 1
    ;
    if (!!personsArea && !!templatePerson) {
      var html = Mustache.render(templatePerson, {
        "num": personNum
      });
      // добавили поля ввода
      personsArea.innerHTML = personsArea.innerHTML + html;
      // увеличили значение счетчика попутчиков
      pink.inputValueInc(personsCount);
    };
  };

  // функция удаления попутчика
  function delPerson() {
    var
      personAll = !!personsArea && personsArea.querySelectorAll(".fieldset--travelers .person"),
      elem = /*!!personAll &&*/ personAll[personAll.length-1]
    ;
    !!personAll && personsArea.removeChild(elem);
    // уменьшили значение счетчика попутчиков
    pink.inputValueDec(personsCount);
  }
}());
//------------------------------------------------------------------------------





/**** Фотографии **************************************************************/
(function () {
  var
    picsArea = document.querySelector(".pics"),
    loadFileLabel = document.querySelector(".load-file-label")
  ;
  
  !!loadFileLabel && loadFileLabel.addEventListener("click", function() {
    
  })
  
  // функция добавления фото
  function addPhoto(imgSrc, figCaption) {
    var
      templatePic = document.querySelector("#pic_template")
    ;
    if (!!picsArea && !!templatePic) {
      var html = Mustache.render(templatePic, {
        "img-src": imgSrc,
        "figcaption": figCaption
      });
      picsArea.innerHTML = picsArea.innerHTML + html;
    };
  };
}());
//------------------------------------------------------------------------------
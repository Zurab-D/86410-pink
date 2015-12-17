/*** Общие функции ************************************************************/
(function () {
  "use strict";
  var
    pink = {
      DIRECTION_LEFT: 0,
      DIRECTION_RIGHT: 1,
      successDlg: document.querySelector(".success"),
      body: document.querySelector("body"),
    }
  ;

  // функция показа полупрозрачной вуали
  pink.showOverlay = function () {
    pink.body.classList.add("show-overlay");
  };
  // функция скрытия полупрозрачной вуали
  pink.hideOverlay = function () {
    pink.body.classList.remove("show-overlay");
  };

  // функция показа диалога успеха
  pink.showSuccessDlg = function () {
    !!pink.successDlg && pink.successDlg.classList.remove("success--hidden");
    pink.showOverlay();
  };
  // функция закрытия диалога успеха
  pink.hideSuccessDlg = function () {
    !!pink.successDlg && pink.successDlg.classList.add("success--hidden");
    pink.hideOverlay();
  };

  // функция увеличения значения поля input.value
  pink.inputValueInc = function (input) {
    if (!!input) {
      var sum = parseInt(input.value);
      if (isNaN(sum)) {
        sum = 0;
      }
      input.value = sum + 1;
    }
  };
  // функция уменьшения значения поля input.value
  pink.inputValueDec = function (input) {
    if (!!input) {
      var sum = parseInt(input.value);
      if (isNaN(sum)) {
        sum = 0;
      }
      input.value = sum - 1;
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
    pink.body.classList.toggle("show-overlay");
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
    if (daysCount.value > 0) {
      event.preventDefault();
      pink.inputValueDec(daysCount);
      calcCheckoutDate();
    }
  });

  // количество дней - плюс
  !!daysCountPlus && daysCountPlus.addEventListener("click", function(event) {
    event.preventDefault();
    pink.inputValueInc(daysCount);
    calcCheckoutDate();
  });

  function calcCheckoutDate() {
    var
      checkoutDate = document.querySelector('#checkout_date'),
      checkinDate = document.querySelector('#checkin_date')
    ;
    checkoutDate.value = moment(checkinDate.value, "DD.MM.YYYY").add(daysCount.value, 'days').format("DD.MM.YYYY");
  };

  calcCheckoutDate();
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
    if (!!personsCount && personsCount.value > 0) {
      var
        personAll = !!personsArea && personsArea.querySelectorAll(".fieldset--travelers .person"),
        elem = /*!!personAll &&*/ personAll[personAll.length-1]
      ;
      !!personAll && personsArea.removeChild(elem);
      // уменьшили значение счетчика попутчиков
      pink.inputValueDec(personsCount);
    }
  }
}());
//------------------------------------------------------------------------------





/*** Отправка формы по AJAX ***************************************************/
(function () {
  var form = document.querySelector("#form");
  if (!("FormData" in window) || (!form)) {
    return;
  }
  var
    urlBase = "https://echo.htmlacademy.ru/adaptive?",
    queue = [];
  

  // запрашиваем по Ajax
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  
    var data = new FormData(form);
    
    queue.forEach(function(element) {
      data.append("images", element.file);
    });
  
    request(data, urlBase, function (response) {
      console.log("server response: \n\"" + response+"\"");
      pink.showSuccessDlg();
    });
  });

  // функция запроса по Ajax
  function request (dataQS, url, func) {
    var
      xhr = new XMLHttpRequest(),
      time = (new Date()).getTime(),
      url = url + time
    ;
  
    xhr.open("post", url);
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        func(xhr.responseText);
      };
    });
    xhr.send(dataQS);
  };

  //--- Фотографии ----------------
  if ("FileReader" in window) {
    var
      //inputFile = document.querySelector("#input_file"),
      inputFile = form.querySelector("#input_file"),
      picsArea = form.querySelector(".pics"),
      templatePic = form.querySelector("#pic_template").innerHTML
    ;

    // вешаем событие на выбор файла
    !!inputFile && inputFile.addEventListener("change", function() {
      var files = this.files;
      for (var i = 0; i < files.length; i++) {
        preview(files[i]);
      };
      this.value = "";
    });

    // функция добавления фото
    function preview(file) {
      if (file.type.match(/image.*/)) {
        var reader = new FileReader();

        reader.addEventListener("load", function(event) {
          var html = Mustache.render(templatePic, {
            "img-src": event.target.result,
            "figcaption": file.name
          });

          var li = document.createElement("li");
          li.classList.add("pics__item");
          li.innerHTML = html;
          picsArea.appendChild(li);

          li.querySelector(".pics__delete").addEventListener("click", function(event) {
            event.preventDefault();
            removePhoto(li);
          });
          queue.push({"file": file, "li": li});
        });

        reader.readAsDataURL(file);
      };
    };

    // функция удаления фото
    function removePhoto(li) {
      queue = queue.filter(function(element) {
        return element.li != li;
      });
      li.parentNode.removeChild(li);
    };
  };
}());
//------------------------------------------------------------------------------

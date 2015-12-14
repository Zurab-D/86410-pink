(function () {
  "use strict";
  var
    priceSwitch = document.querySelector(".switch--prices"),
    priceSwitchItems = !!priceSwitch && priceSwitch.querySelectorAll(".switch__item"),
    priceSwitchLabels = !!priceSwitch && priceSwitch.querySelectorAll(".switch__label"),
    tablePrice = document.querySelector(".prices__table"),
    nav = document.querySelector(".nav"),
    menuBtn = document.querySelector("#menu_btn"),
    successDlg = document.querySelector(".success"),
    successBtnClose = document.querySelector(".success__btn"),
    formBtnSubmit = document.querySelector(".submit__btn"),
    daysCount = document.querySelector("#days_count"),
    daysCountMinus = document.querySelector("#days_count_minus"),
    daysCountPlus = document.querySelector("#days_count_plus"),
    personsCount = document.querySelector("#persons_count"),
    personsCountMinus = document.querySelector("#persons_count_minus"),
    personsCountPlus = document.querySelector("#persons_count_plus"),
    sliderReviewArrowLeft = document.querySelector(".slider-review__arrow--left"),
    sliderReviewArrowRight = document.querySelector(".slider-review__arrow--right")
  ;



  // удаляем пометки (классы) активности у таблицы и у переключателей слайдера цен
  function removePriceSwitchClasses() {
    tablePrice.className = "prices__table";
    for (var i = 0; i < priceSwitchItems.length; i++) {
      priceSwitchItems[i].classList.remove("switch__item--active");
    }
  }



  // обработчик переключателей слайдера
  function switchItemsListener(self) {
    removePriceSwitchClasses();
    !!tablePrice && tablePrice.classList.add(self.id);
    self.parentNode.classList.add("switch__item--active");
  }



  // показать полупрозрачную вуаль
  function showOverlay() {
    document.querySelector("body").classList.add("show-overlay");
  };
  // скрыть полупрозрачную вуаль
  function hideOverlay() {
    document.querySelector("body").classList.remove("show-overlay");
  };



  // показать диалог успеха
  function showSuccessDlg(event) {
    event.preventDefault();
    showOverlay();
    !!successDlg && successDlg.classList.remove("success--hidden");
  }
  // скрыть диалог успеха
  function hideSuccessDlg(event) {
    event.preventDefault;
    !!successDlg && successDlg.classList.add("success--hidden");
    hideOverlay();
  };



  // назначаем обработчики переключателям слайдера цен
  if (!!priceSwitchLabels) {
    for (var i = 0; i < priceSwitchLabels.length; i++) {
      //!!priceSwitchLabels[i] &&
        priceSwitchLabels[i].addEventListener("click", function(event) {
        event.preventDefault();
        switchItemsListener(this);
      })
  }};



  // спрятать / показать мобильное меню
  !!menuBtn && menuBtn.addEventListener("click", function(event){
    event.preventDefault();
    nav.classList.toggle("nav--expand");
    menuBtn.classList.toggle("menu-btn--close");
    document.querySelector("body").classList.toggle("show-overlay");
  });



  // показать диалог успеха
  !!formBtnSubmit && formBtnSubmit.addEventListener("click", function(event) {
    showSuccessDlg(event);
  });
  // закрыть диалог успеха
  !!successBtnClose && successBtnClose.addEventListener("click", function(event) {
    hideSuccessDlg(event);
  });



  // увеличить значение поля input.value
  function inputValueInc(input, event) {
    if (!!input) {
      event.preventDefault();
      var sum = parseInt(input.value);
      !!sum || sum === 0 ? sum = sum + 1 : null;
      !!sum ? input.value = sum : null;
    }
  };
  // уменьшить значение поля input.value
  function inputValueDec(input, event) {
    if (!!input) {
      event.preventDefault();
      var sum = parseInt(input.value);
      !!sum ? sum = sum - 1 : null;
      !!sum || sum === 0 ? input.value = sum : null;
    }
  };



  // количество дней - минус
  !!daysCountMinus && daysCountMinus.addEventListener("click", function(event) {
    inputValueDec(daysCount, event);
  });
  // количество дней - плюс
  !!daysCountPlus && daysCountPlus.addEventListener("click", function(event) {
    inputValueInc(daysCount, event);
  });



  // количество попутчиков - минус
  !!personsCountMinus && personsCountMinus.addEventListener("click", function(event) {
    inputValueDec(personsCount, event);
  });
  // количество попутчиков - плюс
  !!personsCountPlus && personsCountPlus.addEventListener("click", function(event) {
    event.preventDefault();
    inputValueInc(personsCount, event);
  });



  // индекс предыдущей страницы слайдера
  function getSliderPrevIndex (currentIndex, sliderItemCount) {
    /*  ВОПРОС!
      Нужно ли обязательно проверять: переданы ли параметры и тип параметров?
    */
    currentIndex = currentIndex - 1;
    if (currentIndex < 0) {currentIndex = sliderItemCount - 1}
    return currentIndex;
  };
  // индекс следующей страницы слайдера
  function getSliderNextIndex(currentIndex, sliderItemCount) {
    return (currentIndex + 1) % sliderItemCount;
  };




  // процедура сдвига слайдера на radio - влево
  function sliderRadioGoLeft (switchClassSelector) {
    var switches = document.querySelectorAll(switchClassSelector);
    for (var i = 0; i < switches.length; i++) {
      if (switches[i].checked) {
        var prevIndex = getSliderPrevIndex(i, 3);
        switches[prevIndex].checked = 1;
        return prevIndex;
      }
    }
  };
  // процедура сдвига слайдера на radio - вправо
  function sliderRadioGoRight (switchClassSelector) {
    var switches = document.querySelectorAll(switchClassSelector);
    for (var i = 0; i < switches.length; i++) {
      if (switches[i].checked) {
        var nextIndex = getSliderNextIndex(i, 3);
        switches[nextIndex].checked = 1;
        return nextIndex;
      }
    }
  };




  // слайдер slider-review - влево
  !!sliderReviewArrowLeft && sliderReviewArrowLeft.addEventListener("click", function(event) {
    event.preventDefault();
    sliderRadioGoLeft(".switch__radio");
  });
  // слайдер slider-review - вправо
  !!sliderReviewArrowRight && sliderReviewArrowRight.addEventListener("click", function(event) {
    event.preventDefault();
    sliderRadioGoRight(".switch__radio");
  });
}());

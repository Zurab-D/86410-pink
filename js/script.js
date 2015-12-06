(function () {
  "use strict";
  var
    priceSwitch = document.querySelector("#price_switch"),
    priceSwitchItems = !!priceSwitch && priceSwitch.querySelectorAll(".switch__item"),
    priceSwitchLabels = !!priceSwitch && priceSwitch.querySelectorAll(".switch__label"),
    tablePrice = document.querySelector(".prices__table"),
    nav = document.querySelector(".nav"),
    menuBtn = document.querySelector("#menu_btn"),
    successDlg = document.querySelector(".success"),
    successBtnClose = document.querySelector(".success__btn"),
    formBtnSubmit = document.querySelector(".submit__btn")
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
  }
  // скрыть полупрозрачную вуаль
  function hideOverlay() {
    document.querySelector("body").classList.remove("show-overlay");
  }



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
  }



  // назначаем обработчики переключателям слайдера цен
  if (!!priceSwitchLabels) {
    for (var i = 0; i < priceSwitchLabels.length; i++) {
      !!priceSwitchLabels[i] && priceSwitchLabels[i].addEventListener("click", function(event) {
        event.preventDefault();
        switchItemsListener(this);
      })
  }}



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
}());

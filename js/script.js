(function () {
  "use strict";
  var
    priceSwitch = document.querySelector("#price_switch"),
    priceSwitchItems = !!priceSwitch && priceSwitch.querySelectorAll(".switch__item"),
    priceSwitchLabels = !!priceSwitch && priceSwitch.querySelectorAll(".switch__label"),
    tablePrice = document.querySelector("#prices_table"),
    nav = document.querySelector("#nav"),
    menuBtn = document.querySelector("#menu_btn"),
    successDlg = document.querySelector("#success"),
    successBtnClose = document.querySelector("#success_close"),
    formBtnSubmit = document.querySelector("#submit_form"),
    veil = document.querySelector("#veil");

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
    tablePrice.classList.add(self.id);
    self.parentNode.classList.add("switch__item--active");
  }

  // показать полупрозрачную вуаль
  function showVeil() {
    !!veil && veil.classList.remove("veil--hidden");
  }

  // показать диалог успеха
  function showSuccessDlg() {
    showVeil();
    !!successDlg && successDlg.classList.remove("success--hidden");
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
  });

  // закрыть диалог успеха
  !!successBtnClose && successBtnClose.addEventListener("click", function(event) {
    event.preventDefault;
    !!successDlg && successDlg.classList.add("success--hidden");
    !!veil && veil.classList.add("veil--hidden");
  });

  // показать диалог успеха
  !!formBtnSubmit && formBtnSubmit.addEventListener("click", function(event) {
    event.preventDefault();
    showSuccessDlg();
  });
}());

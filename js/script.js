(function () {
  "use strict";
  var
    pricesSwitch1 = document.querySelector("#prices__table--switch-1"),
    pricesSwitch2 = document.querySelector("#prices__table--switch-2"),
    pricesSwitch3 = document.querySelector("#prices__table--switch-3"),
    tablePrice = document.querySelector("#prices_table"),
    priceSwitch = document.querySelector("#price_switch"),
    priceSwitchLi = !!priceSwitch && priceSwitch.querySelectorAll("li"),
    nav = document.querySelector("#nav"),
    menuBtn = document.querySelector("#menu_btn"),
    successDlg = document.querySelector("#success"),
    successBtnClose = document.querySelector("#success_close"),
    formBtnSubmit = document.querySelector("#submit_form"),
    veil = document.querySelector("#veil")
  ;

  function removePriceTableSwitchClasses() {
    tablePrice.classList.remove("prices__table--switch-1");
    tablePrice.classList.remove("prices__table--switch-2");
    tablePrice.classList.remove("prices__table--switch-3");
  }

  function removePriceSwitchClasses() {
    /*priceSwitchLi.forEach(function (item, i, priceSwitchLi){
      alert(1);
      item.classList.remove("switch__item--active");
    })*/
    for (var i = 0; i < priceSwitchLi.length; i++) {
      priceSwitchLi[i].classList.remove("switch__item--active");
    }
  }

  function switchItemsListener(self) {
    removePriceTableSwitchClasses();
    tablePrice.classList.add(self.id);
    removePriceSwitchClasses();
    self.parentNode.classList.add("switch__item--active");
  }

  function showVeil() {
    !!veil && veil.classList.remove("veil--hidden");
  }

  function showSuccessDlg() {
    showVeil();
    !!successDlg && successDlg.classList.remove("success--hidden");
  }

  !!pricesSwitch1 && pricesSwitch1.addEventListener("click", function(event){
    switchItemsListener(this);
  });

  !!pricesSwitch2 && pricesSwitch2.addEventListener("click", function(event){
    switchItemsListener(this);
  });

  !!pricesSwitch3 && pricesSwitch3.addEventListener("click", function(event){
    switchItemsListener(this);
  });

  !!menuBtn && menuBtn.addEventListener("click", function(event){
    event.preventDefault();
    nav.classList.toggle("nav--expand");
    menuBtn.classList.toggle("menu-btn--close");
  });

  !!successBtnClose && successBtnClose.addEventListener("click", function(event){
    event.preventDefault;
    !!successDlg && successDlg.classList.add("success--hidden");
    !!veil && veil.classList.add("veil--hidden");
  });



  !!formBtnSubmit && formBtnSubmit.addEventListener("click", function(event){
    event.preventDefault();
    showSuccessDlg();
  });
})();

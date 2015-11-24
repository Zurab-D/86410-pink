(function () {
  var
    pricesSwitch1 = document.querySelector("#prices__table--switch-1"),
    pricesSwitch2 = document.querySelector("#prices__table--switch-2"),
    pricesSwitch3 = document.querySelector("#prices__table--switch-3"),
    tablePrice = document.querySelector("#prices_table"),
    priceSwitch = document.querySelector("#price_switch"),
    priceSwitchLi = priceSwitch.querySelectorAll("li")
  ;

  function removePriceTableSwitchClasses() {
    tablePrice.classList.remove("prices__table--switch-1");
    tablePrice.classList.remove("prices__table--switch-2");
    tablePrice.classList.remove("prices__table--switch-3");
  };

  function removePriceSwitchClasses() {
    /*priceSwitchLi.forEach(function (item, i, priceSwitchLi){
      alert(1);
      item.classList.remove("switch__item--active");
    })*/
    for (var i = 0; i < priceSwitchLi.length; i++) {
      priceSwitchLi[i].classList.remove("switch__item--active");
    }
  };

  function switchItemsListener(self) {
    removePriceTableSwitchClasses();
    tablePrice.classList.add(self.id);
    removePriceSwitchClasses();
    self.parentNode.classList.add("switch__item--active");
  }

  pricesSwitch1.addEventListener('click', function(event){
    switchItemsListener(this);
  });

  pricesSwitch2.addEventListener('click', function(event){
    switchItemsListener(this);
  });

  pricesSwitch3.addEventListener('click', function(event){
    switchItemsListener(this);
  });
})();

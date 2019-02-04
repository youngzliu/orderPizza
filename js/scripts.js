//Back end for Pizza
function Pizza(size, toppings){
  this.mySize = size,
  this.myToppings = toppings
};

Pizza.prototype.calculatePrice = function(){
  var price = 0.00;
  var toppingMultiplier = 1.00;
  if(this.mySize === "small"){
    price += 10.00;
  }
  else if (this.mySize === "medium"){
    price += 12.00;
    toppingMultiplier = 1.25;
  }
  else if(this.mySize === "large"){
    price += 14.00;
    toppingMultiplier = 1.50;
  }
  else {
    price += 16.00;
    toppingMultiplier = 1.75;
  }
  if(this.myToppings.length !== 0){
    this.myToppings.forEach(function(topping){
      price += topping.myPrice * toppingMultiplier;
    });
  }
  return price.toFixed(2);
};

Pizza.prototype.message = function(){
  var pizzaMessage = "";
  if(this.mySize === "extra large"){
    pizzaMessage += "You ordered an extra large pizza";
  }
  else{
    pizzaMessage += "You ordered a " + this.mySize + " pizza";
  }
  if(this.myToppings.length !== 0){
    pizzaMessage += " with";
    if(this.myToppings.length === 1){
      pizzaMessage += " " + this.myToppings[0].myName;
    }
    else{
      for(var i = 0; i < this.myToppings.length - 2; i++){
        pizzaMessage += " " + this.myToppings[i].myName + ",";
      };
      pizzaMessage += " " + this.myToppings[this.myToppings.length - 2].myName;
      pizzaMessage += " and " + this.myToppings[this.myToppings.length - 1].myName;
    }
  }
  pizzaMessage += ". Your total price comes out to $" + this.calculatePrice() + ".";
  return pizzaMessage;
};

//Back end for Topping
function Topping(name, price){
  this.myName = name,
  this.myPrice = price
};

//Front End
$(document).ready(function(){
  $("form#pizzaForm").submit(function(event){
    event.preventDefault();
    var toppings = [];
    $("input:checkbox[name=vegetable]:checked").each(function(){
      toppings.push(new Topping($(this).val(), 1.00));
    });
    $("input:checkbox[name=meat]:checked").each(function(){
      toppings.push(new Topping($(this).val(), 1.50));
    });
    $("input:checkbox[name=extra]:checked").each(function(){
      toppings.push(new Topping($(this).val(), 1.25));
    });
    var pizza = new Pizza($("#pizzaSize").val(), toppings);
    $("#pizzaResults").text(pizza.message());
  });
});

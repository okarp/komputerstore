//objects for different laptops
const laptopSpecs = {
  "Apple": {
      "features": "Siri voice agent, new M1 CPU",
      "price": "1500",
      "name": "Apple laptop",
      "description": "Enhance your productivity with this advanced laptop",
      "imgsrc": "images/laptop1.svg"
  },
  "Chromebook": {
      "features": "Android support, lightweight, long battery life",
      "price": "400",
      "name": "Chromebook laptop",
      "description": "Compact lightweight laptop, a perfect machine for browsing the web",
      "imgsrc": "images/laptop2.svg"
  },
  "Intel": {
      "features": "Fast laptop with support for AVX-512 instruction set",
      "price": "800",
      "name": "Intel laptop",
      "description": "A good all around machine",
      "imgsrc": "images/laptop3.svg"
  },
  "AMD": {
      "features": "Low TDP, fast multithreading",
      "price": "900",
      "name": "AMD laptop",
      "description": "Fast laptop featuring the new ZEN3 architecture APU",
      "imgsrc": "images/laptop4.svg"
  }
}

const person = {
  name: "Mr. Shopper",
  payBalance: 0,
  bankBalance: 0,
  loanAmount: 0,
  hasLoan: false
}

//a function for buying a laptop
function buyLaptop() {
  //get the laptops price
  let laptopname = document.getElementById("laptops").value;
  let results = laptopSpecs[laptopname];
  let price = results.price;
  //if user has enough money, buy the laptop and update values
  if (person.bankBalance >= price) {
      alert("Bought the laptop, enjoy!");
      person.bankBalance -= price;
      document.getElementById("bankBalance").innerHTML = "Balance " + person.bankBalance + "€";
  } else {
      alert("Not enough funds in the bank to buy the laptop.");
  }
}

//function for Selecting a laptop from the select menu.
//Updates html elements according to the laptops specs.
function selectLaptop() {
  let laptopname = document.getElementById("laptops").value;
  let results = laptopSpecs[laptopname];
  document.getElementById("laptopFeatures").innerHTML = "features: " + results.features;
  document.getElementById("laptopName").innerHTML = "name: " + results.name + "<br />";
  document.getElementById("laptopPrice").innerHTML = "price: " + results.price + "<br />";
  document.getElementById("laptopDescrpition").innerHTML = "description: " + results.description;
  document.getElementById("laptopPic").src = results.imgsrc;
}

//function for 'work' button. Increase pay amount by 100.
function increasePay() {
  person.payBalance = person.payBalance + 100;
  document.getElementById("payBalance").innerHTML = "Pay " + person.payBalance + "€";
}

//function for transfering money to bank.
function transferToBank() {
  //check if person has a loan, if so 10% of the pay goes into paying back the loan
  if (person.hasLoan) {
      let deduction = person.payBalance * 0.1;
      person.loanAmount -= deduction;
      person.bankBalance += person.payBalance * 0.9;
      person.payBalance = 0;
      //if the loan is paid off add the overflown loan amount back to bank balance.
      if (person.loanAmount < 0) {
          person.bankBalance += (person.loanAmount * -1);
          person.loanAmount = 0;
          person.hasLoan = false;
      }
      document.getElementById("bankBalance").innerHTML = "Balance " + person.bankBalance + "€";
      document.getElementById("payBalance").innerHTML = "Pay " + person.payBalance + "€";
      document.getElementById("loanAmount").innerHTML = "You owe " + person.loanAmount + "€";
  //if no active loan just update bank balance
  } else {
      person.bankBalance += person.payBalance;
      person.payBalance = 0;
      document.getElementById("bankBalance").innerHTML = "Balance " + person.bankBalance + "€";
      document.getElementById("payBalance").innerHTML = "Pay " + person.payBalance + "€";
  }
}

//function for getting a loan. Prompt user for loan amount and check if a loan can be given.
function getLoan() {
  var loanAmount = prompt("Enter loan amount");
  loanAmount = parseInt(loanAmount, 10);
  if (loanAmount > person.bankBalance * 2 || person.hasLoan) {
      alert("Can't give you loan. Either an active loan exists or requested amount is too big.");
  } else {
      person.loanAmount = loanAmount;
      person.hasLoan = true;
      person.bankBalance += loanAmount;
      document.getElementById("bankBalance").innerHTML = "Balance " + person.bankBalance + "€";
      document.getElementById("loanAmount").innerHTML = "You owe " + loanAmount + "€";
      //set payback loan button visible if a loan was given
      document.getElementById("payBackButton").style.visibility = "visible";
  }
}

//function for paying back the loan without depositing to the bank account.
function payBackLoan() {
  //if the loan is smaller than users pay balance -- pay back the loan and keep the rest in pay balance.
  if (person.loanAmount <= person.payBalance) {
      person.payBalance -= person.loanAmount;
      person.loanAmount = 0;
      person.hasLoan = false;
      document.getElementById("payBalance").innerHTML = "Pay " + person.payBalance + "€";      
      document.getElementById("loanAmount").innerHTML = "You owe " + person.loanAmount + "€";      
      document.getElementById("payBackButton").style.visibility = "hidden";
  } else {
      person.loanAmount -= person.payBalance;
      person.payBalance = 0;
      document.getElementById("payBalance").innerHTML = "Pay " + person.payBalance + "€";
      document.getElementById("loanAmount").innerHTML = "You owe " + person.loanAmount + "€";
  }
}
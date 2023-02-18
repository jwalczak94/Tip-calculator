"use strict";
// tips values - BUTTONS %
const btnTips = document.querySelectorAll(".tip");

// elements
const btnReset = document.querySelector(".btn-reset");

const warningMessageBill = document.querySelector("#warning-bill");
const warningMessagePeople = document.querySelector("#warning-people");

// inputs containers
const peopleInput = document.querySelector("#num-people");
const billInput = document.querySelector("#bill-number");

const defaultTip = document.querySelector("#default-tip");

// inputs
const bill = document.querySelector("#bill");
const people = document.querySelector("#people");
const tip = document.querySelector(".btn-custom");

const tipAmonut = document.querySelector("#tip-total");
const totalBillPerPerson = document.querySelector("#total");

let tipValue = 0;

// BUTTONS - TIPS EVENTS
btnTips.forEach((btn) => {
  btn.addEventListener("click", function () {
    btnTips.forEach((tip) => tip.classList.remove("btn-active"));
    this.classList.add("btn-active");

    tipValue = parseFloat(btn.textContent) / 100;
    tip.value = "";
    calculate();
  });
});

// CUSTOM TIP EVENTS
tip.addEventListener("input", function () {
  if (tip.value >= 0) {
    tipValue = tip.value / 100;
    tip.classList.remove("warning-input");
    calculate();
  } else if (tip.value < 0) {
    tip.classList.add("warning-input");
  } else {
    tipValue = 0;
    calculate();
  }

  btnTips.forEach((btn) => {
    btn.classList.remove("btn-active");
  });
});

tip.addEventListener("focusout", function () {
  if (!tip.value) {
    defaultTip.classList.add("btn-active");
  }
});

tip.addEventListener("click", function () {
  tipValue = 0;
  calculate();

  btnTips.forEach((btn) => {
    btn.classList.remove("btn-active");
  });
});

// INPUTS EVENTS
bill.addEventListener("input", calculate);
people.addEventListener("input", calculate);

// RESET BUTTONS
btnReset.addEventListener("click", function () {
  tipAmonut.textContent = "$0";
  totalBillPerPerson.textContent = "$0";

  bill.value = "";
  people.value = "";

  btnTips.forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  defaultTip.classList.add("btn-active");
  resetStyles();
});

// CALCULATOR LOGIC
function calculate() {
  const billValue = bill.value;
  const numPeople = people.value;

  if (validateInputs(billValue, numPeople)) {
    resetStyles();

    const totalTip = (billValue * tipValue) / numPeople;
    const totalBill = billValue / numPeople + totalTip;

    tipAmonut.textContent = `$${totalTip.toFixed(2)}`;
    totalBillPerPerson.textContent = `$${totalBill.toFixed(2)}`;

    btnReset.classList.add("btn-reset-active");
  } else {
    tipAmonut.textContent = `$0`;
    totalBillPerPerson.textContent = `$0`;
  }
}

// INPUTS VALIDATION
function validateInputs(billValue, numPeople) {
  if (billValue && billValue <= 0) {
    warningMessageBill.classList.remove("hidden");
    billInput.classList.add("warning-input");
  }

  if (numPeople && numPeople <= 0) {
    warningMessagePeople.classList.remove("hidden");
    peopleInput.classList.add("warning-input");
  }
  console.log(numPeople > 0 && billValue > 0);
  return numPeople > 0 && billValue > 0;
}

// DEFAULT STYLE FOR INPUTS&BUTTONS
function resetStyles() {
  warningMessageBill.classList.add("hidden");
  billInput.classList.remove("warning-input");
  warningMessagePeople.classList.add("hidden");
  peopleInput.classList.remove("warning-input");
}

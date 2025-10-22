"use strict";

const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const numPeopleInput = document.getElementById("numPeople");
const calcBtn = document.getElementById("Calculate");
const resultsContainer = document.querySelector(".results");
const errMsg = document.getElementById("error-msg");
const themeBtnDark = document.querySelector(".themeBtn.dark");
const themeBtnLight = document.querySelector(".themeBtn.light");
const container = document.querySelector(".container");
const body = document.dody;

calcBtn.addEventListener("click", function () {
  const billAmount = parseFloat(billInput.value);
  const tipPercentage = parseFloat(tipInput.value);
  const numPeople = parseInt(numPeopleInput.value);

  if (isNaN(billAmount) || isNaN(tipPercentage) || billAmount === 0) {
    billInput.value = "";
    tipInput.value = "";
    numPeopleInput.value = "";
    resultsContainer.innerHTML = "";
    errMsg.classList.remove("hidden");
    return;
  }

  const tipAmount = billAmount * (tipPercentage / 100);
  const totalAmount = billAmount + tipAmount;
  const perPerson = totalAmount / numPeople;

  const html = `
  <div class="result-row">
          <p id="tip-amount">Tip Amount:</p>
          <div class="result-square" id="tip-square">${tipAmount}</div>
        </div>
        <div class="result-row">
          <p id="total-amount">Total Amount:</p>
          <div class="result-square" id="total-square">${totalAmount}</div>
        </div>
        <div class="result-row">
          <p id="per-person">Per Person:</p>
          <div class="result-square" id="person-square">${
            isFinite(perPerson) || !isNaN(perPerson)
              ? perPerson.toFixed(2)
              : "--"
          }</div>
  </div>`;

  //   console.log(
  //     billAmount,
  //     tipPercentage,
  //     numPeople,
  //     tipAmount,
  //     totalAmount,
  //     perPerson
  //   );

  resultsContainer.innerHTML = "";
  errMsg.classList.add("hidden");
  resultsContainer.insertAdjacentHTML("afterbegin", html);
  billInput.value = "";
  tipInput.value = "";
  numPeopleInput.value = "";
});

[themeBtnDark, themeBtnLight].forEach((btn, i, arr) => {
  btn.addEventListener("click", function () {
    // if (i === 0) {
    //   arr[0].classList.add("hidden");
    //   arr[1].classList.remove("hidden");
    // } else {
    //   arr[1].classList.add("hidden");
    //   arr[0].classList.remove("hidden");
    // }
    themeBtnDark.classList.toggle("hidden");
    themeBtnLight.classList.toggle("hidden");

    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");
  });
});

"use strict";

const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const numPeopleInput = document.getElementById("numPeople");
const calcBtn = document.getElementById("Calculate");
const resultsContainer = document.querySelector(".results");
const errMsg = document.getElementById("error-msg");
const themeBtn = document.querySelector(".themeBtn");
const themeIcon = document.querySelector(".theme-icon");
const container = document.querySelector(".container");
const body = document.body;

//apply saved theme on laod
window.addEventListener("load", function () {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeIcon.textContent = savedTheme === "dark" ? "light_mode" : "brightness_2";
});

// window.addEventListener("load", () => {
//   const savedTheme = localStorage.getItem("theme");
//   if (savedTheme === "dark") {
//     container.classList.add("dark-theme");
//     container.classList.remove("light-theme");
//     themeIcon.textContent = "light_mode";
//   } else {
//     container.classList.add("light-theme");
//     container.classList.remove("dark-theme");
//     themeIcon.textContent = "brightness_2";
//   }
// });

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

  resultsContainer.innerHTML = "";
  errMsg.classList.add("hidden");
  resultsContainer.insertAdjacentHTML("afterbegin", html);
  billInput.value = "";
  tipInput.value = "";
  numPeopleInput.value = "";
});

themeBtn.addEventListener("click", function () {
  // getting the cuurent and new theme
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  console.log(currentTheme, newTheme);
  // changing the data attribute to the new theme
  document.documentElement.setAttribute("data-theme", newTheme);
  //setting the local storage
  localStorage.setItem("theme", newTheme);
  // toggling the icon
  themeIcon.textContent = newTheme === "dark" ? "light_mode" : "brightness_2";
});

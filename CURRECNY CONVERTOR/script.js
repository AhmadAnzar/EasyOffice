document
.getElementById("convertBtn")
.addEventListener("click", function () {
  const amount = parseFloat(document.getElementById("amt").value);
  const currencyFrom = document.getElementById("from").value;
  const currencyTo = document.getElementById("to").value;

  if (isNaN(amount)) {
    alert("Please enter a valid amount");
    return;
  }

  const exchangeRates = {
    USD: { EUR: 0.85, GBP: 0.75, INR: 74.5 },
    EUR: { USD: 1.18, GBP: 0.88, INR: 87.5 },
    GBP: { USD: 1.33, EUR: 1.14, INR: 99.5 },
    INR: { USD: 0.013, EUR: 0.011, GBP: 0.01 },
  };

  // Conversion logic
  if (currencyFrom === currencyTo) {
    document.getElementById("resultContainer").innerHTML =
      "No conversion needed (same currencies selected).";
  } else {
    const rate = exchangeRates[currencyFrom][currencyTo];
    const convertedAmount = (amount * rate).toFixed(2);
    document.getElementById(
      "resultContainer"
    ).innerHTML = `Converted Amount is : ${convertedAmount} ${currencyTo}`;
  }
});
window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const defaultValues = {
    principle: 115000,
    years: 30,
    rate: 7.5
  };



  const calcUI = {
    amountUI: document.getElementById("loan-amount"),
    termUI: document.getElementById("loan-years"),
    rateUI: document.getElementById("loan-rate")
  };

  calcUI.amountUI.value = defaultValues.principle;
  calcUI.termUI.value = defaultValues.years;
  calcUI.rateUI.value = defaultValues.rate;

  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const uiValues = getCurrentUIValues();
  const monthlyPayment = calculateMonthlyPayment(uiValues);
  updateMonthly(monthlyPayment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const parameters = {
    p: values.amount,
    i: (values.rate / 100) / 12,
    n: values.years * 12
  };

  return ((parameters.p * parameters.i) / (1 - (1 + (parameters.i))**(-1 * parameters.n))).toFixed(2);

}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyUI = document.getElementById("monthly-payment");
  monthlyUI.innerText = `$${monthly}`
}

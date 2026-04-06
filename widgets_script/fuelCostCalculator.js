document.addEventListener('DOMContentLoaded', function () {
  // Get all input elements
  const distanceInput = document.getElementById('distance');
  const consumptionInput = document.getElementById('fuel-consumption');
  const priceInput = document.getElementById('fuel-price');
  const currencySelect = document.getElementById('currency');
  const calculateBtn = document.getElementById('calculate');

  // Get all result elements
  const costResult = document.getElementById('cost-result');
  const resultDistance = document.getElementById('result-distance');
  const fuelNeeded = document.getElementById('fuel-needed');
  const consumptionRate = document.getElementById('consumption-rate');
  const pricePerGallon = document.getElementById('price-per-gallon');
  const costPerMile = document.getElementById('cost-per-mile');

  // Calculate function
  function calculateFuelCost() {
    const distance = parseFloat(distanceInput.value);
    const consumption = parseFloat(consumptionInput.value);
    const price = parseFloat(priceInput.value);
    const currency = currencySelect.value;

    // Validate Inputs
    if (
      isNaN(distance) ||
      isNaN(consumption) ||
      isNaN(price) ||
      distance <= 0 ||
      consumption <= 0 ||
      price <= 0
    ) {
      alert('Please enter valid values for all fields!');
      return;
    }

    // Perform calculation
    const fuelRequired = distance / consumption;
    const totalCost = fuelRequired * price;
    const perMileCost = totalCost / distance;

    // Update results
    costResult.textContent = `${currency}${totalCost.toFixed(2)}`;
    resultDistance.textContent = distance;
    fuelNeeded.textContent = fuelRequired.toFixed(2);
    consumptionRate.textContent = consumption;
    pricePerGallon.textContent = `${currency}${price.toFixed(2)}`;
    costPerMile.textContent = `${currency}${perMileCost.toFixed(2)}`;
  }

  // Event listeners
  calculateBtn.addEventListener('click', calculateFuelCost);

  // Also recalculate when any input changes
  distanceInput.addEventListener('input', calculateFuelCost);
  consumptionInput.addEventListener('input', calculateFuelCost);
  priceInput.addEventListener('input', calculateFuelCost);
  currencySelect.addEventListener('input', calculateFuelCost);

  // Initial calculation
  calculateFuelCost();

  // Update year in footer
  function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');

    if (!yearElement) {
      console.error('Year element not found');
      return;
    }

    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.textContent = currentYear.toString();
  }
  updateYear();
});

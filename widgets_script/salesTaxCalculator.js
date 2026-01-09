// DOM Elements
const amountInput = document.getElementById('amount');
const taxRateSlider = document.getElementById('tax-rate');
const taxRateValue = document.getElementById('tax-rate-value');
const taxRateAmount = document.getElementById('tax-rate-amount');
const taxPresets = document.querySelectorAll('.tax-preset');
const locationInput = document.getElementById('location');
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');

// Result elements
const subtotalDisplay = document.getElementById('subtotal');
const taxRateDisplay = document.getElementById('tax-rate-display');
const taxAmountDisplay = document.getElementById('tax-amount');
const totalAmountDisplay = document.getElementById('total-amount');

// Chart bars
const subtotalBar = document.getElementById('subtotal-bar');
const taxBar = document.getElementById('tax-bar');
const totalBar = document.getElementById('total-bar');

// DOM Elements
const dataInput = document.getElementById('dataInput');
const calculateBtn = document.getElementById('calculateBtn');
const clearBtn = document.getElementById('clearBtn');
const exampleBtn = document.getElementById('exampleBtn');
const resultsContainer = document.getElementById('resultsContainer');
const historyContainer = document.getElementById('historyContainer');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const notification = document.getElementById('notification');
const calculateProbBtn = document.getElementById('calculateProbBtn');
const probabilityResult = document.getElementById('probabilityResult');
const dataChart = document.getElementById('dataChart');

// Sample data for example
const sampleData = [12, 15, 18, 22, 24, 27, 30, 32, 35, 40, 42, 45, 48, 50, 52, 55, 58, 60, 62, 65];

// Initialize Chart.js
let chart = null;

// Event listeners
calculateBtn.addEventListener('click', calculateStatistics);
clearBtn.addEventListener('click', clearData);
exampleBtn.addEventListener('click', loadExample);
calculateProbBtn.addEventListener('click', calculateProbability);

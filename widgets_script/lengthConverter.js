const inputBox = document.getElementById('input-box');
const resultBox = document.getElementById('result-box');
const inputCategory = document.getElementById('inputCategory');
const resultCategory = document.getElementById('resultCategory');
const allClearBtn = document.querySelector('button');

const conversionFactors = {
	meter: {
		kilometer: 0.001,
		meter: 1,
		centimeter: 100,
		millimeter: 1000,
		micrometer: 1000000,
		nanometer: 1000000000,
		mile: 0.000621371,
		nauticalMile: 0.000539957,
		yard: 1.09361,
		foot: 3.28084,
		inch: 39.3701,
	},
	kilometer: {
		kilometer: 1,
		meter: 1000,
		centimeter: 100000,
		millimeter: 1000000,
		micrometer: 1000000000,
		nanometer: 1000000000000,
		mile: 0.621371,
		nauticalMile: 0.539957,
		yard: 1093.61,
		foot: 3280.84,
		inch: 39370.1,
	},
	centimeter: {
		kilometer: 0.00001,
		meter: 0.01,
		centimeter: 1,
		millimeter: 10,
		micrometer: 10000,
		nanometer: 10000000,
		mile: 0.00000621371,
		nauticalMile: 0.00000539957,
		yard: 0.0109361,
		foot: 0.0328084,
		inch: 0.393701,
	},
	mile: {
		kilometer: 1.60934,
		meter: 1609.34,
		centimeter: 160934,
		millimeter: 1609340,
		micrometer: 1609340000,
		nanometer: 1609340000000,
		mile: 1,
		nauticalMile: 1.15078,
		yard: 1760,
		foot: 5280,
		inch: 63360,
	},
	nauticalMile: {
		kilometer: 1.852,
		meter: 1852,
		centimeter: 185200,
		millimeter: 1852000,
		micrometer: 1852000000,
		nanometer: 1852000000000,
		mile: 1.15078,
		nauticalMile: 1,
		yard: 2025.37,
		foot: 6076.12,
		inch: 72913.440001417,
	},
	yard: {
		kilometer: 0.0009144,
		meter: 0.9144,
		centimeter: 91.44,
		millimeter: 914.4,
		micrometer: 914400,
		nanometer: 914400000,
		mile: 0.000568182,
		nauticalMile: 0.000539957,
		yard: 1,
		foot: 3,
		inch: 36,
	},
	foot: {
		kilometer: 0.0003048,
		meter: 0.3048,
		centimeter: 30.48,
		millimeter: 304.8,
		micrometer: 304800,
		nanometer: 304800000,
		mile: 0.000189394,
		nauticalMile: 0.000164579,
		yard: 0.33333,
		foot: 1,
		inch: 12,
	},
	inch: {
		kilometer: 0.0000254,
		meter: 0.0254,
		centimeter: 2.54,
		millimeter: 25.4,
		micrometer: 25400,
		nanometer: 25400000,
		mile: 0.0000157828,
		nauticalMile: 0.0000137149,
		yard: 0.027778,
		foot: 0.083333,
		inch: 1,
	},
};

inputBox.addEventListener('input', updateResult);
inputCategory.addEventListener('change', updateResult);
resultCategory.addEventListener('change', updateResult);
allClearBtn.addEventListener('click', clearInputs);

function updateResult() {
	const inputValue = parseFloat(inputBox.value);
	const inputCategoryVal = inputCategory.value;
	const resultCategoryVal = resultCategory.value;

	const conversionFactor =
		conversionFactors[inputCategoryVal][resultCategoryVal];

    resultBox.value = isNaN(inputValue) ? '' : inputValue * conversionFactor;

    if (inputBox.value <= 0) {
        alert('Invalid Input, enter only positive number');
        inputBox.value = '';
		resultBox.value = '';
    }
}

function clearInputs() {
    inputBox.value = '';
    resultBox.value = '';
}

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;
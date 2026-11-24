const shapeSelector = document.getElementById('shape');
const inputFields = document.getElementById('inputFields');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('result');
const shapeFormula = document.getElementById('shapeFormula');

// Shape formulas
const shapeData = {
  sphere: {
    formula: 'V = (4/3)πr³',
  },
  cone: {
    formula: 'V = (1/3)πr²h',
  },
  cube: {
    formula: 'V = a³',
  },
  cylinder: {
    formula: 'V = πr²h',
  },
  'rectangular-tank': {
    formula: 'V = l × w × h',
  },
  capsule: {
    formula: 'V = πr²((4/3)r + h)',
  },
  'spherical-cap': {
    formula: 'V = (πh²(3r - h))/6',
  },
  'conical-frustum': {
    formula: 'V = (1/3)πh(r1² + r2² + r1·r2)',
  },
  ellipsoid: {
    formula: 'V = (4/3)πabc',
  },
  'square-pyramid': {
    formula: 'V = (1/3)a²h',
  },
  tube: {
    formula: 'V = πh(R² - r²)',
  },
};

// function to generate input fields and formula
const updateShape = () => {
  const shape = shapeSelector.value;
  let html = '';

  switch (shape) {
    case 'sphere':
      html = `<input type="number" id="radius" placeholder="Radius (r)" min="0" step="any" required />`;
      break;
    case 'cone':
      html = `
<input type="number" id="radius" placeholder="Radius (r)" required />
<input type="number" id="height" placeholder="Height (h)" required />
`;
      break;
    case 'cube':
      html = `<input type="number" id="side" placeholder="Side Length (a)" required />`;
      break;
    case 'cylinder':
      html = `
<input type="number" id="radius" placeholder="Radius (r)" required />
<input type="number" id="height" placeholder="Height (h)" required />
`;
      break;
    case 'rectangular-tank':
      html = `
<input type="number" id="length" placeholder="Length (l)" required />
<input type="number" id="width" placeholder="Width (w)" required />
<input type="number" id="height" placeholder="Height (h)" required />
`;
      break;
    case 'capsule':
      html = `
<input type="number" id="radius" placeholder="Radius (r)" required />
<input type="number" id="height" placeholder="Height (h)" required />    
`;
      break;
    case 'spherical-cap':
      html = `
<input type="number" id="radius" placeholder="Radius (r)" required />
<input type="number" id="height" placeholder="Height (h)" required />    
`;
      break;
    case 'conical-frustum':
      html = `
<input type="number" id="radius1" placeholder="Radius 1 (r1)" required />
<input type="number" id="radius2" placeholder="Radius 2 (r2)" required />
<input type="number" id="height" placeholder="Height (h)" required />
`;
      break;
    case 'ellipsoid':
      html = `
<input type="number" id="radiusA" placeholder="Radius A (a)" required />
<input type="number" id="radiusB" placeholder="Radius B (b)" required />
<input type="number" id="radiusC" placeholder="Radius C (c)" required />
`;
      break;
    case 'square-pyramid':
      html = `
<input type="number" id="baseLength" placeholder="Base Length" required />
<input type="number" id="height" placeholder="Height (h)" required />    
`;
      break;
    case 'tube':
      html = `
<input type="number" id="outerRadius" placeholder="Outer Radius (R)" required />
<input type="number" id="innerRadius" placeholder="Inner Radius (r)" required />
<input type="number" id="height" placeholder="Height (h)" required />
`;
      break;
    default:
      html = '';
  }

  inputFields.innerHTML = html;
  shapeFormula.textContent = shapeData[shape]?.formula ?? '';
  resultDiv.textContent = '';
};

shapeSelector.addEventListener('change', updateShape);
updateShape();

// Function to calculate volume
calculateBtn.addEventListener('click', () => {
  const shape = shapeSelector.value;
  const inputs = inputFields.querySelectorAll('input');

  for (const input of inputs) {
    if (input.value.trim() === '' || !Number.isFinite(parseFloat(input.value))) {
      resultDiv.textContent = 'Please enter valid numbers.';
      input.focus();
      return;
    }

    if (parseFloat(input.value) <= 0) {
      resultDiv.textContent = 'All dimensions must be greater than zero.';
      input.focus();
      return;
    }
  }

  let volume = 0;

  switch (shape) {
    case 'sphere':
      const radiusSphere = parseFloat(document.getElementById('radius').value);
      volume = (4 / 3) * Math.PI * Math.pow(radiusSphere, 3);
      break;
    case 'cone':
      const radiusCone = parseFloat(document.getElementById('radius').value);
      const heightCone = parseFloat(document.getElementById('height').value);

      volume = (1 / 3) * Math.PI * Math.pow(radiusCone, 2) * heightCone;
      break;
    case 'cube':
      const sideCube = parseFloat(document.getElementById('side').value);
      volume = Math.pow(sideCube, 3);
      break;
    case 'cylinder':
      const radiusCylinder = parseFloat(document.getElementById('radius').value);
      const heightCylinder = parseFloat(document.getElementById('height').value);

      volume = Math.PI * Math.pow(radiusCylinder, 2) * heightCylinder;
      break;
    case 'rectangular-tank':
      const lengthTank = parseFloat(document.getElementById('length').value);
      const widthTank = parseFloat(document.getElementById('width').value);
      const heightTank = parseFloat(document.getElementById('height').value);

      volume = lengthTank * widthTank * heightTank;
      break;
    case 'capsule':
      const radiusCapsule = parseFloat(document.getElementById('radius').value);
      const heightCapsule = parseFloat(document.getElementById('height').value);

      volume = Math.PI * Math.pow(radiusCapsule, 2) * ((4 / 3) * radiusCapsule + heightCapsule);
      break;
    case 'spherical-cap':
      const radiusCap = parseFloat(document.getElementById('radius').value);
      const heightCap = parseFloat(document.getElementById('height').value);

      if (heightCap > 2 * radiusCap) {
        resultDiv.textContent = 'Cap height cannot exceed the sphere diameter.';
        return;
      }

      volume = (Math.PI * Math.pow(heightCap, 2) * (3 * radiusCap - heightCap)) / 6;
      break;
    case 'conical-frustum':
      const radius1Frustum = parseFloat(document.getElementById('radius1').value);
      const radius2Frustum = parseFloat(document.getElementById('radius2').value);
      const heightFrustum = parseFloat(document.getElementById('height').value);

      volume =
        (1 / 3) *
        Math.PI *
        heightFrustum *
        (Math.pow(radius1Frustum, 2) + Math.pow(radius2Frustum, 2) + radius1Frustum * radius2Frustum);
      break;
    case 'ellipsoid':
      const radiusA = parseFloat(document.getElementById('radiusA').value);
      const radiusB = parseFloat(document.getElementById('radiusB').value);
      const radiusC = parseFloat(document.getElementById('radiusC').value);

      volume = (4 / 3) * Math.PI * radiusA * radiusB * radiusC;
      break;
    case 'square-pyramid':
      const baseLength = parseFloat(document.getElementById('baseLength').value);
      const heightPyramid = parseFloat(document.getElementById('height').value);

      volume = (1 / 3) * Math.pow(baseLength, 2) * heightPyramid;
      break;
    case 'tube':
      const outerRadius = parseFloat(document.getElementById('outerRadius').value);
      const innerRadius = parseFloat(document.getElementById('innerRadius').value);
      const heightTube = parseFloat(document.getElementById('height').value);

      if (innerRadius >= outerRadius) {
        resultDiv.textContent = 'Inner radius must be smaller than outer radius.';
        return;
      }

      volume = Math.PI * heightTube * (Math.pow(outerRadius, 2) - Math.pow(innerRadius, 2));
      break;
    default:
      volume = 0;
  }

  resultDiv.textContent = `Volume: ${volume.toFixed(2)}`;
});

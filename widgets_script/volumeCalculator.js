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
shapeSelector.addEventListener('change', () => {
  const shape = shapeSelector.value;
  let html = '';

  switch (shape) {
    case 'sphere':
      html = `<input type="text" id="radius" placeholder="Radius (r)" required />`;
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
  shapeFormula.textContent = shapeData[shape].formula;
});

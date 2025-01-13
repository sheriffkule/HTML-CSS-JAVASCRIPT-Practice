let originalPrice = document.getElementById('originalPrice');
let discount = document.getElementById('discount');
let saveAmount = document.getElementById('saveAmount');
let finalPrice = document.getElementById('finalPrice');
let symbol = document.getElementById('symbol');
let resetBtn = document.getElementById('reset');

originalPrice.addEventListener('input', calculate);

discount.addEventListener('input', calculate);
discount.addEventListener('input', percentSymbol);

function calculate(){
    let originalVal = originalPrice.value;
    let discountValue = discount.value;

    let savedVal = originalVal * discountValue / 100;
    let finalVal = originalVal - savedVal;

    saveAmount.value = savedVal.toLocaleString('en-US');
    finalPrice.value = finalVal.toLocaleString('en-US');
}

function percentSymbol(e){
    if(e.target.value.trim() !=0){
        symbol.style.display = 'block';
    }else {
        symbol.style.display = 'none';
    }

    if(e.target.value < 10){
        symbol.style.right = '86px'
    }

    if(e.target.value > 9){
        symbol.style.right = '80px'
    }

    if(e.target.value == 10){
        symbol.style.right = '82px'
    }

    if(parseInt(e.target.value) > 100) {
        e.target.value = 100;
        calculate();
        symbol.style.right = '74px';
    }

    if(parseInt(e.target.value) < 1){
        e.target.value = 1;
        calculate();
        symbol.style.right = '86px';
    }
}

resetBtn.addEventListener('click', () => {
    symbol.style.display = 'none';
})

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;
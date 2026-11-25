document.addEventListener('DOMContentLoaded', function () {
  // Currency conversion rates (simplified for demo)
  const exchangeRates = {
    usd: { symbol: '$', rate: 1 },
    eur: { symbol: '€', rate: 0.85 },
    gbp: { symbol: '£', rate: 0.75 },
    jpy: { symbol: '¥', rate: 110 },
  };

  // Pricing data
  const pricingData = {
    basic: {
      monthly: 9,
      annual: 7.2,
    },
    pro: {
      monthly: 29,
      annual: 23.2,
    },
    enterprise: {
      monthly: 49,
      annual: 79.2,
    },
  };

  // DOM Elements
  const currencySelect = document.getElementById('currency');
  const billingToggle = document.getElementById('billing-toggle');
  const pricingCards = document.querySelectorAll('.pricing-card');
  const faqItems = document.querySelectorAll('.faq-item');

  // Current state
  let currentCurrency = 'usd';
  let isAnnual = false;

  // Initialize
  updatePrices();

  // Event listeners
  currencySelect.addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    updatePrices();
  });

  billingToggle.addEventListener('change', (e) => {
    isAnnual = e.target.checked;
    updatePrices();
    toggleAnnualPriceDisplay();
  });

  // FAQ accordion functionality
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // Hover effects for pricing cards
  pricingCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('featured')) {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      }
    });

    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('featured')) {
        card.style.transform = '';
        card.style.boxShadow = 'var(--box-shadow)';
      }
    });
  });

  // Functions
  function updatePrices() {
    const rate = exchangeRates[currentCurrency].rate;
    const symbol = exchangeRates[currentCurrency].symbol;

    pricingCards.forEach((card) => {
      const plan = card.dataset.plan;
      const priceElement = card.querySelector('.amount');
      const currencyElement = card.querySelector('.currency');
      const annualPriceElement = card.querySelector('.annual-price');

      // Updata displayed prices
      const basePrice = isAnnual ? pricingData[plan].annual : pricingData[plan].monthly;
      const convertedPrice = Math.round(basePrice * rate * 100) / 100;

      // Format price display
      Number.isInteger(convertedPrice)
        ? (priceElement.textContent = convertedPrice.toFixed(0))
        : (priceElement.textContent = convertedPrice.toFixed(2));

      currencyElement.textContent = symbol;
    });
  }

  function toggleAnnualPriceDisplay() {
    const annualPriceElement = document.querySelectorAll('.annual-price');
    const periodicElements = document.querySelectorAll('.period')

    if (isAnnual) {
      annualPriceElement.forEach(el => el.style.display = 'none')
      periodicElements.forEach(el => el.textContent = '/month')
    } else {
      annualPriceElement.forEach(el => el.style.display = 'block')
      periodicElements.forEach(el => el.textContent = '/month')
    }
  }

  // Add animation on scroll
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
    scrollMargin: "100px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0) scale(1)';
        }
    })
  }, observerOptions)

  // Animate pricing cards on scroll
  pricingCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(100px) scale(0.1)';
    card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out ${index * 0.1}s';

    observer.observe(card);
  })
});

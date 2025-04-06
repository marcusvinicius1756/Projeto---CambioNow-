// Taxas de câmbio fictícias (em produção, use uma API)
const exchangeRates = {
    USD: { BRL: 5.07, EUR: 0.92, GBP: 0.79, USD: 1 },
    BRL: { USD: 0.20, EUR: 0.18, GBP: 0.16, BRL: 1 },
    EUR: { USD: 1.09, BRL: 5.52, GBP: 0.86, EUR: 1 },
    GBP: { USD: 1.27, BRL: 6.42, EUR: 1.16, GBP: 1 }
};

// Elementos do DOM
const inputFrom = document.querySelectorAll('.currency-value')[0];
const inputTo = document.querySelectorAll('.currency-value')[1];
const selectFrom = document.querySelectorAll('.currency-select')[0];
const selectTo = document.querySelectorAll('.currency-select')[1];
const reverseBtn = document.querySelector('.icon-reversor');


let cambioChart;


function convertCurrency() {
    const fromCurrency = selectFrom.value;
    const toCurrency = selectTo.value;
    const amount = parseFloat(inputFrom.value) || 0;
    
    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = amount * rate;
    
    inputTo.value = convertedAmount.toFixed(2);
    updateChart(fromCurrency, toCurrency);
}


function reverseCurrencies() {
    const tempCurrency = selectFrom.value;
    selectFrom.value = selectTo.value;
    selectTo.value = tempCurrency;
    
    const tempValue = inputFrom.value;
    inputFrom.value = inputTo.value;
    inputTo.value = tempValue;
    
    convertCurrency();
}


function updateChart(fromCurrency, toCurrency) {
    if (!cambioChart) {
        initChart();
        return;
    }
    
   
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const baseRate = exchangeRates[fromCurrency][toCurrency];
    const historicalData = days.map((_, i) => {
        const variation = (Math.random() * 0.1 - 0.05); // Variação de ±5%
        return baseRate * (1 + variation * (i / days.length));
    });
    
    cambioChart.data.labels = days;
    cambioChart.data.datasets[0].label = `${fromCurrency} → ${toCurrency}`;
    cambioChart.data.datasets[0].data = historicalData;
    cambioChart.update();
}


function initChart() {
    const ctx = document.getElementById('cambioChart').getContext('2d');
    
    cambioChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                borderColor: '#23B6AE',
                backgroundColor: 'rgba(35, 182, 174, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const value = context.parsed.y;
                            return `1 ${selectFrom.value} = ${value.toFixed(2)} ${selectTo.value}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: (value) => value.toFixed(2)
                    }
                }
            }
        }
    });
}


inputFrom.addEventListener('input', convertCurrency);
selectFrom.addEventListener('change', convertCurrency);
selectTo.addEventListener('change', convertCurrency);
reverseBtn.addEventListener('click', reverseCurrencies);


document.addEventListener('DOMContentLoaded', () => {
    convertCurrency(); 
    initChart();      
});
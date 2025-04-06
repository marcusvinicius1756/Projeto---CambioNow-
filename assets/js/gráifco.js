
 
  const ctx = document.getElementById('cambioChart').getContext('2d');
  
 
  const cambioChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      datasets: [{
        label: 'USD → BRL',
        data: [5.10, 5.15, 5.12, 5.20, 5.18, 5.22, 5.25],
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
            label: (context) => `R$ ${context.parsed.y.toFixed(2)}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: (value) => `R$ ${value}`
          }
        }
      }
    }
  });

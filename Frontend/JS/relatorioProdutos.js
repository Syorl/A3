document.addEventListener('DOMContentLoaded', async () => {
    const ctx = document.getElementById('productChart').getContext('2d');
  
    // Fetch data from backend
    const data = await fetch('/api/produtos/relatorio')
      .then(res => res.json())
      .catch(err => console.error('Erro ao buscar dados:', err));
  
    // Prepare data for Chart.js
    const labels = data.map(produto => produto.nome);
    const quantities = data.map(produto => produto.retiradas);
  
    // Render Chart.js
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Retiradas do Estoque',
          data: quantities,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Produtos Retirados do Estoque' }
        }
      }
    });
  
    // Render Ranking
    const rankingTableBody = document.getElementById('rankingTableBody');
    data
      .sort((a, b) => b.retiradas - a.retiradas) // Sort by retiradas
      .forEach((produto, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${produto.nome}</td>
            <td>${produto.retiradas}</td>
          </tr>
        `;
        rankingTableBody.innerHTML += row;
      });
  });
  
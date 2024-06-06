document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById('graficoVendas').getContext('2d');

  // pega o localstorage de pedidos
  const dadosString = localStorage.getItem("dadosPedido");
  const pedidos = dadosString ? JSON.parse(dadosString) : [];

  // array para o total de vendas por dia do mes
  const diasNoMes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(); // pega o número de dias do mêe
  const vendasPorDia = Array(diasNoMes).fill(0);

  pedidos.forEach(pedido => {
    const data = new Date(pedido.data.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
    const dia = data.getDate();
    if (dia <= diasNoMes) {
      vendasPorDia[dia - 1] += parseFloat(pedido.valor);
    }
  });

  const labelsDias = Array.from({ length: diasNoMes }, (_, i) => i + 1);

  const dadosVendas = {
    labels: labelsDias,
    datasets: [{
      label: 'Vendas no Mês',
      data: vendasPorDia,
      backgroundColor: '#e5940e',
      borderColor: '#bb7a10',
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: dadosVendas,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              var label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += 'R$ ' + context.parsed.y.toFixed(2).replace('.', ',');
              }
              return label;
            }
          }
        }
      }
    }
  };

  new Chart(ctx, config);

  const totalVendas = pedidos.reduce((total, pedido) => total + parseFloat(pedido.valor), 0);
  const pedidosAberto = pedidos.filter(pedido => pedido.status === "Em preparo").length;
  const pedidosConcluidos = pedidos.filter(pedido => pedido.status === "Pronto").length;

  document.getElementById('total-vendas').textContent = totalVendas.toFixed(2);
  document.getElementById('pedidos-aberto').textContent = pedidosAberto;
  document.getElementById('pedidos-concluidos').textContent = pedidosConcluidos;

  // preenche tabela
  const tabelaPedidos = document.getElementById('tabela-pedidos').getElementsByTagName('tbody')[0];

  pedidos.forEach(pedido => {
    const row = tabelaPedidos.insertRow();
    row.insertCell(0).textContent = pedido.mesa;
    row.insertCell(1).textContent = pedido.pedido;
    row.insertCell(2).textContent = `R$ ${parseFloat(pedido.valor).toFixed(2)}`;
    row.insertCell(3).textContent = pedido.data;
    row.insertCell(4).textContent = pedido.status;
  });
});

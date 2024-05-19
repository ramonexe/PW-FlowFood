document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#reserva-form");
  const botaoAdicionar = document.querySelector("#botao-adicionar");

  botaoAdicionar.addEventListener("click", gravarDados);

  function formatarHorario(horario) {
    const data = new Date(horario);
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0"); // Os meses começam do 0 em JavaScript
    const ano = data.getFullYear();
    const horas = data.getHours().toString().padStart(2, "0");
    const minutos = data.getMinutes().toString().padStart(2, "0");
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  }

  function gravarDados() {
    // Recupera as reservas existentes
    const dadosString = localStorage.getItem("dadosReserva");
    const reservas = dadosString ? JSON.parse(dadosString) : [];

    
    reservas.push({
      nome: formulario.cliente.value,
      mesa: formulario.mesa.value,
      quantidade: formulario.quantidade.value,
      horario: formatarHorario(formulario.horario.value),
    });

  
    localStorage.setItem("dadosReserva", JSON.stringify(reservas));
  }

  function recuperarDados() {
    // Recupera as reservas do Local Storage
    const dadosString = localStorage.getItem("dadosReserva");
    const reservas = dadosString ? JSON.parse(dadosString) : [];

    const divReservas = document.querySelector(".div-reservas");
    const divReservasAtuais = document.querySelector(".reservas-atual");
    // Cria uma lista para cada reserva
    reservas.forEach((reserva) => {
      const listaReservas = document.createElement("ul");
      const listaReservasAtuais = document.createElement("ul");

      for (const campo in reserva) {
        const itemLista = document.createElement("li");
        itemLista.textContent = `${campo}: ${reserva[campo]}`;

        const itemListaAtual = document.createElement("li");
        itemListaAtual.textContent = `${campo}: ${reserva[campo]}`;

        listaReservas.appendChild(itemLista);
        listaReservasAtuais.appendChild(itemListaAtual);
      }

      divReservas.append(listaReservas);
      divReservasAtuais.append(listaReservasAtuais);
    });
  }
  recuperarDados();
});

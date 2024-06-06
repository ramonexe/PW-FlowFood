document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#reserva-form");
  const botaoAdicionar = document.querySelector("#botao-adicionar");

  // Recupera as reservas do Local Storage
  const dadosString = localStorage.getItem("dadosReserva");
  const reservas = dadosString ? JSON.parse(dadosString) : [];
  formulario.addEventListener("submit", gravarDados);

  const status = {
    agendada: "Agendada",
    confirmada: "Confirmada",
    cancelada: "Cancelada",
    concluida: "Concluida",
  };

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
    //atualiza a lista de reservas capturadas com os dados da nova reserva
    reservas.push({
      cliente: formulario.cliente.value,
      mesa: formulario.mesa.value,
      quantidade: formulario.quantidade.value,
      data: formatarHorario(formulario.data.value),
      status: status.agendada,
    });

    localStorage.setItem("dadosReserva", JSON.stringify(reservas));
    const reservasAgendadas = document.querySelector(".reserva-agendada");
    reservasAgendadas.innerHTML = "";
    recuperarDados();
    //limpando o formulario
    formulario.reset();
  }

  function recuperarDados() {
    //recuperando as divs da pagina
    const reservasAgendadas = document.querySelector(".reserva-agendada");
    const reservasConfirmadas = document.querySelector(".reserva-confirmada");
    const reservasCanceladas = document.querySelector(".reserva-cancelada");
    const reservasConcluidas = document.querySelector(".reserva-concluida");

    //esse sort divide a hora e a data, e ordena a data em ordem decrescente e a hora em ordem crescente
    reservas
      .sort((a, b) => {
        const [dataA, horaA] = a.data.split(" ");
        const [dataB, horaB] = b.data.split(" ");

        const comparaData = new Date(dataB) - new Date(dataA);

        if (comparaData === 0) {
          // Se as datas forem iguais, compara as horas delas
          return horaA.localeCompare(horaB);
        } else {
          // Se são diferentes, retorna a comparação das datas
          return comparaData;
        }
      })
      .forEach((reserva, index) => {
        const divInReservas = document.createElement("div");
        divInReservas.setAttribute("class", "in-reservas");

        for (const campo in reserva) {
          // Cria um paragrafo para cada campo da reserva
          const itemLista = document.createElement("p");
          itemLista.setAttribute("class", "texto-box");

          //deixando a primeira letra Maiuscula
          itemLista.innerHTML = `<strong> ${
            campo.charAt(0).toUpperCase() + campo.substring(1)
          } </strong>: ${reserva[campo]}`;
          divInReservas.appendChild(itemLista);

          //verificando qual o status das reservas para distribuir nas divs corretas
          switch (reserva.status) {
            case "Agendada":
              reservasAgendadas.appendChild(divInReservas);
              break;

            case "Confirmada":
              reservasConfirmadas.appendChild(divInReservas);
              break;

            case "Concluida":
              reservasConcluidas.appendChild(divInReservas);
              break;

            case "Cancelada":
              reservasCanceladas.appendChild(divInReservas);
              break;
          }
        }
      });
  }

  recuperarDados();
});

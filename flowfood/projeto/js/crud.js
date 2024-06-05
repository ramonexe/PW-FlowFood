document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#reserva-form");
  const botaoAdicionar = document.querySelector("#botao-adicionar");
 
  // Recupera as reservas do Local Storage
  const dadosString = localStorage.getItem("dadosReserva");
  const reservas = dadosString ? JSON.parse(dadosString) : [];
  botaoAdicionar.addEventListener("click", gravarDados);

  const status = {
    agendada: "Agendada",
    confirmada: "Em andamento",
    cancelada: "Cancelada",
  }
    
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

    reservas.push({
     cliente: formulario.cliente.value,
      mesa: formulario.mesa.value,
      quantidade: formulario.quantidade.value,
      data: formatarHorario(formulario.data.value),
      status: status.agendada
      
   } );

    localStorage.setItem("dadosReserva", JSON.stringify(reservas));
    const divReservas = document.querySelector(".div-reservas");
    divReservas.innerHTML='';
    recuperarDados();
    
  }

  function recuperarDados() {
    
    

    const divReservas = document.querySelector(".div-reservas");
    // Cria uma lista para cada reserva
    reservas.forEach((reserva) => {
      const divInReservas = document.createElement("div");
      divInReservas.setAttribute("class","in-reservas");

      for (const campo in reserva) {
        if(reserva.status=='Agendada') {
        const itemLista = document.createElement("p");
        itemLista.setAttribute("class", "texto-box");
        //deixando a primeira letra Maiuscula
        itemLista.innerHTML = `<strong> ${
          campo.charAt(0).toUpperCase() + campo.substring(1)
        } </strong>: ${reserva[campo]}`;

        divInReservas.appendChild(itemLista);
        divReservas.appendChild(divInReservas);
      }
    }
    });
  }
  recuperarDados();
});

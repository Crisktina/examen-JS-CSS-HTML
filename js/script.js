//document.addEventListener('DOMContentLoaded', () => {
// const buttons = document.querySelectorAll('button');
// buttons.forEach(button => {
//   button.addEventListener('click', (event) => {
//     console.log('Ok.');
//         event.preventDefault();
//         console.log('Ok.');
//     });
// });
//});

//Añadir inputs en crear encuesta
const botonAdd = document.getElementById("addButton");
botonAdd.addEventListener("click", (e) => {
  e.preventDefault();
  addOption(botonAdd);
});

function addOption(botonAdd) {
  const opcionesEncuesta = document.getElementById("opcionesEncuesta");

  // Contar el número actual de inputs
  const currentInputs = opcionesEncuesta.querySelectorAll("input").length;

  // Verificar si ya hay 4 inputs
  if (currentInputs >= 4) {
    alert("No puedes añadir más de 4 opciones.");
    return;
  }

  const newOptionNumber = currentInputs + 1;

  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = `Opción ${newOptionNumber}`;
  input.maxLength = "25";
  //TODO: guardar el numero para luego la encuasta lo tenga en el value

  opcionesEncuesta.insertBefore(input, botonAdd);
}

//TODO:crear encuesta a partir del form

//survey boton votar
let totalVotos = 0;

btnNode = document.querySelectorAll(".btnSurvey");
porcentajeNode = document.querySelectorAll(".porcentaje");
//console.log(porcentajeNode[1].innerHTML);
const votosXBtn = new Array(btnNode.length).fill(0);

btnNode.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    totalVotos++;
    votosXBtn[index]++;
    console.log(totalVotos + "total votos despues del click");
    actualizarPorcentajes();
  });
});

function calcularPorcentaje(votosOpcion) {
  console.log(totalVotos + "totalvotos despues defuncion");
  let porcentaje = (100 * votosOpcion) / totalVotos;
  console.log(porcentaje + "calcularPorcentaje");
  return porcentaje.toFixed(2);
}
function actualizarPorcentajes() {
  porcentajeNode.forEach((p, index) => {
    console.log(p.innerHTML);
    p.innerHTML = calcularPorcentaje(votosXBtn[index]) + "%";
    console.log(p.innerHTML);
  });
}

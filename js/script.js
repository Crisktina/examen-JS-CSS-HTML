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

  let newDiv = document.createElement("div");
  newDiv.className = "padreInput";
  newDiv.innerHTML = `
    <input type="text" placeholder="Opción ${newOptionNumber}" maxlength="25" />
    <span class="char-count">0/25</span>
  `;

  opcionesEncuesta.insertBefore(newDiv, botonAdd);
}
//TODO: no reconoce el contar caracteres en los nuevos inputs creados
const inputs = document.querySelectorAll("[maxlength]");
inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    e.preventDefault();
    numChar(input);
  });
});

function numChar(input) {
  const maxLength = input.getAttribute("maxlength");
  const currentLength = input.value.length;
  const charCountSpan = input.nextElementSibling;
  charCountSpan.textContent = `${currentLength}/${maxLength}`;
}

//TODO:crear encuesta a partir del form

//survey VOTACIONES
btnNode = document.querySelectorAll(".btnSurvey");
porcentajeNode = document.querySelectorAll(".porcentaje");
const votosXBtn = new Array(btnNode.length).fill(0);
let totalVotos = 0;
let userVotos = 0;

btnNode.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    //delimitar a una votación por user (implementación a futuro)
    if (userVotos === 0) {
      totalVotos++;
      votosXBtn[index]++;
      userVotos++;
    }

    //total votos
    let totalVotosH4 = document.getElementById("totalVotos");
    totalVotosH4.innerHTML = totalVotos + " votaciones";

    actualizarPorcentajes();
  });
});

function calcularPorcentaje(votosOpcion) {
  let porcentaje = (100 * votosOpcion) / totalVotos;
  return porcentaje.toFixed(0);
}

function actualizarPorcentajes() {
  porcentajeNode.forEach((p, index) => {
    p.innerHTML = calcularPorcentaje(votosXBtn[index]) + "%";
  });
}

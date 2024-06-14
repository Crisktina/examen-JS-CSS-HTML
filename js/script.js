//inputs de todo el formulario
const formulario = document.getElementById("miForm");
let inputs = formulario.querySelectorAll("input");

//Añadir inputs en crear encuesta
const botonAdd = document.getElementById("addButton");
botonAdd.addEventListener("click", (e) => {
  e.preventDefault();
  addOption(botonAdd, inputs);
});

function addOption(botonAdd, inputs) {
  //inputs creados con + opciones encuesta
  const opcionesEncuesta = document.getElementById("opcionesEncuesta");
  const currentInputs = opcionesEncuesta.querySelectorAll("input");
  // Contar el número actual de inputs con length
  // Verificar si ya hay 4 inputs
  if (currentInputs.length >= 4) {
    alert("No puedes añadir más de 4 opciones.");
    return;
  }

  const newOptionNumber = currentInputs.length + 1;

  let newDiv = document.createElement("div");
  newDiv.className = "padreInput";
  newDiv.innerHTML = `
    <input type="text" placeholder="Opción ${newOptionNumber}" maxlength="25" />
    <span class="char-count">0/25</span>
    <div class="invalid-feedback"></div>
  `;

  opcionesEncuesta.insertBefore(newDiv, botonAdd);

  let inputsNew = opcionesEncuesta.querySelectorAll("input");
  console.log(inputsNew);
  //inputs creados
  inputsNew.forEach((input) => {
    input.addEventListener("keyup", () => {
      numChar(input);
      validText(input);
    });
  });
}

inputs.forEach((input) => {
  input.addEventListener("keyup", () => {
    numChar(input);
    validText(input);
  });
});

function numChar(input) {
  const maxLength = input.getAttribute("maxlength");
  const currentLength = input.value.length;
  const charCountSpan = input.nextElementSibling;
  charCountSpan.textContent = `${currentLength}/${maxLength}`;
}

//TODO:crear encuesta a partir del form
//validaciones
let error = false;
let mensajeObligatorio = "Campo obligatorio";

//-----Campo obligatorio
//trim, no empty, no mayor de 25 caracteres...
function validText(input) {
  const divError = document.getElementById("invalid-name");
  if (input.value.trim().length == 0 || input.value.trim().length >= 25) {
    errorActive(divError, input, mensajeObligatorio);
    return false;
  } else {
    success(divError, input);
    return true;
  }
}
// Activar error
function errorActive(divError, input, mensaje) {
  divError.innerHTML = mensaje;
  divError.style.display = "block";
  input.style.border = "2px solid red";
}
// Activar success
function success(divError, input) {
  divError.style.display = "none";
  input.style.border = "2px solid var(--turquesa)";
}

formulario.addEventListener("submit", (event) => {
  // Reiniciar error a false
  let error = false;
  console.log("---validfunction ok");
  // Validar todos los campos
  if (!validText()) error = true;

  // Si no hay errores se envía el formulario
  if (error) {
    alert("No se ha podido enviar el formulario");
    event.preventDefault();
    event.stopPropagation();
  } else {
    alert("Se está enviando el formulario");
  }
});

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

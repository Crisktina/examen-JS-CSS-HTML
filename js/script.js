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

//validaciones
let error = false;
let mensajeObligatorio = "Campo obligatorio";

//-----Campo obligatorio
//trim, no empty, no mayor de 25 caracteres...
function validText(input) {
  const divError = input.nextElementSibling.nextElementSibling;
  console.log(divError);
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
  console.log("Ha entrado en el submit");
  // Validar todos los campos
  // Validar todos los campos
  inputs.forEach((input) => {
    if (!validText(input)) {
      error = true;
      console.log("---formulario NO OK");
    }
  });

  // Si no hay errores se envía el formulario
  if (error) {
    alert("No se ha podido enviar el formulario");
    event.preventDefault();
    event.stopPropagation();
  } else {
    alert("Se está enviando el formulario");
  }
});

//TODO:crear encuesta a partir del form
function crearEncuesta() {
  const pregunta = document.getElementById("pregunta").value.trim();
  const opciones = Array.from(
    document.querySelectorAll("#opcionesEncuesta input")
  )
    .map((input) => input.value.trim())
    .filter((value) => value.length > 0);

  if (!pregunta || opciones.length < 2) {
    alert("Debe haber una pregunta y al menos dos opciones.");
    return;
  }

  const encuestasContainer = document.getElementById("encuestasContainer");

  const nuevaEncuesta = document.createElement("div");
  nuevaEncuesta.className = "cardMessage";
  nuevaEncuesta.innerHTML = `
    <div class="cabeceraCard">
      <div>
        <div class="boxIconUser">
          <img class="iconUser" src="./img/user.svg" alt="mensaje" />
        </div>
        <h3>Nuevo Usuario</h3>
      </div>
      <h4 id="totalVotos">0 votaciones</h4>
    </div>
    <p>${pregunta}</p>
    ${opciones
      .map(
        (opcion, index) => `
      <div class="opciones">
        <button class="btnSurvey" type="button" value="${
          index + 1
        }">${opcion}</button>
        <p id="porcentaje${index + 1}" class="porcentaje">0%</p>
      </div>
    `
      )
      .join("")}
  `;

  encuestasContainer.appendChild(nuevaEncuesta);

  nuevaEncuesta.querySelectorAll(".btnSurvey").forEach((button, index) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      manejarVotacion(nuevaEncuesta, index);
    });
  });
}
function crearEncuesta() {
  const pregunta = document.getElementById("pregunta").value.trim();
  const opciones = Array.from(
    document.querySelectorAll("#opcionesEncuesta input")
  )
    .map((input) => input.value.trim())
    .filter((value) => value.length > 0);

  if (!pregunta || opciones.length < 2) {
    alert("Debe haber una pregunta y al menos dos opciones.");
    return;
  }

  const encuestasContainer = document.getElementById("encuestasContainer");

  const nuevaEncuesta = document.createElement("div");
  nuevaEncuesta.className = "cardMessage";
  nuevaEncuesta.innerHTML = `
    <div class="cabeceraCard">
      <div>
        <div class="boxIconUser">
          <img class="iconUser" src="./img/user.svg" alt="mensaje" />
        </div>
        <h3>Nuevo Usuario</h3>
      </div>
      <h4 id="totalVotos">0 votaciones</h4>
    </div>
    <p>${pregunta}</p>
    ${opciones
      .map(
        (opcion, index) => `
      <div class="opciones">
        <button class="btnSurvey" type="button" value="${
          index + 1
        }">${opcion}</button>
        <p id="porcentaje${index + 1}" class="porcentaje">0%</p>
      </div>
    `
      )
      .join("")}
  `;

  encuestasContainer.appendChild(nuevaEncuesta);

  nuevaEncuesta.querySelectorAll(".btnSurvey").forEach((button, index) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      manejarVotacion(nuevaEncuesta, index);
    });
  });
}

// function manejarVotacion(encuesta, index) {
//   const totalVotosH4 = encuesta.querySelector("#totalVotos");
//   const porcentajeNodes = encuesta.querySelectorAll(".porcentaje");

//   let totalVotos = parseInt(totalVotosH4.textContent) || 0;
//   totalVotos++;
//   totalVotosH4.textContent = `${totalVotos} votaciones`;

//   const votosXBtn = new Array(porcentajeNodes.length).fill(0);
//   votosXBtn[index]++;

//   porcentajeNodes.forEach((p, idx) => {
//     const porcentaje = calcularPorcentaje(votosXBtn[idx], totalVotos);
//     p.textContent = `${porcentaje}%`;
//   });
// }

// function calcularPorcentaje(votosOpcion, totalVotos) {
//   let porcentaje = (100 * votosOpcion) / totalVotos;
//   return porcentaje.toFixed(0);
// }

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

const boton = document.getElementById("addButton");
boton.addEventListener("click", (e) => {
  e.preventDefault();
  addOption(boton);
});

function addOption(boton) {
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

  opcionesEncuesta.insertBefore(input, boton);
}

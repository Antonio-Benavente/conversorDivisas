const monedaResultUno = document.getElementById("moneda-uno");
const monedaResultDos = document.getElementById("moneda-dos");
const cantidadResultUno = document.getElementById("cantidad-uno");
const cantidadResultDos = document.getElementById("cantidad-dos");
const cambio = document.getElementById("valorMonedas");

//const API = "https://api.exchangerate-api.com/v4/latest/";
const API = "https://open.er-api.com/v6/latest/";

function cargarMonedas() {
  monedaResultUno.innerHTML = "";
  monedaResultDos.innerHTML = "";

  Object.keys(monedasInfo).forEach((moneda) => {
    const info = monedasInfo[moneda];
    const displayText = `${moneda} - ${info.name}`;

    monedaResultUno.innerHTML += `<option value="${moneda}">${displayText}</option>`;
    monedaResultDos.innerHTML += `<option value="${moneda}">${displayText}</option>`;
  });

  monedaResultUno.value = "USD";
  monedaResultDos.value = "PEN";

  calculate();
}

// Calcular conversión
async function calculate() {
  const monedaUno = monedaResultUno.value;
  const monedaDos = monedaResultDos.value;

  try {
    const res = await fetch(API + monedaUno);
    const data = await res.json();
    const tasa = data.rates[monedaDos];

    cambio.innerText = `1 ${monedaUno} es igual a ${tasa.toFixed(2)} ${monedaDos}`;
    cantidadResultDos.value = (cantidadResultUno.value * tasa).toFixed(2);
  } catch (error) {
    cambio.innerText = "Error al obtener la tasa de cambio";
    console.error("Error al obtener datos de la API:", error);
  }
}

// Eventos
monedaResultUno.addEventListener("change", calculate);
cantidadResultUno.addEventListener("input", calculate);
monedaResultDos.addEventListener("change", calculate);

// Inicializar
cargarMonedas();

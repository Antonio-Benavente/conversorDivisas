const monedaResultUno = document.getElementById('moneda-uno');
const monedaResultDos = document.getElementById('moneda-dos');
const cantidadResultUno = document.getElementById('cantidad-uno');
const cantidadResultDos = document.getElementById('cantidad-dos');
const cambio = document.getElementById('texto2');

// Cargar monedas desde la API
async function cargarMonedas() {
    try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await res.json();
        const monedas = Object.keys(data.rates);

        // Limpiar opciones existentes
        monedaResultUno.innerHTML = '';
        monedaResultDos.innerHTML = '';

        // Agregar opciones al select
        monedas.forEach(moneda => {
            monedaResultUno.innerHTML += `<option value="${moneda}">${moneda}</option>`;
            monedaResultDos.innerHTML += `<option value="${moneda}">${moneda}</option>`;
        });

        // Seleccionar valores predeterminados
        monedaResultUno.value = 'USD';
        monedaResultDos.value = 'PEN';

        calculate();
    } catch (error) {
        console.error("Error al obtener la lista de monedas:", error);
    }
}

// Calcular conversión
async function calculate() {
    const monedaUno = monedaResultUno.value;
    const monedaDos = monedaResultDos.value;

    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${monedaUno}`);
        const data = await res.json();
        const tasa = data.rates[monedaDos];

        cambio.innerText = `1 ${monedaUno} es igual a ${tasa} ${monedaDos}`;
        cantidadResultDos.value = (cantidadResultUno.value * tasa).toFixed(2);
    } catch (error) {
        cambio.innerText = "Error al obtener la tasa de cambio";
        console.error("Error al obtener datos de la API:", error);
    }
}

// Eventos
monedaResultUno.addEventListener('change', calculate);
cantidadResultUno.addEventListener('input', calculate);
monedaResultDos.addEventListener('change', calculate);

// Inicializar
cargarMonedas();

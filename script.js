function determinarParidad(numero) {
    if (numero % 2 === 0) {
        return "par";
    } else {
        return "impar";
    }
}

function verificarParidad() {
    var inputNumero = document.getElementById("numero");
    var resultadoContainer = document.getElementById("resultado");

    var miNumero = parseInt(inputNumero.value);

    if (!isNaN(miNumero)) {
        var resultado = determinarParidad(miNumero);
        resultadoContainer.textContent = "El número " + miNumero + " es " + resultado + ".";
    } else {
        resultadoContainer.textContent = "Por favor, ingresa un número válido.";
    }
}

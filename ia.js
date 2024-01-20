const { TURNS } = require("./constants");


function mejorMovimiento(tablero) {
    let mejorValor = -Infinity;
    let columna = -1;
    for (let i = 0; i < 7; i++) {
        if (columnaValida(tablero, i)) {
            let tableroCopia = JSON.parse(JSON.stringify(tablero));
            ponerFicha(tableroCopia, i, TURNS.O);
            let valorMovimiento = minimax(tableroCopia, 6, false);
            if (valorMovimiento > mejorValor) {
                mejorValor = valorMovimiento;
                columna = i;
            }
        }
    }
    return columna;
}

function minimax(tablero, profundidad, esMaximizador) {
    let valor = evaluarTablero(tablero);
    if (profundidad == 0 || valor == 10 || valor == -10)
        return valor;

    if (esMaximizador) {
        let mejorValor = -Infinity;
        for (let i = 0; i < 7; i++) {
            if (columnaValida(tablero, i)) {
                let tableroCopia = JSON.parse(JSON.stringify(tablero));
                ponerFicha(tableroCopia, i, TURNS.O);
                mejorValor = Math.max(mejorValor, minimax(tableroCopia, profundidad - 1, !esMaximizador));
            }
        }
        return mejorValor;
    } else {
        let mejorValor = Infinity;
        for (let i = 0; i < 7; i++) {
            if (columnaValida(tablero, i)) {
                let tableroCopia = JSON.parse(JSON.stringify(tablero));
                ponerFicha(tableroCopia, i, TURNS.X);
                mejorValor = Math.min(mejorValor, minimax(tableroCopia, profundidad - 1, !esMaximizador));
            }
        }
        return mejorValor;
    }
}

function columnaValida(tablero, columna) {
    // Comprueba si la columna está llena
    return tablero[0][columna] == null;
}

function ponerFicha(tablero, columna, ficha) {
    // Coloca la ficha en la columna más baja disponible
    for (let i = 5; i >= 0; i--) {
        if (tablero[i][columna] == null) {
            tablero[i][columna] = ficha;
            break;
        }
    }
}

function evaluarTablero(tablero) {
    let valor = 0;

    // Comprueba las líneas horizontales
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            let linea = tablero[i].slice(j, j + 4);
            valor += evaluarLinea(linea);
        }
    }

    // Comprueba las líneas verticales
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 3; j++) {
            let linea = [tablero[j][i], tablero[j + 1][i], tablero[j + 2][i], tablero[j + 3][i]];
            valor += evaluarLinea(linea);
        }
    }

    // Comprueba las diagonales de izquierda a derecha
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            let linea = [tablero[i][j], tablero[i + 1][j + 1], tablero[i + 2][j + 2], tablero[i + 3][j + 3]];
            valor += evaluarLinea(linea);
        }
    }

    // Comprueba las diagonales de derecha a izquierda
    for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 7; j++) {
            let linea = [tablero[i][j], tablero[i + 1][j - 1], tablero[i + 2][j - 2], tablero[i + 3][j - 3]];
            valor += evaluarLinea(linea);
        }
    }

    return valor;
}

function evaluarLinea(linea) {
    let valor = 0;

    if (linea.filter(celda => celda == TURNS.O).length == 4) {
        valor += 100;
    } else if (linea.filter(celda => celda == TURNS.O).length == 3 && linea.includes(null)) {
        valor += 10;
    } else if (linea.filter(celda => celda == TURNS.O).length == 2 && linea.filter(celda => celda == null).length == 2) {
        valor += 3;
    }

    if (linea.filter(celda => celda == TURNS.X).length == 3 && linea.includes(null)) {
        valor -= 80;
    }

    return valor;
}

module.exports = {
    mejorMovimiento
}
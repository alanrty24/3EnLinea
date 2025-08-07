const casillas = document.querySelectorAll(".casilla");
const turno = document.querySelector(".turno");
const ganador = document.querySelector(".ganador");
const btnReiniciar = document.querySelector(".btn");
const jugadores = [];
let turnoJugador = "X";
let estadoJuego = Array(9).fill("");
const gameOver = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// * Variables
// * casillas -> guarda todos los Div cuando los seleccionamos
// * turno -> para mostrar el turno de juego
// * ganador -> para mostrar el ganador del juego
// * btnReiniciar -> Reinicia el juego
// * turnoJugador -> Va cambiando el turno entre X o Y
// * estadoJuego -> Guarda cada jugada realizada
// * gameOver -> Tiene todas las formas de que se acabe el juego

// * Reinicia el Juego
btnReiniciar.addEventListener("click", () => {
  reiniciarJuego();
});

// * Función encargada de Iniciar o Restablecer el Juego
const iniciarJuego = () => {
  let aut = true;

  // * Guardo El nombre de los jugadores
  // * 1) Valido con un do while si el primer jugador esta correctamente cargado
  do {
    jugadores.pop();
    jugadores.push({
      name: prompt("Ingrese el Jugador 1").toUpperCase(),
      item: prompt("Eres X ó O").toUpperCase(),
    });
    if (
      jugadores[0].item.toUpperCase() === "X" ||
      jugadores[0].item.toUpperCase() === "O"
    ) {
      aut = false;
    }
  } while (aut == true);

  // * 2) Guardo el segundo jugador con respecto a los datos del primer jugador 
  jugadores.push({
    name: prompt("Ingrese el Jugador 2").toUpperCase(),
    item:
      jugadores[0].item == "X" ? (turnoJugador = "O") : (turnoJugador = "X"),
  });

  // * Comienza la logica del juego
  turnoJugador = jugadores[0].item;
  turno.firstElementChild.textContent = jugadores[0].name + " " + turnoJugador;
  ganador.firstElementChild.textContent = "";
  estadoJuego = Array(9).fill("");
  casillas.forEach((casilla) => {
    casilla.textContent = "";
  });
};

// * Reiniciar el juego 
const reiniciarJuego = () => {
  // * Comienza la logica del juego
  turnoJugador = jugadores[0].item;
  turno.firstElementChild.textContent = jugadores[0].name + " " + turnoJugador;
  ganador.firstElementChild.textContent = "";
  estadoJuego = Array(9).fill("");
  casillas.forEach((casilla) => {
    casilla.textContent = "";
  });
}

// * Lleva el registro de cada movimiento del jugador
const movimientoJugador = (i) => {
  // * 1) Vemos si la casilla seleccionada esta siendo usada
  // * 2) Vemos si con la casilla seleccionada gano
  // * 3) Vemos si queda tabla

  if (estadoJuego[i] || juegoGanado()) {
    return false;
  } else {
    estadoJuego[i] = turnoJugador;
    casillas[i].textContent = turnoJugador;
    if (!juegoGanado(i)) {
      turnoJugador =
        turnoJugador == "X" ? (turnoJugador = "O") : (turnoJugador = "X");
      if (turnoJugador == jugadores[0].item) {
        turno.firstElementChild.textContent = jugadores[0].name + " " + turnoJugador;
      } else {
        turno.firstElementChild.textContent = jugadores[1].name + " " + turnoJugador;
      }

    } else {
      if (turnoJugador == jugadores[0].item) {
        ganador.firstElementChild.textContent = jugadores[0].name;
        turno.firstElementChild.textContent = "";
      } else {
        ganador.firstElementChild.textContent = jugadores[1].name;
        turno.firstElementChild.textContent = "";
      }
      
      // ganador.firstElementChild.textContent = turnoJugador;
      // return false;
    }
  }

  // * Vemos si ya la tabla esta completa
  if (!checkTable()) {
    turno.firstElementChild.textContent = "";
    ganador.firstElementChild.textContent = "El Juego Quedo Tabla";
    return false;
  }
};

// * chequea si el jugador gano
const juegoGanado = () => {
  return gameOver.some(
    ([a, b, c]) =>
      estadoJuego[a] &&
      estadoJuego[a] === estadoJuego[b] &&
      estadoJuego[a] === estadoJuego[c]
  );
};

// * Chequea que todas las celdas esten ocupadas
const checkTable = () => {
  return estadoJuego.includes("");
};

// * Asignamos a cada casilla el evento click
casillas.forEach((casilla, i) => {
  casilla.addEventListener("click", (e) => {
    movimientoJugador(i);
  });
});

// * Iniciamos el juego
iniciarJuego();

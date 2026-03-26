// ============================================================
// Módulo 3: Funciones y Scope — Soluciones
// ============================================================

// ------------------------------------------------------------
// Ejercicio 1: Calculadora de daño
// ------------------------------------------------------------
function calcularDanio(ataque, defensa, critico) {
  let danio = ataque - defensa;
  if (critico) danio *= 2;
  return Math.max(0, danio); // nunca devuelve negativo
}

console.log(calcularDanio(50, 30, true));  // → 70  ((50-30) * 2)
console.log(calcularDanio(50, 30, false)); // → 20  (50-30)
console.log(calcularDanio(10, 50, false)); // → 0   (resultado negativo → 0)

// ------------------------------------------------------------
// Ejercicio 2: Evolución de Pokémon
// ------------------------------------------------------------
function puedeEvolucionar(nombre, nivel) {
  if (nombre === "Charmander" && nivel >= 16) return "Charmander evolucionó a Charmeleon";
  if (nombre === "Bulbasaur"  && nivel >= 15) return "Bulbasaur evolucionó a Ivysaur";
  if (nombre === "Squirtle"   && nivel >= 18) return "Squirtle evolucionó a Wartortle";
  return "Todavía no puede evolucionar";
}

console.log(puedeEvolucionar("Charmander", 16)); // → Charmander evolucionó a Charmeleon
console.log(puedeEvolucionar("Bulbasaur",  10)); // → Todavía no puede evolucionar
console.log(puedeEvolucionar("Squirtle",   20)); // → Squirtle evolucionó a Wartortle
console.log(puedeEvolucionar("Pikachu",    30)); // → Todavía no puede evolucionar

// ------------------------------------------------------------
// Ejercicio 3: Batalla Pokémon
// ------------------------------------------------------------
function batalla(atacante, defensor, nombreAtaque, poder, defensa, critico) {
  const danio = calcularDanio(poder, defensa, critico);

  console.log(`¡${atacante} usó ${nombreAtaque} contra ${defensor}! Causó ${danio} de daño.`);

  if (danio >= 50) {
    console.log(`¡${defensor} ha sido derrotado!`);
  } else {
    console.log(`¡${defensor} sigue en pie!`);
  }
}

batalla("Pikachu",    "Meowth",    "Impactrueno", 70, 20, false); // daño 50 → derrotado
batalla("Charmander", "Squirtle",  "Ascuas",      40, 25, false); // daño 15 → sigue en pie
batalla("Bulbasaur",  "Geodude",   "Látigo Cepa", 35, 10, true);  // daño 50 → derrotado

// ------------------------------------------------------------
// Ejercicio 4: Batalla por turnos con estrategia real
// ------------------------------------------------------------
function simularBatalla() {
  let vidaJugador = 100;
  let vidaEnemigo = 100;

  for (let turno = 1; turno <= 5; turno++) {
    if (vidaJugador <= 0 || vidaEnemigo <= 0) break;

    // Acción del jugador
    const accionJugador = prompt(`Turno ${turno} — Tu vida: ${vidaJugador} | Vida enemigo: ${vidaEnemigo}\n¿Atacar o Defender?`).trim().toLowerCase();
    // Acción aleatoria del enemigo
    const accionEnemigo = Math.random() < 0.5 ? "atacar" : "defender";

    // Valores aleatorios del turno
    const atkJugador  = Math.floor(Math.random() * 40) + 10; // 10–49
    const defJugador  = Math.floor(Math.random() * 20) + 5;  // 5–24
    const critJugador = Math.random() < 0.2;                 // 20% crítico

    const atkEnemigo  = Math.floor(Math.random() * 35) + 10; // 10–44
    const defEnemigo  = Math.floor(Math.random() * 20) + 5;  // 5–24
    const critEnemigo = Math.random() < 0.2;

    console.log(`\n--- TURNO ${turno} ---`);

    if (accionJugador === "atacar" && accionEnemigo === "atacar") {
      // Ambos atacan
      const danioAJugador = calcularDanio(atkEnemigo, defJugador, critEnemigo);
      const danioAEnemigo = calcularDanio(atkJugador, defEnemigo, critJugador);
      vidaJugador -= danioAJugador;
      vidaEnemigo -= danioAEnemigo;
      console.log(`Atacaste con ${atkJugador}. El enemigo también atacó con ${atkEnemigo}.`);
      console.log(`Le hiciste ${danioAEnemigo} de daño. Vos recibiste ${danioAJugador}.`);

    } else if (accionJugador === "atacar" && accionEnemigo === "defender") {
      // Jugador ataca, enemigo defiende → daño del jugador a la mitad
      const danioAEnemigo = Math.floor(calcularDanio(atkJugador, defEnemigo, critJugador) / 2);
      vidaEnemigo -= danioAEnemigo;
      console.log(`Atacaste con ${atkJugador}. El enemigo se defendió con ${defEnemigo}. ¡Le hiciste ${danioAEnemigo} de daño!`);

    } else if (accionJugador === "defender" && accionEnemigo === "atacar") {
      // Jugador defiende, enemigo ataca → daño al jugador a la mitad
      const danioAJugador = Math.floor(calcularDanio(atkEnemigo, defJugador, critEnemigo) / 2);
      vidaJugador -= danioAJugador;
      console.log(`Defendiste con ${defJugador}. El enemigo atacó con ${atkEnemigo}. ¡Bloqueaste parte del daño! Recibiste ${danioAJugador}.`);

    } else {
      // Ambos defienden
      console.log("Ambos se defendieron. No hubo daño este turno.");
    }

    console.log(`Vida — Jugador: ${vidaJugador} | Enemigo: ${vidaEnemigo}`);
  }

  // Resultado final
  console.log("\n====== RESULTADO FINAL ======");
  console.log(`Tu vida: ${vidaJugador} | Vida del enemigo: ${vidaEnemigo}`);

  if (vidaJugador > vidaEnemigo)      console.log("¡Ganaste la batalla!");
  else if (vidaJugador < vidaEnemigo) console.log("¡Perdiste!");
  else                                console.log("¡Empate!");
}

simularBatalla();

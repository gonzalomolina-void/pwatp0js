// ============================================================
// Módulo 7: Asincronía, Promesas y Async/Await — Soluciones
// ============================================================
// Nota: ejercicios 1–4 corren en Node.js o navegador.
//       Ejercicio 5 requiere navegador o Node.js 18+ (fetch nativo).
// ============================================================

// Utilidad reutilizable: promesa que espera N milisegundos
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// ============================================================
// Ejercicio 1: Entrenador Pokémon con evolución
// ============================================================

const pokedex = {
  Pikachu:    { nombre: "Pikachu",    nivel: 2, evolucion: { nivel: 3, forma: "Raichu" } },
  Charmander: { nombre: "Charmander", nivel: 1, evolucion: { nivel: 3, forma: "Charmeleon" } }
};

function entrenarPokemon(nombrePokemon) {
  return new Promise((resolve, reject) => {
    const pokemon = pokedex[nombrePokemon];
    if (!pokemon) {
      reject(`Pokémon "${nombrePokemon}" no encontrado.`);
      return;
    }
    setTimeout(() => {
      pokemon.nivel++;
      console.log(`${pokemon.nombre} entrenó. Nivel actual: ${pokemon.nivel}`);
      if (pokemon.nivel >= pokemon.evolucion.nivel) {
        console.log(`¡${pokemon.nombre} evolucionó a ${pokemon.evolucion.forma}!`);
      }
      resolve(pokemon);
    }, 2000);
  });
}

function entrenar(pokemon) {
  return new Promise(resolve => {
    setTimeout(() => {
      pokemon.nivel++;
      console.log(`${pokemon.nombre} entrenó. Nivel actual: ${pokemon.nivel}`);
      resolve(pokemon);
    }, 500);
  });
}

console.log("=== Ejercicio 1: Entrenamiento Pokémon ===");
entrenarPokemon("Pikachu")
  .then(entrenar)
  .then(entrenar)
  .then(entrenar)
  .then(p => console.log(`Entrenamiento completo. ${p.nombre} quedó en nivel ${p.nivel}.`))
  .catch(console.error);

// Prueba con nombre inválido
entrenarPokemon("Mew").catch(e => console.error("Error:", e));

// ============================================================
// Ejercicio 2: Carga de datos galácticos
// ============================================================

const jedis = {
  1: { id: 1, nombre: "Obi-Wan",  nivel: "Maestro"   },
  2: { id: 2, nombre: "Anakin",   nivel: "Padawan"   },
  3: { id: 3, nombre: "Yoda",     nivel: "Maestro"   },
  4: { id: 4, nombre: "Luke",     nivel: "Caballero" }
};

function obtenerJedi(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!id || id < 1 || !jedis[id]) {
        reject(`ID inválido: ${id}`);
        return;
      }
      resolve(jedis[id]);
    }, 1000);
  });
}

async function mostrarJedi(id) {
  try {
    const jedi = await obtenerJedi(id);
    console.log(`Jedi encontrado: ${jedi.nombre} (${jedi.nivel})`);
    return jedi;
  } catch (error) {
    console.error(`Error al cargar Jedi: ${error}`);
  }
}

console.log("\n=== Ejercicio 2: Carga de datos galácticos ===");
mostrarJedi(1); // → Jedi encontrado: Obi-Wan (Maestro)
mostrarJedi(3); // → Jedi encontrado: Yoda (Maestro)
mostrarJedi(9); // → Error al cargar Jedi: ID inválido: 9

// ============================================================
// Ejercicio 3: Jedi + prueba en el Templo
// ============================================================

async function evaluarPrueba(jedi) {
  console.log(`Evaluando a ${jedi.nombre}... (esperar 3 segundos)`);
  await delay(3000);

  if (jedi.nivel === "Maestro") {
    console.log(`${jedi.nombre} pasó la prueba con sabiduría.`);
  } else if (jedi.nivel === "Caballero") {
    console.log(`${jedi.nombre} pasó la prueba con destreza.`);
  } else {
    console.log(`${jedi.nombre} necesita más entrenamiento.`);
  }
}

async function misionJedi(id) {
  try {
    const jedi = await obtenerJedi(id);
    console.log(`Jedi encontrado: ${jedi.nombre} (${jedi.nivel})`);
    await evaluarPrueba(jedi);
  } catch (error) {
    console.error(`Error en la misión: ${error}`);
  }
}

console.log("\n=== Ejercicio 3: Prueba en el Templo ===");
misionJedi(2); // Anakin (Padawan) → necesita más entrenamiento
misionJedi(3); // Yoda (Maestro)   → pasó la prueba con sabiduría

// ============================================================
// Ejercicio 4: Evolución Pokémon con piedras
// ============================================================

const evoluciones = {
  Eevee: {
    piedraFuego:  "Flareon",
    piedraAgua:   "Vaporeon",
    piedraTrueno: "Jolteon"
  },
  Pikachu: {
    piedraTrueno: "Raichu"
  }
};

function usarPiedraEvolutiva(pokemon, piedra) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const posibles = evoluciones[pokemon.nombre];
      if (posibles && posibles[piedra]) {
        resolve({ nombre: posibles[piedra], evolucionado: true });
      } else {
        reject(`${pokemon.nombre} no puede evolucionar con ${piedra}.`);
      }
    }, 3000);
  });
}

async function intentarEvolucion(pokemon, piedra) {
  try {
    console.log(`Intentando evolucionar a ${pokemon.nombre} con ${piedra}...`);
    const evolucionado = await usarPiedraEvolutiva(pokemon, piedra);
    console.log(`¡${pokemon.nombre} ha evolucionado a ${evolucionado.nombre} con la ${piedra}!`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

console.log("\n=== Ejercicio 4: Evolución con piedras ===");
intentarEvolucion({ nombre: "Eevee" },   "piedraFuego");  // → Flareon ✓
intentarEvolucion({ nombre: "Eevee" },   "piedraLunar");  // → error
intentarEvolucion({ nombre: "Pikachu" }, "piedraTrueno"); // → Raichu ✓
intentarEvolucion({ nombre: "Squirtle"}, "piedraAgua");   // → error (no está en evoluciones)

// ============================================================
// Ejercicio 5: Explorador Galáctico — SWAPI
// Ejecutar en la consola del navegador o Node.js 18+
// ============================================================

// ------ a. Primeros 5 personajes con nombre y altura ------
async function primersCincoPersonajes() {
  try {
    const res  = await fetch("https://swapi.dev/api/people/");
    const data = await res.json();

    console.log("=== a. Primeros 5 personajes ===");
    data.results.slice(0, 5).forEach(p => {
      console.log(`${p.name} - Altura: ${p.height}cm`);
    });
  } catch (e) {
    console.error("Error:", e);
  }
}

// ------ b. Planeta natal de Luke Skywalker ------
async function planetaNatalDeLuke() {
  try {
    const resBusqueda = await fetch("https://swapi.dev/api/people/?search=Luke+Skywalker");
    const busqueda    = await resBusqueda.json();
    const luke        = busqueda.results[0];

    const resPlaneta = await fetch(luke.homeworld);
    const planeta    = await resPlaneta.json();

    console.log("=== b. Planeta natal de Luke ===");
    console.log(`${luke.name} vive en ${planeta.name}`);
  } catch (e) {
    console.error("Error:", e);
  }
}

// ------ c. Todos los planetas con clima árido (con paginación) ------
async function planetasAridos() {
  try {
    let url   = "https://swapi.dev/api/planets/";
    const aridos = [];

    while (url) {
      const res  = await fetch(url);
      const data = await res.json();
      const filtrados = data.results.filter(p => p.climate.includes("arid"));
      aridos.push(...filtrados);
      url = data.next; // null cuando no hay más páginas
    }

    console.log("=== c. Planetas con clima árido ===");
    aridos.forEach(p => console.log(`${p.name} - Clima: ${p.climate}`));
  } catch (e) {
    console.error("Error:", e);
  }
}

// ------ d. Nave más grande ------
async function naveMasGrande() {
  try {
    let url   = "https://swapi.dev/api/starships/";
    const naves = [];

    while (url) {
      const res  = await fetch(url);
      const data = await res.json();
      naves.push(...data.results);
      url = data.next;
    }

    const validas   = naves.filter(n => n.length !== "unknown");
    const masGrande = validas.reduce((max, n) => {
      const longActual = parseFloat(n.length.replace(",", ""));
      const longMax    = parseFloat(max.length.replace(",", ""));
      return longActual > longMax ? n : max;
    });

    console.log("=== d. Nave más grande ===");
    console.log(`La nave más grande es: ${masGrande.name} (longitud: ${masGrande.length})`);
  } catch (e) {
    console.error("Error:", e);
  }
}

// ------ e. Información completa de una película ------
async function infoPelicula(id) {
  try {
    const resPelicula = await fetch(`https://swapi.dev/api/films/${id}/`);
    const film        = await resPelicula.json();

    // Obtener todos los personajes en paralelo con Promise.all
    const personajes = await Promise.all(
      film.characters.map(url => fetch(url).then(r => r.json()))
    );

    console.log(`=== e. Información de la película ID ${id} ===`);
    console.log(`Título:      ${film.title}`);
    console.log(`Director:    ${film.director}`);
    console.log(`Año:         ${film.release_date.split("-")[0]}`);
    console.log(`Personajes:  ${personajes.map(p => p.name).join(", ")}`);
  } catch (e) {
    console.error("Error:", e);
  }
}

// ------ Ejecutar todos los desafíos de SWAPI ------
async function explorarGalaxia() {
  await primersCincoPersonajes();
  await planetaNatalDeLuke();
  await planetasAridos();
  await naveMasGrande();
  await infoPelicula(1); // A New Hope
}

// Descomentar para ejecutar en el navegador:
// explorarGalaxia();

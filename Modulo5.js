// ============================================================
// Módulo 5: Ejercicios Avanzados con Arrays y Objetos
// ============================================================

// ------------------------------------------------------------
// BASE DE DATOS EN MEMORIA
// ------------------------------------------------------------
const basededatos = {
  peliculas: [
    {
      id: 1, nombre: "Matrix", anio: 1999,
      direccionSetFilmacion: { calle: "Fox Studios", numero: 1, pais: "Australia" },
      directores: [1, 2], generos: [1, 2]
    },
    {
      id: 2, nombre: "Cloud Atlas", anio: 2012,
      direccionSetFilmacion: { calle: "Babelsberg Studios", numero: 1, pais: "Alemania" },
      directores: [1, 2, 3], generos: [1, 3]
    },
    {
      id: 3, nombre: "Indiana Jones y los cazadores del arca perdida", anio: 1981,
      direccionSetFilmacion: { calle: "Elstree Studios", numero: 1, pais: "Reino Unido" },
      directores: [4], generos: [2, 4]
    },
    {
      id: 4, nombre: "Back to the Future", anio: 1985,
      direccionSetFilmacion: { calle: "Universal Studios", numero: 100, pais: "Estados Unidos" },
      directores: [5], generos: [1, 5]
    },
    {
      id: 5, nombre: "El señor de los anillos: La comunidad del anillo", anio: 2001,
      direccionSetFilmacion: { calle: "Stone Street Studios", numero: 1, pais: "Nueva Zelanda" },
      directores: [6], generos: [4, 6]
    },
    {
      id: 6, nombre: "Jurassic Park", anio: 1993,
      direccionSetFilmacion: { calle: "Universal Studios", numero: 200, pais: "Estados Unidos" },
      directores: [4], generos: [1, 2]
    }
  ],
  directores: [
    { id: 1, nombre: "Lilly Wachowski" },
    { id: 2, nombre: "Lana Wachowski" },
    { id: 3, nombre: "Tom Tykwer" },
    { id: 4, nombre: "Steven Spielberg" },
    { id: 5, nombre: "Robert Zemeckis" },
    { id: 6, nombre: "Peter Jackson" }
  ],
  generos: [
    { id: 1, nombre: "Ciencia Ficción" },
    { id: 2, nombre: "Acción" },
    { id: 3, nombre: "Drama" },
    { id: 4, nombre: "Aventura" },
    { id: 5, nombre: "Comedia" },
    { id: 6, nombre: "Fantasía" }
  ],
  criticos: [
    { id: 1, nombre: "Pipo Gorosito", edad: 60, pais: "Argentina" },
    { id: 2, nombre: "Alina Robles",  edad: 35, pais: "Argentina" },
    { id: 3, nombre: "Suzana Mendez", edad: 42, pais: "México" },
    { id: 4, nombre: "Pablo Tomafi",  edad: 28, pais: "España" },
    { id: 5, nombre: "Carlos Ruiz",   edad: 50, pais: "Estados Unidos" }
  ],
  calificaciones: [
    { critico: 1, pelicula: 1, puntuacion: 8 },
    { critico: 1, pelicula: 2, puntuacion: 7 },
    { critico: 1, pelicula: 4, puntuacion: 9 },
    { critico: 2, pelicula: 1, puntuacion: 9 },
    { critico: 2, pelicula: 3, puntuacion: 6 },
    { critico: 2, pelicula: 6, puntuacion: 8 },
    { critico: 3, pelicula: 1, puntuacion: 7 },
    { critico: 3, pelicula: 2, puntuacion: 4 },
    { critico: 3, pelicula: 5, puntuacion: 9 },
    { critico: 5, pelicula: 3, puntuacion: 8 },
    { critico: 5, pelicula: 4, puntuacion: 10 },
    { critico: 5, pelicula: 6, puntuacion: 7 }
    // Pablo Tomafi (id: 4) no tiene calificaciones → ejercicio 2.14
  ]
};

// ------------------------------------------------------------
// Función auxiliar: promedio de crítica por ID de película
// (usada en varios ejercicios)
// ------------------------------------------------------------
function promedioDeCriticaByPeliculaId(id) {
  const criticas = basededatos.calificaciones.filter(c => c.pelicula === id);
  if (criticas.length === 0) return 0;
  return criticas.reduce((acc, c) => acc + c.puntuacion, 0) / criticas.length;
}

// ------------------------------------------------------------
// 2.1. Promedio de años de estreno
// ------------------------------------------------------------
function promedioAnioEstreno() {
  const total = basededatos.peliculas.reduce((acc, p) => acc + p.anio, 0);
  return total / basededatos.peliculas.length;
}

console.log("2.1 →", promedioAnioEstreno()); // ~1995.17

// ------------------------------------------------------------
// 2.2. Películas con promedio de crítica mayor a un valor
// ------------------------------------------------------------
function peliculasConCriticaPromedioMayorA(umbral) {
  return basededatos.peliculas
    .filter(p => promedioDeCriticaByPeliculaId(p.id) > umbral)
    .map(p => p.nombre);
}

console.log("2.2 →", peliculasConCriticaPromedioMayorA(7));
// ["Matrix", "Back to the Future", "El señor de los anillos...", "Jurassic Park"]

// ------------------------------------------------------------
// 2.3. Películas dirigidas por una persona
// ------------------------------------------------------------
function peliculasDeUnDirector(nombre) {
  const director = basededatos.directores.find(d => d.nombre === nombre);
  if (!director) return [];
  return basededatos.peliculas
    .filter(p => p.directores.includes(director.id))
    .map(p => p.nombre);
}

console.log("2.3 →", peliculasDeUnDirector("Steven Spielberg"));
// ["Indiana Jones y los cazadores del arca perdida", "Jurassic Park"]

// ------------------------------------------------------------
// 2.4. Promedio de crítica de una película por ID
// ------------------------------------------------------------
console.log("2.4 →", promedioDeCriticaByPeliculaId(1)); // Matrix → 8
console.log("2.4 →", promedioDeCriticaByPeliculaId(3)); // Indiana Jones → 7

// ------------------------------------------------------------
// 2.5. Películas con al menos una crítica excelente (>= 9)
// ------------------------------------------------------------
function peliculasConCriticaExcelente() {
  return basededatos.peliculas
    .filter(p =>
      basededatos.calificaciones.some(c => c.pelicula === p.id && c.puntuacion >= 9)
    )
    .map(p => p.nombre);
}

console.log("2.5 →", peliculasConCriticaExcelente());
// ["Matrix", "Back to the Future", "El señor de los anillos..."]

// ------------------------------------------------------------
// 2.6. Información expandida de una película
// ------------------------------------------------------------
function infoExpandidaDePelicula(nombre) {
  const pelicula = basededatos.peliculas.find(p => p.nombre === nombre);
  if (!pelicula) return undefined;

  const directores = pelicula.directores.map(id =>
    basededatos.directores.find(d => d.id === id)
  );

  const generos = pelicula.generos.map(id =>
    basededatos.generos.find(g => g.id === id)
  );

  const criticas = basededatos.calificaciones
    .filter(c => c.pelicula === pelicula.id)
    .map(c => {
      const critico = basededatos.criticos.find(cr => cr.id === c.critico);
      return { puntuacion: c.puntuacion, critico };
    });

  return { ...pelicula, directores, generos, criticas };
}

console.log("2.6 →", JSON.stringify(infoExpandidaDePelicula("Matrix"), null, 2));

// ------------------------------------------------------------
// 2.7. Películas por país de filmación
// ------------------------------------------------------------
function peliculasPorPais(pais) {
  return basededatos.peliculas
    .filter(p => p.direccionSetFilmacion.pais === pais)
    .map(p => p.nombre);
}

console.log("2.7 →", peliculasPorPais("Nueva Zelanda"));
// ["El señor de los anillos: La comunidad del anillo"]

console.log("2.7 →", peliculasPorPais("Estados Unidos"));
// ["Back to the Future", "Jurassic Park"]

// ------------------------------------------------------------
// 2.8. Directores con al menos una película
// ------------------------------------------------------------
function directoresConPeliculas() {
  const idsConPeliculas = new Set(basededatos.peliculas.flatMap(p => p.directores));
  return basededatos.directores
    .filter(d => idsConPeliculas.has(d.id))
    .map(d => d.nombre);
}

console.log("2.8 →", directoresConPeliculas());

// ------------------------------------------------------------
// 2.9. Géneros más frecuentes
// ------------------------------------------------------------
function generosFrecuentes() {
  return basededatos.generos
    .map(genero => ({
      genero: genero.nombre,
      cantidad: basededatos.peliculas.filter(p => p.generos.includes(genero.id)).length
    }))
    .filter(g => g.cantidad > 0)
    .sort((a, b) => b.cantidad - a.cantidad);
}

console.log("2.9 →", generosFrecuentes());

// ------------------------------------------------------------
// 2.10. Promedio de puntuación por crítico
// ------------------------------------------------------------
function promedioPorCritico() {
  return basededatos.criticos.map(critico => {
    const califs = basededatos.calificaciones.filter(c => c.critico === critico.id);
    const promedio = califs.length === 0
      ? 0
      : califs.reduce((acc, c) => acc + c.puntuacion, 0) / califs.length;
    return {
      nombre: critico.nombre,
      promedio: Math.round(promedio * 100) / 100
    };
  });
}

console.log("2.10 →", promedioPorCritico());

// ------------------------------------------------------------
// 2.11. Películas con más de un director
// ------------------------------------------------------------
function peliculasConMultiplesDirectores() {
  return basededatos.peliculas
    .filter(p => p.directores.length > 1)
    .map(p => p.nombre);
}

console.log("2.11 →", peliculasConMultiplesDirectores());
// ["Matrix", "Cloud Atlas"]

// ------------------------------------------------------------
// 2.12. Top 3 películas mejor calificadas
// ------------------------------------------------------------
function top3Peliculas() {
  return basededatos.peliculas
    .map(p => ({ nombre: p.nombre, promedio: promedioDeCriticaByPeliculaId(p.id) }))
    .sort((a, b) => b.promedio - a.promedio)
    .slice(0, 3)
    .map(p => p.nombre);
}

console.log("2.12 →", top3Peliculas());
// ["Back to the Future", "El señor de los anillos...", "Matrix"]

// ------------------------------------------------------------
// 2.13. Cantidad de películas por director
// ------------------------------------------------------------
function peliculasPorDirector() {
  return basededatos.directores.map(director => ({
    nombre: director.nombre,
    cantidad: basededatos.peliculas.filter(p => p.directores.includes(director.id)).length
  }));
}

console.log("2.13 →", peliculasPorDirector());

// ------------------------------------------------------------
// 2.14. Críticos que no puntuaron ninguna película
// ------------------------------------------------------------
function criticosSinCalificaciones() {
  const criticosConCalif = new Set(basededatos.calificaciones.map(c => c.critico));
  return basededatos.criticos
    .filter(c => !criticosConCalif.has(c.id))
    .map(c => c.nombre);
}

console.log("2.14 →", criticosSinCalificaciones()); // ["Pablo Tomafi"]

// ------------------------------------------------------------
// 2.15. Informe completo por país de origen del crítico 💀
// ------------------------------------------------------------
function informePorPaisDelCritico() {
  const paises = [...new Set(basededatos.criticos.map(c => c.pais))];

  return paises.map(pais => {
    const criticosDelPais = basededatos.criticos.filter(c => c.pais === pais);
    const ids             = criticosDelPais.map(c => c.id);
    const califsDelPais   = basededatos.calificaciones.filter(c => ids.includes(c.critico));

    const cantidadCriticas = califsDelPais.length;
    const promedio = cantidadCriticas === 0
      ? 0
      : Math.round((califsDelPais.reduce((acc, c) => acc + c.puntuacion, 0) / cantidadCriticas) * 100) / 100;

    const idsPeliculas       = [...new Set(califsDelPais.map(c => c.pelicula))];
    const peliculasCriticadas = idsPeliculas.map(id =>
      basededatos.peliculas.find(p => p.id === id)?.nombre
    );

    return { pais, cantidadCriticas, promedio, peliculasCriticadas };
  });
}

console.log("2.15 →", JSON.stringify(informePorPaisDelCritico(), null, 2));

// ============================================================
// Ejercicio 3: Simulador de combate Pokémon con objetos
// ============================================================
function calcularDanio(ataque, defensa, critico) {
  let danio = ataque - defensa;
  if (critico) danio *= 2;
  return Math.max(0, danio);
}

const pikachu    = { nombre: "Pikachu",    vida: 100, ataque: 40, defensa: 25 };
const charmander = { nombre: "Charmander", vida: 100, ataque: 35, defensa: 20 };

function turnoDeAtaque(atacante, defensor) {
  const critico = Math.random() < 0.5;
  const danio   = calcularDanio(atacante.ataque, defensor.defensa, critico);
  defensor.vida = Math.max(0, defensor.vida - danio);

  const sufijo = critico ? " ¡Golpe crítico!" : "";
  console.log(`¡${atacante.nombre} atacó a ${defensor.nombre}! Causó ${danio} de daño.${sufijo}`);
  console.log(`  → ${defensor.nombre} tiene ${defensor.vida} de vida.`);

  if (defensor.vida === 0) console.log(`¡${defensor.nombre} ha sido derrotado!`);
}

console.log("\n=== Combate: Pikachu vs Charmander ===");
for (let turno = 1; turno <= 3; turno++) {
  if (pikachu.vida <= 0 || charmander.vida <= 0) break;
  console.log(`\n--- Turno ${turno} ---`);
  turnoDeAtaque(pikachu, charmander);
  if (charmander.vida > 0) turnoDeAtaque(charmander, pikachu);
}

// ============================================================
// Ejercicio 4: Sistema de ataques múltiples por Pokémon
// ============================================================
const charizard = {
  nombre: "Charizard",
  vida: 120,
  ataques: [
    { nombre: "Lanzallamas", poder: 60 },
    { nombre: "Garra Dragón", poder: 40 },
    { nombre: "Ascuas",       poder: 30 }
  ],
  defensa: 30
};

const pikachuEnemigo = { nombre: "Pikachu", vida: 100, defensa: 25 };

function usarAtaque(pokemon, ataqueNombre, enemigo) {
  const ataque = pokemon.ataques.find(a => a.nombre === ataqueNombre);
  if (!ataque) {
    console.log("Ese ataque no está disponible.");
    return;
  }

  const critico = Math.random() < 0.5;
  const danio   = calcularDanio(ataque.poder, enemigo.defensa, critico);
  enemigo.vida  = Math.max(0, enemigo.vida - danio);

  const sufijo = critico ? " ¡Golpe crítico!" : "";
  console.log(`¡${pokemon.nombre} usó ${ataqueNombre} contra ${enemigo.nombre}! Causó ${danio} de daño.${sufijo}`);
  console.log(`  → ${enemigo.nombre} tiene ${enemigo.vida} de vida.`);

  if (enemigo.vida === 0) console.log(`¡${enemigo.nombre} ha sido derrotado!`);
}

console.log("\n=== Sistema de ataques de Charizard ===");
usarAtaque(charizard, "Lanzallamas",  pikachuEnemigo);
usarAtaque(charizard, "Ascuas",       pikachuEnemigo);
usarAtaque(charizard, "Hidrobomba",   pikachuEnemigo); // → "Ese ataque no está disponible."
usarAtaque(charizard, "Garra Dragón", pikachuEnemigo);

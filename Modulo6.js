// ============================================================
// Módulo 6: Funciones Avanzadas y Callbacks — Soluciones
// ============================================================

// ------------------------------------------------------------
// Ejercicio 1: Filtrado de Pokémon (higher-order function)
// ------------------------------------------------------------
function filtrarPokemon(pokemones, criterio) {
  return pokemones.filter(criterio);
}

const pokemones = [
  { nombre: "Pikachu",    nivel: 20, tipo: "eléctrico" },
  { nombre: "Squirtle",   nivel: 15, tipo: "agua" },
  { nombre: "Charmander", nivel: 18, tipo: "fuego" },
  { nombre: "Bulbasaur",  nivel: 22, tipo: "planta" },
  { nombre: "Psyduck",    nivel: 12, tipo: "agua" }
];

const fuertes = filtrarPokemon(pokemones, p => p.nivel > 18);
console.log("Fuertes (nivel > 18):", fuertes.map(p => p.nombre));
// ["Pikachu", "Bulbasaur"]

const deAgua = filtrarPokemon(pokemones, p => p.tipo === "agua");
console.log("De agua:", deAgua.map(p => p.nombre));
// ["Squirtle", "Psyduck"]

const nivelAlto = filtrarPokemon(pokemones, p => p.nivel >= 20);
console.log("Nivel >= 20:", nivelAlto.map(p => p.nombre));
// ["Pikachu", "Bulbasaur"]

// ------------------------------------------------------------
// Ejercicio 2: Reclutamiento de personajes (higher-order function)
// ------------------------------------------------------------
function reclutar(personajes, criterio) {
  return personajes.filter(criterio);
}

const personajes = [
  { nombre: "Frodo",   raza: "Hobbit", valiente: true,  fuerza: 30 },
  { nombre: "Sam",     raza: "Hobbit", valiente: true,  fuerza: 35 },
  { nombre: "Gandalf", raza: "Mago",   valiente: true,  fuerza: 90 },
  { nombre: "Gollum",  raza: "Hobbit", valiente: false, fuerza: 20 },
  { nombre: "Aragorn", raza: "Humano", valiente: true,  fuerza: 85 },
  { nombre: "Legolas", raza: "Elfo",   valiente: true,  fuerza: 80 }
];

const hobbitsValientes = reclutar(personajes, p => p.raza === "Hobbit" && p.valiente);
console.log("\nHobbits valientes:", hobbitsValientes.map(p => p.nombre));
// ["Frodo", "Sam"]

const guerreros = reclutar(personajes, p => p.fuerza >= 80);
console.log("Guerreros (fuerza >= 80):", guerreros.map(p => p.nombre));
// ["Gandalf", "Aragorn", "Legolas"]

const noHobbits = reclutar(personajes, p => p.raza !== "Hobbit" && p.valiente);
console.log("No hobbits valientes:", noHobbits.map(p => p.nombre));
// ["Gandalf", "Aragorn", "Legolas"]

// ------------------------------------------------------------
// Ejercicio 3: Laboratorio de Inventos (clase con callbacks)
// ------------------------------------------------------------
class Laboratorio {
  constructor() {
    this.inventos = [];
  }

  agregarInvento(nombre, efecto) {
    this.inventos.push({ nombre, efecto });
    console.log(`Invento "${nombre}" registrado en el laboratorio.`);
  }

  aplicarInvento(nombre, sujeto) {
    const invento = this.inventos.find(i => i.nombre === nombre);
    if (!invento) {
      console.log(`El invento "${nombre}" no existe.`);
      return;
    }
    invento.efecto(sujeto);
    console.log(`Invento "${nombre}" aplicado:`, sujeto);
  }

  listarInventos() {
    return this.inventos.map(i => i.nombre);
  }
}

const lab    = new Laboratorio();
const sujeto = { vida: 100, inteligencia: 50 };

lab.agregarInvento("Ray Gun",               s => s.vida         -= 30);
lab.agregarInvento("Suero de Inteligencia", s => s.inteligencia += 50);
lab.agregarInvento("Poción de Vida",        s => s.vida         += 20);

console.log("\nInventos disponibles:", lab.listarInventos());

lab.aplicarInvento("Ray Gun",               sujeto); // vida: 70
lab.aplicarInvento("Suero de Inteligencia", sujeto); // inteligencia: 100
lab.aplicarInvento("Poción de Vida",        sujeto); // vida: 90
lab.aplicarInvento("Teletransportador",     sujeto); // → invento no existe

console.log("\nEstado final del sujeto:", sujeto);
// { vida: 90, inteligencia: 100 }

// ------------------------------------------------------------
// Ejercicio 4: Creación de Equipos (closure)
// ------------------------------------------------------------
function crearEquipo(nombre) {
  const miembros = []; // variable privada gracias al closure

  return {
    nombre,

    agregar(miembro) {
      miembros.push(miembro);
      console.log(`${miembro.nombre} se unió al equipo "${nombre}".`);
    },

    listar() {
      return miembros;
    },

    usarHabilidadEspecial(nombreMiembro) {
      const miembro = miembros.find(m => m.nombre === nombreMiembro);
      if (miembro) {
        miembro.habilidadEspecial();
      } else {
        console.log(`${nombreMiembro} no pertenece al equipo "${nombre}".`);
      }
    },

    mostrarEquipo() {
      console.log(`\nEquipo: ${nombre}`);
      miembros.forEach(m => console.log(`  - ${m.nombre} (fuerza: ${m.fuerza})`));
    }
  };
}

// Equipo Rebeldes
const rebels = crearEquipo("Rebeldes");
rebels.agregar({ nombre: "Leia",  fuerza: 70,  habilidadEspecial: () => console.log("¡Estrategia diplomática!") });
rebels.agregar({ nombre: "Luke",  fuerza: 80,  habilidadEspecial: () => console.log("¡Usa la Fuerza!") });
rebels.agregar({ nombre: "Han",   fuerza: 75,  habilidadEspecial: () => console.log("¡Disparo primero!") });

// Equipo Sith
const sith = crearEquipo("Sith");
sith.agregar({ nombre: "Darth Vader",   fuerza: 100, habilidadEspecial: () => console.log("¡Fuerza sofocante!") });
sith.agregar({ nombre: "Palpatine",     fuerza: 95,  habilidadEspecial: () => console.log("¡Rayos de fuerza!") });

rebels.mostrarEquipo();
sith.mostrarEquipo();

console.log("\n--- Habilidades especiales ---");
rebels.usarHabilidadEspecial("Leia");             // ¡Estrategia diplomática!
rebels.usarHabilidadEspecial("Luke");             // ¡Usa la Fuerza!
sith.usarHabilidadEspecial("Darth Vader");        // ¡Fuerza sofocante!
rebels.usarHabilidadEspecial("Darth Vader");      // → no pertenece al equipo

// Los equipos son independientes gracias al closure:
// 'miembros' de rebels y sith son arrays distintos, no comparten estado
console.log("\nMiembros rebels:", rebels.listar().map(m => m.nombre));
console.log("Miembros sith:",   sith.listar().map(m => m.nombre));

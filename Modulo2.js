// ============================================================
// Módulo 2: Operadores, Coerción y Control de Flujo — Soluciones
// ============================================================

// ------------------------------------------------------------
// Ejercicio 1: Validador de edad para cine
// ------------------------------------------------------------
const edadCine = Number(prompt("¿Cuál es tu edad?"));

if (edadCine >= 18) {
  console.log("Puede entrar al cine");
} else {
  console.log("No puede entrar");
}

// ------------------------------------------------------------
// Ejercicio 2: Calculadora de propina
// ------------------------------------------------------------
const monto   = Number(prompt("¿Cuál es el monto de la cuenta?"));
const propina = monto * 0.1;

console.log(`El total es $${monto}. La propina sugerida es $${propina}`);

// ------------------------------------------------------------
// Ejercicio 3: Predicción de operaciones
// ------------------------------------------------------------
console.log(10 + "190");      // "10190"  → + con string activa concatenación; el 10 se convierte a string
console.log("8" * "4");       // 32       → * fuerza coerción numérica en ambos operandos
console.log(true + false);    // 1        → true = 1, false = 0 en contexto numérico
console.log(null + 1);        // 1        → null se convierte a 0 en contexto numérico
console.log(undefined + 1);   // NaN      → undefined no tiene representación numérica válida

// ------------------------------------------------------------
// Ejercicio 4: Validador de ingreso a un club secreto
// ------------------------------------------------------------
const edadClub = Number(prompt("¿Cuál es tu edad?"));
const clave    = prompt("Decí la palabra clave:");

if (edadClub >= 21 && clave === "snorlax") {
  console.log("¡Bienvenido al club secreto!");
} else if (edadClub < 21) {
  console.log("Acceso denegado: no tenés la edad mínima (21).");
} else {
  console.log("Acceso denegado: palabra clave incorrecta.");
}

// ------------------------------------------------------------
// Ejercicio 5: Simulador de sueldo con bonus y retenciones
// ------------------------------------------------------------
const sueldoBase  = Number(prompt("Ingresá tu sueldo base:"));
const tieneBonus  = prompt("¿Tenés bonus? (sí/no)").trim().toLowerCase() === "sí";
const tieneHijos  = prompt("¿Tenés hijos? (sí/no)").trim().toLowerCase() === "sí";

let sueldoTotal = sueldoBase;

if (tieneBonus) sueldoTotal *= 1.10;  // +10% bonus
if (tieneHijos) sueldoTotal *= 0.95;  // -5%  aporte familiar

const sueldoNeto = sueldoTotal * 0.85; // -15% retención final

console.log(`Tu sueldo final es $${sueldoNeto.toLocaleString("es-AR")}`);

// ------------------------------------------------------------
// Ejercicio 6: Clasificador de clientes premium
// ------------------------------------------------------------
const compras = Number(prompt("¿Cuántas compras hiciste este mes?"));
const gasto   = Number(prompt("¿Cuánto gastaste en total?"));

if (compras > 10 && gasto > 100000) {
  console.log("Cliente Premium: ¡gracias por tu fidelidad!");
} else if (compras >= 5 || gasto > 50000) {
  console.log("Cliente Regular");
} else {
  console.log("Cliente Básico");
}

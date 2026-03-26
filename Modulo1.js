// ============================================================
// Módulo 1: Variables y tipos — Soluciones
// ============================================================

// ------------------------------------------------------------
// Ejercicio 1: Tu primera línea en la consola
// ------------------------------------------------------------
let nombre = "Sofi";
const edad = 22;

console.log("Hola, mi nombre es " + nombre + " y tengo " + edad + " años.");

// ¿Qué pasa si intentás reasignar edad?
// edad = 23; // → TypeError: Assignment to constant variable.
// 'const' no permite cambiar la referencia del valor asignado.

// ------------------------------------------------------------
// Ejercicio 2: Tres variables
// ------------------------------------------------------------
const miNombre  = "Sofi";
const profesion = "programadora";
const ciudad    = "Neuquén";

console.log(`Hola! Soy ${miNombre}, ${profesion} de ${ciudad}.`);

// ------------------------------------------------------------
// Ejercicio 3: ¿Qué muestra por consola?
// ------------------------------------------------------------

// console.log(a);  → undefined
//   'var' sufre hoisting: la declaración se eleva al inicio del
//   contexto, pero el valor (5) NO. Por eso vale 'undefined'.

// console.log(b);  → ReferenceError: Cannot access 'b' before initialization
//   'let' también se eleva, pero queda en la Temporal Dead Zone
//   hasta la línea donde se declara. Acceder antes lanza error.

var a = 5;
let b = 10;

console.log(a); // 5  (accedido después de la declaración, ok)
console.log(b); // 10

// ------------------------------------------------------------
// Ejercicio 4: ¿Qué tipo es?
// ------------------------------------------------------------
console.log(typeof 123);           // "number"
console.log(typeof "hola");        // "string"
console.log(typeof true);          // "boolean"
console.log(typeof undefined);     // "undefined"
console.log(typeof null);          // "object"   ← bug histórico de JS
console.log(typeof NaN);           // "number"   ← NaN es de tipo numérico
console.log(typeof {});            // "object"
console.log(typeof []);            // "object"   ← los arrays son objetos
console.log(typeof function() {}); // "function"

// Casos que suelen sorprender:
//  • null      → "object"   (bug histórico, no fue corregido por compatibilidad)
//  • NaN       → "number"   (Not a Number sigue siendo del tipo Number)
//  • []        → "object"   (para verificar array usá Array.isArray([]))
//  • function  → "function" (único subtipo de objeto con su propio string)

let dato = "123"; // probá cambiar por: true, null, {}, [], 42, etc.
console.log("El tipo de dato es: " + typeof dato);

// ------------------------------------------------------------
// Ejercicio 5: Conversor simple de temperatura
// ------------------------------------------------------------

// Versión con valor fijo
const celsius    = 25;
const fahrenheit = (celsius * 9 / 5) + 32;
console.log(`${celsius}°C son ${fahrenheit}°F`); // "25°C son 77°F"

// Versión interactiva (ejecutar en la consola del navegador)
// const celsiusInput = prompt("Ingresá los grados Celsius:");
// const celsiusPrompt    = Number(celsiusInput);
// const fahrenheitPrompt = (celsiusPrompt * 9 / 5) + 32;
// console.log(`${celsiusPrompt}°C son ${fahrenheitPrompt}°F`);

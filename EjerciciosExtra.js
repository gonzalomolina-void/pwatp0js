// ============================================================
// Ejercicios Extra — Soluciones
// ============================================================

// ------------------------------------------------------------
// 1. Extraer mayúsculas
// ------------------------------------------------------------

// a) Con for
function extraerMayusculasFor(str) {
  let resultado = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= "A" && str[i] <= "Z") resultado += str[i];
  }
  return resultado;
}

// b) Con funciones nativas
function extraerMayusculasNativo(str) {
  return str.match(/[A-Z]/g)?.join("") ?? "";
}

console.log("1a →", extraerMayusculasFor("Hola Mundo JS"));   // "HMS"
console.log("1b →", extraerMayusculasNativo("Hola Mundo JS")); // "HMS"
console.log("1b →", extraerMayusculasNativo("abcDEF123"));     // "DEF"
console.log("1b →", extraerMayusculasNativo("sin mayus"));     // ""

// ------------------------------------------------------------
// 2. Duplicar letras
// ------------------------------------------------------------

// Básico: duplica todos los caracteres
function duplicarTodo(str) {
  return str.split("").map(c => c + c).join("");
}

// Bonus: solo duplica letras (no números ni símbolos)
function duplicarLetras(str) {
  return str.split("").map(c => /[a-zA-Z]/.test(c) ? c + c : c).join("");
}

console.log("\n2  →", duplicarTodo("hola"));     // "hhoollaa"
console.log("2+ →", duplicarLetras("a1b2!"));   // "aa1bb2!"
console.log("2+ →", duplicarLetras("JS 2025")); // "JJSS 2025"

// ------------------------------------------------------------
// 3. Palabra más frecuente
// ------------------------------------------------------------
function palabraMasFrecuente(frase) {
  const palabras = frase
    .toLowerCase()
    .replace(/[^a-záéíóúüñ\s]/gi, "")
    .split(/\s+/)
    .filter(Boolean);

  const frecuencias = palabras.reduce((acc, p) => {
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(frecuencias)
    .reduce((max, entrada) => entrada[1] > max[1] ? entrada : max, ["", 0])[0];
}

console.log("\n3 →", palabraMasFrecuente("el sol sale y el sol brilla")); // "el"
console.log("3 →", palabraMasFrecuente("Hola hola HOLA mundo"));         // "hola"
console.log("3 →", palabraMasFrecuente("uno dos tres uno dos uno"));      // "uno"

// ------------------------------------------------------------
// 4. Reemplazo circular de letras
// ------------------------------------------------------------
function reemplazarCircular(str) {
  return str.split("").map(c => {
    if (c >= "a" && c <= "z") return c === "z" ? "a" : String.fromCharCode(c.charCodeAt(0) + 1);
    if (c >= "A" && c <= "Z") return c === "Z" ? "A" : String.fromCharCode(c.charCodeAt(0) + 1);
    return c; // números y símbolos sin cambio
  }).join("");
}

console.log("\n4 →", reemplazarCircular("abc"));  // "bcd"
console.log("4 →", reemplazarCircular("xyz"));   // "yza"
console.log("4 →", reemplazarCircular("Az1!"));  // "Ba1!"
console.log("4 →", reemplazarCircular("Hello")); // "Ifmmp"

// ------------------------------------------------------------
// 5. Simulador de sueldo con bonus y retenciones
// ------------------------------------------------------------
function calcularSueldo(sueldoBase, tieneBonus, tieneHijos) {
  let sueldo = sueldoBase;
  if (tieneBonus) sueldo *= 1.10; // +10%
  if (tieneHijos) sueldo *= 0.95; // -5%
  sueldo *= 0.85;                 // -15% retención final
  return sueldo;
}

const neto = calcularSueldo(40000, true, true);
console.log(`\n5 → Tu sueldo final es $${neto.toLocaleString("es-AR")}`); // $38.250

// Versión interactiva (navegador):
// const base     = Number(prompt("Sueldo base:"));
// const bonus    = prompt("¿Tenés bonus? (sí/no)").toLowerCase() === "sí";
// const hijos    = prompt("¿Tenés hijos? (sí/no)").toLowerCase() === "sí";
// console.log(`Tu sueldo final es $${calcularSueldo(base, bonus, hijos).toLocaleString("es-AR")}`);

// ------------------------------------------------------------
// 6. Clasificador de clientes
// ------------------------------------------------------------
function clasificarCliente(compras, gasto) {
  if (compras > 10 && gasto > 50000)                              return "Premium";
  if ((compras >= 5 && compras <= 10) || (gasto >= 20000 && gasto <= 50000)) return "Regular";
  return "Nuevo";
}

console.log("\n6 →", clasificarCliente(12, 65000)); // "Premium"
console.log("6 →", clasificarCliente(7,  35000));  // "Regular"
console.log("6 →", clasificarCliente(3,  15000));  // "Nuevo"
console.log("6 →", clasificarCliente(2,  25000));  // "Regular" (por gasto)

// ------------------------------------------------------------
// 7. Calculadora de estadísticas
// ------------------------------------------------------------
function calcularEstadisticas(nums) {
  if (nums.length === 0) return null;

  const sorted   = [...nums].sort((a, b) => a - b);
  const min      = sorted[0];
  const max      = sorted[sorted.length - 1];
  const promedio = nums.reduce((acc, n) => acc + n, 0) / nums.length;

  // Mediana
  const mid     = Math.floor(sorted.length / 2);
  const mediana = sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];

  // Moda: el valor que más se repite (null si todos tienen la misma frecuencia)
  const freqs   = nums.reduce((acc, n) => { acc[n] = (acc[n] || 0) + 1; return acc; }, {});
  const maxFreq = Math.max(...Object.values(freqs));
  const conMaxFreq = Object.keys(freqs).filter(k => freqs[k] === maxFreq);
  const moda    = conMaxFreq.length === Object.keys(freqs).length ? null : Number(conMaxFreq[0]);

  return { min, max, promedio, moda, mediana };
}

console.log("\n7 →", calcularEstadisticas([1, 2, 3, 4, 5]));
// { min:1, max:5, promedio:3, moda:null, mediana:3 }
console.log("7 →", calcularEstadisticas([1, 2, 2, 3, 4]));
// { min:1, max:4, promedio:2.4, moda:2, mediana:2 }
console.log("7 →", calcularEstadisticas([2, 4, 4, 4, 5, 5, 7, 9]));
// { min:2, max:9, promedio:5, moda:4, mediana:4.5 }

// ------------------------------------------------------------
// 8. Compresión de texto simple
// ------------------------------------------------------------
function comprimirTexto(str) {
  if (str === "") return "";
  let resultado = "";
  let i = 0;
  while (i < str.length) {
    const char = str[i];
    let count = 1;
    while (i + count < str.length && str[i + count] === char) count++;
    resultado += char + count;
    i += count;
  }
  return resultado;
}

// Bonus: función inversa
function descomprimirTexto(str) {
  let resultado = "";
  let i = 0;
  while (i < str.length) {
    const char = str[i++];
    let numStr = "";
    while (i < str.length && !isNaN(str[i]) && str[i] !== " ") numStr += str[i++];
    resultado += char.repeat(Number(numStr) || 1);
  }
  return resultado;
}

console.log("\n8 →", comprimirTexto("aaabbc")); // "a3b2c1"
console.log("8 →", comprimirTexto("abcde"));   // "a1b1c1d1e1"
console.log("8 →", comprimirTexto(""));         // ""
console.log("8+ →", descomprimirTexto("a3b2c1")); // "aaabbc"
console.log("8+ →", descomprimirTexto("a1b1c1d1e1")); // "abcde"

// ------------------------------------------------------------
// 9. Detector de palíndromos
// ------------------------------------------------------------
function esPalindromo(frase) {
  const limpia  = frase.toLowerCase().replace(/[^a-záéíóúüñ]/gi, "");
  const inversa = limpia.split("").reverse().join("");
  return limpia === inversa;
}

console.log("\n9 →", esPalindromo("anita lava la tina")); // true
console.log("9 →", esPalindromo("reconocer"));           // true
console.log("9 →", esPalindromo("hola mundo"));          // false
console.log("9 →", esPalindromo("A man a plan a canal Panama")); // true

// ------------------------------------------------------------
// 10. Reemplazar con longitud
// ------------------------------------------------------------
function reemplazarPorLongitud(str) {
  return str.split(" ").map(palabra => palabra.length).join(" ");
}

console.log("\n10 →", reemplazarPorLongitud("Hola mundo cruel")); // "4 5 5"
console.log("10 →", reemplazarPorLongitud("Esto es JS"));        // "4 2 2"

// ------------------------------------------------------------
// 11. Reordenar letras por tipo
// ------------------------------------------------------------
function ordenarPorTipo(str) {
  const vocales     = str.split("").filter(c => /[aeiouáéíóú]/i.test(c));
  const consonantes = str.split("").filter(c => /[bcdfghjklmnñpqrstvwxyz]/i.test(c));
  const numeros     = str.split("").filter(c => /[0-9]/.test(c));
  const otros       = str.split("").filter(c => !/[a-záéíóúüñ0-9]/i.test(c));
  return [...vocales, ...consonantes, ...numeros, ...otros].join("");
}

console.log("\n11 →", ordenarPorTipo("Hola123!?")); // "oaHl123!?"
console.log("11 →", ordenarPorTipo("aB3!"));        // "aB3!"
console.log("11 →", ordenarPorTipo("JS 2025!"));    // "JS2025 !"

// ------------------------------------------------------------
// 12. Comprimir letras repetidas
// ------------------------------------------------------------
function comprimir(str) {
  if (str === "") return "";
  let resultado = "";
  let i = 0;
  while (i < str.length) {
    const char = str[i];
    let count = 1;
    while (i + count < str.length && str[i + count] === char) count++;
    resultado += char + count;
    i += count;
  }
  return resultado;
}

// Bonus: case-insensitive, resultado en minúscula
function comprimirInsensible(str) {
  if (str === "") return "";
  const lower = str.toLowerCase();
  let resultado = "";
  let i = 0;
  while (i < lower.length) {
    const char = lower[i];
    let count = 1;
    while (i + count < lower.length && lower[i + count] === char) count++;
    resultado += char + count;
    i += count;
  }
  return resultado;
}

console.log("\n12 →", comprimir("aaabbcaaa"));          // "a3b2c1a3"
console.log("12 →", comprimir("abcd"));                 // "a1b1c1d1"
console.log("12+ →", comprimirInsensible("AaaBBcc"));   // "a3b2c2"
console.log("12+ →", comprimirInsensible("AAAbbbCCCC")); // "a3b3c4"

// ------------------------------------------------------------
// 13. Validar formato de fecha DD/MM/AAAA
// ------------------------------------------------------------
function esFechaValida(str) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(str)) return false;

  const [dia, mes, anio] = str.split("/").map(Number);
  if (mes < 1 || mes > 12 || dia < 1 || dia > 31) return false;

  // Date detecta fechas inválidas como 31/02 ajustando el mes automáticamente
  const fecha = new Date(anio, mes - 1, dia);
  return (
    fecha.getFullYear() === anio  &&
    fecha.getMonth()    === mes - 1 &&
    fecha.getDate()     === dia
  );
}

console.log("\n13 →", esFechaValida("12/05/2020")); // true
console.log("13 →", esFechaValida("31/02/2020"));  // false
console.log("13 →", esFechaValida("01-01-2000"));  // false
console.log("13 →", esFechaValida("99/99/9999"));  // false
console.log("13 →", esFechaValida("29/02/2024"));  // true  (2024 es bisiesto)
console.log("13 →", esFechaValida("29/02/2023"));  // false (2023 no es bisiesto)

// ------------------------------------------------------------
// 14. Detección de palabras espejadas
// ------------------------------------------------------------
function esEspejo(palabra1, palabra2) {
  const a = palabra1.toLowerCase();
  const b = palabra2.toLowerCase();
  return a === b.split("").reverse().join("");
}

console.log("\n14 →", esEspejo("amor",  "roma"));  // true  ("amor" al revés = "roma")
console.log("14 →", esEspejo("abc",   "cba"));    // true
console.log("14 →", esEspejo("hola",  "mundo"));  // false
console.log("14 →", esEspejo("Level", "leveL"));  // true  (case-insensitive)

// ------------------------------------------------------------
// 15. Carácter más frecuente
// ------------------------------------------------------------
function masFrecuente(str) {
  const limpia = str.toLowerCase().replace(/\s/g, "");

  const freqs = {};
  for (const c of limpia) {
    if (/[a-z0-9]/.test(c)) freqs[c] = (freqs[c] || 0) + 1;
  }

  return Object.entries(freqs)
    .reduce((max, entrada) => entrada[1] > max[1] ? entrada : max, ["", 0])[0];
}

console.log("\n15 →", masFrecuente("aabbbccdd")); // "b"
console.log("15 →", masFrecuente("111223"));     // "1"
console.log("15 →", masFrecuente("abcd"));       // cualquiera (empate)
console.log("15 →", masFrecuente("Programacion JS")); // "o"

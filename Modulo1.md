# Módulo 1: Variables y tipos

## Preguntas Teóricas

1. ¿Qué significan los conceptos de scope, hoisting y mutabilidad en JavaScript? Explicá con ejemplos simples.

   - **Scope:** Es el alcance de una variable, es decir, desde dónde es visible y accesible. Puede ser global (toda la aplicación), de función (dentro de una función) o de bloque (dentro de `{}` con `let`/`const`).
   - **Hoisting:** JavaScript "eleva" las declaraciones al inicio de su contexto antes de ejecutar el código. Las funciones se elevan completamente; `var` se eleva como `undefined`; `let` y `const` se elevan pero no son accesibles hasta su declaración (Temporal Dead Zone).
   - **Mutabilidad:** Se refiere a si un valor puede cambiar después de ser creado. Los objetos y arrays son mutables; los tipos primitivos (string, number, boolean) son inmutables.

   ```javascript
   // Scope de bloque
   if (true) {
     let x = 10; // solo existe dentro de este bloque
   }
   // console.log(x); → ReferenceError

   // Mutabilidad: const no impide modificar el contenido de un objeto
   const user = { nombre: "Pepe" };
   user.nombre = "Juan"; // válido: el objeto es mutable
   // user = {};          // error: no se puede reasignar la referencia
   ```

2. ¿Qué diferencias hay entre `var`, `let` y `const` en cuanto a scope, hoisting y mutabilidad? ¿Cuándo usarías uno y cuándo otro?

   | | `var` | `let` | `const` |
   |---|---|---|---|
   | **Scope** | Función | Bloque | Bloque |
   | **Hoisting** | Sí (como `undefined`) | Sí (pero en TDZ) | Sí (pero en TDZ) |
   | **Re-declaración** | Permitida | No permitida | No permitida |
   | **Re-asignación** | Permitida | Permitida | No permitida |

   - Usá `const` por defecto para todo lo que no necesite cambiar su referencia.
   - Usá `let` para variables que necesiten ser reasignadas (contadores, acumuladores).
   - Evitá `var`: su scope de función y su hoisting generan comportamientos confusos.

3. ¿Qué pasa si intentás usar una variable declarada con `let` antes de su declaración? ¿Y con `var`?

   - Con `let`/`const`: lanza un `ReferenceError` porque la variable está en la **Temporal Dead Zone** desde el inicio del bloque hasta su declaración.
   - Con `var`: devuelve `undefined` debido al hoisting (la declaración se eleva, pero no el valor asignado).

   ```javascript
   console.log(a); // undefined  (var hace hoisting del nombre, no del valor)
   console.log(b); // ReferenceError: Cannot access 'b' before initialization
   var a = 5;
   let b = 10;
   ```

4. ¿Qué significa que JavaScript sea un lenguaje de tipado dinámico?

   Significa que no es necesario declarar el tipo de una variable al crearla, y que una misma variable puede cambiar de tipo durante la ejecución del programa.

   ```javascript
   let dato = 42;       // number
   dato = "hola";       // ahora es string
   dato = true;         // ahora es boolean
   ```

5. ¿Cuál es la diferencia entre `undefined` y `null` en JavaScript?

   - `undefined`: la variable fue declarada pero todavía no se le asignó ningún valor. Es el valor por defecto que JavaScript asigna automáticamente.
   - `null`: es un valor asignado de forma **intencional** por el programador para representar la ausencia de un objeto o valor.

   ```javascript
   let sinValor;          // undefined (JS lo asigna automáticamente)
   let sinObjeto = null;  // null (lo asignamos nosotros a propósito)
   ```

6. ¿Qué tipo de valor es `NaN` y en qué situaciones puede aparecer?

   Aunque su nombre significa "Not a Number", `typeof NaN` devuelve `"number"`. Aparece cuando una operación matemática no produce un número válido.

   ```javascript
   console.log(typeof NaN);   // "number"
   console.log("hola" * 2);   // NaN
   console.log(0 / 0);        // NaN
   console.log(parseInt("abc")); // NaN

   // Para verificar si un valor es NaN usá:
   console.log(isNaN("hola" * 2)); // true
   console.log(Number.isNaN(NaN)); // true (más preciso)
   ```

7. ¿Qué hace el operador `typeof` y qué valores puede devolver?

   Devuelve un string indicando el tipo del operando. Sus posibles valores son:

   | Expresión | Resultado |
   |---|---|
   | `typeof 42` | `"number"` |
   | `typeof "hola"` | `"string"` |
   | `typeof true` | `"boolean"` |
   | `typeof undefined` | `"undefined"` |
   | `typeof null` | `"object"` *(bug histórico)* |
   | `typeof {}` | `"object"` |
   | `typeof []` | `"object"` |
   | `typeof function(){}` | `"function"` |
   | `typeof Symbol()` | `"symbol"` |
   | `typeof 9n` | `"bigint"` |

8. ¿Qué diferencias hay entre usar comillas simples, dobles o backticks para strings?

   - **Comillas simples `'...'` y dobles `"..."`:** Son equivalentes para strings literales. La elección es de estilo; solo importa ser consistente.
   - **Backticks `` `...` `` (Template Literals):** Permiten interpolación de variables con `${}`, strings multilínea sin caracteres especiales, y expresiones dentro del string.

   ```javascript
   const nombre = "Sofi";

   console.log('Hola, ' + nombre);         // concatenación clásica
   console.log("Hola, " + nombre);         // idéntico
   console.log(`Hola, ${nombre}!`);        // template literal (más legible)
   console.log(`Resultado: ${2 + 3}`);     // expresiones dentro del string → "Resultado: 5"

   // Multilínea con backticks:
   const mensaje = `Línea uno
   Línea dos`;
   ```

9. ¿Por qué `typeof null` devuelve `"object"` y por qué se considera un bug histórico?

   En las primeras implementaciones de JavaScript, los valores se almacenaban en unidades de 32 bits donde los primeros bits indicaban el tipo. El código de tipo para objetos era `000`. Como `null` era el puntero nulo (todos los bits en cero), `typeof` lo interpretó incorrectamente como un objeto. Este bug nunca fue corregido para no romper la compatibilidad con los sitios web existentes.

   ```javascript
   console.log(typeof null); // "object" ← incorrecto, es un bug conocido

   // Para verificar si algo es null correctamente:
   const valor = null;
   console.log(valor === null); // true
   ```

---

## Preguntas Prácticas

### ¿Cómo probar el código en tu navegador?

1. Abrí Google Chrome.
2. Presioná `F12` o clic derecho > **Inspeccionar**.
3. Andá a la pestaña **Consola**.
4. Pegá ahí tu código y presioná `Enter` para ejecutarlo.

Para mostrar algo por pantalla usá `console.log("mensaje")`.
Para pedir un dato al usuario en la consola usá `prompt()`:

```javascript
const nombre = prompt("¿Cómo te llamás?");
console.log("Hola, " + nombre);
```

---

### 1. Tu primera línea en la consola

Mostrá tu nombre y edad usando `let` y `const`. Ejecutá este código en la consola del navegador:

```javascript
let nombre = "Sofi";
const edad = 22;

console.log("Hola, mi nombre es " + nombre + " y tengo " + edad + " años.");
```

Probá cambiar los valores. ¿Qué pasa si intentás reasignar `edad`?

---

### 2. Tres variables

Usando 3 variables (`nombre`, `profesion`, `ciudad`) mostrá este texto en consola:

```
Hola! Soy Sofi, programadora de Neuquén.
```

---

### 3. ¿Qué muestra por consola?

¿Qué muestra el siguiente código por consola? Explicá paso a paso por qué.

```javascript
console.log(a);
console.log(b);
var a = 5;
let b = 10;
```

---

### 4. ¿Qué tipo es?

Usá `typeof` para saber qué tipo de dato es cada uno de los siguientes valores. Después, confirmá tus respuestas ejecutando el código en la consola.

```javascript
typeof 123
typeof "hola"
typeof true
typeof undefined
typeof null
typeof NaN
typeof {}
typeof []
typeof function() {}

let dato = "123"; // probá cambiar por true, null, {}, etc.
console.log("El tipo de dato es: " + typeof dato);
```

¿Alguno te sorprendió? ¿Qué pasa con `null`, `NaN`, `[]` y `function`?

---

### 5. Conversor simple de temperatura

Convertí una temperatura en grados Celsius a Fahrenheit. Mostrá el resultado con un mensaje como `"25°C son 77°F"`.

```javascript
const celsius = 25;
const fahrenheit = // fórmula
console.log(); // Rellenar correctamente
```

¿Podés reescribir el código para que el usuario ingrese el dato de `celsius`?

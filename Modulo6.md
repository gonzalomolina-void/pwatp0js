# Módulo 6: Funciones Avanzadas y Callbacks

## Preguntas Teóricas

1. ¿Qué es una función de orden superior (higher-order function)?

   Es una función que cumple al menos una de estas condiciones:
   - **Recibe** una o más funciones como argumento.
   - **Devuelve** una función como resultado.

   Son el fundamento de la programación funcional en JavaScript. Los métodos `.map()`, `.filter()` y `.reduce()` son ejemplos clásicos.

   ```javascript
   // Recibe una función como argumento
   function aplicar(valor, fn) {
     return fn(valor);
   }
   console.log(aplicar(5, x => x * 2)); // 10

   // Devuelve una función como resultado
   function multiplicarPor(factor) {
     return (n) => n * factor;
   }
   const doble  = multiplicarPor(2);
   const triple = multiplicarPor(3);
   console.log(doble(4));  // 8
   console.log(triple(4)); // 12
   ```

2. ¿Qué es un callback y para qué se usa?

   Un **callback** es una función que se pasa como argumento a otra función para ser ejecutada más tarde: cuando la operación termine, cuando ocurra un evento, o para cada elemento de una colección.

   Se usa para:
   - Iterar arrays (`.forEach`, `.map`, etc.)
   - Manejar eventos del DOM (`addEventListener`)
   - Ejecutar código tras una operación asincrónica

   ```javascript
   // Callback en método de array
   const nums = [1, 2, 3];
   nums.forEach(n => console.log(n * 10)); // 10, 20, 30

   // Callback en función propia
   function ejecutarDespues(segundos, callback) {
     setTimeout(callback, segundos * 1000);
   }
   ejecutarDespues(2, () => console.log("¡Pasaron 2 segundos!"));
   ```

3. ¿Cuál es la diferencia entre una función normal y una arrow function?

   | | Función normal | Arrow function |
   |---|---|---|
   | **Sintaxis** | `function f(a) { return a; }` | `const f = a => a;` |
   | **Hoisting** | Sí (se puede llamar antes de declararla) | No (se comporta como `const`) |
   | **`this`** | Dinámico: depende de quién la llama | Léxico: hereda el `this` del contexto exterior |
   | **`arguments`** | Tiene objeto `arguments` | No tiene `arguments` |
   | **Como método** | Recomendada | No recomendada (pierde el `this` del objeto) |
   | **Como callback** | Funciona | Más concisa y predecible |

   ```javascript
   const obj = {
     valor: 42,
     normal() {
       console.log(this.valor); // 42 ✓ (this = obj)
     },
     arrow: () => {
       console.log(this.valor); // undefined ✗ (this = contexto exterior, no obj)
     }
   };
   ```

4. ¿Qué es el contexto de ejecución (`this`) en JavaScript?

   `this` es una referencia al **objeto que está ejecutando la función** en ese momento. Su valor depende de cómo se llama la función, no de dónde se declara.

   ```javascript
   // En el contexto global
   console.log(this); // window (en navegador) / {} (en Node)

   // Como método de un objeto
   const persona = {
     nombre: "Ana",
     saludar() {
       console.log(`Hola, soy ${this.nombre}`); // this = persona
     }
   };
   persona.saludar(); // "Hola, soy Ana"

   // Como función suelta (pierde el contexto)
   const fn = persona.saludar;
   fn(); // "Hola, soy undefined" (this ya no es persona)
   ```

5. ¿Cómo se maneja el contexto de ejecución en arrow functions?

   Las arrow functions **no tienen su propio `this`**. Capturan el `this` del scope léxico donde fueron definidas (el contexto en el momento de la creación, no de la llamada). Esto las hace ideales para callbacks dentro de métodos.

   ```javascript
   function Temporizador() {
     this.segundos = 0;

     // Sin arrow: this dentro del callback NO es el Temporizador
     setInterval(function() {
       this.segundos++; // ✗ this = window/undefined
     }, 1000);

     // Con arrow: this se hereda del constructor → sí es el Temporizador
     setInterval(() => {
       this.segundos++; // ✓ this = instancia de Temporizador
       console.log(this.segundos);
     }, 1000);
   }
   ```

6. ¿Qué es el closure en JavaScript?

   Un **closure** es la combinación de una función y el entorno léxico en el que fue declarada. Le permite a una función **recordar y acceder a variables de su scope exterior** incluso después de que ese scope haya terminado de ejecutarse.

   ```javascript
   function crearContador(inicio = 0) {
     let cuenta = inicio; // variable "privada"

     return {
       incrementar() { cuenta++; },
       decrementar() { cuenta--; },
       valor()       { return cuenta; }
     };
   }

   const c1 = crearContador(10);
   const c2 = crearContador(0);

   c1.incrementar();
   c1.incrementar();
   console.log(c1.valor()); // 12
   console.log(c2.valor()); // 0  (closure independiente)

   // 'cuenta' no es accesible desde afuera: está encapsulada
   ```

7. ¿Cuáles son las ventajas de usar callbacks?

   - **Flexibilidad:** permiten que una función sea reutilizable con distintos comportamientos según el callback que reciba.
   - **Separación de responsabilidades:** la función principal maneja la estructura; el callback define la lógica específica.
   - **Asincronía:** permiten ejecutar código tras completar una operación sin bloquear el hilo principal.
   - **Composición:** facilitan encadenar operaciones de forma declarativa.

   ```javascript
   // La misma función, comportamientos distintos según el callback
   function procesar(arr, fn) {
     return arr.map(fn);
   }

   console.log(procesar([1,2,3], n => n * 2));       // [2, 4, 6]
   console.log(procesar([1,2,3], n => n.toString())); // ["1", "2", "3"]
   console.log(procesar(["a","b"], s => s.toUpperCase())); // ["A", "B"]
   ```

8. ¿Qué es el callback hell y cómo se puede evitar?

   El **callback hell** (o "pirámide de la perdición") ocurre cuando se anidan múltiples callbacks, haciendo el código muy difícil de leer, mantener y depurar.

   ```javascript
   // Callback hell ✗
   obtenerUsuario(id, function(usuario) {
     obtenerPedidos(usuario.id, function(pedidos) {
       obtenerDetalle(pedidos[0].id, function(detalle) {
         calcularPrecio(detalle, function(precio) {
           console.log("Precio:", precio); // 4 niveles de anidación
         });
       });
     });
   });
   ```

   Se evita con:
   - **Promesas** (`.then().catch()`)
   - **`async/await`** (código asincrónico con apariencia sincrónica)
   - **Funciones nombradas** (extraer cada callback a una función separada)

   ```javascript
   // Con async/await ✓
   async function mostrarPrecio(id) {
     const usuario = await obtenerUsuario(id);
     const pedidos = await obtenerPedidos(usuario.id);
     const detalle = await obtenerDetalle(pedidos[0].id);
     const precio  = await calcularPrecio(detalle);
     console.log("Precio:", precio);
   }
   ```

9. ¿Qué es la composición de funciones?

   La **composición** es el proceso de combinar dos o más funciones para producir una nueva, donde la salida de una es la entrada de la siguiente. Permite construir operaciones complejas a partir de funciones simples y reutilizables.

   ```javascript
   const agregar  = s => s.trim();
   const mayuscula = s => s.toUpperCase();
   const exclamar = s => s + "!";

   // Composición manual (de derecha a izquierda)
   const transformar = s => exclamar(mayuscula(agregar(s)));
   console.log(transformar("  hola mundo  ")); // "HOLA MUNDO!"

   // Función auxiliar de composición genérica
   const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
   const pipeline = compose(exclamar, mayuscula, agregar);
   console.log(pipeline("  hola mundo  ")); // "HOLA MUNDO!"
   ```

10. ¿Qué es la currying y para qué se usa?

    El **currying** es la técnica de transformar una función que recibe múltiples argumentos en una serie de funciones que reciben un argumento a la vez. Cada llamada devuelve una nueva función esperando el siguiente argumento, hasta tener todos los necesarios.

    Se usa para:
    - Crear funciones **especializadas** a partir de una general.
    - **Composición** de funciones.
    - **Aplicación parcial** de argumentos.

    ```javascript
    // Función normal
    function sumar(a, b) { return a + b; }

    // Versión con currying
    const sumarCurried = a => b => a + b;

    const sumar5  = sumarCurried(5); // función especializada
    console.log(sumar5(3));  // 8
    console.log(sumar5(10)); // 15

    // Caso de uso real: filtros reutilizables
    const mayorQue = minimo => valor => valor > minimo;
    const esMayorDe18 = mayorQue(18);
    const esMayorDe65 = mayorQue(65);

    console.log([15, 20, 70, 10].filter(esMayorDe18)); // [20, 70]
    console.log([15, 20, 70, 10].filter(esMayorDe65)); // [70]
    ```

---

## Preguntas Prácticas

### 1. Filtrado de Pokémon

Creá una función `filtrarPokemon(pokemones, criterio)` que:
- Reciba un array de Pokémon y una función `criterio`.
- Devuelva un nuevo array con los Pokémon que cumplan el criterio.

```javascript
const pokemones = [
  { nombre: "Pikachu",    nivel: 20, tipo: "eléctrico" },
  { nombre: "Squirtle",   nivel: 15, tipo: "agua" },
  { nombre: "Charmander", nivel: 18, tipo: "fuego" }
];

filtrarPokemon(pokemones, p => p.nivel > 18);
filtrarPokemon(pokemones, p => p.tipo === "agua");
```

---

### 2. Reclutamiento de personajes

Creá una función `reclutar(personajes, criterio)` que:
- Reciba un array de personajes y una función `criterio`.
- Devuelva un nuevo array con los personajes que cumplan el criterio.

```javascript
const personajes = [
  { nombre: "Frodo",  raza: "Hobbit", valiente: true },
  { nombre: "Sam",    raza: "Hobbit", valiente: true },
  { nombre: "Gandalf",raza: "Mago",   valiente: true },
  { nombre: "Gollum", raza: "Hobbit", valiente: false }
];

reclutar(personajes, p => p.raza === "Hobbit" && p.valiente);
```

---

### 3. Laboratorio de Inventos

Creá una clase `Laboratorio` con los métodos `agregarInvento(nombre, efecto)` y `aplicarInvento(nombre, sujeto)`.

```javascript
class Laboratorio {
  constructor() { this.inventos = []; }

  agregarInvento(nombre, efecto) { /* ... */ }
  aplicarInvento(nombre, sujeto) { /* ... */ }
}

const lab    = new Laboratorio();
const sujeto = { vida: 100, inteligencia: 50 };

lab.agregarInvento("Ray Gun",             sujeto => sujeto.vida         -= 30);
lab.agregarInvento("Suero de Inteligencia", sujeto => sujeto.inteligencia += 50);

lab.aplicarInvento("Ray Gun",              sujeto);
lab.aplicarInvento("Suero de Inteligencia",sujeto);

console.log(sujeto); // { vida: 70, inteligencia: 100 }
```

---

### 4. Creación de Equipos (Closure)

Creá una función `crearEquipo(nombre)` que devuelva un objeto con métodos para agregar y listar miembros. Cada miembro tiene `nombre`, `fuerza` y una `habilidadEspecial`.

```javascript
const rebels = crearEquipo("Rebeldes");
rebels.agregar({ nombre: "Leia", fuerza: 70,
  habilidadEspecial: () => console.log("¡Estrategia diplomática!") });

rebels.usarHabilidadEspecial("Leia"); // "¡Estrategia diplomática!"
```

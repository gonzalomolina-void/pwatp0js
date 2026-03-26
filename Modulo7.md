# Módulo 7: Asincronía en JavaScript, Promesas y Async/Await

## Preguntas Teóricas

1. ¿Qué significa que JavaScript sea un lenguaje asincrónico y no bloqueante?

   JavaScript es **single-threaded**: tiene un único hilo de ejecución, por lo que solo puede hacer una cosa a la vez. Ser **no bloqueante** significa que puede iniciar una operación lenta (como una llamada a una API, un timer o lectura de archivo) y **continuar ejecutando el resto del código** sin esperar a que esa operación termine. Cuando la operación termina, su resultado se procesa más adelante.

   ```javascript
   console.log("1 - inicio");

   setTimeout(() => {
     console.log("3 - dentro del timeout (2 segundos después)");
   }, 2000);

   console.log("2 - sigue ejecutando sin esperar");

   // Salida:
   // 1 - inicio
   // 2 - sigue ejecutando sin esperar
   // 3 - dentro del timeout (2 segundos después)
   ```

2. ¿Qué es el Event Loop y qué rol cumple en la asincronía?

   El **Event Loop** es el mecanismo que coordina cuándo se ejecuta cada pieza de código. Funciona así:

   1. El **Call Stack** ejecuta el código sincrónico línea a línea.
   2. Las operaciones asincrónicas (timers, fetch, eventos) se delegan a las **Web APIs** del navegador.
   3. Cuando una operación termina, su callback va a la **Cola de tareas** (Task Queue).
   4. El Event Loop mira: si el Call Stack está **vacío**, toma el primer callback de la cola y lo ejecuta.

   ```
   Call Stack  →  Web APIs  →  Task Queue  →  (Event Loop)  →  Call Stack
   ```

   Las **microtareas** (`.then()` de promesas) tienen prioridad sobre las macrotareas (setTimeout), por lo que se ejecutan antes.

3. ¿Qué es una promesa (`Promise`) y cuáles son sus tres posibles estados?

   Una **Promise** es un objeto que representa el resultado eventual (éxito o fallo) de una operación asincrónica. Actúa como un "contrato": te promete que cuando termine, te avisará.

   | Estado | Significado |
   |--------|-------------|
   | **pending** | Estado inicial: la operación aún no terminó |
   | **fulfilled** | La operación completó con éxito (llama a `resolve`) |
   | **rejected** | La operación falló (llama a `reject`) |

   Una promesa solo puede pasar de `pending` a uno de los otros dos estados, y ese cambio es **irreversible**.

4. ¿Cómo se crea una promesa manualmente?

   Con el constructor `new Promise((resolve, reject) => { ... })`. Dentro del callback se ejecuta la lógica asincrónica: si tiene éxito se llama a `resolve(valor)`, si falla a `reject(error)`.

   ```javascript
   function esperar(ms) {
     return new Promise((resolve) => {
       setTimeout(() => resolve(`Esperé ${ms}ms`), ms);
     });
   }

   function dividir(a, b) {
     return new Promise((resolve, reject) => {
       if (b === 0) {
         reject(new Error("No se puede dividir por cero"));
       } else {
         resolve(a / b);
       }
     });
   }

   dividir(10, 2).then(console.log); // 5
   dividir(10, 0).catch(e => console.error(e.message)); // No se puede dividir por cero
   ```

5. ¿Cómo se maneja el resultado de una promesa usando `.then()` y `.catch()`?

   - **`.then(fn)`:** se ejecuta cuando la promesa se cumple. Recibe el valor resuelto. Se puede encadenar: cada `.then()` recibe lo que devuelve el anterior.
   - **`.catch(fn)`:** se ejecuta cuando la promesa es rechazada (o cuando ocurre un error en cualquier `.then()` previo).
   - **`.finally(fn)`:** se ejecuta siempre, sin importar el resultado.

   ```javascript
   fetch("https://swapi.dev/api/people/1/")
     .then(respuesta => respuesta.json())       // convierte a JSON
     .then(data => console.log(data.name))      // usa los datos → "Luke Skywalker"
     .catch(error => console.error("Falló:", error))
     .finally(() => console.log("Operación terminada"));
   ```

6. ¿Qué ventaja tiene `async/await` frente a `.then()`?

   `async/await` permite escribir código asincrónico con **apariencia sincrónica**, mejorando la legibilidad y facilitando el manejo de errores con `try/catch`.

   ```javascript
   // Con .then() (anidado, difícil de seguir)
   fetch("/api/usuario")
     .then(r => r.json())
     .then(usuario => fetch(`/api/pedidos/${usuario.id}`))
     .then(r => r.json())
     .then(pedidos => console.log(pedidos))
     .catch(console.error);

   // Con async/await (más legible, lineal)
   async function obtenerPedidos() {
     try {
       const rUsuario = await fetch("/api/usuario");
       const usuario  = await rUsuario.json();
       const rPedidos = await fetch(`/api/pedidos/${usuario.id}`);
       const pedidos  = await rPedidos.json();
       console.log(pedidos);
     } catch (error) {
       console.error(error);
     }
   }
   ```

7. ¿Qué ocurre si dentro de una función `async` ocurre un error y no se usa `try/catch`?

   La función `async` devuelve una **promesa rechazada**. Si ese rechazo no se maneja, se produce un `UnhandledPromiseRejection`, que en Node.js puede terminar el proceso y en el navegador genera una advertencia en consola.

   ```javascript
   async function fallar() {
     const data = await fetch("url-inexistente");
     return data.json();
   }

   // Sin manejo → promesa rechazada silenciosa (o advertencia)
   fallar();

   // Con manejo en el llamador
   fallar().catch(e => console.error("Capturado:", e));

   // Con try/catch dentro
   async function seguro() {
     try {
       const data = await fetch("url-inexistente");
       return data.json();
     } catch (e) {
       console.error("Error capturado dentro:", e);
     }
   }
   ```

8. ¿Qué hace `Promise.all()` y en qué casos puede fallar?

   `Promise.all(arrayDePromesas)` ejecuta **todas las promesas en paralelo** y devuelve una nueva promesa que se resuelve cuando **todas** terminan con éxito. El resultado es un array con los valores en el mismo orden.

   **Falla si cualquiera de las promesas es rechazada**: en ese caso, `Promise.all` se rechaza inmediatamente con el error de la primera promesa fallida (las demás se ignoran).

   ```javascript
   const p1 = fetch("https://swapi.dev/api/people/1/").then(r => r.json());
   const p2 = fetch("https://swapi.dev/api/people/2/").then(r => r.json());
   const p3 = fetch("https://swapi.dev/api/people/3/").then(r => r.json());

   Promise.all([p1, p2, p3])
     .then(([luke, c3po, r2d2]) => {
       console.log(luke.name, c3po.name, r2d2.name);
     })
     .catch(e => console.error("Alguna falló:", e));
   ```

9. ¿Cuál es la diferencia entre `Promise.all()` y `Promise.race()`?

   | | `Promise.all()` | `Promise.race()` |
   |---|---|---|
   | **Resuelve cuando** | **Todas** las promesas terminan con éxito | La **primera** promesa termina (éxito o error) |
   | **Rechaza cuando** | **Alguna** promesa falla | La primera en terminar falla |
   | **Resultado** | Array con todos los valores | El valor/error de la primera |
   | **Uso típico** | Cargar varios recursos en paralelo | Timeout, primera respuesta disponible |

   ```javascript
   const lento  = new Promise(resolve => setTimeout(() => resolve("lento"),  3000));
   const rapido = new Promise(resolve => setTimeout(() => resolve("rápido"), 1000));

   Promise.all([lento, rapido]).then(console.log);
   // → ["lento", "rápido"] (espera 3 segundos)

   Promise.race([lento, rapido]).then(console.log);
   // → "rápido" (espera solo 1 segundo)
   ```

10. ¿Qué es una función `async`? ¿Qué devuelve siempre?

    Una función declarada con `async` **siempre devuelve una `Promise`**, sin importar lo que retorne explícitamente. Si devuelve un valor, ese valor es envuelto automáticamente en una promesa resuelta. Permite usar `await` dentro de ella para "pausar" la ejecución hasta que una promesa se resuelva.

    ```javascript
    async function obtenerNombre() {
      return "Ana"; // equivalente a: return Promise.resolve("Ana")
    }

    // Devuelve una Promise, no el string directamente
    const resultado = obtenerNombre();
    console.log(resultado instanceof Promise); // true

    resultado.then(nombre => console.log(nombre)); // "Ana"

    // await solo puede usarse dentro de async
    async function principal() {
      const nombre = await obtenerNombre();
      console.log(nombre); // "Ana"
    }
    ```

---

## Preguntas Prácticas

> Estos ejercicios usan `setTimeout` para simular operaciones asincrónicas. Los ejercicios 1–4 corren en Node.js o en el navegador. El ejercicio 5 requiere el navegador (o Node.js 18+) por el uso de `fetch`.

---

### 1. Entrenador Pokémon con evolución

Creá la función `entrenarPokemon(nombrePokemon)` que devuelva una promesa que se resuelve en 2 segundos sumando `+1` al nivel del Pokémon. Luego encadenala con `.then(entrenar)` para aplicar entrenamientos adicionales. Si el Pokémon llega al nivel 3, mostrar `"¡Pikachu evolucionó a Raichu!"`.

```javascript
const pokemon = { nombre: "Pikachu", nivel: 2 };

entrenarPokemon("Pikachu")
  .then(entrenar)
  .then(entrenar)
  .then(entrenar)
  .catch(console.error);
```

---

### 2. Carga de datos galácticos

Creá `obtenerJedi(id)` (promesa con delay de 1 segundo) y `mostrarJedi(id)` (async/await). Si el ID es inválido, la promesa se rechaza y `mostrarJedi` captura el error con `try/catch`.

```javascript
// Salida esperada:
// Jedi encontrado: Obi-Wan (Maestro)
```

---

### 3. Jedi + prueba en el Templo

Usá `obtenerJedi(id)` y una función `evaluarPrueba(jedi)` que espere 3 segundos antes de mostrar el resultado según el nivel del Jedi. Todo con `async/await` y `try/catch`.

```javascript
// Si nivel === "Maestro":
// Anakin pasó la prueba con sabiduría.

// Si nivel === "Padawan":
// Anakin necesita más entrenamiento.
```

---

### 4. Evolución Pokémon con piedras

Creá `usarPiedraEvolutiva(pokemon, piedra)` que devuelva una promesa con 3 segundos de delay. Si es compatible, resuelve con el Pokémon evolucionado; si no, rechaza con un mensaje de error.

```javascript
const evoluciones = {
  Eevee:   { piedraFuego: "Flareon", piedraAgua: "Vaporeon", piedraTrueno: "Jolteon" },
  Pikachu: { piedraTrueno: "Raichu" }
};

// Uso:
intentarEvolucion({ nombre: "Eevee" }, "piedraFuego");
// → Eevee ha evolucionado a Flareon con la piedraFuego.

intentarEvolucion({ nombre: "Eevee" }, "piedraLunar");
// → Eevee no puede evolucionar con piedraLunar.
```

---

### 5. Misión final: Explorador Galáctico (SWAPI + fetch)

Usá la API pública de Star Wars: `https://swapi.dev/api/`

```javascript
// Ejemplo de fetch:
async function obtenerPersonajes() {
  const respuesta = await fetch("https://swapi.dev/api/people/");
  const data      = await respuesta.json();
  console.log(data.results); // array de personajes
}
```

**Recursos:**
- Personajes: `https://swapi.dev/api/people/`
- Planetas: `https://swapi.dev/api/planets/`
- Naves: `https://swapi.dev/api/starships/`
- Películas: `https://swapi.dev/api/films/`

> Los recursos están paginados (10 por página). Para obtener más, hay que seguir el campo `.next`.

**a.** Mostrar los primeros 5 personajes con nombre y altura:
```
Luke Skywalker - Altura: 172cm
```

**b.** Mostrar el planeta natal de Luke Skywalker (requiere un segundo `fetch` a la URL de `homeworld`):
```
Luke Skywalker vive en Tatooine
```

**c.** Mostrar todos los planetas con clima árido (con paginación, filtrar por `"arid"` en `climate`).

**d.** Mostrar la nave más grande comparando el campo `length`.
```
La nave más grande es: Executor (longitud: 19000)
```

**e.** Mostrar información completa de una película (ID 1: *A New Hope*): título, director, año y todos los personajes por nombre. Usar `Promise.all` para obtener los nombres en paralelo.

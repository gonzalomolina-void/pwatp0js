# Módulo 5: Ejercicios Avanzados con Arrays y Objetos

## Preguntas Teóricas

1. ¿Qué es la programación funcional y cómo se relaciona con los métodos de array en JavaScript?

   La **programación funcional** es un paradigma que trata la computación como evaluación de funciones matemáticas, evitando el cambio de estado y los datos mutables. Sus pilares son: funciones puras, inmutabilidad y composición.

   Los métodos de array como `.map()`, `.filter()` y `.reduce()` son herramientas funcionales porque:
   - Reciben una función como argumento (callback).
   - No modifican el array original (no tienen efectos secundarios).
   - Devuelven un nuevo valor.

   ```javascript
   const precios = [100, 200, 300];

   // Estilo imperativo (modifica estado)
   const conIVA = [];
   for (let i = 0; i < precios.length; i++) {
     conIVA.push(precios[i] * 1.21);
   }

   // Estilo funcional (sin mutar, más expresivo)
   const conIVA = precios.map(p => p * 1.21);
   ```

2. ¿Cuál es la diferencia entre `.map()`, `.filter()` y `.reduce()`?

   | Método | ¿Qué recibe? | ¿Qué devuelve? | Caso de uso |
   |--------|-------------|----------------|-------------|
   | `.map(fn)` | Cada elemento | Nuevo array del mismo tamaño, transformado | Transformar datos |
   | `.filter(fn)` | Cada elemento | Nuevo array solo con los que cumplen la condición | Filtrar datos |
   | `.reduce(fn, inicial)` | Acumulador + elemento | Un único valor acumulado | Sumar, contar, agrupar |

   ```javascript
   const nums = [1, 2, 3, 4, 5];

   const dobles  = nums.map(n => n * 2);          // [2, 4, 6, 8, 10]
   const pares   = nums.filter(n => n % 2 === 0); // [2, 4]
   const suma    = nums.reduce((acc, n) => acc + n, 0); // 15
   ```

3. ¿Qué es la inmutabilidad y por qué es importante en la programación funcional?

   La **inmutabilidad** significa que un valor no puede ser modificado después de crearse. En lugar de mutar el original, se crea una nueva copia con los cambios aplicados.

   Es importante porque:
   - El código es más **predecible**: una función no puede alterar datos que otra parte del programa esté usando.
   - Facilita el **testing**: las funciones puras siempre devuelven el mismo resultado para los mismos inputs.
   - Evita **bugs por efectos secundarios** accidentales.

   ```javascript
   const original = [1, 2, 3];

   // Mutable (modifica el original) ✗
   original.push(4);

   // Inmutable (crea una copia) ✓
   const nuevo = [...original, 4];
   console.log(original); // [1, 2, 3] → sin cambios
   console.log(nuevo);    // [1, 2, 3, 4]
   ```

4. ¿Cómo funcionan los callbacks en JavaScript? Explicá con un ejemplo.

   Un **callback** es una función que se pasa como argumento a otra función para ser ejecutada más tarde (cuando sea necesario o cuando termine una operación).

   ```javascript
   // La arrow function es el callback
   const numeros = [3, 1, 4, 1, 5];
   const dobles  = numeros.map(n => n * 2); // el callback se ejecuta por cada elemento

   // Callback nombrado (equivalente y más reutilizable)
   function duplicar(n) { return n * 2; }
   const dobles2 = numeros.map(duplicar);

   // Callback en funciones propias
   function aplicar(valor, transformacion) {
     return transformacion(valor);
   }
   console.log(aplicar(5, n => n ** 2)); // 25
   ```

5. ¿Qué es el método `.some()` y en qué casos se utiliza?

   `.some()` devuelve `true` si **al menos un elemento** del array cumple la condición del callback. Cortocircuita: deja de evaluar en cuanto encuentra el primero.

   Se usa cuando solo necesitás saber si existe un elemento que cumpla algo, sin necesitar cuál ni cuántos.

   ```javascript
   const edades = [15, 20, 14, 17];

   console.log(edades.some(e => e >= 18)); // true  (el 20 cumple)
   console.log(edades.some(e => e >= 30)); // false (ninguno cumple)

   // Comparación con otros métodos:
   // .some()   → ¿alguno cumple?     → boolean
   // .every()  → ¿todos cumplen?     → boolean
   // .find()   → devuelve el primero → elemento o undefined
   // .filter() → devuelve todos      → array
   ```

6. ¿Qué es el método `.find()` y cómo se diferencia de `.filter()`?

   - `.find()` devuelve el **primer elemento** que cumple la condición, o `undefined` si no hay ninguno.
   - `.filter()` devuelve un **nuevo array** con **todos** los elementos que cumplen la condición.

   ```javascript
   const usuarios = [
     { id: 1, nombre: "Ana" },
     { id: 2, nombre: "Beto" },
     { id: 3, nombre: "Ana" }
   ];

   // find → primer elemento
   const uno = usuarios.find(u => u.nombre === "Ana");
   console.log(uno); // { id: 1, nombre: "Ana" }

   // filter → todos los que cumplen
   const todos = usuarios.filter(u => u.nombre === "Ana");
   console.log(todos); // [{ id: 1, ... }, { id: 3, ... }]
   ```

   > Usá `.find()` cuando buscás por ID u otro campo único. Usá `.filter()` cuando puede haber más de un resultado.

7. ¿Cómo se puede combinar `.map()` con `.filter()` para transformar y filtrar datos?

   Se encadenan: primero se filtra (para trabajar con menos elementos) y luego se transforma, o al revés según la necesidad.

   ```javascript
   const usuarios = [
     { nombre: "Ana",  activo: true,  edad: 25 },
     { nombre: "Beto", activo: false, edad: 30 },
     { nombre: "Caro", activo: true,  edad: 22 }
   ];

   // Solo nombres de usuarios activos
   const nombresActivos = usuarios
     .filter(u => u.activo)
     .map(u => u.nombre);
   // ["Ana", "Caro"]

   // Edades de mayores de 23 con 10% de descuento en precio
   const precios = [{ nombre: "A", precio: 100, stock: 5 }, { nombre: "B", precio: 200, stock: 0 }];
   const oferta = precios
     .filter(p => p.stock > 0)
     .map(p => ({ ...p, precio: p.precio * 0.9 }));
   ```

8. ¿Qué es la desestructuración de arrays y para qué sirve?

   Permite **extraer valores de un array** y asignarlos a variables en una sola línea, por posición.

   ```javascript
   const coords = [40.7128, -74.0060, 10];

   // Sin desestructuración
   const lat = coords[0];
   const lng = coords[1];

   // Con desestructuración
   const [lat, lng, altitud] = coords;

   // Saltar posiciones
   const [primero, , tercero] = [1, 2, 3]; // primero=1, tercero=3

   // Con valor por defecto
   const [a, b = 99] = [1];  // a=1, b=99

   // Intercambiar valores sin variable auxiliar
   let x = 1, y = 2;
   [x, y] = [y, x]; // x=2, y=1
   ```

9. ¿Cómo se puede usar el operador spread `(...)` con arrays?

   Spread "esparce" los elementos de un array. Sus usos más comunes:

   ```javascript
   const a = [1, 2, 3];
   const b = [4, 5, 6];

   // Copiar un array (sin mutarlo)
   const copia = [...a]; // [1, 2, 3]

   // Concatenar arrays
   const union = [...a, ...b]; // [1, 2, 3, 4, 5, 6]

   // Agregar elementos al principio o al final (sin mutar)
   const conCero    = [0, ...a];     // [0, 1, 2, 3]
   const conSiete   = [...a, 7];     // [1, 2, 3, 7]

   // Pasar elementos como argumentos de función
   const numeros = [3, 1, 4, 1, 5];
   console.log(Math.max(...numeros)); // 5

   // Eliminar duplicados
   const sinDuplicados = [...new Set([1, 2, 2, 3, 3])]; // [1, 2, 3]
   ```

10. ¿Qué es el método `.flatMap()` y en qué casos es útil?

    `.flatMap()` es la combinación de `.map()` seguido de `.flat(1)`: transforma cada elemento y aplana un nivel el resultado. Es útil cuando el callback devuelve arrays y querés un solo array resultado en lugar de un array de arrays.

    ```javascript
    const oraciones = ["Hola mundo", "JavaScript es genial"];

    // map normal → array de arrays
    const palabrasAnidadas = oraciones.map(o => o.split(" "));
    // [["Hola", "mundo"], ["JavaScript", "es", "genial"]]

    // flatMap → aplana un nivel
    const palabras = oraciones.flatMap(o => o.split(" "));
    // ["Hola", "mundo", "JavaScript", "es", "genial"]

    // Otro caso: generar múltiples elementos por item
    const precios = [10, 20, 30];
    const conIVA  = precios.flatMap(p => [p, p * 1.21]);
    // [10, 12.1, 20, 24.2, 30, 36.3]
    ```

---

## Preguntas Prácticas

### 1. Base de datos en memoria

A partir de este punto vas a trabajar con una base de datos simulada que representa información sobre películas, directores, géneros, críticas y críticos.

Esta base está guardada como un objeto JavaScript llamado `basededatos`, que contiene arrays con información estructurada. Todos los ejercicios se resuelven usando métodos de array como `.map()`, `.filter()`, `.find()`, `.some()`, `.reduce()`, etc.

**Ejemplo de acceso a los datos:**
```javascript
console.log(basededatos.peliculas);      // lista de películas
console.log(basededatos.calificaciones); // lista de críticas
```

#### Estructura de la base de datos

**`peliculas`** — cada película tiene:
- `id`: número único identificador
- `nombre`: string
- `anio`: año de estreno
- `direccionSetFilmacion`: objeto con `calle`, `numero` y `pais`
- `directores`: array de IDs → referencia a `directores`
- `generos`: array de IDs → referencia a `generos`

**`directores`** — `id`, `nombre`

**`generos`** — `id`, `nombre` (como `"Acción"`, `"Comedia"`)

**`criticos`** — `id`, `nombre`, `edad`, `pais`

**`calificaciones`** — `critico` (ID), `pelicula` (ID), `puntuacion` (1–10)

```javascript
const basededatos = {
  peliculas: [
    {
      id: 1, nombre: "Matrix", anio: 1999,
      direccionSetFilmacion: { calle: "Fox Studios", numero: 1, pais: "Australia" },
      directores: [1, 2], generos: [1, 2]
    }
  ],
  directores: [{ id: 1, nombre: "Lilly Wachowski" }],
  generos:    [{ id: 1, nombre: "Ciencia Ficción" }, { id: 2, nombre: "Acción" }],
  criticos:   [{ id: 1, nombre: "Pipo Gorosito", edad: 60, pais: "Argentina" }],
  calificaciones: [{ critico: 1, pelicula: 1, puntuacion: 8 }]
};
```

> Completar la base con la mayor cantidad de objetos reales posibles. Ver `Modulo5.js` para la versión completa.

---

### 2. Ejercicios sobre la BD

**2.1.** Promedio de años de estreno → `promedioAnioEstreno()`

**2.2.** Películas con promedio de crítica mayor a X → `peliculasConCriticaPromedioMayorA(7)`

**2.3.** Películas de un director → `peliculasDeUnDirector("Steven Spielberg")`

**2.4.** Promedio de crítica por ID de película → `promedioDeCriticaByPeliculaId(3)`

**2.5.** Películas con al menos una crítica ≥ 9 → `peliculasConCriticaExcelente()`

**2.6.** Información expandida de una película (directores, géneros y críticas con datos completos del crítico) → `infoExpandidaDePelicula("Matrix")`

**2.7.** Películas por país de filmación → `peliculasPorPais("Nueva Zelanda")`

**2.8.** Directores con al menos una película → `directoresConPeliculas()`

**2.9.** Géneros más frecuentes → `generosFrecuentes()` → `[{ genero, cantidad }]`

**2.10.** Promedio de puntuación por crítico → `promedioPorCritico()` → `[{ nombre, promedio }]`

**2.11.** Películas con más de un director → `peliculasConMultiplesDirectores()`

**2.12.** Top 3 películas mejor calificadas → `top3Peliculas()`

**2.13.** Cantidad de películas por director → `peliculasPorDirector()` → `[{ nombre, cantidad }]`

**2.14.** Críticos que no puntuaron ninguna película → `criticosSinCalificaciones()`

**2.15.** 💀 Informe completo por país de origen del crítico → `informePorPaisDelCritico()`
```javascript
[{ pais, cantidadCriticas, promedio, peliculasCriticadas: [...] }]
```

---

### 3. Simulador de combate Pokémon con datos estructurados

```javascript
const pikachu = { nombre: "Pikachu", vida: 100, ataque: 40, defensa: 25 };
```

Creá una función `turnoDeAtaque(atacante, defensor)` que:
- Calcule el daño con `calcularDanio(atacante.ataque, defensor.defensa, critico)`
- Reste ese daño a `defensor.vida`
- Muestre un mensaje con el resultado del turno
- El crítico se genera al azar (50% chance)

Simulá 3 turnos alternando ataques entre Pikachu y Charmander.

**Bonus:** si un Pokémon llega a 0 de vida, mostrar `"¡[nombre] ha sido derrotado!"`

---

### 4. Sistema de ataques múltiples por Pokémon

```javascript
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
```

Creá una función `usarAtaque(pokemon, ataqueNombre, enemigo)` que:
- Busque el ataque por nombre en `pokemon.ataques`
- Genere un crítico aleatorio
- Calcule el daño con `calcularDanio`
- Reste la vida del enemigo y muestre:

```
¡Charizard usó Lanzallamas contra Pikachu! Causó 45 de daño.
```

Si el ataque no existe: `"Ese ataque no está disponible."`

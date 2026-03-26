# Módulo 4: Arrays, Listas y Objetos

## Preguntas Teóricas

1. ¿Qué es un array en JavaScript y cómo se declara?

   Un array es una **lista ordenada de valores** (de cualquier tipo). Se declara con corchetes `[]`, separando los elementos con comas. Cada elemento tiene un índice numérico que empieza en `0`.

   ```javascript
   const frutas   = ["manzana", "banana", "naranja"];
   const numeros  = [1, 2, 3, 4, 5];
   const mixto    = [1, "hola", true, null];  // puede mezclar tipos
   const vacio    = [];
   ```

2. ¿Cómo accedés al tercer elemento de un array?

   Usando el índice `2` (los índices arrancan en `0`):

   ```javascript
   const frutas = ["manzana", "banana", "naranja"];
   console.log(frutas[2]); // "naranja"
   ```

3. ¿Qué métodos de array son los más comunes en JavaScript? Explicá para qué sirve cada uno y cómo podrías usarlos para recorrer, agregar o quitar elementos.

   | Método | Qué hace |
   |--------|----------|
   | `push(x)` | Agrega `x` al **final** |
   | `pop()` | Elimina y devuelve el **último** elemento |
   | `unshift(x)` | Agrega `x` al **inicio** |
   | `shift()` | Elimina y devuelve el **primer** elemento |
   | `forEach(fn)` | Recorre cada elemento ejecutando `fn` |
   | `indexOf(x)` | Devuelve el índice de `x` o `-1` si no existe |
   | `includes(x)` | Devuelve `true` si `x` está en el array |
   | `splice(i, n)` | Elimina `n` elementos desde el índice `i` |
   | `slice(i, j)` | Devuelve una copia del tramo entre `i` y `j` |
   | `join(sep)` | Une todos los elementos en un string |
   | `reverse()` | Invierte el array en el lugar |
   | `sort()` | Ordena el array (por defecto, como strings) |
   | `length` | Propiedad: cantidad de elementos |

   ```javascript
   const arr = [1, 2, 3];

   arr.push(4);       // [1, 2, 3, 4]
   arr.pop();         // [1, 2, 3]
   arr.unshift(0);    // [0, 1, 2, 3]
   arr.shift();       // [1, 2, 3]

   arr.forEach(n => console.log(n)); // 1, 2, 3
   ```

4. ¿Qué método usarías para eliminar el último elemento de un array? ¿Y el primero?

   - **Último:** `pop()` — elimina y retorna el último elemento.
   - **Primero:** `shift()` — elimina y retorna el primer elemento.

   ```javascript
   const arr = ["a", "b", "c", "d"];

   const ultimo   = arr.pop();   // "d" → arr queda ["a", "b", "c"]
   const primero  = arr.shift(); // "a" → arr queda ["b", "c"]
   ```

5. ¿Qué pasa si accedés a una posición inexistente en un array?

   Devuelve `undefined`. No lanza un error.

   ```javascript
   const arr = [10, 20, 30];
   console.log(arr[5]);  // undefined
   console.log(arr[-1]); // undefined (JS no soporta índices negativos como Python)
   ```

6. ¿Cómo verificás si un valor está presente en un array o en un Set?

   - **Array:** con `includes()` (booleano) o `indexOf()` (posición o `-1`).
   - **Set:** con el método `has()`.

   ```javascript
   const arr = [1, 2, 3, 4];
   console.log(arr.includes(3));   // true
   console.log(arr.indexOf(3));    // 2
   console.log(arr.includes(99));  // false

   const conjunto = new Set([1, 2, 3]);
   console.log(conjunto.has(2));   // true
   console.log(conjunto.has(99));  // false
   ```

7. ¿Qué es un `Set`? ¿En qué casos conviene usarlo en lugar de un array?

   Un `Set` es una colección de valores **únicos** (no admite duplicados). A diferencia de un array, no está indexado; su fortaleza está en verificar pertenencia de forma muy eficiente.

   Conviene usarlo cuando:
   - Necesitás **eliminar duplicados** de una lista.
   - Solo te importa si un valor **está o no está** (sin importar el orden o índice).

   ```javascript
   const set = new Set([1, 2, 2, 3, 3, 3]);
   console.log(set); // Set {1, 2, 3}  → duplicados eliminados

   set.add(4);
   set.delete(1);
   console.log(set.has(2)); // true
   console.log(set.size);   // 3

   // Truco para eliminar duplicados de un array:
   const sinDuplicados = [...new Set([1, 2, 2, 3, 3])]; // [1, 2, 3]
   ```

8. ¿Qué es un `Map` y qué lo diferencia de un objeto?

   Un `Map` es una colección de pares **clave → valor**, similar a un objeto, pero con diferencias importantes:

   | | Objeto `{}` | `Map` |
   |---|---|---|
   | **Tipo de clave** | Solo strings o Symbols | Cualquier tipo (objetos, números, etc.) |
   | **Orden** | No garantizado | Mantiene el orden de inserción |
   | **Performance** | Menor para adiciones/eliminaciones frecuentes | Mayor |
   | **Tamaño** | `Object.keys(obj).length` | `map.size` |
   | **Iteración** | `for...in`, `Object.entries()` | `for...of`, `.forEach()` |

   ```javascript
   const mapa = new Map();
   mapa.set("nombre", "Ana");
   mapa.set(42, "la respuesta");
   mapa.set(true, "booleano como clave");

   console.log(mapa.get("nombre")); // "Ana"
   console.log(mapa.size);          // 3
   console.log(mapa.has(42));       // true
   mapa.delete(42);
   ```

9. ¿Cómo recorrerías un array con un bucle? Mostrá al menos dos formas diferentes.

   ```javascript
   const frutas = ["manzana", "banana", "naranja"];

   // 1. for clásico (con acceso al índice)
   for (let i = 0; i < frutas.length; i++) {
     console.log(i, frutas[i]);
   }

   // 2. for...of (más legible, acceso al valor directamente)
   for (const fruta of frutas) {
     console.log(fruta);
   }

   // 3. forEach (funcional, con callback)
   frutas.forEach((fruta, indice) => {
     console.log(indice, fruta);
   });
   ```

10. ¿Qué es un objeto en JavaScript y cómo se declara?

    Un objeto es una colección de **pares clave: valor** que agrupa datos y comportamiento relacionados. Se declara con llaves `{}`.

    ```javascript
    const persona = {
      nombre:   "Ana",
      edad:     25,
      ciudad:   "Neuquén",
      saludar() {
        console.log(`Hola, soy ${this.nombre}`);
      }
    };
    ```

11. ¿Cuál es la diferencia entre acceder a una propiedad con `.` y con `[]`?

    - **Punto `.`:** sintaxis más legible; requiere conocer el nombre exacto de la propiedad al momento de escribir el código.
    - **Corchetes `[]`:** permiten usar una variable o expresión como clave, y son necesarios cuando el nombre tiene caracteres especiales o espacios.

    ```javascript
    const obj = { nombre: "Ana", "primer apellido": "García" };

    console.log(obj.nombre);              // "Ana" ✓
    console.log(obj["nombre"]);           // "Ana" ✓

    const clave = "nombre";
    console.log(obj[clave]);              // "Ana" ✓ (con variable)
    console.log(obj["primer apellido"]);  // "García" ✓ (clave con espacio)
    // console.log(obj.primer apellido);  // ✗ SyntaxError
    ```

12. ¿Qué sucede si intentás acceder a una propiedad que no existe en un objeto?

    Devuelve `undefined`. No lanza un error, a menos que intentes acceder a una propiedad de ese `undefined`.

    ```javascript
    const obj = { nombre: "Ana" };

    console.log(obj.edad);        // undefined
    console.log(obj.edad.años);   // TypeError: Cannot read properties of undefined
    ```

    Para evitar el error se puede usar el operador de encadenamiento opcional `?.`:
    ```javascript
    console.log(obj.edad?.años);  // undefined (sin error)
    ```

13. ¿Cómo agregás, modificás y eliminás propiedades en un objeto?

    ```javascript
    const persona = { nombre: "Ana", edad: 25 };

    // Agregar
    persona.ciudad = "Neuquén";

    // Modificar
    persona.edad = 26;

    // Eliminar
    delete persona.ciudad;

    console.log(persona); // { nombre: "Ana", edad: 26 }
    ```

14. ¿Qué es un objeto anidado? Mostrá un ejemplo.

    Es un objeto que tiene como valor de alguna de sus propiedades **otro objeto** (o un array de objetos). Permite representar estructuras de datos más complejas y jerárquicas.

    ```javascript
    const alumno = {
      nombre: "Sofi",
      edad:   22,
      direccion: {
        calle:    "Av. Argentina",
        numero:   1400,
        ciudad:   "Neuquén"
      },
      materias: ["Matemática", "Programación", "Inglés"]
    };

    console.log(alumno.direccion.ciudad); // "Neuquén"
    console.log(alumno.materias[1]);      // "Programación"
    ```

15. ¿Cómo se recorren las propiedades de un objeto? ¿Para qué sirve `for...in`?

    `for...in` itera sobre las **claves** de un objeto (sus nombres de propiedades). Para cada clave se puede acceder al valor con `obj[clave]`.

    ```javascript
    const persona = { nombre: "Ana", edad: 25, ciudad: "Neuquén" };

    for (const clave in persona) {
      console.log(`${clave}: ${persona[clave]}`);
    }
    // nombre: Ana
    // edad: 25
    // ciudad: Neuquén
    ```

    > Nota: `for...in` también itera propiedades heredadas del prototipo. Para evitarlo se puede usar `Object.keys()` con `for...of`.

16. ¿Qué devuelven `Object.keys()`, `Object.values()` y `Object.entries()`?

    | Método | Devuelve |
    |--------|---------|
    | `Object.keys(obj)` | Array con los **nombres** de las propiedades |
    | `Object.values(obj)` | Array con los **valores** de las propiedades |
    | `Object.entries(obj)` | Array de pares `[clave, valor]` |

    ```javascript
    const persona = { nombre: "Ana", edad: 25, ciudad: "Neuquén" };

    console.log(Object.keys(persona));
    // ["nombre", "edad", "ciudad"]

    console.log(Object.values(persona));
    // ["Ana", 25, "Neuquén"]

    console.log(Object.entries(persona));
    // [["nombre", "Ana"], ["edad", 25], ["ciudad", "Neuquén"]]

    // Caso de uso: recorrer con for...of
    for (const [clave, valor] of Object.entries(persona)) {
      console.log(`${clave}: ${valor}`);
    }
    ```

17. ¿Qué diferencia hay entre un array y un objeto en cuanto a estructura y uso?

    | | Array | Objeto |
    |---|---|---|
    | **Claves** | Índices numéricos (0, 1, 2…) | Strings o Symbols |
    | **Orden** | Garantizado | No garantizado (aunque en la práctica se mantiene) |
    | **Uso típico** | Listas de elementos del mismo tipo | Entidades con propiedades nombradas |
    | **Verificar tipo** | `Array.isArray(arr)` | `typeof obj === "object"` |

    ```javascript
    // Array: lista ordenada de items
    const colores = ["rojo", "verde", "azul"];

    // Objeto: entidad con atributos
    const auto = { marca: "Ford", modelo: "Focus", año: 2020 };
    ```

    > En JavaScript, los arrays son objetos especializados (`typeof [] === "object"`), por eso se usa `Array.isArray()` para distinguirlos.

18. ¿Qué es la desestructuración de objetos y para qué sirve?

    La desestructuración permite **extraer propiedades de un objeto** y asignarlas a variables locales de forma compacta, en una sola línea.

    ```javascript
    const persona = { nombre: "Ana", edad: 25, ciudad: "Neuquén" };

    // Sin desestructuración
    const nombre = persona.nombre;
    const edad   = persona.edad;

    // Con desestructuración
    const { nombre, edad } = persona;

    // Con alias (renombrar la variable)
    const { nombre: nombreCompleto } = persona;
    console.log(nombreCompleto); // "Ana"

    // Con valor por defecto
    const { pais = "Argentina" } = persona;
    console.log(pais); // "Argentina" (la propiedad no existe, usa el default)

    // En parámetros de función
    function saludar({ nombre, edad }) {
      console.log(`Hola ${nombre}, tenés ${edad} años.`);
    }
    saludar(persona);
    ```

19. ¿Cómo se usan los operadores spread `(...)` y rest `(...)` con objetos?

    Aunque usan la misma sintaxis `...`, tienen usos distintos según el contexto:

    - **Spread:** "esparce" las propiedades de un objeto dentro de otro. Útil para copiar o fusionar objetos.
    - **Rest:** agrupa las propiedades restantes de una desestructuración en un nuevo objeto.

    ```javascript
    const base = { nombre: "Ana", edad: 25 };

    // Spread: copiar un objeto
    const copia = { ...base };

    // Spread: fusionar objetos (el último gana en caso de conflicto)
    const extra   = { ciudad: "Neuquén", edad: 30 };
    const fusión  = { ...base, ...extra };
    console.log(fusión); // { nombre: "Ana", edad: 30, ciudad: "Neuquén" }

    // Spread: sobrescribir una sola propiedad sin mutar el original
    const actualizado = { ...base, edad: 26 };
    console.log(actualizado); // { nombre: "Ana", edad: 26 }
    console.log(base);        // { nombre: "Ana", edad: 25 } → sin cambios

    // Rest: capturar el resto tras desestructurar
    const { nombre, ...resto } = fusión;
    console.log(nombre); // "Ana"
    console.log(resto);  // { edad: 30, ciudad: "Neuquén" }
    ```

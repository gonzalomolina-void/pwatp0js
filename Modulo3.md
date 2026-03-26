# Módulo 3: Funciones y Scope

## Preguntas Teóricas

1. ¿Cómo se declara una función en JavaScript? ¿Cuál es la diferencia con una arrow function? ¿Qué pasa si llamás a una función antes de declararla con `function`? ¿Y si es una arrow function?

   **Declaración tradicional:**
   ```javascript
   function saludar(nombre) {
     return "Hola, " + nombre;
   }
   ```

   **Arrow function:**
   ```javascript
   const saludar = (nombre) => "Hola, " + nombre;
   ```

   Diferencias clave:

   | | `function` | Arrow function |
   |---|---|---|
   | **Hoisting** | Sí, completo | No (se comporta como `const`) |
   | **`this`** | Depende de quién la llama | Hereda el `this` del contexto exterior |
   | **Sintaxis** | Más verbosa | Más compacta |

   ```javascript
   // Funciona: hoisting completo
   console.log(suma(2, 3)); // 5
   function suma(a, b) { return a + b; }

   // Error: la variable no fue inicializada todavía
   console.log(restar(5, 2)); // ReferenceError
   const restar = (a, b) => a - b;
   ```

2. ¿Qué diferencia hay entre una función que retorna un valor y una que no?

   Toda función devuelve algo. Si no usás `return`, devuelve `undefined` automáticamente. La diferencia es si ese valor es útil para el código que la llamó.

   ```javascript
   function saludar(nombre) {
     console.log("Hola, " + nombre); // solo produce un efecto
   }

   function sumar(a, b) {
     return a + b; // devuelve un valor utilizable
   }

   const resultado = sumar(3, 4);  // 7 → podemos usarlo
   const nada      = saludar("Ana"); // undefined → no hay valor para usar
   ```

3. ¿Qué es el scope? ¿Qué diferencia hay entre una variable global y una local?

   El **scope** (alcance) define desde dónde es visible y accesible una variable.

   - **Global:** declarada fuera de cualquier función o bloque. Accesible desde cualquier parte del código.
   - **Local:** declarada dentro de una función o bloque `{}`. Solo existe dentro de ese contexto.

   ```javascript
   const global = "soy global"; // accesible en todo el código

   function ejemplo() {
     const local = "soy local"; // solo existe dentro de esta función
     console.log(global); // ✓ puede acceder a la variable global
     console.log(local);  // ✓
   }

   console.log(global); // ✓
   console.log(local);  // ✗ ReferenceError: local is not defined
   ```

4. ¿Qué pasa si una función accede a una variable que no fue declarada dentro de ella?

   JavaScript busca la variable en el **scope exterior** inmediato, luego en el siguiente, y así hasta llegar al scope global. Esto se llama **cadena de scope** (scope chain). Si no la encuentra en ningún nivel, lanza un `ReferenceError`.

   ```javascript
   const mensaje = "Hola desde afuera";

   function mostrar() {
     // 'mensaje' no está declarada aquí, JS la busca hacia afuera
     console.log(mensaje); // "Hola desde afuera" ✓
   }

   mostrar();
   ```

5. ¿Qué es un closure? ¿Podés explicarlo con un ejemplo simple?

   Un **closure** es la combinación de una función y el entorno léxico en el que fue declarada. Permite que una función "recuerde" y acceda a las variables de su scope exterior incluso después de que esa función exterior haya terminado de ejecutarse.

   ```javascript
   function crearContador() {
     let cuenta = 0; // variable privada

     return function () {
       cuenta++;
       console.log("Contador:", cuenta);
     };
   }

   const incrementar = crearContador();
   incrementar(); // Contador: 1
   incrementar(); // Contador: 2
   incrementar(); // Contador: 3

   // 'cuenta' no es accesible desde afuera, pero la función interna
   // la recuerda gracias al closure.
   ```

6. ¿Qué pasa si una función se llama a sí misma? ¿Cómo se llama eso?

   Se llama **recursión**. La función se invoca a sí misma formando un bucle. Es obligatorio definir una **condición de corte** (caso base), de lo contrario la función se llama infinitamente hasta causar un error de `Maximum call stack size exceeded` (Stack Overflow).

   ```javascript
   function factorial(n) {
     if (n <= 1) return 1;       // caso base: corta la recursión
     return n * factorial(n - 1); // llamada recursiva
   }

   console.log(factorial(5)); // 5 * 4 * 3 * 2 * 1 = 120
   ```

7. ¿Qué pasa si una función tiene múltiples parámetros (4 por ejemplo) pero se llama con menos (3)?

   El parámetro faltante toma el valor `undefined`. Esto no genera un error por sí solo, pero puede producir resultados inesperados si el código intenta operar con ese valor.

   ```javascript
   function info(nombre, edad, ciudad, profesion) {
     console.log(nombre, edad, ciudad, profesion);
   }

   info("Ana", 25, "Neuquén");
   // → "Ana" 25 "Neuquén" undefined

   // Para evitarlo, se pueden usar valores por defecto:
   function infoConDefault(nombre, edad, ciudad, profesion = "sin especificar") {
     console.log(nombre, edad, ciudad, profesion);
   }
   ```

8. ¿Qué diferencia hay entre declarar una función dentro de otra, o fuera?

   - **Fuera:** es accesible desde cualquier lugar del programa (scope global o de módulo). Reutilizable.
   - **Dentro:** solo existe dentro de la función contenedora. Es útil para lógica auxiliar privada que no debe exponerse al exterior.

   ```javascript
   // Función externa: reutilizable en todo el código
   function calcularIVA(precio) {
     return precio * 0.21;
   }

   function mostrarPrecio(precio) {
     // Función interna: solo existe aquí
     function formatear(num) {
       return `$${num.toFixed(2)}`;
     }

     const iva   = calcularIVA(precio);
     const total = precio + iva;
     console.log("Total con IVA:", formatear(total));
   }

   // formatear(100); // ✗ ReferenceError: no es accesible desde afuera
   ```

9. ¿Se puede guardar una función en una variable? ¿Para qué sirve eso?

   Sí. En JavaScript las funciones son **objetos de primera clase**: pueden asignarse a variables, pasarse como argumentos y retornarse desde otras funciones. Esto habilita patrones como callbacks, funciones de orden superior y composición.

   ```javascript
   // Guardar en variable
   const saludar = function(nombre) { return `Hola, ${nombre}`; };

   // Pasar como argumento (callback)
   const numeros   = [3, 1, 4, 1, 5];
   const ordenados = numeros.sort((a, b) => a - b); // la arrow es el callback

   // Retornar desde otra función (closure / factory)
   function multiplicadorPor(factor) {
     return (num) => num * factor;
   }
   const doble  = multiplicadorPor(2);
   const triple = multiplicadorPor(3);

   console.log(doble(5));  // 10
   console.log(triple(5)); // 15
   ```

---

## Preguntas Prácticas

### 1. Calculadora de daño

Creá una función `calcularDanio(ataque, defensa, critico)` que reciba:
- `ataque`: poder del atacante
- `defensa`: defensa del rival (se resta al ataque para calcular el resultado)
- `critico`: booleano que duplica el daño si es `true`

Si el resultado es menor a 0, debe devolver 0.

```javascript
calcularDanio(50, 30, true) // → 70
```

---

### 2. Evolución de Pokémon

Creá una función `puedeEvolucionar(nombre, nivel)` que reciba el nombre del Pokémon y su nivel.

Reglas de evolución:
- Si es `"Charmander"` y nivel ≥ 16 → `"Charmander evolucionó a Charmeleon"`
- Si es `"Bulbasaur"` y nivel ≥ 15 → `"Bulbasaur evolucionó a Ivysaur"`
- Si es `"Squirtle"` y nivel ≥ 18 → `"Squirtle evolucionó a Wartortle"`
- En otro caso → `"Todavía no puede evolucionar"`

---

### 3. Batalla Pokémon

Creá una función `batalla(atacante, defensor, ataque, poder, defensa, critico)` que use la función `calcularDanio` del ejercicio 1.

La función debe mostrar:
- El mensaje del ataque
- Si el enemigo quedó derrotado (daño ≥ 50) o sigue en pie

```javascript
batalla("Pikachu", "Meowth", "Impactrueno", 70, 20, false);

// Resultado esperado:
// ¡Pikachu usó Impactrueno contra Meowth! Causó 50 de daño.
// ¡Meowth ha sido derrotado!
```

---

### 4. Batalla por turnos con estrategia real

Simulá una batalla entre vos y un enemigo controlado por la computadora. El objetivo es ganar al final de los 5 turnos teniendo más vida que el oponente.

**Objetivo:** llegar al final del combate con más puntos de vida que el enemigo. La partida termina tras 5 turnos o si alguno llega a 0 o menos.

**Reglas:**
- Ambos comienzan con 100 puntos de vida.
- Se juegan 5 turnos. En cada turno:
  - Vos elegís si **atacar** o **defender** usando `prompt()`.
  - El enemigo elige su acción al azar.
  - Cada acción genera valores aleatorios para ataque, defensa y crítico.

**Resolución de cada turno:**

| Jugador / Enemigo | Resultado |
|---|---|
| Ataca / Ataca | Ambos reciben daño completo |
| Ataca / Defiende | El enemigo reduce el daño a la mitad. Vos no recibís daño |
| Defiende / Ataca | Vos reducís el daño a la mitad. El enemigo no recibe daño |
| Defiende / Defiende | Nadie recibe daño |

```javascript
// Ejemplo de mensajes de turno:
// Turno 3: Atacaste con 52. El enemigo se defendió con 40. ¡Le hiciste 12 de daño!
// Turno 4: Defendiste con 38. El enemigo atacó con 50. ¡Bloqueaste parte del daño! Recibiste 6.
```

**Resultado final** — después de 5 turnos o cuando uno pierda toda la vida:
- Vida final del jugador y del enemigo
- Si tenés más vida → `"¡Ganaste la batalla!"`
- Si tenés menos vida → `"¡Perdiste!"`
- Si empataron → `"¡Empate!"`

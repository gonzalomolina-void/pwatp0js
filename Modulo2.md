# Módulo 2: Operadores, Coerción y Control de Flujo

## Preguntas Teóricas

1. ¿Qué diferencia hay entre `==` y `===` en JavaScript? Mostrá un ejemplo donde den resultados distintos y explicá por qué.

   - `==` (**igualdad débil**): compara los valores realizando **coerción de tipos** si son distintos; JavaScript intenta convertirlos antes de comparar.
   - `===` (**igualdad estricta**): compara tanto el **valor** como el **tipo** sin ninguna conversión.

   ```javascript
   5 == "5"   // true  → JS convierte "5" a número antes de comparar
   5 === "5"  // false → distinto tipo (number vs string), no hay conversión

   0 == false  // true  → false se convierte a 0
   0 === false // false → distinto tipo (number vs boolean)
   ```

   > Preferí siempre `===` para evitar comparaciones inesperadas.

2. ¿Qué es la coerción de tipos? Mostrá dos ejemplos de coerción implícita y uno de coerción explícita.

   La **coerción** es la conversión automática (implícita) o forzada (explícita) de un valor de un tipo a otro.

   ```javascript
   // Coerción implícita (JavaScript la hace solo)
   10 + "5"     // "105" → el número se convierte a string por la concatenación
   if ("hola")  // true  → el string no vacío se convierte a boolean

   // Coerción explícita (la hace el programador)
   Number("123")  // 123  → convierte el string a número
   String(true)   // "true"
   Boolean(0)     // false
   ```

3. ¿Qué resultado devuelve una expresión como `false || "hola"` o `"hola" && 0`? Explicá el rol de los operadores lógicos en esos casos.

   Los operadores lógicos en JavaScript no devuelven necesariamente `true` o `false`: devuelven **uno de sus operandos** según el principio de cortocircuito.

   - `||` **(OR):** devuelve el **primer valor truthy** que encuentra. Si ninguno lo es, devuelve el último.
   - `&&` **(AND):** devuelve el **primer valor falsy** que encuentra. Si todos son truthy, devuelve el último.

   ```javascript
   false || "hola"   // "hola"  → false es falsy, sigue buscando → devuelve "hola"
   null  || "defecto"// "defecto"

   "hola" && 0       // 0       → "hola" es truthy, sigue → encuentra 0 (falsy), lo devuelve
   "hola" && "chau"  // "chau"  → ambos truthy, devuelve el último
   ```

4. ¿Cuáles son las principales estructuras de control de flujo en JavaScript? Mencioná `if`, `else`, `switch`, y explicá brevemente en qué casos conviene usar cada uno.

   - **`if / else if / else`:** ideal para condiciones lógicas complejas, rangos o comparaciones con operadores. Es la estructura más flexible.
   - **`switch`:** más legible cuando se compara **una misma variable** contra múltiples valores discretos y fijos. Cada caso usa `break` para evitar el *fall-through*.

   ```javascript
   // if/else: condición lógica
   if (edad >= 18) {
     console.log("Mayor de edad");
   } else {
     console.log("Menor de edad");
   }

   // switch: múltiples valores de una misma variable
   switch (dia) {
     case "lunes":    console.log("Inicio de semana"); break;
     case "viernes":  console.log("¡Por fin!");        break;
     default:         console.log("Día normal");
   }
   ```

5. ¿Para qué sirve el operador ternario `(condición ? a : b)`? Reescribí un `if` simple con este operador.

   Es una forma compacta de escribir un `if/else` que **retorna un valor**. Se usa cuando la lógica es simple y cabe en una línea.

   ```javascript
   // Con if/else
   let mensaje;
   if (edad >= 18) {
     mensaje = "Mayor de edad";
   } else {
     mensaje = "Menor de edad";
   }

   // Con operador ternario (equivalente)
   const mensaje = edad >= 18 ? "Mayor de edad" : "Menor de edad";
   ```

   > Evitá anidar ternarios; si la lógica es compleja, usá `if/else` para mayor claridad.

6. ¿Cómo funcionan los bucles `for` y `while` en JavaScript? Mostrá un ejemplo de cada uno.

   - **`for`:** se usa cuando se sabe de antemano cuántas veces iterar. Agrupa la inicialización, condición e incremento en una sola línea.
   - **`while`:** se usa cuando la cantidad de iteraciones depende de una condición que puede cambiar de forma impredecible.

   ```javascript
   // for: imprime del 1 al 5
   for (let i = 1; i <= 5; i++) {
     console.log(i);
   }

   // while: pide un número hasta que el usuario ingrese uno positivo
   let numero = -1;
   while (numero <= 0) {
     numero = Number(prompt("Ingresá un número positivo:"));
   }
   console.log("Ingresaste:", numero);
   ```

7. ¿Qué hacen `break` y `continue` dentro de un bucle? ¿Qué efecto tienen en la ejecución del código?

   - **`break`:** **detiene** el bucle por completo y sale de él inmediatamente.
   - **`continue`:** **salta** la iteración actual y pasa directamente a la siguiente.

   ```javascript
   // break: para en el 3
   for (let i = 1; i <= 5; i++) {
     if (i === 3) break;
     console.log(i); // imprime 1, 2
   }

   // continue: saltea el 3
   for (let i = 1; i <= 5; i++) {
     if (i === 3) continue;
     console.log(i); // imprime 1, 2, 4, 5
   }
   ```

---

## Preguntas Prácticas

### 1. Validador de edad para cine

Tenés dos variables:

```javascript
const edad;
const tieneAutorizacion;
```

Escribí un programa que pida al usuario su edad y muestre `"Puede entrar al cine"` si la persona tiene 18 o más años. En caso contrario, mostrar `"No puede entrar"`.

```javascript
const edad = Number(prompt("¿Cuál es tu edad?"));
if (edad >= 18) {
  console.log("Puede entrar al cine");
} else {
  console.log("No puede entrar");
}
```

---

### 2. Calculadora de propina

Simula que tenés una cuenta de un restaurante y querés calcular la propina. Declarar una variable `monto`, pedirle al usuario que ingrese un valor y calcular la propina del 10%.

Mostrá un mensaje como: `"El total es $100. La propina sugerida es $10"`

```javascript
const monto = Number(prompt("¿Cuál es el monto de la cuenta?"));
const propina = monto * 0.1;
console.log(`El total es $${monto}. La propina sugerida es $${propina}`);
```

---

### 3. Predicción de operaciones

Predecí y explicá el resultado de cada expresión. Luego ejecutá el código en la consola y compará con tu predicción.

```javascript
console.log(10 + "190"); // ?
console.log("8" * "4");  // ?
console.log(true + false); // ?
console.log(null + 1);   // ?
console.log(undefined + 1); // ?
```

> Pistas: Pensá en la coerción de tipos y cómo JavaScript maneja las operaciones entre diferentes tipos de datos.

---

### 4. Validador de ingreso a un club secreto

Pedile al usuario su edad y si conoce la "palabra clave".

Solo puede ingresar si:
- Tiene 21 años o más
- Y escribió exactamente `"snorlax"` como palabra clave

Mostrá un mensaje acorde:

```javascript
const edad = Number(prompt("¿Cuál es tu edad?"));
const clave = prompt("Decí la palabra clave:");

// tu código acá
```

---

### 5. Simulador de sueldo con bonus y retenciones

Pedile al usuario:
- Su sueldo base (`prompt`)
- Si tiene bonus (sí o no)
- Si tiene hijos (sí o no)

Lógica:
- Si tiene bonus, sumá un 10% al sueldo.
- Si tiene hijos, restá un 5% por aporte familiar.
- Luego, aplicá un 15% de retención final al total.

Mostrá el sueldo neto con un mensaje como: `"Tu sueldo final es $38.250"`

---

### 6. Clasificador de clientes premium

Pedile al usuario:
- Cantidad de compras que hizo este mes
- Monto total gastado

Condiciones:
- Es cliente **"Premium"** si hizo más de 10 compras **y** gastó más de $100.000
- Es **"Regular"** si hizo al menos 5 compras **o** gastó más de $50.000
- En otro caso, es **"Básico"**

Mostrá un mensaje como: `"Cliente Premium: ¡gracias por tu fidelidad!"`

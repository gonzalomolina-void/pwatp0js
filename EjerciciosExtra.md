# Ejercicios Extra

---

### 1. Extraer mayúsculas

Escribí una función que reciba un string y devuelva otro string con solo las letras mayúsculas.

Resolver de dos formas:
- **a)** con un bucle `for`
- **b)** con funciones nativas (`filter`, `match`, etc.)

```javascript
extraerMayusculas("Hola Mundo JS") // "HMS"
extraerMayusculas("abcDEF123")     // "DEF"
```

---

### 2. Duplicar letras

Escribí una función que reciba un string y duplique cada letra.

**Bonus:** que solo duplique letras, no números ni símbolos.

```javascript
duplicarLetras("hola")    // "hhoollaa"
duplicarLetras("a1b2!")   // "aa1bb2!"  (bonus: números y símbolos sin cambio)
```

---

### 3. Palabra más frecuente

Dada una frase, devolvé la palabra que más veces aparece.

- Ignorar mayúsculas/minúsculas y signos de puntuación.
- En caso de empate, devolver cualquiera.

```javascript
palabraMasFrecuente("el sol sale y el sol brilla") // "el"
palabraMasFrecuente("Hola hola HOLA mundo")        // "hola"
```

---

### 4. Reemplazo circular de letras

Escribí una función que reemplace cada letra por la que sigue en el abecedario.

- Las letras deben mantener su capitalización (minúscula → minúscula, mayúscula → mayúscula).
- No modificar símbolos ni números.
- `Z → A` y `z → a` (circular).

```javascript
reemplazarCircular("abc")  // "bcd"
reemplazarCircular("xyz")  // "yza"
reemplazarCircular("Az1!") // "Ba1!"
```

---

### 5. Simulador de sueldo con bonus y retenciones

Pedile al usuario su sueldo base, si tiene bonus y si tiene hijos.

**Lógica:**
- Si tiene bonus → sumar 10% al sueldo.
- Si tiene hijos → restar 5% (aporte familiar).
- Aplicar una retención final del 15%.

```javascript
// Ejemplo con valores fijos:
// sueldoBase = 40000, tieneBonus = true, tieneHijos = true
// → Tu sueldo final es $38.250
```

---

### 6. Clasificador de clientes

Pedile al usuario la cantidad de compras y el monto total gastado.

**Condiciones:**
- **"Premium"** → más de 10 compras **y** más de $50.000 gastados
- **"Regular"** → entre 5 y 10 compras **o** entre $20.000 y $50.000 gastados
- **"Nuevo"** → cualquier otro caso

```javascript
clasificarCliente(12, 65000) // "Premium"
clasificarCliente(7,  35000) // "Regular"
clasificarCliente(3,  15000) // "Nuevo"
```

---

### 7. Calculadora de estadísticas

Escribí una función que reciba un array de números y devuelva un objeto con estadísticas básicas.

La **moda** es el valor que más se repite. Si no hay moda (todos aparecen la misma cantidad de veces), devolver `null`.

```javascript
calcularEstadisticas([1, 2, 3, 4, 5])
// { min: 1, max: 5, promedio: 3, moda: null, mediana: 3 }

calcularEstadisticas([1, 2, 2, 3, 4])
// { min: 1, max: 4, promedio: 2.4, moda: 2, mediana: 2 }
```

---

### 8. Compresión de texto simple

Escribí una función que comprima un string reemplazando caracteres repetidos consecutivos con el carácter seguido de la cantidad de repeticiones.

**Bonus:** escribí también la función inversa que descomprima el texto.

```javascript
comprimirTexto("aaabbc")  // "a3b2c1"
comprimirTexto("abcde")   // "a1b1c1d1e1"
comprimirTexto("")         // ""

// Bonus:
descomprimirTexto("a3b2c1") // "aaabbc"
```

---

### 9. Detector de palíndromos

Escribí una función que determine si una frase es un palíndromo (se lee igual de izquierda a derecha que de derecha a izquierda).

Ignorar espacios, signos de puntuación y diferencias entre mayúsculas y minúsculas.

```javascript
esPalindromo("anita lava la tina") // true
esPalindromo("reconocer")          // true
esPalindromo("hola mundo")         // false
```

---

### 10. Reemplazar con longitud

Dado un string, reemplazá cada palabra por la cantidad de letras que tiene. Usá `.split()`, `.map()`, `.join()`.

```javascript
reemplazarPorLongitud("Hola mundo cruel") // "4 5 5"
reemplazarPorLongitud("Esto es JS")       // "4 2 2"
```

---

### 11. Reordenar letras por tipo

Escribí una función que reciba un string y devuelva otro donde los caracteres se agrupen en este orden:
1. Vocales
2. Consonantes
3. Números
4. Todo lo demás (signos, espacios, etc.)

```javascript
ordenarPorTipo("Hola123!?") // "oaHl123!?"
ordenarPorTipo("aB3!")      // "aaB3!"  → vocales, consonantes, números, otros
```

---

### 12. Comprimir letras repetidas

Escribí una función que transforme secuencias repetidas de letras en la letra seguida de la cantidad.

**Bonus:** que ignore mayúsculas/minúsculas (tratarlas igual) y devuelva el resultado siempre en minúscula.

```javascript
comprimir("aaabbcaaa")  // "a3b2c1a3"
comprimir("abcd")       // "a1b1c1d1"

// Bonus (case-insensitive, salida en minúscula):
comprimirInsensible("AaaBBcc") // "a3b2c2"
```

---

### 13. Validar formato de fecha

Escribí una función que reciba un string y devuelva `true` si tiene el formato `"DD/MM/AAAA"` y es una fecha válida.

> Pista: podés usar `split` y crear un objeto `Date` para verificar que la fecha exista.

```javascript
esFechaValida("12/05/2020") // true
esFechaValida("31/02/2020") // false  (febrero no tiene 31 días)
esFechaValida("01-01-2000") // false  (formato incorrecto)
esFechaValida("99/99/9999") // false
```

---

### 14. Detección de palabras espejadas

Escribí una función que reciba dos palabras y devuelva `true` si una es el reverso exacto de la otra. Ignorar mayúsculas/minúsculas.

```javascript
esEspejo("amor", "roma") // true  ("amor" al revés es "roma")
esEspejo("abc",  "cba")  // true
esEspejo("hola", "mundo")// false
```

---

### 15. Encontrar el carácter más frecuente

Escribí una función que reciba un string y devuelva el carácter (letra o número) que más veces aparece. Si hay empate, devolver cualquiera.

- Ignorar espacios y mayúsculas.

```javascript
masFrecuente("aabbbccdd") // "b"
masFrecuente("111223")    // "1"
masFrecuente("abcd")      // cualquiera (empate)
```

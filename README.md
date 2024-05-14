¡Claro! Aquí tienes un README en español para tu proyecto de RISC-V con algunos emojis para hacerlo más atractivo.

---

# Proyecto RISC-V 🚀

¡Bienvenido al proyecto RISC-V! Este es el proyecto final para el curso de Arquitectura de Computadores en la Universidad de Las Palmas de Gran Canaria. 🎓

## Descripción 📖

Este proyecto implementa un simulador básico de una CPU RISC-V en JavaScript, utilizando React para la interfaz de usuario. El simulador puede interpretar y ejecutar un conjunto de instrucciones RISC-V junto con directivas de datos.

## Características ✨

- **Soporte para Directivas de Datos**:
  - `.align`, `.ascii`, `.asciz`, `.byte`, `.dword`, `.half`, `.space`, `.string`, `.word`
- **Instrucciones Aritméticas**:
  - `add`, `sub`, `mul`, `div`, `addi`, `subi`, `muli`, `divi`
- **Instrucciones de Memoria**:
  - `lw`, `sw`
- **Instrucciones de Salto y Rama**:
  - `beq`, `bne`, `blt`, `bgt`, `bge`, `ble`, `jal`, `jalr`, `ret`

## Uso 🛠️

Para usar el simulador, sigue estos pasos:

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu_usuario/tu_repositorio.git
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Inicia la aplicación:

    ```bash
    npm start
    ```

4. Ingresa tu código RISC-V en el área de texto y presiona "Ejecutar" para ver los resultados.

## Ejemplo de Código RISC-V 📝

Aquí tienes un ejemplo de código RISC-V que puedes usar para probar el simulador:

```assembly
.data
.align 2
ascii_str: .ascii "Hello, world!"
asciz_str: .asciz "Hello, RISC-V!\0"
.byte 1, 2, 3, 4
.dword 1234567890123456789
.half 5, 6, 7, 8
.space 16
string: .string "Sample String\0"
.word 9, 10, 11, 12

.text
.globl _start
_start:
    la t0, ascii_str
    lb t1, 0(t0)
    lh t2, 2(t0)
    lw t3, 4(t0)
    li t4, 10
    li t5, 20
    add t6, t4, t5
    sub t7, t5, t4
    mul t8, t4, t5
    div t9, t5, t4
    la t0, string
    sw t8, 0(t0)
    beq t4, t5, equal_label
    bne t4, t5, not_equal_label

equal_label:
    li t1, 100
    j end

not_equal_label:
    li t1, 200

end:
    end
```

## Cómo Contribuir 🤝

¡Las contribuciones son bienvenidas! Si encuentras un error o tienes una sugerencia para una nueva característica, no dudes en abrir un issue o enviar un pull request.

## Autor 👨‍💻

- **Nombre**: Sergio Acosta Quintana
- **Correo Electrónico**: sergioacostaquintana@gmail.com
- **Universidad**: Universidad de Las Palmas de Gran Canaria

## Licencia 📄

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

¡Gracias por visitar nuestro proyecto! 🌟 Si tienes alguna pregunta, no dudes en contactarme.

---

¡Buena suerte con tu proyecto y éxito en tu curso! 🎉

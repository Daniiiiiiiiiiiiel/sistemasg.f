# Cómo Agregar tu Logo

## 📁 Ubicación del Logo

Coloca tu archivo de logo en la carpeta principal del proyecto:

```
sistemaSG/
├── logo.png          ← Coloca tu logo aquí
├── index.html
├── cliente.html
├── admin.html
└── styles.css
```

## 🎨 Especificaciones del Logo

### Formato Recomendado
- **Formato:** PNG (con transparencia preferible)
- **Altura:** 80-120px (se ajustará automáticamente a 40px en desktop, 32px en móvil)
- **Ancho:** Máximo 400px (se ajustará proporcionalmente)
- **Fondo:** Transparente (recomendado)

### Nombres de Archivo Aceptados
El código busca el archivo `logo.png` por defecto. Si usas otro nombre o formato, actualiza en:

**cliente.html** (línea ~23):
```html
<img src="tu-logo.png" alt="Sistema de Adelantos" class="logo-img">
```

**admin.html** (línea ~23):
```html
<img src="tu-logo.png" alt="Sistema de Adelantos" class="logo-img">
```

## 📱 Responsive

El logo se adapta automáticamente:
- **Desktop:** 40px de altura, máximo 200px de ancho
- **Móvil:** 32px de altura, máximo 140px de ancho
- **Mantiene proporción:** Se ajusta automáticamente sin distorsión

## 🎭 Mientras no tengas logo

Si aún no subes el logo, verás un espacio vacío (el navegador intentará cargar `logo.png`). Puedes:

1. **Opción 1:** Dejar como está (aparecerá el alt text o icono de imagen rota)
2. **Opción 2:** Crear un logo temporal con cualquier herramienta de diseño
3. **Opción 3:** Usar texto temporal modificando el HTML a:
   ```html
   <div class="app-logo">
     <span style="font-size: 1.25rem; font-weight: 700;">Mi Empresa</span>
   </div>
   ```

## ✨ Ejemplos de Logos que Funcionan Bien

- Logo horizontal (rectangular)
- Logo con icono + texto
- Solo icono (cuadrado o circular)
- Monograma con letras

**Evitar:**
- Logos muy verticales (se verán muy pequeños)
- Archivos muy pesados (optimiza a menos de 100KB)

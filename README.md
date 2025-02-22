# **SPA Catálogo de Teléfonos Móviles**

Una aplicación web **Single Page Application (SPA)** desarrollada con **Next.js** para la visualización, búsqueda y gestión de un catálogo de teléfonos móviles. Los usuarios pueden explorar un catálogo de dispositivos, consultar los detalles específicos de cada móvil y gestionar su carrito de compras.

---

## **🛠 Tecnologías Utilizadas**

- ⚛️ **React**: `v19.0.0`
- ⚡ **Next.js**: `v15.1.6`
- 🔹 **TypeScript**: `v5.0`
- 🎨 **SASS**: Para el manejo de estilos.
- ✅ **JEST**: Para el testeo de la aplicación.

---

## **👉 Instalación**

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/juanmpnz/catalogo-telefonos-moviles
   cd catalogo-telefonos-moviles
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

---

## **🌟 Ejecución del Proyecto**

### **🌀 Modo Desarrollo**

Ejecuta el siguiente comando para iniciar el entorno de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en: **`http://localhost:3000`**

### **🌟 Modo Producción**

Para generar una versión optimizada para producción:

```bash
npm run build
npm run start
```

---

## **🔧 Testeo del Proyecto**

### **🔢 Ejecutar Tests Unitarios**

Para ejecutar las pruebas unitarias con Jest:

```bash
npm run test
```

### **⏳ Ejecutar Tests en Modo Watch**

Para que Jest se ejecute en modo observador:

```bash
npm run test:watch
```

---

## **📚 Estructura del Proyecto**

```plaintext
src/
├── assets/                # Archivos SVG para íconos
├── app/
│   ├── layout.tsx        # Layout principal (Header, Footer, etc.)
│   ├── page.tsx          # Página de inicio (catálogo de móviles)
│   ├── cart/
│   │   └── page.tsx      # Página para ver el carrito
│   ├── product/          # Ruta para los detalles de cada móvil
│       └── page.tsx
│
├── components/           # Componentes reutilizables (Header, Card, etc.)
├── context/              # SPA context
├── hooks/                # Custom React hooks
├── services/             # Métodos para llamadas a la API
├── styles/
│   ├── globals.scss      # Estilos globales y punto de entrada de SASS
│   ├── variables.scss    # Variables globales de SASS
│   ├── components/       # Carpeta para estilos específicos de componentes
│   │   └── layout.scss   # Estilos para el layout
├── locales/              # JSON para strings y localización
```

---

## **🚀 Características**

- 📱 **Catálogo de Móviles**: Visualiza una lista de dispositivos móviles con información clave como nombre, precio e imagen.
- 🔍 **Detalles del Producto**: Consulta información detallada de cada dispositivo a través de rutas dinámicas.
- 🛒 **Carrito de Compras**: Gestiona un carrito de compras para almacenar los productos seleccionados.
- 🚀 **SPA Dinámica**: Navegación rápida y eficiente sin recargas de página gracias a Next.js.

---

## **👥 Autor**

Desarrollado por **[Juan Manuel Panzitta]**

---

🛠 **Hecho con Next.js y ❤️!** 🚀

# Registro de Biblioteca Autoalojada (Vendor) — Mitigación S8

Este directorio resguarda las dependencias externas autoalojadas para neutralizar riesgos de seguridad en la cadena de suministro (Mitigación S8), garantizando autonomía operativa sin peticiones a redes de distribución de contenido (CDN) de terceros.

---

## 1. Ficha Técnica de la Biblioteca

* **Nombre del Paquete:** `html2pdf.js`
* **Versión Exacta:** `0.10.1`
* **Archivo Empaquetado:** `html2pdf.bundle.min.js`
* **Tamaño en Disco:** 905,956 bytes (~905 KB)
* **URL de Origen Oficial:**
  `https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js`
* **Repositorio Upstream:**
  `https://github.com/eKoopmans/html2pdf.js`
* **Licencia:** MIT License

---

## 2. Integridad Criptográfica

* **Algoritmo:** SHA-256
* **Hash SHA-256:**
  `85E6EE9CE246E3AE4424313F7E46A5ED860A28D757811DE8DC9C43F306049D65`
* **Algoritmo Complementario:** SHA-512 (SRI de cdnjs)
* **Hash SHA-512 (Base64):**
  `GsLlZN/3F2ErC5ifS5QtgpiJtWQV46GjQ47TRqdSWPhMhC263GFCX4UkRGIpen4279q8PX++AGN2OU65Lk2Q4g==`
* **Estado de Verificación:**
  Hash verificado contra la distribución oficial de cdnjs el 09/09/2026; coincide al 100%.

---

## 3. Motivo y Fecha de Incorporación

* **Fecha de Incorporación:** 09/09/2026 (Tanda 5 de la auditoría de ciberseguridad).
* **Motivo Técnico (Mitigación S8):** Eliminar la dependencia en tiempo de ejecución del CDN externo `cdnjs.cloudflare.com`. Las bibliotecas de renderizado y conversión de documentos no deben depender de servidores externos no controlados, para prevenir envenenamiento de caché, inyección en la cadena de suministro o indisponibilidad por caídas de conectividad externa.

---

## 4. Procedimiento para Futuras Actualizaciones

1. Descargar la versión oficial desde la URL oficial o el release de GitHub:
   ```bash
   curl -sSL "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/<version>/html2pdf.bundle.min.js" -o html2pdf.bundle.min.js
   ```
2. Calcular la suma criptográfica SHA-256:
   ```powershell
   Get-FileHash -Path "portal/vendor/html2pdf.bundle.min.js" -Algorithm SHA256
   ```
3. Verificar que la suma coincida con la declarada por la distribución oficial.
4. Actualizar la versión, fecha y nuevo hash en este archivo `README.md`.
5. Ejecutar la lista de comprobación de humo:
   - Abrir el portal en el navegador.
   - Acceder a una carta oficial autorizada.
   - Hacer clic en «Descargar PDF».
   - Comprobar que el archivo PDF se genere correctamente con tipografía, tablas LaTeX, sellos y código QR intactos.

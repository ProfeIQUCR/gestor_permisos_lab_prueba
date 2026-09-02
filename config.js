/**
 * =========================================================================================
 * CONFIGURACIÓN INSTITUCIONAL Y ENDPOINTS DE CONEXIÓN
 * Escuela de Ingeniería Química — Universidad de Costa Rica
 * =========================================================================================
 */

const EIQ_CONFIG = {
  /**
   * URL de la aplicación web de Google Apps Script.
   * - Cuando pegues aquí la URL generada en Google Apps Script, el portal transmitirá
   *   automáticamente cada solicitud a Google Sheets y enviará los correos reales.
   * - Si se deja vacía (""), el portal opera en MODO SIMULACIÓN LOCAL (ideal para pruebas y demos).
   * 
   * Ejemplo de URL:
   * "https://script.google.com/macros/s/AKfycbx.../exec"
   */
  API_BACKEND_URL: "https://script.google.com/macros/s/AKfycbwmIP29Pxw0glnvWNHLBQv0Sh2VvB6csx7xUhNnudMVzdPs91Nit8pLAF2vnf_EE4XZ/exec",

  // Correos institucionales oficiales
  CORREOS: {
    GENERAL: "laboratorio.eiq@ucr.ac.cr",
    COTRAFIN: "laboratorio.eiq@ucr.ac.cr",
    INSTRUMENTAL: "instrumental.eiq@ucr.ac.cr"
  },

  /**
   * Verifica si el sistema está conectado al backend en vivo de Google Apps Script
   */
  isLiveMode() {
    return Boolean(this.API_BACKEND_URL && this.API_BACKEND_URL.startsWith("https://script.google.com/macros/s/"));
  }
};

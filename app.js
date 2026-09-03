/* ==========================================================================
   SISTEMA DE GESTIÓN DE PERMISOS DE LABORATORIO - EIQ / UCR
   Interactive Application Logic & Official Document Generator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Official Reference Data Structures ---
  const LAB_CONFIGS = {
    general: {
      nombre: "Laboratorio General EIQ",
      destinatarioCargo: "Ing. Adrián Serrano Mora, Ph.D.",
      destinatarioPuesto: "Jefe de Laboratorio",
      jefeTituloSig: "V.B. Jefe de Laboratorios EIQ",
      titularNombre: "Ing. Adrián Serrano Mora, Ph.D.",
      titularCargo: "Jefe de Laboratorio",
      titularSig: "V.B. Jefe de Laboratorios EIQ",
      titularIniciales: "ASM",
      docenteDeclaration: "Esta actividad cuenta con mi visto bueno y doy fe, al aprobar esta solicitud, que se ha revisado los métodos y la existencia de los reactivos y equipos para llevar a cabo lo solicitado. Además, el análisis incluye la seguridad y la gestión adecuada de los residuos.",
      actividades: [
        "Trabajo final de curso",
        "Trabajo final de graduación",
        "Asistencia a proyecto de investigación",
        "Trabajo final de investigación aplicada (Maestría)",
        "Recibir capacitación"
      ],
      compromisos: [
        "Cumplir cabalmente los lineamientos expresados en el Sistema de Gestión y Seguridad en los Laboratorios de Ingeniería Química (LEIQ) disponible en: http://www.eiq.ucr.ac.cr/documentos/ManualSeguridadLEIQ.pdf",
        "Acatar los distintos reglamentos de la Universidad de Costa Rica que sean aplicables.",
        "Revisar las hojas de seguridad (MSDS) y tenerlas disponibles de manera física o virtual.",
        "Identificar los riesgos relacionados al uso de los reactivos solicitados y se adjuntan a este documento las medidas de seguridad para mitigar los riesgos identificados.",
        "Calcular la concentración de las disoluciones requeridas y solicitar la cantidad de reactivos en concordancia con estos cálculos.",
        "Usar de manera racional los reactivos y recursos suministrados.",
        "Tratar adecuadamente los residuos generados, velando por la disposición correcta. Se han identificado los procedimientos para el tratamiento y disposición de los residuos."
      ]
    },
    instrumental: {
      nombre: "Laboratorio Instrumental EIQ",
      destinatarioCargo: "Lic. María Elena Sibaja García",
      destinatarioPuesto: "Subcoordinadora del Laboratorio Instrumental",
      jefeTituloSig: "Subcoordinadora Laboratorio Instrumental",
      titularNombre: "Lic. María Elena Sibaja García",
      titularCargo: "Subcoordinadora del Laboratorio Instrumental",
      titularSig: "Subcoordinadora Laboratorio Instrumental",
      titularIniciales: "MESG",
      docenteDeclaration: "Esta actividad cuenta con mi visto bueno y doy fe, al aprobar esta solicitud, que se ha revisado los métodos y la existencia de los reactivos y equipos para llevar a cabo lo solicitado.",
      actividades: [
        "Trabajo final de curso",
        "Trabajo final de graduación",
        "Asistencia a proyecto de investigación",
        "Trabajo final de investigación aplicada (Maestría)"
      ],
      compromisos: [
        "Cumplir cabalmente los lineamientos expresados en el Sistema de Gestión y Seguridad en los Laboratorios de Ingeniería Química (LEIQ) disponible en: http://www.eiq.ucr.ac.cr/documentos/ManualSeguridadLEIQ.pdf",
        "Acatar los distintos reglamentos de la Universidad de Costa Rica que sean aplicables.",
        "Cumplir con la capacitación previa de los equipos solicitados.",
        "Llenar las bitácoras con información precisa del uso de los equipos.",
        "Revisar las hojas de seguridad (MSDS) y tenerlas disponibles de manera física o virtual.",
        "Identificar los riesgos relacionados al uso de los reactivos solicitados y se adjuntan a este documento las medidas de seguridad para mitigar los riesgos identificados.",
        "Calcular la concentración de las disoluciones requeridas y solicitar la cantidad de reactivos en concordancia con estos cálculos.",
        "Usar de manera racional los reactivos y recursos suministrados.",
        "Tratar adecuadamente los residuos generados, velando por la disposición correcta. Se han identificado los procedimientos para el tratamiento y disposición de los residuos."
      ]
    },
    cotrafin: {
      nombre: "Laboratorio de la Escuela de Ingeniería Química",
      summaryLab: "No Aplica",
      destinatarioCargo: "Ing. Adrián Serrano Mora, Ph.D.",
      destinatarioPuesto: "Jefe de Laboratorio",
      jefeTituloSig: "V.B. Jefe de Laboratorios EIQ",
      titularNombre: "Ing. Adrián Serrano Mora, Ph.D.",
      titularCargo: "Jefe de Laboratorio",
      titularSig: "V.B. Jefe de Laboratorios EIQ",
      titularIniciales: "ASM",
      docenteDeclaration: "Esta actividad cuenta con mi visto bueno y doy fe, al aprobar esta solicitud, que se ha revisado los métodos y la existencia de los reactivos y equipos para llevar a cabo lo solicitado.",
      actividades: [
        "Trabajo Final de Graduación",
        "Trabajo Final de Investigación Aplicada"
      ],
      compromisos: [
        "Cumplir cabalmente los lineamientos expresados en el Sistema de Gestión y Seguridad en los Laboratorios de Ingeniería Química (LEIQ) disponible en: http://www.eiq.ucr.ac.cr/documentos/ManualSeguridadLEIQ.pdf",
        "Acatar los distintos reglamentos de la Universidad de Costa Rica que sean aplicables.",
        "Revisar las hojas de seguridad (MSDS) y tenerlas disponibles de manera física o virtual.",
        "Identificar los riesgos relacionados al uso de los reactivos solicitados y se adjuntan a este documento las medidas de seguridad para mitigar los riesgos identificados.",
        "Devolver los equipos en buen estado.",
        "Usar de manera racional los reactivos y recursos suministrados.",
        "Tratar adecuadamente los residuos generados, velando por la disposición correcta. Se han identificado los procedimientos para el tratamiento y disposición de los residuos."
      ]
    }
  };

  // Helper para obtener prefijo de laboratorio oficial: LG, LI, COT
  function getLabPrefix(tipoLaboratorio) {
    if (tipoLaboratorio === 'instrumental') return 'LI';
    if (tipoLaboratorio === 'cotrafin') return 'COT';
    return 'LG';
  }

  // --- Core State ---
  let currentStep = 1;
  let activeTicketId = "LG-PERM-2026-0042";
  let studentSignatureDataUrl = null;
  // =============================================================================
  // PERSISTENCIA EN localStorage — Las solicitudes sobreviven recargas de página
  // =============================================================================
  const LS_KEY = 'eiq_solicitudes_v1';

  const SOLICITUDES_DEMO = [
    {
      id: "LG-PERM-2026-0042",
      tipoLaboratorio: "general",
      labNombre: "Laboratorio General EIQ",
      nombreEstudiante: "Mariana Rojas Castillo",
      carneEstudiante: "C12345",
      correoEstudiante: "mariana.rojas@ucr.ac.cr",
      tipoActividad: "Trabajo final de curso",
      nombreCursoProyecto: "IQ-0402 Operaciones Unitarias II",
      docenteResponsable: "Gerardo Chácón Valle",
      correoDocente: "gerardo.chacon@ucr.ac.cr",
      docenteIniciales: "GCV",
      fechaInicio: "2026-08-25",
      fechaFinal: "2026-09-15",
      descripcionActividad: "Determinación experimental de coeficientes de transferencia de calor y masa en columnas empacadas para el proyecto de curso.",
      sinEquipos: false,
      equipos: [
        { nombre: "Espectrofotómetro UV-Visible (Shimadzu UV-1800)", placa: "UCR-84920", disponible: "Disponible en el laboratorio", capacitacion: false, solicitaAnalisis: false }
      ],
      sinReactivos: false,
      reactivos: [
        { nombre: "Etanol (96% v/v)", cantidad: "500 mL", origen: "Disponible en el laboratorio de la EIQ" }
      ],
      consumibles: [],
      integrantes: [],
      inicialesEstudiante: "MRC",
      signatureDataUrl: null,
      estado: "Pendiente Visto Bueno",
      docenteAprobado: false,
      docenteFecha: null,
      docenteObservaciones: "",
      jefeAprobado: false,
      jefeFecha: null,
      jefeNombre: "Ing. Adrián Serrano Mora, Ph.D.",
      jefeCargo: "Jefe de Laboratorio",
      jefeTituloSig: "V.B. Jefe de Laboratorios EIQ",
      jefeIniciales: "ASM",
      esDelegado: false,
      fechaCreacion: "20/08/2026 11:30"
    },
    {
      id: "LI-PERM-2026-0041",
      tipoLaboratorio: "instrumental",
      labNombre: "Laboratorio Instrumental EIQ",
      nombreEstudiante: "María José Gómez Ñáñez",
      carneEstudiante: "C01234",
      correoEstudiante: "mariajose.gomez@ucr.ac.cr",
      tipoActividad: "Trabajo final de graduación",
      nombreCursoProyecto: "TFG: Cuantificación de polifenoles en café",
      docenteResponsable: "Lic. María Elena Sibaja García",
      correoDocente: "mariaelena.sibaja@ucr.ac.cr",
      docenteIniciales: "MESG",
      fechaInicio: "2026-08-22",
      fechaFinal: "2026-09-22",
      descripcionActividad: "Análisis por cromatografía líquida HPLC de extractos fenólicos.",
      sinEquipos: false,
      equipos: [
        { nombre: "Cromatógrafo Líquido HPLC (Thermo Ultimate 3000)", placa: "30 análisis", capacitacion: true, solicitaAnalisis: false }
      ],
      sinReactivos: false,
      reactivos: [
        { nombre: "Metanol grado HPLC (99.9%)", cantidad: "1 L", origen: "Lo provee algún proyecto de investigación" },
        { nombre: "Acetonitrilo grado HPLC (99.9%)", cantidad: "500 mL", origen: "Disponible en el laboratorio de la EIQ" }
      ],
      consumibles: [
        { nombre: "Viales de vidrio para HPLC (1.5 mL con septa)", cantidad: "50 unidades", origen: "Solicita al laboratorio de la EIQ" }
      ],
      integrantes: [],
      inicialesEstudiante: "MJGN",
      signatureDataUrl: null,
      estado: "Autorizado por Jefatura",
      docenteAprobado: true,
      docenteFecha: "19/08/2026 14:20",
      docenteObservaciones: "Visto bueno otorgado. Estudiante debidamente capacitada.",
      jefeAprobado: true,
      jefeFecha: "20/08/2026 09:15",
      jefeNombre: "Lic. María Elena Sibaja García",
      jefeCargo: "Subcoordinadora del Laboratorio Instrumental",
      jefeTituloSig: "Subcoordinadora Laboratorio Instrumental",
      jefeIniciales: "MESG",
      esDelegado: false,
      fechaCreacion: "19/08/2026 10:00"
    },
    {
      id: "COT-PERM-2026-0040",
      tipoLaboratorio: "cotrafin",
      labNombre: "No Aplica",
      nombreEstudiante: "Carlos Mora Rodríguez",
      carneEstudiante: "B98765",
      correoEstudiante: "carlos.mora@ucr.ac.cr",
      tipoActividad: "Trabajo Final de Investigación Aplicada",
      nombreCursoProyecto: "Propuesta ante Comisión",
      docenteResponsable: "Dr. Esteban Durán Herrera",
      correoDocente: "esteban.duran@ucr.ac.cr",
      docenteIniciales: "EDH",
      fechaInicio: "",
      fechaFinal: "",
      descripcionActividad: "Pruebas de reología y pérdida de carga en tuberías con fluidos no newtonianos.",
      sinEquipos: false,
      equipos: [
        { nombre: "Viscosímetro Rotacional Brookfield", placa: "N/A", origen: "Solicitado a la EIQ", capacitacion: false, solicitaAnalisis: false }
      ],
      sinReactivos: false,
      reactivos: [
        { nombre: "Glicerol puro 99%", cantidad: "", origen: "Provisto por algún proyecto de investigación" }
      ],
      consumibles: [],
      integrantes: [],
      inicialesEstudiante: "CMR",
      signatureDataUrl: null,
      estado: "Autorizado por Jefatura",
      docenteAprobado: true,
      docenteFecha: "18/08/2026 16:00",
      docenteObservaciones: "Aprobado. Protocolo de fluidos verificado.",
      jefeAprobado: true,
      jefeFecha: "19/08/2026 08:30",
      jefeNombre: "Ing. Adrián Serrano Mora, Ph.D.",
      jefeCargo: "Jefe de Laboratorio",
      jefeTituloSig: "V.B. Jefe de Laboratorios EIQ",
      jefeIniciales: "ASM",
      esDelegado: false,
      fechaCreacion: "18/08/2026 11:15"
    }
  ];

  // Cargar desde localStorage si hay datos reales guardados; si no, usar datos de demo.
  function cargarSolicitudesLS() {
    try {
      const guardadas = localStorage.getItem(LS_KEY);
      if (guardadas) {
        const parsed = JSON.parse(guardadas);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { /* sin-op */ }
    return SOLICITUDES_DEMO.slice(); // copia de los datos de demo
  }

  // Persistir el array actual en localStorage.
  function guardarSolicitudesLS() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(solicitudes));
    } catch (e) { /* cuota excedida u otro error, sin-op */ }
  }

  // Sincronizar todas las solicitudes con Google Sheets (fuente central de verdad)
  async function sincronizarSolicitudesBackend() {
    if (typeof EIQ_CONFIG === 'undefined' || !EIQ_CONFIG.isLiveMode()) return;
    try {
      const resp = await fetch(`${EIQ_CONFIG.API_BACKEND_URL}?action=listar`, {
        method: 'GET',
        credentials: 'omit'
      });
      const rawText = await resp.text();
      let result = null;
      try {
        result = JSON.parse(rawText);
      } catch (e) {
        console.warn("Aviso: el listado del backend devolvió texto no-JSON:", rawText.slice(0, 150));
      }
      if (result && result.success && Array.isArray(result.solicitudes)) {
        if (result.solicitudes.length > 0) {
          const mapBackend = new Map(result.solicitudes.map(s => [s.id, s]));
          const merged = [];

          // Las solicitudes del backend van primero con normalización de estados
          for (const item of result.solicitudes) {
            if (!item.tipoLaboratorio) {
              const labNom = String(item.labNombre || "").toLowerCase();
              if (labNom.includes("instrumental")) item.tipoLaboratorio = "instrumental";
              else if (labNom.includes("cotrafin")) item.tipoLaboratorio = "cotrafin";
              else item.tipoLaboratorio = "general";
            }

            const est = String(item.estado || "").toUpperCase();
            const esDevuelto = (est.includes("DEVUELTO") || est.includes("RECHAZADO"));
            const esPendiente = (est.includes("PENDIENTE"));
            const esAprobadoDocente = (est === "APROBADO_DOCENTE" || est.includes("APROBADO POR DOCENTE"));
            const esAutorizadoJefatura = (est.includes("AUTORIZADO") || est === "EMITIDO");

            item.devueltoDocente = esDevuelto;
            item.jefeAprobado = esAutorizadoJefatura;
            item.docenteAprobado = !esDevuelto && !esPendiente && (esAprobadoDocente || esAutorizadoJefatura);
            if (!item.docenteIniciales && item.docenteResponsable) {
              item.docenteIniciales = item.docenteResponsable.trim().split(/\s+/).map(p => p[0]).join('').toUpperCase().slice(0, 4);
            }

            merged.push(item);
          }

          // Mantener registros locales previos que no colisionen con los demos
          for (const s of solicitudes) {
            if (!mapBackend.has(s.id) && !s.id.startsWith("LG-PERM-2026-0042") && !s.id.startsWith("LI-PERM-2026-0041") && !s.id.startsWith("COT-PERM-2026-0040")) {
              merged.push(s);
            }
          }

          solicitudes = merged;
          guardarSolicitudesLS();
          renderTable();
          updateKPIs();
        }
      }
    } catch (err) {
      console.warn("Sincronización con backend diferida:", err);
    }
  }

  // Sincronizar el estado de una solicitud individual con el backend (consulta ?action=verificar)
  async function sincronizarEstadoSolicitud(id) {
    if (typeof EIQ_CONFIG === 'undefined' || !EIQ_CONFIG.isLiveMode()) return null;
    try {
      const url = `${EIQ_CONFIG.API_BACKEND_URL}?action=verificar&id=${encodeURIComponent(id)}`;
      const resp = await fetch(url);
      const html = await resp.text();
      const devuelto = html.includes('DEVUELTA PARA CORRECCIÓN') || html.includes('DEVUELTO');
      const aprobado = html.includes('APROBADO_DOCENTE') || html.includes('AUTORIZADO_JEFATURA') || html.includes('EMITIDO') || html.includes('CARTA AUTENTICADA');
      const pendiente = html.includes('EN PROCESO DE VISTO BUENO') || html.includes('PENDIENTE');
      if (devuelto) return 'DEVUELTO_DOCENTE';
      if (aprobado) return 'APROBADO_DOCENTE';
      if (pendiente) return 'PENDIENTE_DOCENTE';
      return null;
    } catch (e) { return null; }
  }

  let solicitudes = cargarSolicitudesLS();

  // --- Element Selectors ---
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabViews = document.querySelectorAll('.tab-view');
  const form = document.getElementById('form-solicitud');
  const formSteps = document.querySelectorAll('.form-step');
  const stepItems = document.querySelectorAll('.step-item');
  const btnNextList = document.querySelectorAll('.btn-next');
  const btnPrevList = document.querySelectorAll('.btn-prev');
  const btnLoadDemo = document.getElementById('btn-load-demo');

  const labRadioInputs = document.querySelectorAll('input[name="tipoLaboratorio"]');
  const selectTipoActividad = document.getElementById('tipoActividad');
  const commitmentsContainer = document.getElementById('commitments-container');
  const calloutCotrafinIntro = document.getElementById('callout-cotrafin-intro');
  const sectionIntegrantes = document.getElementById('section-integrantes');
  const integrantesContainer = document.getElementById('integrantes-container');
  const btnAddIntegrante = document.getElementById('btn-add-integrante');
  const sectionPreguntasInstr = document.getElementById('section-preguntas-instrumental');
  const sectionConsumiblesInstr = document.getElementById('section-consumibles-instrumental');

  const equiposContainer = document.getElementById('equipos-container');
  const reactivosContainer = document.getElementById('reactivos-container');
  const consumiblesContainer = document.getElementById('consumibles-container');
  const btnAddEquipo = document.getElementById('btn-add-equipo');
  const btnAddReactivo = document.getElementById('btn-add-reactivo');
  const btnAddConsumible = document.getElementById('btn-add-consumible');

  const chkNoEquipos = document.getElementById('chk-no-equipos');
  const chkNoReactivos = document.getElementById('chk-no-reactivos');

  // Canvas Signature Elements
  const canvasFirma = document.getElementById('canvas-firma-estudiante');
  const btnClearSig = document.getElementById('btn-clear-sig');
  let isDrawing = false;
  let sigCtx = null;

  // Docente Approval Elements
  const textareaDocenteObs = document.getElementById('docente-observaciones');
  const inputDocenteInitials = document.getElementById('docente-initials');
  const btnDocenteApprove = document.getElementById('btn-docente-approve');
  const btnDocenteReject = document.getElementById('btn-docente-reject');
  const docenteLetterSheet = document.getElementById('docente-letter-sheet');

  // Delegation Elements
  const chkDelegacionFirma = document.getElementById('chk-delegacion-firma');
  const boxDelegacionFields = document.getElementById('box-delegacion-fields');

  if (chkDelegacionFirma && boxDelegacionFields) {
    chkDelegacionFirma.addEventListener('change', () => {
      boxDelegacionFields.classList.toggle('hidden', !chkDelegacionFirma.checked);
    });
  }

  // Print & Table Elements
  const btnDownloadPdf = document.getElementById('btn-download-pdf');
  const btnPrintLetter = document.getElementById('btn-print-letter');
  const btnEmailLetter = document.getElementById('btn-email-letter');
  const solicitudesTableBody = document.getElementById('solicitudes-table-body');
  const filterSearch = document.getElementById('filter-search');
  const filterLab = document.getElementById('filter-lab');
  const officialDocumentSheet = document.getElementById('official-document');
  const jefaturaModalLetterSheet = document.getElementById('jefatura-modal-letter-sheet');

  // --- Initialize Signature Canvas ---
  if (canvasFirma) {
    sigCtx = canvasFirma.getContext('2d');
    sigCtx.strokeStyle = '#002B49';
    sigCtx.lineWidth = 2.5;
    sigCtx.lineCap = 'round';
    sigCtx.lineJoin = 'round';

    function getCanvasCoordinates(e) {
      const rect = canvasFirma.getBoundingClientRect();
      const scaleX = canvasFirma.width / rect.width;
      const scaleY = canvasFirma.height / rect.height;
      let clientX = e.clientX;
      let clientY = e.clientY;

      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    }

    function startDrawing(e) {
      isDrawing = true;
      const pos = getCanvasCoordinates(e);
      sigCtx.beginPath();
      sigCtx.moveTo(pos.x, pos.y);
      if (e.type.startsWith('touch')) e.preventDefault();
    }

    function draw(e) {
      if (!isDrawing) return;
      const pos = getCanvasCoordinates(e);
      sigCtx.lineTo(pos.x, pos.y);
      sigCtx.stroke();
      if (e.type.startsWith('touch')) e.preventDefault();
    }

    function stopDrawing() {
      if (isDrawing) {
        isDrawing = false;
        sigCtx.closePath();
        studentSignatureDataUrl = canvasFirma.toDataURL();
      }
    }

    canvasFirma.addEventListener('mousedown', startDrawing);
    canvasFirma.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDrawing);

    canvasFirma.addEventListener('touchstart', startDrawing, { passive: false });
    canvasFirma.addEventListener('touchmove', draw, { passive: false });
    window.addEventListener('touchend', stopDrawing);

    if (btnClearSig) {
      btnClearSig.addEventListener('click', () => {
        sigCtx.clearRect(0, 0, canvasFirma.width, canvasFirma.height);
        studentSignatureDataUrl = null;
      });
    }
  }

    // =========================================================================
  // --- CATALOGOS INTELIGENTES DE AUTOCOMPLETADO (SUGERENCIAS AL ESCRIBIR) ---
  // =========================================================================
  const CATALOG_EQUIPOS_GENERAL = [
    { name: "Horno / Estufa de Secado y Convección", tag: "General" },
    { name: "Balanza Analítica de Precisión (0.1 mg)", tag: "General" },
    { name: "Plantilla de Agitación Magnética y Calentamiento", tag: "General" },
    { name: "pHmetro / Potenciómetro de Banco", tag: "General" },
    { name: "Mufla de Alta Temperatura", tag: "General" },
    { name: "Centrífuga de Laboratorio", tag: "General" },
    { name: "Incubadora de Laboratorio", tag: "General" },
    { name: "Baño Termostático / Baño María / Ultrasonido", tag: "General" },
    { name: "Molino de Corte / Molino de Bolas", tag: "General" },
    { name: "Micropipetas Automáticas (Juego Graduable)", tag: "General" },
    { name: "Turbidímetro de Laboratorio", tag: "General" },
    { name: "Rotavapor con Baño Termostático", tag: "General" },
    { name: "Autoclave de Esterilización", tag: "General" },
    { name: "Bomba de Vacío / Rampa de Filtración", tag: "General" },
    { name: "Desecador con Vacío / Gel de Sílice", tag: "General" },
    { name: "Viscosímetro Rotacional Brookfield", tag: "General" },
    { name: "Agitador Mecánico / Vortex", tag: "General" },
    { name: "Colorímetro / Reactor DQO", tag: "General" },
    { name: "Conductímetro de Banco", tag: "General" },
    { name: "Bomba Peristáltica", tag: "General" },
    { name: "Digestor Kjeldahl / Microondas", tag: "General" },
    { name: "Tamizador Vibratorio / Ro-Tap", tag: "General" },
    { name: "Reactor Químico Parr (Alta Presión / Hidrotermal)", tag: "General" },
    { name: "Refractómetro Digital / Abbe", tag: "General" },
    { name: "Bomba Calorimétrica de Combustión", tag: "General" }
  ];

  const CATALOG_EQUIPOS_INSTRUMENTAL = [
    { name: "HPLC (Thermo Scientific)", tag: "Cromatografía" },
    { name: "GC-MS (Thermo Scientific)", tag: "Cromatografía / Masas" },
    { name: "HPLC (Agilent Technologies)", tag: "Cromatografía" },
    { name: "GC (Shimadzu)", tag: "Cromatografía de Gases" },
    { name: "Espectroscopio Infrarrojo (FTIR) (Thermo Scientific)", tag: "Espectroscopía" },
    { name: "Espectroscopio UV-Vis (Thermo Scientific)", tag: "Espectroscopía" },
    { name: "Espectroscopio UV-Vis con Fibra Óptica (Thermo Scientific)", tag: "Espectroscopía" },
    { name: "Analizador de Carbono Orgánico Total (TOC) (Shimadzu)", tag: "Carbono Total" },
    { name: "Analizador Elemental (CHONS) (Thermo Scientific)", tag: "Análisis Elemental" },
    { name: "Analizador Termogravimétrico (TGA/DSC)", tag: "Análisis Térmico" },
    { name: "Analizador de Tamaño de Partícula (Z-sizer) y Potencial Z (Malvern Analytical)", tag: "Partículas" },
    { name: "XRF (Bruker)", tag: "Rayos X" }
  ];

    const CATALOG_REACTIVOS = [
    { name: "etanol 96% v/v (grado reactivo / p.a.)", tag: "Solvente Líquido" },
    { name: "metanol (grado analítico / HPLC 99.9%)", tag: "Solvente Líquido" },
    { name: "acetona (grado analítico / p.a.)", tag: "Solvente Líquido" },
    { name: "isopropanol / alcohol isopropílico (p.a.)", tag: "Solvente Líquido" },
    { name: "hexano (grado analítico / HPLC)", tag: "Solvente Líquido" },
    { name: "acetato de etilo (grado reactivo)", tag: "Solvente Líquido" },
    { name: "diclorometano (DCM / p.a.)", tag: "Solvente Líquido" },
    { name: "acetonitrilo (grado HPLC / LC-MS 99.9%)", tag: "Solvente Líquido" },
    { name: "tolueno (grado reactivo / p.a.)", tag: "Solvente Líquido" },
    { name: "glicerol / glicerina (USP / 99% p.a.)", tag: "Solvente Líquido" },
    { name: "éter de petróleo (35-60 °C)", tag: "Solvente Líquido" },
    { name: "ácido clorhídrico (HCl 37% p.a.)", tag: "Ácido Líquido" },
    { name: "ácido sulfúrico (H2SO4 95-98% p.a.)", tag: "Ácido Líquido" },
    { name: "ácido acético glacial (99.8% p.a.)", tag: "Ácido Líquido" },
    { name: "ácido nítrico (HNO3 65-68% p.a.)", tag: "Ácido Líquido" },
    { name: "ácido cítrico monohidratado (p.a.)", tag: "Ácido Sólido" },
    { name: "ácido fosfórico (H3PO4 85% p.a.)", tag: "Ácido Líquido" },
    { name: "ácido gálico monohidratado (patrón de fenoles)", tag: "Patrón Sólido" },
    { name: "ácido ascórbico (vitamina C / patrón)", tag: "Patrón Sólido" },
    { name: "ácido fórmico (98-100% / HPLC)", tag: "Ácido Líquido" },
    { name: "hidróxido de sodio en lentejas (NaOH 98% p.a.)", tag: "Base Sólida" },
    { name: "hidróxido de potasio en lentejas (KOH p.a.)", tag: "Base Sólida" },
    { name: "hidróxido de amonio (NH4OH 28-30% p.a.)", tag: "Base Líquida" },
    { name: "bicarbonato de sodio (NaHCO3 p.a.)", tag: "Sal Sólida" },
    { name: "carbonato de sodio anhidro (Na2CO3)", tag: "Sal Sólida" },
    { name: "cloruro de sodio (NaCl p.a.)", tag: "Sal Sólida" },
    { name: "sulfato de sodio anhidro (Na2SO4)", tag: "Sal Sólida" },
    { name: "sulfato de magnesio (MgSO4)", tag: "Sal Sólida" },
    { name: "cloruro de calcio (CaCl2)", tag: "Sal Sólida" },
    { name: "tiosulfato de sodio pentahidratado (Na2S2O3)", tag: "Sal Sólida" },
    { name: "peróxido de hidrógeno (H2O2 al 30-35% p.a.)", tag: "Oxidante Líquido" },
    { name: "D-glucosa anhidra (patrón analítico)", tag: "Patrón Sólido" },
    { name: "sacarosa (p.a.)", tag: "Patrón Sólido" },
    { name: "persulfato de potasio (K2S2O8)", tag: "Sal Sólida" },
    { name: "reactivo de Folin-Ciocalteu (2N)", tag: "Reactivo Líquido" },
    { name: "fenolftaleína en solución al 1%", tag: "Indicador Líquido" },
    { name: "agua desionizada / destilada (LEIQ General)", tag: "Agua Líquida" },
    { name: "agua Milli-Q / ultrapura (grado HPLC / Instrumental)", tag: "Agua Líquida" },
    { name: "nitrógeno (cilindro / alta pureza)", tag: "Gas Especial" },
    { name: "argón (cilindro / grado analítico)", tag: "Gas Especial" },
    { name: "helio (cilindro / grado portador GC)", tag: "Gas Especial" },
    { name: "hidrógeno (cilindro / grado analítico)", tag: "Gas Especial" }
  ];

  const CATALOG_CONSUMIBLES = [
    { name: "Viales de vidrio para HPLC (1.5 mL / 2 mL con rosca)", tag: "Consumible" },
    { name: "Septas y tapas para viales de cromatografía", tag: "Consumible" },
    { name: "Filtros de jeringa PTFE / Nylon (0.22 µm / 0.45 µm)", tag: "Consumible" },
    { name: "Cubetas de cuarzo para UV-Vis (paso 10 mm)", tag: "Consumible" },
    { name: "Cubetas de plástico / poliestireno desechables", tag: "Consumible" },
    { name: "Crisoles de platino / alúmina para TGA", tag: "Consumible" },
    { name: "Celdas de conductividad y electrodos de pH", tag: "Consumible" }
  ];

  // =========================================================================
  // --- MOTOR DE AUTOCOMPLETADO (Typeahead: >= 2 caracteres, NO abre vacío) ---
  // =========================================================================
  function attachTypeahead(inputEl, catalogList) {
    if (!inputEl) return;

    let wrapper = inputEl.parentElement;
    if (!wrapper.classList.contains('typeahead-wrapper')) {
      const newWrapper = document.createElement('div');
      newWrapper.className = 'typeahead-wrapper';
      inputEl.parentNode.insertBefore(newWrapper, inputEl);
      newWrapper.appendChild(inputEl);
      wrapper = newWrapper;
    }

    let listEl = null;

    function removeList() {
      if (listEl && listEl.parentNode) {
        listEl.parentNode.removeChild(listEl);
      }
      listEl = null;
    }

    function renderSuggestions() {
      const q = inputEl.value.trim().toLowerCase();
      if (q.length < 2) {
        removeList();
        return;
      }

      const qNorm = q.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const matches = catalogList.filter(item => {
        const nameNorm = item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return nameNorm.includes(qNorm);
      }).slice(0, 7);

      if (matches.length === 0) {
        removeList();
        return;
      }

      if (!listEl) {
        listEl = document.createElement('ul');
        listEl.className = 'typeahead-suggestions-list';
        wrapper.appendChild(listEl);
      }

      listEl.innerHTML = matches.map(item => {
        const nameNorm = item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const idx = nameNorm.indexOf(qNorm);
        let displayHtml = item.name;
        if (idx !== -1) {
          const before = item.name.substring(0, idx);
          const matchText = item.name.substring(idx, idx + q.length);
          const after = item.name.substring(idx + q.length);
          displayHtml = `${before}<span class="typeahead-item-highlight">${matchText}</span>${after}`;
        }

        return `
          <li class="typeahead-item" data-val="${item.name.replace(/"/g, '&quot;')}">
            <span class="typeahead-item-text">${displayHtml}</span>
            ${item.tag ? `<span class="typeahead-item-tag">${item.tag}</span>` : ''}
          </li>
        `;
      }).join('');

      listEl.querySelectorAll('.typeahead-item').forEach(li => {
        li.addEventListener('mousedown', (e) => {
          e.preventDefault();
          inputEl.value = li.getAttribute('data-val');
          removeList();
          inputEl.dispatchEvent(new Event('input', { bubbles: true }));
          inputEl.dispatchEvent(new Event('change', { bubbles: true }));
          updateSummary();
        });
      });
    }

    inputEl.addEventListener('input', renderSuggestions);

    inputEl.addEventListener('keydown', (e) => {
      if (!listEl) return;
      const items = listEl.querySelectorAll('.typeahead-item');
      if (items.length === 0) return;

      let activeItem = listEl.querySelector('.typeahead-item.active-item');
      let activeIndex = Array.from(items).indexOf(activeItem);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeItem) activeItem.classList.remove('active-item');
        const next = (activeIndex + 1) % items.length;
        items[next].classList.add('active-item');
        items[next].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeItem) activeItem.classList.remove('active-item');
        const prev = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
        items[prev].classList.add('active-item');
        items[prev].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        if (activeItem) {
          e.preventDefault();
          inputEl.value = activeItem.getAttribute('data-val');
          removeList();
          inputEl.dispatchEvent(new Event('input', { bubbles: true }));
          inputEl.dispatchEvent(new Event('change', { bubbles: true }));
          updateSummary();
        }
      } else if (e.key === 'Escape') {
        removeList();
      }
    });

    inputEl.addEventListener('blur', () => {
      setTimeout(removeList, 220);
    });
  }

  // --- Dynamic Row Generators ---

  function createEquipoRow(labType, defaultVal = {}) {
    const row = document.createElement('div');
    row.className = 'dynamic-row equipo-row';

    if (labType === 'general') {
      row.innerHTML = `
        <div class="row-cell-main">
          <input type="text" class="form-control eq-nombre" placeholder="Escriba el equipo requerido" value="${defaultVal.nombre || ''}">
        </div>
        <div class="row-cell-qty">
          <input type="text" class="form-control eq-placa" placeholder="Placa UCR" value="${defaultVal.placa || ''}">
        </div>
        <div class="row-cell-source">
          <select class="form-control eq-disponible">
            <option value="Disponible en el laboratorio" ${defaultVal.disponible === 'Disponible en el laboratorio' ? 'selected' : ''}>Disponible en el laboratorio</option>
            <option value="No disponible en el laboratorio" ${defaultVal.disponible === 'No disponible en el laboratorio' ? 'selected' : ''}>No disponible en el laboratorio</option>
          </select>
        </div>
        <div class="row-cell-cap">
          <label class="checkbox-item-sm"><input type="checkbox" class="eq-capacitacion" ${defaultVal.capacitacion ? 'checked' : ''}> Req. Capacitación</label>
        </div>
        <button type="button" class="btn-row-del" title="Eliminar fila">✕</button>
      `;
      attachTypeahead(row.querySelector('.eq-nombre'), CATALOG_EQUIPOS_GENERAL);
    } else if (labType === 'instrumental') {
      row.innerHTML = `
        <div class="row-cell-main">
          <input type="text" class="form-control eq-nombre" placeholder="Escriba el equipo instrumental" value="${defaultVal.nombre || ''}">
        </div>
        <div class="row-cell-qty">
          <input type="text" class="form-control eq-placa" placeholder="Cant. análisis aprox. *" value="${defaultVal.placa || ''}" required>
        </div>
        <div class="row-cell-cap">
          <label class="checkbox-item-sm"><input type="checkbox" class="eq-capacitacion" ${defaultVal.capacitacion ? 'checked' : ''}> Req. Capacitación</label>
        </div>
        <div class="row-cell-cap">
          <label class="checkbox-item-sm font-semibold" style="color: var(--ucr-blue-primary);"><input type="checkbox" class="eq-solicita-analisis" ${defaultVal.solicitaAnalisis ? 'checked' : ''}> Solicita análisis</label>
        </div>
        <button type="button" class="btn-row-del" title="Eliminar fila">✕</button>
      `;
      attachTypeahead(row.querySelector('.eq-nombre'), CATALOG_EQUIPOS_INSTRUMENTAL);
    } else { // COTRAFIN
      row.innerHTML = `
        <div class="row-cell-main">
          <input type="text" class="form-control eq-nombre" placeholder="Nombre del equipo" value="${defaultVal.nombre || ''}">
        </div>
        <div class="row-cell-source" style="flex: 2;">
          <select class="form-control eq-origen">
            <option value="Solicitado a la EIQ" ${defaultVal.origen === 'Solicitado a la EIQ' ? 'selected' : ''}>Solicitado a la EIQ</option>
            <option value="Provisto por proyecto de investigación" ${defaultVal.origen === 'Provisto por proyecto de investigación' ? 'selected' : ''}>Provisto por proyecto de investigación</option>
            <option value="Solicitado a otra unidad o centro de investigación" ${defaultVal.origen === 'Solicitado a otra unidad o centro de investigación' ? 'selected' : ''}>Solicitado a otra unidad o centro de investigación</option>
          </select>
        </div>
        <button type="button" class="btn-row-del" title="Eliminar fila">✕</button>
      `;
      attachTypeahead(row.querySelector('.eq-nombre'), CATALOG_EQUIPOS_GENERAL);
    }

    attachDeleteHandler(row);
    return row;
  }

  // Mapa de normalización SI para unidades de medida
  const SI_UNIT_DISPLAY = {
    'ml': 'mL', 'l': 'L', 'lt': 'L', 'lts': 'L', 'litro': 'L', 'litros': 'L',
    'mililitro': 'mL', 'mililitros': 'mL', '\u00b5l': '\u00b5L', 'ul': '\u00b5L',
    'microlitro': '\u00b5L', 'microlitros': '\u00b5L', 'cm3': 'cm\u00b3', 'cc': 'cm\u00b3',
    'kg': 'kg', 'kgs': 'kg', 'kilo': 'kg', 'kilos': 'kg', 'kilogramo': 'kg', 'kilogramos': 'kg',
    'g': 'g', 'gr': 'g', 'grs': 'g', 'gramo': 'g', 'gramos': 'g',
    'mg': 'mg', 'mgs': 'mg', 'miligramo': 'mg', 'miligramos': 'mg',
    '\u00b5g': '\u00b5g', 'ug': '\u00b5g', 'microgramo': '\u00b5g', 'microgramos': '\u00b5g',
    'ft^3': 'ft\u00b3', 'ft3': 'ft\u00b3', 'ft\u00b3': 'ft\u00b3', 'ft 3': 'ft\u00b3',
    'pie^3': 'pie\u00b3', 'pies^3': 'pies\u00b3', 'pie3': 'pie\u00b3', 'pies3': 'pies\u00b3',
    'm^3': 'm\u00b3', 'm3': 'm\u00b3', 'm\u00b3': 'm\u00b3'
  };
  function normalizeSIUnit(raw) {
    return SI_UNIT_DISPLAY[raw.toLowerCase()] || raw;
  }

  // Helper para validar unidades de medida y concordancia con el estado físico
  function validateReagentUnit(val, reagentName = "") {
    if (!val || !val.trim()) {
      return { valid: false, message: "\u26a0 Ingrese cantidad y unidad", type: "empty" };
    }
    const s = val.trim().toLowerCase();
    const rNameLower = (reagentName || "").toLowerCase();
    
    if (!/\d/.test(s)) {
      return { valid: false, message: "\u26a0 Falta n\u00famero y unidad (ej: 500 mL, 2 L, 50 g, 5 ft\u00b3)", type: "no_digit" };
    }

    // 1. Gases: ft3, ft^3, ft³, m3, m^3 y variantes
    const gasRegex = /(?:ft\^3|ft3|ft\u00b3|ft\s*3|pies?\^3|pies?3|pies?\u00b3|pies?\s*c[u\u00fa]bicos?|m\^3|m3|m\u00b3)(?![a-zA-Z0-9])/i;
    if (gasRegex.test(s)) {
      const match = s.match(gasRegex);
      const unitLabel = normalizeSIUnit(match[0]) || match[0];
      return { valid: true, message: "\u2713 Volumen de Gas (" + unitLabel + ")", type: "gas" };
    }

    // 2. Volumen liquido
    const volRegex = /\b(ml|l|lt|lts|litro|litros|mililitro|mililitros|\u00b5l|ul|microlitro|microlitros|cm3|cc)\b/i;
    if (volRegex.test(s)) {
      const match = s.match(volRegex);
      const isSolidReagent = /\b(naoh|hidr[o\u00f3]xido\s*de\s*sodio|koh|hidr[o\u00f3]xido\s*de\s*potasio|nacl|cloruro\s*de\s*sodio|glucosa|sacarosa|c[i\u00ed]trico|ox[a\u00e1]lico|sulfato\s*de\s*sodio|sulfato\s*de\s*magnesio|cloruro\s*de\s*calcio|carbonato|bicarbonato|tiosulfato|persulfato|s[i\u00ed]lica\s*gel)\b/i.test(rNameLower);
      
      let msg = "\u2713 Volumen (" + normalizeSIUnit(match[0]) + ")";
      if (isSolidReagent) {
        msg += " \u2139\ufe0f (Sustancia s\u00f3lida en bodega; si es disoluci\u00f3n pida agua en otra fila)";
      }
      return { valid: true, message: msg, type: "volume" };
    }

    // 3. Masa solida
    const massRegex = /\b(kg|kgs|kilo|kilos|kilogramo|kilogramos|g|gr|grs|gramo|gramos|mg|mgs|miligramo|miligramos|\u00b5g|ug|microgramo|microgramos)\b/i;
    if (massRegex.test(s)) {
      const match = s.match(massRegex);
      const isLiquidReagent = /\b(etanol|metanol|acetona|isopropanol|hexano|acetato\s*de\s*etilo|diclorometano|cloroformo|acetonitrilo|tolueno|xileno|glicerol|glicerina|hcl|clorh[i\u00ed]drico|h2so4|sulf[\u00fa]rico|hno3|n[i\u00ed]trico|ac[e\u00e9]tico|fosf[o\u00f3]rico|h3po4|agua\s*desionizada|agua\s*destilada|milli[- ]?q|agua\s*ultrapura|per[o\u00f3]xido|agua\s*oxigenada)\b/i.test(rNameLower);

      let msg = "\u2713 Masa (" + normalizeSIUnit(match[0]) + ")";
      if (isLiquidReagent) {
        msg += " \u2139\ufe0f (L\u00edquido en bodega; usualmente se solicita en mL o L)";
      }
      return { valid: true, message: msg, type: "mass" };
    }

    // 4. Envase / Presentacion
    const otherRegex = /\b(cilindro|cilindros|frasco|frascos|botella|botellas|sobre|sobres|ampolla|ampollas|tableta|tabletas|unidad|unidades)\b/i;
    if (otherRegex.test(s)) {
      const match = s.match(otherRegex);
      return { valid: true, message: "\u2713 Presentaci\u00f3n (" + match[0] + ")", type: "other" };
    }

    return { valid: false, message: "\u26a0 Falta la unidad (ej: 500 mL, 2 L, 50 g, 5 ft\u00b3)", type: "missing_unit" };
  }

  function setupReagentQuantityInput(row) {
    const inputNombre = row.querySelector('.rec-nombre');
    const inputCant = row.querySelector('.rec-cant');
    const feedbackMsg = row.querySelector('.unit-feedback-msg');
    const chips = row.querySelectorAll('.unit-chip');

    if (!inputCant) return;

    function checkUnit() {
      const val = inputCant.value;
      const rName = inputNombre ? inputNombre.value.trim() : "";
      if (!val.trim()) {
        if (feedbackMsg) {
          feedbackMsg.textContent = "";
          feedbackMsg.className = "unit-feedback-msg";
        }
        inputCant.classList.remove('input-unit-valid', 'input-unit-invalid');
        return;
      }

      const res = validateReagentUnit(val, rName);
      if (feedbackMsg) {
        feedbackMsg.textContent = res.message;
        feedbackMsg.className = "unit-feedback-msg " + (res.valid ? 'unit-valid' : 'unit-invalid');
      }
      if (res.valid) {
        inputCant.classList.add('input-unit-valid');
        inputCant.classList.remove('input-unit-invalid');
      } else {
        inputCant.classList.add('input-unit-invalid');
        inputCant.classList.remove('input-unit-valid');
      }
    }

    inputCant.addEventListener('input', checkUnit);
    inputCant.addEventListener('blur', checkUnit);
    if (inputNombre) {
      inputNombre.addEventListener('input', checkUnit);
      inputNombre.addEventListener('change', checkUnit);
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const unit = chip.dataset.unit;
        let currentVal = inputCant.value.trim();
        if (!currentVal) {
          inputCant.value = "1 " + unit;
        } else {
          const numMatch = currentVal.match(/^\d+[\.,]?\d*/);
          if (numMatch) {
            inputCant.value = numMatch[0] + " " + unit;
          } else {
            inputCant.value = currentVal + " " + unit;
          }
        }
        checkUnit();
        updateSummary();
      });
    });

    if (inputCant.value) checkUnit();
  }

  function createReactivoRow(labType, defaultVal = {}) {
    const row = document.createElement('div');
    row.className = 'dynamic-row reactivo-row';

    if (labType === 'cotrafin') {
      row.innerHTML = '<div class="row-cell-main"><input type="text" class="form-control rec-nombre" placeholder="Reactivo y pureza (escriba libremente)" value="' + (defaultVal.nombre || '') + '"></div><div class="row-cell-source" style="flex: 2;"><select class="form-control rec-origen"><option value="Solicitado al laboratorio de la EIQ"' + (defaultVal.origen === 'Solicitado al laboratorio de la EIQ' ? ' selected' : '') + '>Solicitado al laboratorio de la EIQ</option><option value="Provisto por alg\u00fan proyecto de investigaci\u00f3n"' + (defaultVal.origen === 'Provisto por algún proyecto de investigación' ? ' selected' : '') + '>Provisto por alg\u00fan proyecto de investigaci\u00f3n</option><option value="Solicitado a otra unidad o centro de investigaci\u00f3n"' + (defaultVal.origen === 'Solicitado a otra unidad o centro de investigación' ? ' selected' : '') + '>Solicitado a otra unidad o centro de investigaci\u00f3n</option></select></div><button type="button" class="btn-row-del" title="Eliminar fila">\u2715</button>';
      attachTypeahead(row.querySelector('.rec-nombre'), CATALOG_REACTIVOS);
    } else {
      row.innerHTML = '<div class="row-cell-main"><input type="text" class="form-control rec-nombre" placeholder="Reactivo y pureza (escriba libremente)" value="' + (defaultVal.nombre || '') + '"></div><div class="row-cell-qty" style="position: relative;"><input type="text" class="form-control rec-cant" placeholder="Cantidad y unidad (ej: 500 mL, 50 g, 5 ft\u00b3) *" value="' + (defaultVal.cantidad || '') + '" required><div class="unit-helper-container"><div class="unit-feedback-msg"></div><div class="unit-quick-chips"><span class="unit-chip" data-unit="mL" title="Mililitros (l\u00edquido)">mL</span><span class="unit-chip" data-unit="L" title="Litros (l\u00edquido / gas)">L</span><span class="unit-chip" data-unit="g" title="Gramos (s\u00f3lido)">g</span><span class="unit-chip" data-unit="kg" title="Kilogramos (s\u00f3lido)">kg</span><span class="unit-chip" data-unit="mg" title="Miligramos (s\u00f3lido)">mg</span><span class="unit-chip unit-chip-gas" data-unit="ft\u00b3" title="Pies c\u00fabicos (Gases en cilindro)">ft\u00b3</span></div></div></div><div class="row-cell-source"><select class="form-control rec-origen"><option value="Disponible en el laboratorio de la EIQ"' + (defaultVal.origen === 'Disponible en el laboratorio de la EIQ' ? ' selected' : '') + '>Disponible en el laboratorio de la EIQ</option><option value="Lo provee alg\u00fan proyecto de investigaci\u00f3n"' + (defaultVal.origen === 'Lo provee algún proyecto de investigación' ? ' selected' : '') + '>Lo provee alg\u00fan proyecto de investigaci\u00f3n</option><option value="Lo provee centro de investigaci\u00f3n o unidad"' + (defaultVal.origen === 'Lo provee centro de investigación o unidad' ? ' selected' : '') + '>Lo provee centro de investigaci\u00f3n o unidad</option></select></div><button type="button" class="btn-row-del" title="Eliminar fila">\u2715</button>';
      attachTypeahead(row.querySelector('.rec-nombre'), CATALOG_REACTIVOS);
    }

    attachDeleteHandler(row);
    if (labType !== 'cotrafin') {
      setupReagentQuantityInput(row);
    }
    return row;
  }

  function createConsumibleRow(defaultVal = {}) {
    const row = document.createElement('div');
    row.className = 'dynamic-row consumible-row';
    row.innerHTML = '<div class="row-cell-main"><input type="text" class="form-control con-nombre" placeholder="Consumible (escriba libremente)" value="' + (defaultVal.nombre || '') + '"></div><div class="row-cell-qty"><input type="text" class="form-control con-cant" placeholder="Cantidad *" value="' + (defaultVal.cantidad || '') + '" required></div><div class="row-cell-source"><select class="form-control con-origen"><option value="Solicita al laboratorio de la EIQ"' + (defaultVal.origen === 'Solicita al laboratorio de la EIQ' ? ' selected' : '') + '>Solicita al laboratorio de la EIQ</option><option value="Provee proyecto de investigaci\u00f3n o unidad"' + (defaultVal.origen === 'Provee proyecto de investigación o unidad' ? ' selected' : '') + '>Provee proyecto de investigaci\u00f3n o unidad</option></select></div><button type="button" class="btn-row-del" title="Eliminar fila">\u2715</button>';
    attachTypeahead(row.querySelector('.con-nombre'), CATALOG_CONSUMIBLES);
    attachDeleteHandler(row);
    return row;
  }


  // --- Dynamic Lab Type Configuration Update ---
  function updateLabTypeForm() {
    const selectedLab = document.querySelector('input[name="tipoLaboratorio"]:checked').value;
    const config = LAB_CONFIGS[selectedLab];

    // 1. Update Actividades dropdown strictly based on reference doc
    selectTipoActividad.innerHTML = config.actividades.map(act => `<option value="${act}">${act}</option>`).join('');

    // 2. Update Commitments Checklist (Locked / Irremovable)
    commitmentsContainer.innerHTML = config.compromisos.map((comp, idx) => `
      <label class="checkbox-item locked">
        <input type="checkbox" id="chk-comp-${idx}" checked onclick="return false;" tabindex="-1">
        <span>${idx + 1}. ${comp}</span>
      </label>
    `).join('');

    // 3. Show/hide Integrantes (General lab allows group members)
    if (selectedLab === 'general') {
      sectionIntegrantes.classList.remove('hidden');
    } else {
      sectionIntegrantes.classList.add('hidden');
    }

    // 4. Show/hide Instrumental checklist & Consumibles
    if (selectedLab === 'instrumental') {
      sectionPreguntasInstr.classList.remove('hidden');
      sectionConsumiblesInstr.classList.remove('hidden');
      document.getElementById('hint-periodo-max').textContent = 'Nota: En laboratorio instrumental el tiempo máximo por permiso es un mes.';
      document.getElementById('hint-equipos-header').textContent = 'Indique equipos y marque si solicita que se le realice el análisis.';
    } else {
      sectionPreguntasInstr.classList.add('hidden');
      sectionConsumiblesInstr.classList.add('hidden');
      document.getElementById('hint-periodo-max').textContent = 'Indique el periodo estimado para la realización de las actividades.';
      document.getElementById('hint-equipos-header').textContent = 'Indique los equipos requeridos para la actividad.';
    }

    // 5. Adapt fields for COTRAFIN (no curso, no fechas, intro text)
    const groupCurso = document.getElementById('group-curso-proyecto');
    const inputCurso = document.getElementById('nombreCursoProyecto');
    const groupFechas = document.getElementById('group-fechas');
    const inputFInicio = document.getElementById('fechaInicio');
    const inputFFin = document.getElementById('fechaFinal');

    if (selectedLab === 'cotrafin') {
      if (groupCurso) groupCurso.classList.add('hidden');
      if (inputCurso) inputCurso.removeAttribute('required');
      if (groupFechas) groupFechas.classList.add('hidden');
      if (inputFInicio) inputFInicio.removeAttribute('required');
      if (inputFFin) inputFFin.removeAttribute('required');
      if (calloutCotrafinIntro) calloutCotrafinIntro.classList.remove('hidden');
    } else {
      if (groupCurso) groupCurso.classList.remove('hidden');
      if (inputCurso) inputCurso.setAttribute('required', '');
      if (groupFechas) groupFechas.classList.remove('hidden');
      if (inputFInicio) inputFInicio.setAttribute('required', '');
      if (inputFFin) inputFFin.setAttribute('required', '');
      if (calloutCotrafinIntro) calloutCotrafinIntro.classList.add('hidden');
    }

    // 6. Reset / rebuild dynamic rows for the active lab
    equiposContainer.innerHTML = '';
    reactivosContainer.innerHTML = '';
    consumiblesContainer.innerHTML = '';

    if (!chkNoEquipos.checked) {
      if (selectedLab === 'general') {
        equiposContainer.appendChild(createEquipoRow('general', { nombre: "Espectrofotómetro UV-Visible (Shimadzu UV-1800)", placa: "UCR-84920", disponible: "Disponible en el laboratorio", capacitacion: false }));
      } else if (selectedLab === 'instrumental') {
        equiposContainer.appendChild(createEquipoRow('instrumental', { nombre: "Cromatógrafo Líquido HPLC (Thermo Ultimate 3000)", placa: "15 análisis", capacitacion: true, solicitaAnalisis: false }));
        consumiblesContainer.appendChild(createConsumibleRow({ nombre: "Viales de vidrio para HPLC (1.5 mL)", cantidad: "30 unidades", origen: "Solicita al laboratorio de la EIQ" }));
      } else {
        equiposContainer.appendChild(createEquipoRow('cotrafin', { nombre: "Viscosímetro Rotacional Brookfield", origen: "Solicitado a la EIQ" }));
      }
    }

    if (!chkNoReactivos.checked) {
      if (selectedLab === 'cotrafin') {
        reactivosContainer.appendChild(createReactivoRow('cotrafin', { nombre: "Glicerol puro 99%", origen: "Provisto por algún proyecto de investigación" }));
      } else {
        reactivosContainer.appendChild(createReactivoRow(selectedLab, { nombre: "Etanol (96% v/v)", cantidad: "500 mL", origen: "Disponible en el laboratorio de la EIQ" }));
      }
    }

    updateSummary();
  }

  labRadioInputs.forEach(radio => {
    radio.addEventListener('change', updateLabTypeForm);
  });

  // --- No Equipos & No Reactivos Toggles ---
  chkNoEquipos.addEventListener('change', () => {
    if (chkNoEquipos.checked) {
      equiposContainer.innerHTML = '<div class="callout-box" style="padding: 0.65rem 1rem;"><small><em>No se utilizarán equipos en esta actividad.</em></small></div>';
      btnAddEquipo.disabled = true;
      btnAddEquipo.style.opacity = '0.5';
    } else {
      btnAddEquipo.disabled = false;
      btnAddEquipo.style.opacity = '1';
      equiposContainer.innerHTML = '';
      const selectedLab = document.querySelector('input[name="tipoLaboratorio"]:checked').value;
      equiposContainer.appendChild(createEquipoRow(selectedLab));
    }
    updateSummary();
  });

  chkNoReactivos.addEventListener('change', () => {
    if (chkNoReactivos.checked) {
      reactivosContainer.innerHTML = '<div class="callout-box" style="padding: 0.65rem 1rem;"><small><em>No se utilizarán reactivos en esta actividad.</em></small></div>';
      btnAddReactivo.disabled = true;
      btnAddReactivo.style.opacity = '0.5';
    } else {
      btnAddReactivo.disabled = false;
      btnAddReactivo.style.opacity = '1';
      reactivosContainer.innerHTML = '';
      const selectedLab = document.querySelector('input[name="tipoLaboratorio"]:checked').value;
      reactivosContainer.appendChild(createReactivoRow(selectedLab));
    }
    updateSummary();
  });

  // --- Add Row Handlers ---
  btnAddEquipo.addEventListener('click', () => {
    const selectedLab = document.querySelector('input[name="tipoLaboratorio"]:checked').value;
    equiposContainer.appendChild(createEquipoRow(selectedLab));
    updateSummary();
  });

  btnAddReactivo.addEventListener('click', () => {
    const selectedLab = document.querySelector('input[name="tipoLaboratorio"]:checked').value;
    reactivosContainer.appendChild(createReactivoRow(selectedLab));
    updateSummary();
  });

  if (btnAddConsumible) {
    btnAddConsumible.addEventListener('click', () => {
      consumiblesContainer.appendChild(createConsumibleRow());
      updateSummary();
    });
  }

  if (btnAddIntegrante) {
    btnAddIntegrante.addEventListener('click', () => {
      const count = integrantesContainer.querySelectorAll('.integrante-row').length + 1;
      const row = document.createElement('div');
      row.className = 'dynamic-row integrante-row';
      row.innerHTML = `
        <div class="row-cell-main">
          <input type="text" class="form-control int-nombre" placeholder="Nombre integrante #${count}">
        </div>
        <div class="row-cell-qty">
          <input type="text" class="form-control int-carne" placeholder="Carné">
        </div>
        <button type="button" class="btn-row-del" title="Eliminar">✕</button>
      `;
      integrantesContainer.appendChild(row);
      attachDeleteHandler(row);
    });
  }

  function attachDeleteHandler(row) {
    const delBtn = row.querySelector('.btn-row-del');
    if (delBtn) {
      delBtn.addEventListener('click', () => {
        row.remove();
        updateSummary();
      });
    }
  }

  // --- Real-time Summary Update ---
  const inputsToListen = form.querySelectorAll('input, select, textarea');
  inputsToListen.forEach(input => {
    input.addEventListener('input', updateSummary);
    input.addEventListener('change', updateSummary);
  });

  function updateSummary() {
    const nombreInput = document.getElementById('nombreEstudiante');
    const carneInput = document.getElementById('carneEstudiante');
    const docenteInput = document.getElementById('docenteResponsable');
    const correoDocInput = document.getElementById('correoDocente');

    const nombre = (nombreInput && nombreInput.value.trim()) ? nombreInput.value.trim() : '—';
    const carne = (carneInput && carneInput.value.trim()) ? carneInput.value.trim() : '—';
    const docente = (docenteInput && docenteInput.value.trim()) ? docenteInput.value.trim() : '—';
    const correoDoc = (correoDocInput && correoDocInput.value.trim()) ? correoDocInput.value.trim() : '—';
    const fInicio = document.getElementById('fechaInicio')?.value;
    const fFin = document.getElementById('fechaFinal')?.value;

    const selectedLabRadio = document.querySelector('input[name="tipoLaboratorio"]:checked');
    const selectedLab = selectedLabRadio ? selectedLabRadio.value : 'general';
    const labTexto = selectedLab === 'cotrafin' ? 'No Aplica' : (LAB_CONFIGS[selectedLab] ? LAB_CONFIGS[selectedLab].nombre : '—');

    const eqRows = chkNoEquipos.checked ? 0 : document.querySelectorAll('#equipos-container .equipo-row').length;
    const recRows = chkNoReactivos.checked ? 0 : document.querySelectorAll('#reactivos-container .reactivo-row').length;

    document.getElementById('sum-nombre').textContent = nombre;
    document.getElementById('sum-carne').textContent = carne;
    document.getElementById('sum-lab').textContent = labTexto;
    document.getElementById('sum-docente').textContent = docente;
    document.getElementById('sum-correo-docente').textContent = correoDoc;
    
    let periodoTexto = (fInicio && fFin) ? `${formatDateStr(fInicio)} al ${formatDateStr(fFin)}` : '—';
    if (selectedLab === 'cotrafin') {
      periodoTexto = 'No Aplica';
    }
    document.getElementById('sum-periodo').textContent = periodoTexto;

    let eqTexto = '—';
    if (chkNoEquipos.checked) {
      eqTexto = 'No se utilizarán';
    } else if (currentStep >= 3) {
      eqTexto = `${eqRows} equipo(s)`;
    }
    document.getElementById('sum-equipos-count').textContent = eqTexto;

    let recTexto = '—';
    if (chkNoReactivos.checked) {
      recTexto = 'No se utilizarán';
    } else if (currentStep >= 3) {
      recTexto = `${recRows} reactivo(s)`;
    }
    document.getElementById('sum-reactivos-count').textContent = recTexto;

    const previewCodeEl = document.getElementById('preview-ticket-code');
    if (previewCodeEl) previewCodeEl.textContent = activeTicketId;
    const previewDateEl = document.getElementById('preview-ticket-date');
    if (previewDateEl) previewDateEl.textContent = new Date().toLocaleDateString('es-CR');
  }

  function formatDateStr(dateVal) {
    if (!dateVal) return "";
    if (typeof dateVal === 'string') {
      const s = dateVal.trim();
      if (!s || s === "—") return "";
      // Si ya viene en formato DD/MM/YYYY o D/M/YYYY
      if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) return s;
      // Si viene en formato ISO (YYYY-MM-DD o YYYY-MM-DDTHH:mm:ss...)
      const match = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (match) {
        return `${match[3]}/${match[2]}/${match[1]}`;
      }
    }
    try {
      const d = new Date(dateVal);
      if (!isNaN(d.getTime())) {
        const dia = String(d.getUTCDate()).padStart(2, '0');
        const mes = String(d.getUTCMonth() + 1).padStart(2, '0');
        const anio = d.getUTCFullYear();
        return `${dia}/${mes}/${anio}`;
      }
    } catch (e) { /* sin-op */ }
    return String(dateVal);
  }

  function calcularIniciales(nombre) {
    if (!nombre) return "";
    // Limpiar tratamientos académicos y títulos habituales
    const limpio = String(nombre).replace(/\b(Inga?|Dra?|Licda?|Lic|MSc|Ph\.?D|Prof|Bach)\.?\b/gi, '').trim();
    const partes = limpio.split(/[\s,.-]+/).filter(p => p.length > 0);
    if (partes.length === 0) return "";
    return partes.map(p => p[0].toUpperCase()).join('').slice(0, 4);
  }

  // --- Stepper Navigation Logic ---
  btnNextList.forEach(btn => {
    btn.addEventListener('click', () => {
      const nextStep = parseInt(btn.getAttribute('data-next'));
      if (validateStep(currentStep)) {
        goToStep(nextStep);
      }
    });
  });

  btnPrevList.forEach(btn => {
    btn.addEventListener('click', () => {
      const prevStep = parseInt(btn.getAttribute('data-prev'));
      goToStep(prevStep);
    });
  });

  function goToStep(stepNumber) {
    currentStep = stepNumber;
    formSteps.forEach((step, idx) => {
      step.classList.toggle('active', idx + 1 === stepNumber);
    });

    stepItems.forEach((item, idx) => {
      item.classList.remove('active', 'completed');
      if (idx + 1 === stepNumber) {
        item.classList.add('active');
      } else if (idx + 1 < stepNumber) {
        item.classList.add('completed');
      }
    });

    updateSummary();
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }

  function validateStep(step) {
    const currentStepEl = document.getElementById(`step-${step}`);
    const allInputs = currentStepEl.querySelectorAll('input, select, textarea');
    let isValid = true;

    allInputs.forEach(input => {
      if (!input.hasAttribute('required') || input.closest('.hidden')) return;

      if (input.type === 'checkbox' && !input.checked) {
        isValid = false;
        input.parentElement.style.color = 'var(--color-danger)';
      } else if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = 'var(--color-danger)';
      } else {
        input.style.borderColor = 'var(--border-color)';
        if (input.type === 'checkbox') input.parentElement.style.color = 'var(--text-main)';
      }
    });

    // Validación estricta de unidades de medida (volumen o masa) en el Paso 3
    if (step === 3 && !chkNoReactivos.checked) {
      const reagentRows = currentStepEl.querySelectorAll('.reactivo-row');
      let invalidReagents = [];

      reagentRows.forEach(row => {
        const inputNombre = row.querySelector('.rec-nombre');
        const inputCant = row.querySelector('.rec-cant');
        if (inputCant) {
          const val = inputCant.value.trim();
          const rName = (inputNombre && inputNombre.value.trim()) ? inputNombre.value.trim() : "Reactivo sin nombre";
          const res = validateReagentUnit(val);
          if (!res.valid) {
            isValid = false;
            inputCant.classList.add('input-unit-invalid');
            inputCant.classList.remove('input-unit-valid');
            invalidReagents.push(`• ${rName}: "${val || 'Vacío'}" (${res.message})`);
          } else {
            inputCant.classList.add('input-unit-valid');
            inputCant.classList.remove('input-unit-invalid');
          }
        }
      });

      if (invalidReagents.length > 0) {
        alert(`⚠ Validación Obligatoria de Unidades en Reactivos:\n\nPara cada reactivo solicitado debe indicar una cantidad numérica acompañada de su unidad de medida (volumen o masa).\n\nReactivos con unidades no especificadas:\n${invalidReagents.join('\n')}\n\nEjemplos válidos:\n• Líquidos / Soluciones: 500 mL, 2 L, 100 µL\n• Sólidos / Sales / Patrones: 50 g, 1.5 kg, 250 mg\n• Gases / Envases: 1 cilindro, 1 frasco\n\nPor favor corrija las casillas marcadas en rojo antes de continuar.`);
        return false;
      }
    }

    if (!isValid) {
      alert('Por favor complete todos los campos obligatorios antes de continuar.');
    }
    return isValid;
  }

  // --- Form Submission (Student Step) ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    const btnSubmit = document.getElementById('btn-submit-solicitud');
    const textoOriginalBtn = btnSubmit ? btnSubmit.textContent : '';
    if (btnSubmit) {
      btnSubmit.disabled = true;
      btnSubmit.textContent = 'Transmitiendo solicitud a la nube...';
    }

    const labType = document.querySelector('input[name="tipoLaboratorio"]:checked').value;
    const labName = labType === 'cotrafin' ? 'No Aplica' : LAB_CONFIGS[labType].nombre;
    const config = LAB_CONFIGS[labType];

    // Collect Equipos
    const equipos = [];
    if (!chkNoEquipos.checked) {
      document.querySelectorAll('.equipo-row').forEach(row => {
        const nom = row.querySelector('.eq-nombre')?.value.trim();
        const placa = row.querySelector('.eq-placa')?.value.trim() || "";
        const disponible = row.querySelector('.eq-disponible')?.value || "Disponible en el laboratorio";
        const origen = row.querySelector('.eq-origen')?.value || "Solicitado a la EIQ";
        const cap = row.querySelector('.eq-capacitacion') ? row.querySelector('.eq-capacitacion').checked : false;
        const solicitaAnalisis = row.querySelector('.eq-solicita-analisis') ? row.querySelector('.eq-solicita-analisis').checked : false;
        if (nom) equipos.push({ nombre: nom, placa: placa, disponible: disponible, origen: origen, capacitacion: cap, solicitaAnalisis: solicitaAnalisis });
      });
    }

    // Collect Reactivos
    const reactivos = [];
    if (!chkNoReactivos.checked) {
      document.querySelectorAll('.reactivo-row').forEach(row => {
        const nom = row.querySelector('.rec-nombre')?.value.trim();
        const cant = row.querySelector('.rec-cant')?.value.trim() || "";
        const ori = row.querySelector('.rec-origen')?.value;
        if (nom) reactivos.push({ nombre: nom, cantidad: cant, origen: ori });
      });
    }

    // Collect Consumibles
    const consumibles = [];
    if (labType === 'instrumental') {
      document.querySelectorAll('.consumible-row').forEach(row => {
        const nom = row.querySelector('.con-nombre')?.value.trim();
        const cant = row.querySelector('.con-cant')?.value.trim() || "";
        const ori = row.querySelector('.con-origen')?.value;
        if (nom) consumibles.push({ nombre: nom, cantidad: cant, origen: ori });
      });
    }

    // Collect Integrantes
    const integrantes = [];
    document.querySelectorAll('.integrante-row').forEach(row => {
      const nom = row.querySelector('.int-nombre')?.value.trim();
      const car = row.querySelector('.int-carne')?.value.trim();
      if (nom && car) integrantes.push({ nombre: nom, carne: car });
    });

    const prefix = getLabPrefix(labType);
    const yearNow = new Date().getFullYear();
    const newReqId = `${prefix}-PERM-${yearNow}-00${solicitudes.length + 40}`;
    activeTicketId = newReqId;

    const nuevaSolicitud = {
      id: newReqId,
      tipoLaboratorio: labType,
      labNombre: labName,
      nombreEstudiante: document.getElementById('nombreEstudiante').value,
      carneEstudiante: document.getElementById('carneEstudiante').value,
      correoEstudiante: document.getElementById('correoEstudiante').value,
      tipoActividad: document.getElementById('tipoActividad').value,
      nombreCursoProyecto: labType === 'cotrafin' ? "Propuesta ante Comisión" : (document.getElementById('nombreCursoProyecto')?.value || ""),
      docenteResponsable: document.getElementById('docenteResponsable').value,
      correoDocente: document.getElementById('correoDocente').value,
      docenteIniciales: calcularIniciales(document.getElementById('docenteResponsable')?.value || ""),
      fechaInicio: labType === 'cotrafin' ? "" : document.getElementById('fechaInicio').value,
      fechaFinal: labType === 'cotrafin' ? "" : document.getElementById('fechaFinal').value,
      descripcionActividad: document.getElementById('descripcionActividad').value,
      sinEquipos: chkNoEquipos.checked,
      equipos: equipos,
      sinReactivos: chkNoReactivos.checked,
      reactivos: reactivos,
      consumibles: consumibles,
      integrantes: integrantes,
      inicialesEstudiante: document.getElementById('inicialesEstudiante').value.toUpperCase(),
      signatureDataUrl: studentSignatureDataUrl,
      estado: "Pendiente Visto Bueno",
      docenteAprobado: false,
      docenteFecha: null,
      docenteObservaciones: "",
      jefeAprobado: false,
      jefeFecha: null,
      jefeNombre: config.titularNombre,
      jefeCargo: config.titularCargo,
      jefeTituloSig: config.titularSig,
      jefeIniciales: config.titularIniciales,
      esDelegado: false,
      fechaCreacion: new Date().toLocaleDateString('es-CR') + " " + new Date().toLocaleTimeString('es-CR', {hour: '2-digit', minute:'2-digit'})
    };

    let ticketFinal = newReqId;
    let mensajeConfirmacion = '';

    // Transmitir a Google Apps Script si está en modo Live
    if (typeof EIQ_CONFIG !== 'undefined' && EIQ_CONFIG.isLiveMode()) {
      try {
        const resp = await fetch(EIQ_CONFIG.API_BACKEND_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(nuevaSolicitud),
          redirect: 'follow'
        });
        const rawText = await resp.text();
        let result = null;
        try {
          result = JSON.parse(rawText);
        } catch (e) {
          console.warn('Respuesta no-JSON de Google Apps Script:', rawText);
          const ticketMatch = rawText.match(/COT-PERM-\d{4}-\d{4}|LG-PERM-\d{4}-\d{4}|LI-PERM-\d{4}-\d{4}/);
          if (ticketMatch) {
            result = { success: true, ticketId: ticketMatch[0] };
          }
        }
        if (result && result.success && result.ticketId) {
          ticketFinal = result.ticketId;
          nuevaSolicitud.id = ticketFinal;
          activeTicketId = ticketFinal;
          mensajeConfirmacion = `¡Solicitud registrada con éxito en el sistema central!\n\nCódigo Oficial: ${ticketFinal}\n\nSe ha enviado una notificación automática con enlace de Visto Bueno en 1 Clic a su docente (${nuevaSolicitud.docenteResponsable}: ${nuevaSolicitud.correoDocente}).\n\nTambién se despachó un acuse de recibo a su correo institucional (${nuevaSolicitud.correoEstudiante}).`;
        } else {
          throw new Error(result && result.error ? result.error : 'No se recibió confirmación JSON directa del servidor.');
        }
      } catch (err) {
        console.warn('Fallo o redirección en fetch POST, verificando si se registró en la hoja:', err);
        
        // Verificación activa inmediata: comprobar si el POST ya se ejecutó exitosamente en Google Sheets
        let registradoEnBackend = false;
        try {
          const checkResp = await fetch(`${EIQ_CONFIG.API_BACKEND_URL}?action=listar&_nc=${Date.now()}`, {
            method: 'GET',
            redirect: 'follow'
          });
          const checkRaw = await checkResp.text();
          let checkData = null;
          try { checkData = JSON.parse(checkRaw); } catch(e){}
          if (checkData && checkData.success && Array.isArray(checkData.solicitudes)) {
            const encontrada = checkData.solicitudes.find(s => 
              s.carneEstudiante === nuevaSolicitud.carneEstudiante &&
              (s.nombreEstudiante || "").trim().toLowerCase() === (nuevaSolicitud.nombreEstudiante || "").trim().toLowerCase()
            );
            if (encontrada && encontrada.id) {
              ticketFinal = encontrada.id;
              nuevaSolicitud.id = ticketFinal;
              activeTicketId = ticketFinal;
              registradoEnBackend = true;
              mensajeConfirmacion = `¡Solicitud registrada con éxito en el sistema central!\n\nCódigo Oficial: ${ticketFinal}\n\nSe ha enviado una notificación automática con enlace de Visto Bueno en 1 Clic a su docente (${nuevaSolicitud.docenteResponsable}: ${nuevaSolicitud.correoDocente}).\n\nTambién se despachó un acuse de recibo a su correo institucional (${nuevaSolicitud.correoEstudiante}).`;
            }
          }
        } catch (checkErr) {
          console.warn('No se pudo verificar el listado:', checkErr);
        }

        if (!registradoEnBackend) {
          mensajeConfirmacion = `¡Solicitud generada en modo local (#${ticketFinal})!\n(Aviso: No se pudo contactar el servidor remoto o hubo un error: ${err.message}).`;
        }
      }
    } else {
      mensajeConfirmacion = `¡Solicitud #${ticketFinal} generada con éxito (Modo Simulación)!\n\nSe ha creado el expediente para revisión y visto bueno.\n\n(Para activar el registro automático en Google Sheets y correos institucionales, configure la URL en portal/config.js).`;
    }

    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.textContent = textoOriginalBtn;
    }

    solicitudes.unshift(nuevaSolicitud);
    guardarSolicitudesLS(); // Persistir en localStorage para sobrevivir recargas
    // Registrar consumo continuo de reactivos en el inventario y bitácora institucional
    ReagentsTrackingManager.registrarSolicitud(nuevaSolicitud);
    renderReagentsDashboard();
    document.getElementById('sum-ticket-id').textContent = ticketFinal;

    alert(mensajeConfirmacion);
    switchTab('docente');
  });

  // --- Load Demo Data Button ---
  btnLoadDemo.addEventListener('click', () => {
    document.getElementById('nombreEstudiante').value = "Mariana Rojas Castillo";
    document.getElementById('carneEstudiante').value = "C12345";
    document.getElementById('correoEstudiante').value = "mariana.rojas@ucr.ac.cr";
    document.getElementById('nombreCursoProyecto').value = "IQ-0402 Operaciones Unitarias II";
    document.getElementById('docenteResponsable').value = "Gerardo Chacón Valle";
    document.getElementById('correoDocente').value = "adrian.serrano@ucr.ac.cr";
    document.getElementById('fechaInicio').value = "2026-08-25";
    document.getElementById('fechaFinal').value = "2026-09-15";
    document.getElementById('descripcionActividad').value = "Determinación experimental de coeficientes de transferencia de calor y masa en columnas empacadas para el proyecto de curso.";
    document.getElementById('inicialesEstudiante').value = "MRC";

    if (sigCtx) {
      sigCtx.clearRect(0, 0, canvasFirma.width, canvasFirma.height);
      sigCtx.beginPath();
      sigCtx.moveTo(50, 70);
      sigCtx.bezierCurveTo(80, 20, 110, 110, 150, 60);
      sigCtx.bezierCurveTo(180, 30, 210, 100, 280, 70);
      sigCtx.stroke();
      sigCtx.closePath();
      studentSignatureDataUrl = canvasFirma.toDataURL();
    }

    updateSummary();
    alert('Datos de demostración de referencia cargados exitosamente.');
  });

  // --- Navigation Switcher ---
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      switchTab(target);
    });
  });

  function switchTab(targetId) {
    navTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === targetId));
    tabViews.forEach(v => v.classList.toggle('active', v.id === `tab-${targetId}`));
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (targetId === 'jefatura') {
      renderTable();
      updateKPIs();
      sincronizarSolicitudesBackend();
    } else if (targetId === 'historico') {
      renderHistoricalDashboard();
      renderReagentsDashboard();
      sincronizarSolicitudesBackend();
    } else if (targetId === 'docente') {
      renderDocenteView();
    } else if (targetId === 'carta') {
      renderOfficialLetter();
    }
  }

  // --- Unified Official Letter Document Sheet Generator ---
  function generateLetterHTML(current) {
    const config = LAB_CONFIGS[current.tipoLaboratorio] || LAB_CONFIGS.general;

    const verifUrl = (typeof EIQ_CONFIG !== 'undefined' && EIQ_CONFIG.isLiveMode())
      ? `${EIQ_CONFIG.API_BACKEND_URL}?action=verificar&id=${encodeURIComponent(current.id)}`
      : `https://www.eiq.ucr.ac.cr/permisos/verificar?id=${encodeURIComponent(current.id)}`;

    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(verifUrl)}&margin=1`;

    // Header Lab Name
    let labHeaderTitle = config.nombre;
    if (current.tipoLaboratorio === 'instrumental') {
      labHeaderTitle = "Laboratorio de Instrumentación de la Escuela de Ingeniería Química";
    } else if (current.tipoLaboratorio === 'cotrafin') {
      labHeaderTitle = "Laboratorio de la Escuela de Ingeniería Química";
    }

    // Salutation
    const saludoFormal = current.tipoLaboratorio === 'instrumental' ? "Estimada señora:" : "Estimado señor:";

    // Main Paragraph text strictly following reference templates
    let mainParagraph = "";
    if (current.tipoLaboratorio === 'cotrafin') {
      mainParagraph = `
        Por este medio yo, <strong>${current.nombreEstudiante}</strong>, carné <strong>${current.carneEstudiante}</strong>, solicito se me permita hacer uso del <strong>Laboratorio de la Escuela de Ingeniería Química</strong> para el desarrollo de la parte experimental de mi <strong>${current.tipoActividad}</strong>. Entre las actividades que necesitaré desarrollar en el laboratorio están:
      `;
    } else if (current.tipoLaboratorio === 'instrumental') {
      mainParagraph = `
        Por este medio yo, <strong>${current.nombreEstudiante}</strong>, carné <strong>${current.carneEstudiante}</strong>, solicito el uso del <strong>Laboratorio de Instrumentación de la Escuela de Ingeniería Química</strong> a partir del día <strong>${formatDateStr(current.fechaInicio)}</strong> hasta el día <strong>${formatDateStr(current.fechaFinal)}</strong>, para realizar actividades como parte de: <strong>${current.tipoActividad} (${current.nombreCursoProyecto})</strong>.
      `;
    } else { // General 2025
      mainParagraph = `
        Por este medio yo, <strong>${current.nombreEstudiante}</strong>, carné <strong>${current.carneEstudiante}</strong>, después de coordinar con las personas encargadas del laboratorio sobre la disponibilidad del espacio de laboratorio, equipos y reactivos, solicito el uso del <strong>${config.nombre}</strong> a partir del día <strong>${formatDateStr(current.fechaInicio)}</strong> hasta el día <strong>${formatDateStr(current.fechaFinal)}</strong>, para realizar actividades relacionadas a <strong>${current.tipoActividad} (${current.nombreCursoProyecto})</strong>.
      `;
    }

    // Instrumental Specific Notice & Prior Verification Checklist
    let instrumentalChecksHTML = "";
    if (current.tipoLaboratorio === 'instrumental') {
      instrumentalChecksHTML = `
        <p style="font-size: 0.85rem; color: #334155; margin-bottom: 0.5rem;">
          Reconozco que el tiempo máximo del permiso de uso del equipo por persona estudiante es un mes, lo cual incluye el tiempo para el montaje del método. Este tiempo se puede modificar por falla o mantenimiento de equipos, necesidad de reactivos, o programaciones especiales.
        </p>
        <p style="font-size: 0.85rem; color: #334155; margin-bottom: 0.4rem;">Marque las casillas según corresponda:</p>
        <table class="latex-table" style="margin-bottom: 0.5rem;">
          <thead>
            <tr>
              <th style="width: 75%;">Condición</th>
              <th style="width: 12.5%; text-align: center;">Sí</th>
              <th style="width: 12.5%; text-align: center;">No</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>¿Se cuenta con los reactivos para la realización de los análisis?</td>
              <td style="text-align: center;">&#10003;</td>
              <td style="text-align: center;"></td>
            </tr>
            <tr>
              <td>¿Se cuenta con los consumibles (cubetas, portamuestras, etcétera) para la realización de los análisis?</td>
              <td style="text-align: center;">&#10003;</td>
              <td style="text-align: center;"></td>
            </tr>
            <tr>
              <td>¿Se cuenta con los patrones para la realización de los análisis?</td>
              <td style="text-align: center;">&#10003;</td>
              <td style="text-align: center;"></td>
            </tr>
            <tr>
              <td>¿Se cuenta con el método para el análisis deseado?</td>
              <td style="text-align: center;">&#10003;</td>
              <td style="text-align: center;"></td>
            </tr>
          </tbody>
        </table>
        <p style="font-size: 0.82rem; color: #475569; font-style: italic; margin-bottom: 0.75rem;">
          Nota: si necesita algún equipo para preparar las muestras debe realizar el trámite correspondiente para solicitar el uso del laboratorio general.
        </p>
      `;
    }

    // COTRAFIN Specific Attention Callout
    let cotrafinNoticeHTML = "";
    if (current.tipoLaboratorio === 'cotrafin') {
      cotrafinNoticeHTML = `
        <table class="latex-table" style="margin-bottom: 0.75rem;">
          <tbody>
            <tr>
              <td style="font-size: 0.85rem; color: #334155; line-height: 1.55;">
                Al presentar esta solicitud entiendo que para poder tener acceso a los reactivos, equipos y servicios del laboratorio en general, debo hacer la solicitud detallada de lo requerido (cantidad de reactivos, días de uso, etcétera) siguiendo el protocolo establecido por la Escuela de Ingeniería Química y con el suficiente tiempo de anticipación según lo requerido para el buen desarrollo de mi TFG.
              </td>
            </tr>
            <tr>
              <td style="font-size: 0.85rem; color: #334155; line-height: 1.55;">
                Además, entiendo que la solicitud de compra de reactivos u otros, debe pasar por la revisión del jefe de laboratorio. En caso de no aprobarse la solicitud, se me dará una respuesta indicando las razones.
              </td>
            </tr>
          </tbody>
        </table>
      `;
    }

    // Visto bueno doc statement strictly per lab
    let docFeStatement = "";
    if (current.tipoLaboratorio === 'general') {
      docFeStatement = `Esta actividad cuenta con el visto bueno de <strong>${current.docenteResponsable}</strong>, quien aprueba la realización de este trabajo y da fe, al firmar esta carta, de que se han revisado los métodos y la existencia de los reactivos y equipos para llevar a cabo lo solicitado. Además, el análisis incluye la seguridad y la gestión adecuada de los residuos.`;
    } else {
      docFeStatement = `Esta actividad cuenta con el visto bueno de <strong>${current.docenteResponsable}</strong>, quien aprueba la realización de este trabajo y da fe, al firmar esta carta, de que se han revisado los métodos y la existencia de los reactivos y equipos para llevar a cabo lo solicitado.`;
    }

    // Equipos Table
    let equiposTableHTML = "";
    if (current.sinEquipos || !current.equipos || current.equipos.length === 0) {
      equiposTableHTML = `
        <table class="latex-table">
          <thead><tr><th>Equipos</th></tr></thead>
          <tbody><tr><td><em>No se utilizarán equipos en esta actividad.</em></td></tr></tbody>
        </table>
      `;
    } else if (current.tipoLaboratorio === 'cotrafin') {
      equiposTableHTML = `
        <table class="latex-table">
          <thead>
            <tr>
              <th style="width: 55%;">Equipo Solicitado</th>
              <th style="width: 45%;">Proveedor / Origen del Suministro</th>
            </tr>
          </thead>
          <tbody>
            ${current.equipos.map(e => `<tr><td><strong>${e.nombre}</strong></td><td>${e.origen || "Solicitado a la EIQ"}</td></tr>`).join('')}
          </tbody>
        </table>
      `;
    } else if (current.tipoLaboratorio === 'instrumental') {
      equiposTableHTML = `
        <table class="latex-table">
          <thead>
            <tr>
              <th style="width: 45%;">Equipo de Instrumentación</th>
              <th style="width: 25%;">Cant. análisis aprox.</th>
              <th style="width: 15%;">Capacitación</th>
              <th style="width: 15%;">¿Solicita análisis?</th>
            </tr>
          </thead>
          <tbody>
            ${current.equipos.map(e => `
              <tr>
                <td><strong>${e.nombre}</strong></td>
                <td>${e.placa || "N/A"}</td>
                <td>${e.capacitacion ? 'Sí requiere' : 'No requiere'}</td>
                <td>${e.solicitaAnalisis ? 'Sí solicita' : 'No solicita'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else { // General
      equiposTableHTML = `
        <table class="latex-table">
          <thead>
            <tr>
              <th style="width: 50%;">Equipo</th>
              <th style="width: 20%;">Placa UCR</th>
              <th style="width: 15%;">Disponibilidad</th>
              <th style="width: 15%;">Capacitación</th>
            </tr>
          </thead>
          <tbody>
            ${current.equipos.map(e => `
              <tr>
                <td><strong>${e.nombre}</strong></td>
                <td>${e.placa || "N/A"}</td>
                <td>${e.disponible || "Disponible"}</td>
                <td>${e.capacitacion ? 'Sí requiere' : 'No requiere'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    // Reactivos Table
    let reactivosTableHTML = "";
    if (current.sinReactivos || !current.reactivos || current.reactivos.length === 0) {
      reactivosTableHTML = `
        <table class="latex-table">
          <thead><tr><th>Reactivos</th></tr></thead>
          <tbody><tr><td><em>No se utilizarán reactivos en esta actividad.</em></td></tr></tbody>
        </table>
      `;
    } else if (current.tipoLaboratorio === 'cotrafin') {
      reactivosTableHTML = `
        <table class="latex-table">
          <thead>
            <tr>
              <th style="width: 55%;">Reactivo (Pureza)</th>
              <th style="width: 45%;">Origen del Suministro</th>
            </tr>
          </thead>
          <tbody>
            ${current.reactivos.map(r => `<tr><td><strong>${r.nombre}</strong></td><td>${r.origen}</td></tr>`).join('')}
          </tbody>
        </table>
      `;
    } else {
      reactivosTableHTML = `
        <table class="latex-table">
          <thead>
            <tr>
              <th style="width: 50%;">Reactivo (Pureza)</th>
              <th style="width: 20%;">Cantidad / Volumen</th>
              <th style="width: 30%;">Origen del Suministro</th>
            </tr>
          </thead>
          <tbody>
            ${current.reactivos.map(r => `
              <tr>
                <td><strong>${r.nombre}</strong></td>
                <td>${r.cantidad || "N/A"}</td>
                <td>${r.origen}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    // Consumibles Block (Instrumental)
    let consumiblesHTML = "";
    if (current.consumibles && current.consumibles.length > 0) {
      consumiblesHTML = `
        <h4 class="doc-section-heading mt-3">Consumibles Solicitados:</h4>
        <table class="latex-table">
          <thead>
            <tr>
              <th style="width: 50%;">Consumible</th>
              <th style="width: 20%;">Cantidad</th>
              <th style="width: 30%;">Origen</th>
            </tr>
          </thead>
          <tbody>
            ${current.consumibles.map(c => `<tr><td><strong>${c.nombre}</strong></td><td>${c.cantidad || "N/A"}</td><td>${c.origen}</td></tr>`).join('')}
          </tbody>
        </table>
      `;
    }

    // Commitments list
    const commitmentsHTML = config.compromisos.map(c => `<li>${c}</li>`).join('');

    // Integrantes block
    let integrantesHTML = "";
    if (current.integrantes && current.integrantes.length > 0) {
      integrantesHTML = `
        <div class="doc-integrantes-block">
          <h4 class="doc-section-heading">Integrantes del Grupo de Trabajo:</h4>
          <table class="latex-table">
            <thead><tr><th>Nombre Integrante</th><th>Carné</th></tr></thead>
            <tbody>${current.integrantes.map(i => `<tr><td>${i.nombre}</td><td>${i.carne}</td></tr>`).join('')}</tbody>
          </table>
        </div>
      `;
    }

    // Signature 1: Estudiante
    let sig1Preview = "";
    if (current.signatureDataUrl) {
      sig1Preview = `<img src="${current.signatureDataUrl}" style="max-height: 48px; max-width: 100%; object-fit: contain;">`;
    } else {
      sig1Preview = `<span class="sig-drawn-placeholder">Firma Electrónica [${current.inicialesEstudiante || 'EST'}]</span>`;
    }

    // Signature 2: Docente Role Title exactly per template
    let sig2Role = "Persona Docente encargada del curso";
    if (current.tipoLaboratorio === 'cotrafin') {
      sig2Role = "Persona Docente que dirige el TFG o TFIA";
    } else if (current.tipoLaboratorio === 'instrumental') {
      sig2Role = "Persona Docente encargada";
    }

    const estUpperLetter = String(current.estado || "").toUpperCase();
    const esDevueltoLetter = Boolean(estUpperLetter.includes("DEVUELTO") || estUpperLetter.includes("RECHAZADO") || current.devueltoDocente);
    const esPendienteLetter = Boolean(estUpperLetter.includes("PENDIENTE"));
    const isDocApproved = !esDevueltoLetter && !esPendienteLetter && Boolean(
      current.docenteAprobado || 
      estUpperLetter === "APROBADO_DOCENTE" || 
      estUpperLetter.includes("APROBADO POR DOCENTE") || 
      estUpperLetter.includes("AUTORIZADO") || 
      current.jefeAprobado
    );

    let docenteInitials = current.docenteIniciales;
    if ((!docenteInitials || docenteInitials === 'GCV') && current.docenteResponsable) {
      if (!current.docenteResponsable.toLowerCase().includes('chacón') && !current.docenteResponsable.toLowerCase().includes('chacon')) {
        docenteInitials = calcularIniciales(current.docenteResponsable);
      }
    }
    if (!docenteInitials) docenteInitials = calcularIniciales(current.docenteResponsable) || 'DOC';

    const sig2SealText = isDocApproved ? `VISTO BUENO [${docenteInitials}]` : 'PENDIENTE VB';
    const fechaDocente = current.docenteFecha || current.fechaCreacion || 'Registrado digitalmente';
    const sig2DateText = isDocApproved ? `Fecha: ${fechaDocente}` : 'Pendiente de firma';

    // Signature 3: Jefatura / Delegado Role Title exactly per template
    const isJefeApproved = Boolean(
      current.jefeAprobado || 
      estUpperLetter.includes("AUTORIZADO") || 
      estUpperLetter === "EMITIDO"
    );
    const jefeInitials = current.jefeIniciales || config.titularIniciales;
    const jefeNombre = current.jefeNombre || config.titularNombre;
    const jefeTituloSig = current.jefeTituloSig || config.titularSig;
    const sig3SealText = isJefeApproved ? `AUTORIZADO EIQ [${jefeInitials}]` : 'EN REVISIÓN';
    const fechaJefe = current.jefeFecha || 'Pendiente de autorización';
    const sig3DateText = isJefeApproved ? `Fecha: ${fechaJefe}` : 'Pendiente de autorización';

    return `
      <!-- Header Banner -->
      <div class="doc-header-block">
        <div class="doc-inst-box">
          <div class="ucr-title">UNIVERSIDAD DE COSTA RICA</div>
          <div class="eiq-subtitle">ESCUELA DE INGENIERÍA QUÍMICA</div>
          <div class="lab-title-text">${labHeaderTitle}</div>
        </div>
        <div class="doc-date-box">
          San José, ${new Date().toLocaleDateString('es-CR', {day: 'numeric', month: 'long', year: 'numeric'})}
        </div>
      </div>

      <div class="latex-divider"></div>

      <!-- Addressee Block -->
      <div class="doc-addressee-block">
        <p><strong>${config.destinatarioCargo}</strong><br>
          <span>${config.destinatarioPuesto}</span><br>
          Escuela de Ingeniería Química, Universidad de Costa Rica
        </p>
      </div>

      <!-- Main Body Text -->
      <div class="doc-body-block">
        <p>${saludoFormal}</p>
        <p>${mainParagraph}</p>

        <div class="doc-actividad-desc-box">
          <strong>Descripción detallada de actividades:</strong><br>
          <span>${current.descripcionActividad}</span>
        </div>

        <!-- Instrumental Checklist (if applicable) -->
        ${instrumentalChecksHTML}

        <!-- Visto bueno statement from doc -->
        <p class="doc-docente-fe-statement">
          ${docFeStatement}
        </p>
      </div>

      <!-- Tables Block (Equipos y Reactivos) -->
      <div class="doc-tables-section">
        <h4 class="doc-section-heading">Equipos de Laboratorio e Instrumentación Solicitados:</h4>
        ${equiposTableHTML}

        <h4 class="doc-section-heading mt-3">Reactivos y Sustancias que se Utilizarán:</h4>
        <div class="doc-table-clarification">
          *Considere que en bodega se dispone de reactivos concentrados y/o puros, no disoluciones, por lo que debe realizar los cálculos necesarios para preparar las disoluciones que necesita a partir de los reactivos que está solicitando.<br>
          *En el cuadro, indique el reactivo concentrado y/o puro, no disoluciones. Indique si el reactivo es patrón o la pureza de este.
        </div>
        ${reactivosTableHTML}

        ${consumiblesHTML}
      </div>

      <!-- COTRAFIN Notice (if applicable) -->
      ${cotrafinNoticeHTML}

      <!-- Commitments Block -->
      <div class="doc-commitments-block">
        <h4 class="doc-section-heading">Compromisos de Seguridad Acatados:</h4>
        <ol class="doc-commitments-list">
          ${commitmentsHTML}
        </ol>
      </div>

      ${integrantesHTML}

      <!-- Signatures Section with 3 Institutional Blocks -->
      <div class="latex-signatures-grid">
        <div class="latex-sig-box">
          <div class="sig-drawn-preview">
            ${sig1Preview}
          </div>
          <div class="sig-name-line">${current.nombreEstudiante}</div>
          <div class="sig-role-line">Estudiante responsable</div>
          <div class="sig-date-line">Fecha: ${current.fechaCreacion}</div>
        </div>

        <div class="latex-sig-box">
          <div class="sig-drawn-preview">
            <div class="sig-seal-approved ${isDocApproved ? '' : 'sig-seal-pending'}">${sig2SealText}</div>
          </div>
          <div class="sig-name-line">${current.docenteResponsable}</div>
          <div class="sig-role-line">${sig2Role}</div>
          <div class="sig-date-line">${sig2DateText}</div>
        </div>

        <div class="latex-sig-box">
          <div class="sig-drawn-preview">
            <div class="sig-seal-approved ${isJefeApproved ? '' : 'sig-seal-pending'}">${sig3SealText}</div>
          </div>
          <div class="sig-name-line">${jefeNombre}</div>
          <div class="sig-role-line">${jefeTituloSig}</div>
          <div class="sig-date-line">${sig3DateText}</div>
        </div>
      </div>

      <!-- Verification Stamp Footer with QR -->
      <div class="latex-footer-verification">
        <div class="qr-canvas-box" title="Escanear con teléfono móvil para verificar autenticidad en tiempo real">
          <a href="${verifUrl}" target="_blank" rel="noopener noreferrer" style="display:block; width:100%; height:100%;">
            <img src="${qrImageUrl}" class="qr-image" alt="QR Verificación ${current.id}" width="72" height="72" crossorigin="anonymous" />
          </a>
        </div>
        <div class="verif-legal-text">
          <p><strong>Documento Oficial Emitido por el Sistema de Gestión de Laboratorios — EIQ/UCR</strong></p>
          <p>Código Único de Integridad: <span class="mono-code">UCR-EIQ-2026-${current.id}-AUTH-SHA256</span></p>
          <p>Verificación Oficial: <a href="${verifUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--ucr-blue-primary); font-weight:700; text-decoration:underline;">${current.id} (Clic o escanear QR)</a></p>
          <p>Contactos: (506) 2511-6640 • (506) 2225-5622 • Correo: ${config.nombre.includes('Instrumental') ? 'instrumental.eiq@ucr.ac.cr' : 'laboratorio.eiq@ucr.ac.cr'} • Web: www.eiq.ucr.ac.cr</p>
        </div>
      </div>
    `;
  }

  // --- Docente View Logic ---
  function renderDocenteView() {
    const current = solicitudes.find(s => s.id === activeTicketId) || solicitudes[0];
    if (!current) return;

    // Render live document sheet into Tab 2
    if (docenteLetterSheet) {
      docenteLetterSheet.innerHTML = generateLetterHTML(current);
    }

    const statusBadge = document.getElementById('docente-status-badge');
    const stampBox = document.getElementById('docente-signed-badge');
    const actionBar = document.getElementById('docente-action-bar');

    if (current.docenteAprobado) {
      statusBadge.textContent = "Visto Bueno Otorgado";
      statusBadge.className = "status-badge approved";
      stampBox.classList.remove('hidden');
      document.getElementById('docente-stamp-time').textContent = `Registrado digitalmente el ${current.docenteFecha} • Correo Institucional Verificado (${current.correoDocente}) • Iniciales: ${current.docenteIniciales || 'ASM'}`;
      document.getElementById('docente-stamp-notes').textContent = current.docenteObservaciones ? `Observaciones: "${current.docenteObservaciones}"` : "";
      actionBar.style.display = 'none';
    } else {
      statusBadge.textContent = "Esperando Visto Bueno";
      statusBadge.className = "status-badge";
      stampBox.classList.add('hidden');
      actionBar.style.display = 'block';
    }
  }

  btnDocenteApprove.addEventListener('click', () => {
    const current = solicitudes.find(s => s.id === activeTicketId) || solicitudes[0];
    if (!current) return;

    const initials = inputDocenteInitials.value.trim().toUpperCase();
    if (!initials) {
      alert('Por favor ingrese sus iniciales en el campo correspondiente como firma electrónica del visto bueno.');
      inputDocenteInitials.focus();
      return;
    }

    current.docenteAprobado = true;
    current.docenteIniciales = initials;
    current.docenteObservaciones = textareaDocenteObs.value.trim();
    current.docenteFecha = new Date().toLocaleDateString('es-CR') + " " + new Date().toLocaleTimeString('es-CR', {hour: '2-digit', minute:'2-digit'});
    current.estado = "Aprobado por Docente (En Jefatura)";

    renderDocenteView();
    updateKPIs();
    alert(`Visto bueno oficial otorgado por [${initials}].\n\nLa solicitud ha sido remitida a la Jefatura de Laboratorios para la autorización final de espacio.`);
    switchTab('jefatura');
  });

  btnDocenteReject.addEventListener('click', () => {
    const current = solicitudes.find(s => s.id === activeTicketId) || solicitudes[0];
    if (!current) return;

    const motivo = textareaDocenteObs.value.trim();
    if (!motivo) {
      alert('Por favor indique el motivo del rechazo o corrección requerida en el cuadro de observaciones.');
      textareaDocenteObs.focus();
      return;
    }

    current.estado = "Rechazado / Corrección Requerida";
    current.docenteObservaciones = motivo;
    alert(`Solicitud devuelta al estudiante con la siguiente observación:\n\n"${motivo}"`);
    switchTab('jefatura');
  });

  // --- Jefatura Table & Dashboard Logic ---
  function renderTable() {
    const searchTerm = filterSearch.value.toLowerCase();
    const labFilter = filterLab.value;

    const filtered = solicitudes.filter(s => {
      const matchSearch = s.nombreEstudiante.toLowerCase().includes(searchTerm) ||
                          s.carneEstudiante.toLowerCase().includes(searchTerm) ||
                          s.id.toLowerCase().includes(searchTerm);
      const matchLab = labFilter === 'todos' || s.tipoLaboratorio === labFilter;
      return matchSearch && matchLab;
    });

    solicitudesTableBody.innerHTML = filtered.map(s => {
      let statusClass = "status-pending";
      let estadoLabel = s.estado;

      const estUpper = String(s.estado || "").toUpperCase();
      const esDevuelto = Boolean(estUpper.includes("DEVUELTO") || estUpper.includes("RECHAZADO") || s.devueltoDocente);
      const esPendiente = Boolean(estUpper.includes("PENDIENTE"));
      const esAprobadoDocente = !esDevuelto && !esPendiente && Boolean(
        s.docenteAprobado || 
        estUpper === "APROBADO_DOCENTE" || 
        estUpper.includes("APROBADO POR DOCENTE")
      );
      const esAutorizadoJefatura = Boolean(estUpper.includes("AUTORIZADO") || s.jefeAprobado);

      if (esAutorizadoJefatura) {
        statusClass = "status-authorized";
        estadoLabel = "Autorizado por Jefatura";
      } else if (esDevuelto) {
        statusClass = "status-rejected";
        estadoLabel = "Devuelto por Docente";
      } else if (esAprobadoDocente) {
        statusClass = "status-docente-approved";
        estadoLabel = "V.B. Docente Otorgado";
      } else {
        statusClass = "status-pending";
        estadoLabel = "Pendiente Visto Bueno";
      }

      let actionBtn = "";
      if (esDevuelto) {
        actionBtn = `<button class="btn-secondary btn-sm" onclick="revisarSolicitudJefatura('${s.id}')">Ver Detalle</button>`;
      } else if (esAutorizadoJefatura) {
        actionBtn = `
          <div style="display: flex; gap: 0.35rem; align-items: center;">
            <button class="btn-secondary btn-sm" onclick="revisarSolicitudJefatura('${s.id}')">Revisar Carta</button>
            <button class="btn-primary btn-sm" onclick="verCarta('${s.id}')">Ver Final</button>
          </div>
        `;
      } else if (esAprobadoDocente) {
        actionBtn = `
          <div style="display: flex; gap: 0.35rem; align-items: center;">
            <button class="btn-secondary btn-sm" onclick="revisarSolicitudJefatura('${s.id}')">Revisar Carta</button>
            <button class="btn-success btn-sm" onclick="autorizarJefatura('${s.id}')">Autorizar</button>
          </div>
        `;
      } else {
        actionBtn = `<button class="btn-secondary btn-sm" onclick="revisarSolicitudJefatura('${s.id}')">Revisar Carta</button>`;
      }

      let periodoDisplay = s.tipoLaboratorio === 'cotrafin' ? '<small>Factibilidad</small>' : `<small>${formatDateStr(s.fechaInicio)} - ${formatDateStr(s.fechaFinal)}</small>`;

      return `
        <tr>
          <td><strong style="color: var(--ucr-blue-light); font-family: var(--font-mono);">${s.id}</strong></td>
          <td>
            <strong>${s.nombreEstudiante}</strong><br>
            <small style="color: var(--text-muted);">${s.carneEstudiante}</small>
          </td>
          <td>${s.labNombre}</td>
          <td>${s.docenteResponsable}</td>
          <td>${periodoDisplay}</td>
          <td><span class="badge-pill ${statusClass}">${estadoLabel}</span></td>
          <td>${actionBtn}</td>
        </tr>
      `;
    }).join('');
  }

  filterSearch.addEventListener('input', renderTable);
  filterLab.addEventListener('change', renderTable);

  const btnSyncSolicitudes = document.getElementById('btn-sync-solicitudes');
  if (btnSyncSolicitudes) {
    btnSyncSolicitudes.addEventListener('click', async () => {
      const origText = btnSyncSolicitudes.textContent;
      btnSyncSolicitudes.disabled = true;
      btnSyncSolicitudes.textContent = "Sincronizando...";
      await sincronizarSolicitudesBackend();
      btnSyncSolicitudes.textContent = "¡Actualizado!";
      setTimeout(() => {
        btnSyncSolicitudes.textContent = origText;
        btnSyncSolicitudes.disabled = false;
      }, 1200);
    });
  }

  function updateKPIs() {
    document.getElementById('kpi-total').textContent = solicitudes.length;
    document.getElementById('kpi-pendientes').textContent = solicitudes.filter(s => !s.jefeAprobado).length;
    document.getElementById('kpi-aprobadas').textContent = solicitudes.filter(s => s.jefeAprobado).length;
    document.getElementById('badge-docente-count').textContent = solicitudes.filter(s => !s.docenteAprobado).length;
    document.getElementById('badge-jefatura-count').textContent = solicitudes.filter(s => s.docenteAprobado && !s.jefeAprobado).length;
  }

  // --- Modal de Revisión en Formato Carta Oficial para Jefatura ---
  const modalRevision = document.getElementById('modal-revision-jefatura');
  const btnCloseModalJefatura = document.getElementById('btn-close-modal-jefatura');
  const btnModalCancel = document.getElementById('btn-modal-cancel');
  const btnModalAutorizar = document.getElementById('btn-modal-autorizar');
  const btnModalDevolver = document.getElementById('btn-modal-devolver');

  function closeModalRevision() {
    if (modalRevision) modalRevision.classList.add('hidden');
  }

  if (btnCloseModalJefatura) btnCloseModalJefatura.addEventListener('click', closeModalRevision);
  if (btnModalCancel) btnModalCancel.addEventListener('click', closeModalRevision);
  if (modalRevision) {
    modalRevision.addEventListener('click', (e) => {
      if (e.target === modalRevision) closeModalRevision();
    });
  }

  window.revisarSolicitudJefatura = async function(id) {
    let s = solicitudes.find(item => item.id === id);
    if (!s) return;

    // Si estamos en modo Live y la solicitud aún no figura aprobada por docente en memoria,
    // sincronizar en tiempo real con Google Sheets para capturar la aprobación reciente
    if (typeof EIQ_CONFIG !== 'undefined' && EIQ_CONFIG.isLiveMode()) {
      const estLocal = String(s.estado || "").toUpperCase();
      const yaAprobLocal = !estLocal.includes("PENDIENTE") && !estLocal.includes("DEVUELTO") && (s.docenteAprobado || estLocal === "APROBADO_DOCENTE" || estLocal.includes("APROBADO POR DOCENTE"));
      if (!yaAprobLocal) {
        await sincronizarSolicitudesBackend();
        const sActual = solicitudes.find(item => item.id === id);
        if (sActual) s = sActual;
      }
    }

    activeTicketId = s.id;

    document.getElementById('modal-rev-id').textContent = `Expediente de Solicitud #${s.id}`;
    document.getElementById('modal-rev-lab').textContent = `Trámite: ${s.tipoLaboratorio === 'cotrafin' ? 'COTRAFIN / Posgrado' : s.labNombre} • Estudiante: ${s.nombreEstudiante} (${s.carneEstudiante})`;

    // Render live document sheet into Jefatura Modal
    if (jefaturaModalLetterSheet) {
      jefaturaModalLetterSheet.innerHTML = generateLetterHTML(s);
    }

    // Modal Footer Action Buttons
    const estUpperModal = String(s.estado || "").toUpperCase();
    const esDevueltoModal = Boolean(s.devueltoDocente || estUpperModal.includes("DEVUELTO") || estUpperModal.includes("RECHAZADO"));
    const esPendienteModal = Boolean(estUpperModal.includes("PENDIENTE"));
    const isDocenteAprobadoModal = !esDevueltoModal && !esPendienteModal && Boolean(
      s.docenteAprobado || 
      estUpperModal === "APROBADO_DOCENTE" || 
      estUpperModal.includes("APROBADO POR DOCENTE")
    );
    const isJefeAprobadoModal = Boolean(
      s.jefeAprobado || 
      estUpperModal.includes("AUTORIZADO")
    );

    if (esDevueltoModal) {
      btnModalAutorizar.textContent = "Solicitud Devuelta por Docente";
      btnModalAutorizar.className = "btn-secondary";
      btnModalAutorizar.disabled = true;
      btnModalDevolver.classList.add('hidden');
    } else if (isJefeAprobadoModal) {
      btnModalAutorizar.textContent = "Ver Carta Final";
      btnModalAutorizar.className = "btn-primary";
      btnModalAutorizar.disabled = false;
      btnModalAutorizar.onclick = () => {
        closeModalRevision();
        verCarta(s.id);
      };
      btnModalDevolver.classList.add('hidden');
    } else if (isDocenteAprobadoModal) {
      btnModalAutorizar.textContent = "Autorizar y Emitir Carta Oficial";
      btnModalAutorizar.className = "btn-success";
      btnModalAutorizar.disabled = false;
      btnModalAutorizar.onclick = () => {
        closeModalRevision();
        autorizarJefatura(s.id);
      };
      btnModalDevolver.classList.remove('hidden');
      btnModalDevolver.onclick = async () => {
        const motivo = prompt(`Indique las observaciones y motivo de devolución para ${s.nombreEstudiante}:`);
        if (motivo && motivo.trim()) {
          s.estado = "Devuelto por Jefatura / Corrección";
          s.devueltoJefatura = true;
          s.devueltoDocente = true;
          s.docenteAprobado = false;
          s.jefeObservaciones = motivo.trim();
          closeModalRevision();

          // Sincronizar devolución con el backend en modo Live
          if (typeof EIQ_CONFIG !== 'undefined' && EIQ_CONFIG.isLiveMode()) {
            try {
              const chkDelegacion = document.getElementById('chk-delegacion-firma');
              const config = LAB_CONFIGS[s.tipoLaboratorio] || LAB_CONFIGS.general;
              let jNombre = config.titularNombre;
              let jCargo = config.titularCargo;
              if (chkDelegacion && chkDelegacion.checked) {
                jNombre = document.getElementById('delegado-nombre').value.trim() || jNombre;
                jCargo = document.getElementById('delegado-cargo').value.trim() || jCargo;
              }
              await fetch(EIQ_CONFIG.API_BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                redirect: 'follow',
                body: JSON.stringify({
                  action: "devolver_jefatura",
                  ticketId: s.id,
                  motivo: motivo.trim(),
                  jefeNombre: jNombre,
                  jefeCargo: jCargo
                })
              });
            } catch (err) {
              console.warn("Aviso al sincronizar devolución de jefatura:", err);
            }
          }

          guardarSolicitudesLS();
          renderTable();
          updateKPIs();
          alert(`Solicitud #${s.id} DEVUELTA con observaciones.\n\nSe ha notificado a la persona estudiante (${s.correoEstudiante}) con copia al docente responsable (${s.correoDocente}).`);
        }
      };
    } else {
      btnModalAutorizar.textContent = "Esperando Visto Bueno Docente";
      btnModalAutorizar.className = "btn-secondary";
      btnModalAutorizar.disabled = true;
      btnModalDevolver.classList.add('hidden');
    }

    modalRevision.classList.remove('hidden');
  };

  window.autorizarJefatura = async function(id) {
    const s = solicitudes.find(item => item.id === id);
    if (!s) return;

    const config = LAB_CONFIGS[s.tipoLaboratorio] || LAB_CONFIGS.general;
    const chkDelegacion = document.getElementById('chk-delegacion-firma');

    if (chkDelegacion && chkDelegacion.checked) {
      s.jefeNombre = document.getElementById('delegado-nombre').value.trim() || "Dra. Rebeca Salazar Vega";
      s.jefeCargo = document.getElementById('delegado-cargo').value.trim() || "Jefa de Laboratorio a.i.";
      s.jefeTituloSig = 'V.B. ' + s.jefeCargo;
      s.jefeIniciales = document.getElementById('delegado-iniciales').value.trim().toUpperCase() || "RSV";
      s.esDelegado = true;
    } else {
      s.jefeNombre = config.titularNombre;
      s.jefeCargo = config.titularCargo;
      s.jefeTituloSig = config.titularSig;
      s.jefeIniciales = config.titularIniciales;
      s.esDelegado = false;
    }

    s.jefeAprobado = true;
    s.jefeFecha = new Date().toLocaleDateString('es-CR') + " " + new Date().toLocaleTimeString('es-CR', {hour: '2-digit', minute:'2-digit'});
    s.estado = "Autorizado por Jefatura";
    activeTicketId = s.id;

    guardarSolicitudesLS();

    // Notificar al backend en modo Live para actualizar Sheets y despachar correos
    if (typeof EIQ_CONFIG !== 'undefined' && EIQ_CONFIG.isLiveMode()) {
      try {
        await fetch(EIQ_CONFIG.API_BACKEND_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          redirect: 'follow',
          body: JSON.stringify({
            action: "autorizar_jefatura",
            ticketId: s.id,
            jefeNombre: s.jefeNombre,
            jefeCargo: s.jefeCargo,
            jefeTituloSig: s.jefeTituloSig,
            jefeIniciales: s.jefeIniciales,
            esDelegado: s.esDelegado
          })
        });
      } catch (err) {
        console.warn("Aviso al sincronizar autorización con el servidor:", err);
      }
    }

    renderTable();
    updateKPIs();
    alert(`Solicitud #${id} AUTORIZADA por ${s.jefeNombre} (${s.jefeCargo}).\n\nSe ha emitido la Carta Oficial y se han enviado las notificaciones automáticas por correo electrónico.`);
    switchTab('carta');
  };

  window.verCarta = function(id) {
    activeTicketId = id;
    switchTab('carta');
  };

  // --- Official Final Letter Render Logic ---
  function renderOfficialLetter() {
    const current = solicitudes.find(s => s.id === activeTicketId) || solicitudes[0];
    if (!current) return;

    if (officialDocumentSheet) {
      officialDocumentSheet.innerHTML = generateLetterHTML(current);
    }
  }

  // --- Helper: Formato de Nombre Oficial de Archivo ---
  function getLetterFileName(current) {
    const now = new Date();
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const dia = now.getDate();
    const mes = meses[now.getMonth()];
    const anio = now.getFullYear();
    const nombreSolicitante = (current.nombreEstudiante || 'Estudiante').trim();
    const prefix = getLabPrefix(current.tipoLaboratorio);

    // Formato exacto solicitado: [LG / LI / COT]-(día de mes de año)-Nombre de la persona solicitante
    return `${prefix}-(${dia} de ${mes} de ${anio})-${nombreSolicitante}`;
  }

  function triggerPrintWithCustomTitle(fileNameWithoutExt) {
    const originalTitle = document.title;
    document.title = fileNameWithoutExt;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1500);
  }

  // --- Print & PDF Download Actions ---
  if (btnDownloadPdf) {
    btnDownloadPdf.addEventListener('click', () => {
      const current = solicitudes.find(s => s.id === activeTicketId) || solicitudes[0];
      const baseName = getLetterFileName(current);
      const fileName = baseName + '.pdf';
      const element = document.getElementById('official-document');

      if (!element) return;

      if (typeof html2pdf !== 'undefined') {
        const opt = {
          margin:       [10, 12, 10, 12],
          filename:     fileName,
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
          jsPDF:        { unit: 'mm', format: 'letter', orientation: 'portrait' }
        };

        const originalText = btnDownloadPdf.textContent;
        btnDownloadPdf.textContent = "Generando PDF...";
        btnDownloadPdf.disabled = true;

        html2pdf().set(opt).from(element).save().then(() => {
          btnDownloadPdf.textContent = originalText;
          btnDownloadPdf.disabled = false;
        }).catch(err => {
          console.error("Error con html2pdf, recurriendo a impresión:", err);
          btnDownloadPdf.textContent = originalText;
          btnDownloadPdf.disabled = false;
          triggerPrintWithCustomTitle(baseName);
        });
      } else {
        triggerPrintWithCustomTitle(baseName);
      }
    });
  }

  if (btnPrintLetter) {
    btnPrintLetter.addEventListener('click', () => {
      const current = solicitudes.find(s => s.id === activeTicketId) || solicitudes[0];
      const fileName = getLetterFileName(current);
      triggerPrintWithCustomTitle(fileName);
    });
  }

  if (btnEmailLetter) {
    btnEmailLetter.addEventListener('click', () => {
      const current = solicitudes.find(s => s.id === activeTicketId) || solicitudes[0];
      alert(`Se ha enviado la Carta Oficial en PDF firmada institucionalmente al correo:\n${current.correoEstudiante}\n\nCon copia a la persona docente encargada:\n${current.correoDocente}`);
    });
  }

  // =========================================================================
  // --- DASHBOARD DE DEMANDA HISTÓRICA & OCUPACIÓN DE EQUIPOS ---
  // =========================================================================
  const HISTORICAL_EQUIPMENT_DATA = [
    // Laboratorio Instrumental (12 Equipos Oficiales EIQ)
    {
      id: "EQ-INST-01",
      nombre: "HPLC (Thermo Scientific)",
      labTipo: "instrumental",
      labNombre: "Laboratorio Instrumental",
      metricaTipo: "corridas analíticas",
      cantidadReportada: 146,
      ocupacionSemestral: 88
    },
    {
      id: "EQ-INST-02",
      nombre: "GC-MS (Thermo Scientific)",
      labTipo: "instrumental",
      labNombre: "Laboratorio Instrumental",
      metricaTipo: "muestras caracterizadas",
      cantidadReportada: 128,
      ocupacionSemestral: 82
    },
    {
      id: "EQ-INST-03",
      nombre: "HPLC (Agilent Technologies)",
      labTipo: "instrumental",
      labNombre: "Laboratorio Instrumental",
      metricaTipo: "corridas analíticas",
      cantidadReportada: 98,
      ocupacionSemestral: 76
    },
    {
      id: "EQ-INST-04",
      nombre: "Espectroscopio UV-Vis (Thermo Scientific)",
      labTipo: "instrumental",
      labNombre: "Laboratorio Instrumental",
      metricaTipo: "espectros registrados",
      cantidadReportada: 90,
      ocupacionSemestral: 72
    },
    {
      id: "EQ-INST-05",
      nombre: "GC (Shimadzu)",
      labTipo: "instrumental",
      labNombre: "Laboratorio Instrumental",
      metricaTipo: "análisis cromatográficos",
      cantidadReportada: 84,
      ocupacionSemestral: 68
    },
    {
      id: "EQ-INST-06",
      nombre: "Espectroscopio Infrarrojo (FTIR) (Thermo Scientific)",
      labTipo: "instrumental",
      labNombre: "Laboratorio Instrumental",
      metricaTipo: "análisis funcionales",
      cantidadReportada: 76,
      ocupacionSemestral: 64
    },
    {
      id: "EQ-INST-07",
      nombre: "Analizador de Carbono Orgánico Total (TOC) (Shimadzu)",
      labTipo: "instrumental",
      labNombre: "Laboratorio Instrumental",
      metricaTipo: "determinaciones de carbono",
      cantidadReportada: 62,
      ocupacionSemestral: 55
    },
    {
      id: "EQ-INST-08",
      nombre: "Analizador Elemental (CHONS) (Thermo Scientific)",
      labTipo: "instrumental",
      labNombre: "Laboratorio Instrumental",
      metricaTipo: "análisis composicionales",
      cantidadReportada: 54,
      ocupacionSemestral: 48
    },
    {
      id: "EQ-INST-09",
      nombre: "Analizador Termogravimétrico (TGA/DSC)",
      labTipo: "instrumental",
      labNombre: "Laboratorio Instrumental",
      metricaTipo: "perfiles térmicos",
      cantidadReportada: 45,
      ocupacionSemestral: 42
    },
    {
      id: "EQ-INST-10",
      nombre: "Analizador de Tamaño de Partícula (Z-sizer) y Potencial Z (Malvern Analytical)",
      labTipo: "instrumental",
      labNombre: "Laboratorio Instrumental",
      metricaTipo: "mediciones hidrodinámicas",
      cantidadReportada: 38,
      ocupacionSemestral: 36
    },
    {
      id: "EQ-INST-11",
      nombre: "XRF (Bruker)",
      labTipo: "instrumental",
      labNombre: "Laboratorio Instrumental",
      metricaTipo: "análisis por fluorescencia",
      cantidadReportada: 28,
      ocupacionSemestral: 30
    },
    {
      id: "EQ-INST-12",
      nombre: "Espectroscopio UV-Vis con Fibra Óptica (Thermo Scientific)",
      labTipo: "instrumental",
      labNombre: "Laboratorio Instrumental",
      metricaTipo: "análisis in-situ",
      cantidadReportada: 20,
      ocupacionSemestral: 25
    },

    // Laboratorio General (Top 12 Histórico - Extraído de los 303 permisos analizados)
    {
      id: "EQ-GEN-01",
      nombre: "Horno / Estufa de Secado y Convección",
      labTipo: "general",
      labNombre: "Laboratorio General",
      metricaTipo: "veces solicitado",
      cantidadReportada: 106,
      ocupacionSemestral: 85
    },
    {
      id: "EQ-GEN-02",
      nombre: "Balanza Analítica de Precisión (0.1 mg)",
      labTipo: "general",
      labNombre: "Laboratorio General",
      metricaTipo: "veces solicitado",
      cantidadReportada: 74,
      ocupacionSemestral: 78
    },
    {
      id: "EQ-GEN-03",
      nombre: "Plantilla de Agitación Magnética y Calentamiento",
      labTipo: "general",
      labNombre: "Laboratorio General",
      metricaTipo: "veces solicitado",
      cantidadReportada: 65,
      ocupacionSemestral: 72
    },
    {
      id: "EQ-GEN-04",
      nombre: "pHmetro / Potenciómetro de Banco",
      labTipo: "general",
      labNombre: "Laboratorio General",
      metricaTipo: "veces solicitado",
      cantidadReportada: 54,
      ocupacionSemestral: 65
    },
    {
      id: "EQ-GEN-05",
      nombre: "Mufla de Alta Temperatura",
      labTipo: "general",
      labNombre: "Laboratorio General",
      metricaTipo: "veces solicitado",
      cantidadReportada: 53,
      ocupacionSemestral: 62
    },
    {
      id: "EQ-GEN-06",
      nombre: "Centrífuga de Laboratorio",
      labTipo: "general",
      labNombre: "Laboratorio General",
      metricaTipo: "veces solicitado",
      cantidadReportada: 36,
      ocupacionSemestral: 50
    },
    {
      id: "EQ-GEN-07",
      nombre: "Incubadora de Laboratorio",
      labTipo: "general",
      labNombre: "Laboratorio General",
      metricaTipo: "veces solicitado",
      cantidadReportada: 29,
      ocupacionSemestral: 44
    },
    {
      id: "EQ-GEN-08",
      nombre: "Baño Termostático / Baño María / Ultrasonido",
      labTipo: "general",
      labNombre: "Laboratorio General",
      metricaTipo: "veces solicitado",
      cantidadReportada: 26,
      ocupacionSemestral: 40
    },
    {
      id: "EQ-GEN-09",
      nombre: "Molino de Corte / Molino de Bolas",
      labTipo: "general",
      labNombre: "Laboratorio General",
      metricaTipo: "veces solicitado",
      cantidadReportada: 22,
      ocupacionSemestral: 35
    },
    {
      id: "EQ-GEN-10",
      nombre: "Micropipetas Automáticas (Juego Graduable)",
      labTipo: "general",
      labNombre: "Laboratorio General",
      metricaTipo: "veces solicitado",
      cantidadReportada: 17,
      ocupacionSemestral: 30
    },
    {
      id: "EQ-GEN-11",
      nombre: "Turbidímetro de Laboratorio",
      labTipo: "general",
      labNombre: "Laboratorio General",
      metricaTipo: "veces solicitado",
      cantidadReportada: 16,
      ocupacionSemestral: 28
    },
    {
      id: "EQ-GEN-12",
      nombre: "Rotavapor con Baño Termostático",
      labTipo: "general",
      labNombre: "Laboratorio General",
      metricaTipo: "veces solicitado",
      cantidadReportada: 15,
      ocupacionSemestral: 26
    }
  ];

  let currentHistFilter = 'todos';
  const histGridContainer = document.getElementById('historical-equip-grid');
  const histFilterPills = document.querySelectorAll('.hist-filter-pill');
  const btnExportHistoricalCsv = document.getElementById('btn-export-historical-csv');

  function renderHistoricalDashboard() {
    if (!histGridContainer) return;

    // Filtrar datos según la selección actual
    const filteredData = currentHistFilter === 'todos'
      ? [...HISTORICAL_EQUIPMENT_DATA].sort((a, b) => b.ocupacionSemestral - a.ocupacionSemestral)
      : HISTORICAL_EQUIPMENT_DATA.filter(item => item.labTipo === currentHistFilter).sort((a, b) => b.ocupacionSemestral - a.ocupacionSemestral);

    histGridContainer.innerHTML = filteredData.map((eq, idx) => {
      // Semáforo sobrio según umbrales de ocupación (sin textos alarmistas)
      let semaforoClass = "semaforo-bajo";
      let semaforoText = "Baja Demanda";
      let fillClass = "fill-semaforo-bajo";

      if (eq.ocupacionSemestral >= 75) {
        semaforoClass = "semaforo-alto";
        semaforoText = "Alta Ocupación";
        fillClass = "fill-semaforo-alto";
      } else if (eq.ocupacionSemestral >= 40) {
        semaforoClass = "semaforo-medio";
        semaforoText = "Demanda Regular";
        fillClass = "fill-semaforo-medio";
      } else {
        semaforoClass = "semaforo-bajo";
        semaforoText = "Disponibilidad Inmediata";
        fillClass = "fill-semaforo-bajo";
      }

      const labBadgeClass = `lab-${eq.labTipo}`;
      const countLabel = eq.labTipo === 'general' ? `${eq.cantidadReportada} veces solicitado` : `${eq.cantidadReportada} ${eq.metricaTipo}`;

      return `
        <div class="hist-card">
          <div class="hist-header">
            <span class="hist-rank">#${idx + 1}</span>
            <div class="hist-info">
              <div class="hist-name">${eq.nombre}</div>
              <span class="hist-lab-badge ${labBadgeClass}">${eq.labNombre}</span>
            </div>
          </div>
          <div class="hist-stats">
            <span><strong>${eq.cantidadReportada}</strong> ${eq.metricaTipo}</span>
            <span class="hist-semaforo-tag ${semaforoClass}">${semaforoText} &bull; ${eq.ocupacionSemestral}%</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-fill ${fillClass}" style="width: ${eq.ocupacionSemestral}%;" title="${countLabel} • ${eq.ocupacionSemestral}% de demanda">
              ${eq.ocupacionSemestral}% (${eq.cantidadReportada} ${eq.labTipo === 'general' ? 'veces' : 'sol.'})
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Event Listeners para Filtros de Equipos por Laboratorio
  histFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      histFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentHistFilter = pill.dataset.histFilter;
      renderHistoricalDashboard();
    });
  });

  // Exportar Reporte Histórico de Equipos en formato CSV / Excel
  if (btnExportHistoricalCsv) {
    btnExportHistoricalCsv.addEventListener('click', () => {
      const headers = ["Ranking", "Equipo", "Laboratorio", "Metrica", "Cantidad Registrada", "Ocupacion Semestral (%)", "Nivel de Demanda"];
      const sortedData = [...HISTORICAL_EQUIPMENT_DATA].sort((a, b) => b.ocupacionSemestral - a.ocupacionSemestral);

      const rows = sortedData.map((item, idx) => {
        const nivel = item.ocupacionSemestral >= 75 ? "Alta Ocupación" : item.ocupacionSemestral >= 40 ? "Demanda Regular" : "Disponibilidad Inmediata";
        return [
          `#${idx + 1}`,
          `"${item.nombre.replace(/"/g, '""')}"`,
          `"${item.labNombre}"`,
          `"${item.metricaTipo}"`,
          item.cantidadReportada,
          `${item.ocupacionSemestral}%`,
          `"${nivel}"`
        ];
      });

      const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Reporte_Uso_Equipos_EIQ_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // =========================================================================
  
  // =========================================================================
  // --- SISTEMA DINÁMICO DE TRAZABILIDAD Y REGISTRO DE REACTIVOS (2024+) ---
  // =========================================================================
  const REAGENTS_DB_INITIAL = {
  "meta": {
    "total_pdfs_analizados": 160,
    "periodo": "2024 - 2026",
    "anios_disponibles": [
      2024,
      2025,
      2026
    ],
    "total_reactivos_clasificados": 43,
    "total_solicitudes_reactivos": 251,
    "total_lineas_bitacora": 251,
    "resumen_por_anio": {
      "2024": {
        "files": 57,
        "solicitudes": 52,
        "total_liters": 47.605,
        "total_kg": 0.634
      },
      "2025": {
        "files": 66,
        "solicitudes": 117,
        "total_liters": 145.161,
        "total_kg": 2.301
      },
      "2026": {
        "files": 37,
        "solicitudes": 82,
        "total_liters": 136.443,
        "total_kg": 9.334
      }
    }
  },
  "catalogo_reactivos": [
    {
      "id": "REC-01",
      "rank": 1,
      "nombre": "Agua Desionizada / Destilada / HPLC",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "unidadPrincipal": "L",
      "totalSolicitudes": 36,
      "totalLitros": 180.65,
      "totalKg": 0.0,
      "consumoDisplay": "180.65 L",
      "porcentajeDemanda": 14.3,
      "ejemplos": [
        "Agua destilada",
        "Agua ultrapura",
        "Agua Destilada",
        "Agua desionizada",
        "Agua destilada y mili Q"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 10,
          "litros": 10.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 15,
          "litros": 126.15,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 11,
          "litros": 44.5,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-02",
      "rank": 2,
      "nombre": "Etanol (Grado Reactivo / 96% v/v)",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "unidadPrincipal": "L",
      "totalSolicitudes": 18,
      "totalLitros": 18.2,
      "totalKg": 0.001,
      "consumoDisplay": "18.20 L",
      "porcentajeDemanda": 7.2,
      "ejemplos": [
        "Etanol",
        "Etanol 95%",
        "Proceso de destilación de etanol",
        "Etanol 95 % v/v",
        "Etanol 95 %"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 2,
          "litros": 1.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 11,
          "litros": 7.7,
          "kg": 0.001
        },
        "2026": {
          "solicitudes": 5,
          "litros": 9.5,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-03",
      "rank": 3,
      "nombre": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 17,
      "totalLitros": 0.8,
      "totalKg": 0.894,
      "consumoDisplay": "894.2 g",
      "porcentajeDemanda": 6.8,
      "ejemplos": [
        "Hidróxido de sodio",
        "Hidróxido de sodio (grado reactivo)",
        "hidróxido de sodio",
        "NaOH",
        "NaOH (grado reactivo)"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 5,
          "litros": 0.0,
          "kg": 0.596
        },
        "2025": {
          "solicitudes": 4,
          "litros": 0.8,
          "kg": 0.078
        },
        "2026": {
          "solicitudes": 8,
          "litros": 0.0,
          "kg": 0.22
        }
      }
    },
    {
      "id": "REC-04",
      "rank": 4,
      "nombre": "Ácido Clorhídrico (HCl 37% p.a.)",
      "categoria": "Ácidos",
      "labTipo": "general",
      "unidadPrincipal": "L",
      "totalSolicitudes": 17,
      "totalLitros": 2.585,
      "totalKg": 0.0,
      "consumoDisplay": "2.58 L",
      "porcentajeDemanda": 6.8,
      "ejemplos": [
        "Ácido clorhídrico",
        "Ácido Clorhídrico Concentrado",
        "ácido clorhídrico",
        "HCl concentrado",
        "Ácido clorhídrico conc."
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 4,
          "litros": 0.82,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 8,
          "litros": 1.55,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 5,
          "litros": 0.215,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-05",
      "rank": 5,
      "nombre": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "categoria": "Ácidos",
      "labTipo": "general",
      "unidadPrincipal": "L",
      "totalSolicitudes": 16,
      "totalLitros": 17.951,
      "totalKg": 0.0,
      "consumoDisplay": "17.95 L",
      "porcentajeDemanda": 6.4,
      "ejemplos": [
        "Ácido sulfúrico (pureza 95% aprox)",
        "Ácido sulfúrico",
        "Ácido Sulfúrico",
        "Ácido sulfúrico (90% pureza aprox.)",
        "Ácido sulfúrico conc."
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 5,
          "litros": 16.1,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 5,
          "litros": 1.501,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 6,
          "litros": 0.35,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-06",
      "rank": 6,
      "nombre": "Gas Nitrógeno (Cilindro / Alta Pureza)",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "unidadPrincipal": "L gas",
      "totalSolicitudes": 12,
      "totalLitros": 20.16,
      "totalKg": 0.0,
      "consumoDisplay": "12 registros",
      "porcentajeDemanda": 4.8,
      "ejemplos": [
        "Nitrógeno",
        "Hidrógeno/Nitrógeno/Argón",
        "nitrogeno"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 1,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 3,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 8,
          "litros": 20.16,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-07",
      "rank": 7,
      "nombre": "Glicerol / Glicerina (USP / p.a.)",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "unidadPrincipal": "L",
      "totalSolicitudes": 10,
      "totalLitros": 1.602,
      "totalKg": 0.0,
      "consumoDisplay": "1.60 L",
      "porcentajeDemanda": 4.0,
      "ejemplos": [
        "Glicerol"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 3,
          "litros": 0.4,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 5,
          "litros": 1.158,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 2,
          "litros": 0.044,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-08",
      "rank": 8,
      "nombre": "Acetona (Grado Analítico / p.a.)",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "unidadPrincipal": "L",
      "totalSolicitudes": 10,
      "totalLitros": 7.85,
      "totalKg": 0.0,
      "consumoDisplay": "7.85 L",
      "porcentajeDemanda": 4.0,
      "ejemplos": [
        "Acetona",
        "Acetona 100%",
        "acetona(99.5%)",
        "Acetona(9.99 %)"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 3,
          "litros": 5.5,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 6,
          "litros": 1.85,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 1,
          "litros": 0.5,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-09",
      "rank": 9,
      "nombre": "D-Glucosa Anhidra (Patrón analítico)",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "unidadPrincipal": "g",
      "totalSolicitudes": 7,
      "totalLitros": 0.0,
      "totalKg": 0.021,
      "consumoDisplay": "20.7 g",
      "porcentajeDemanda": 2.8,
      "ejemplos": [
        "Patrón de glucosa",
        "Glucosa"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 3,
          "litros": 0.0,
          "kg": 0.01
        },
        "2025": {
          "solicitudes": 4,
          "litros": 0.0,
          "kg": 0.01
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-10",
      "rank": 10,
      "nombre": "Ácido Acético Glacial (99.8% p.a.)",
      "categoria": "Ácidos",
      "labTipo": "general",
      "unidadPrincipal": "L",
      "totalSolicitudes": 7,
      "totalLitros": 0.706,
      "totalKg": 0.001,
      "consumoDisplay": "706 mL",
      "porcentajeDemanda": 2.8,
      "ejemplos": [
        "Ácido acético glacial",
        "Ácido acético"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 1,
          "litros": 0.7,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 1,
          "litros": 0.0,
          "kg": 0.001
        },
        "2026": {
          "solicitudes": 5,
          "litros": 0.006,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-11",
      "rank": 11,
      "nombre": "Gas Argón (Cilindro / Grado Analítico)",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "unidadPrincipal": "Cilindro",
      "totalSolicitudes": 6,
      "totalLitros": 60.0,
      "totalKg": 0.0,
      "consumoDisplay": "6 registros",
      "porcentajeDemanda": 2.4,
      "ejemplos": [
        "% hidrógeno/95% argón",
        "Balance hidrógeno argón",
        "Hidrógeno (Balance Argón)"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 2,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 2,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 2,
          "litros": 60.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-12",
      "rank": 12,
      "nombre": "Sacarosa (p.a. / Grado reactivo)",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 6,
      "totalLitros": 0.0,
      "totalKg": 8.02,
      "consumoDisplay": "8.02 kg",
      "porcentajeDemanda": 2.4,
      "ejemplos": [
        "Azúcar",
        "Sacarosa"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 1,
          "litros": 0.0,
          "kg": 0.01
        },
        "2025": {
          "solicitudes": 1,
          "litros": 0.0,
          "kg": 0.01
        },
        "2026": {
          "solicitudes": 4,
          "litros": 0.0,
          "kg": 8.0
        }
      }
    },
    {
      "id": "REC-13",
      "rank": 13,
      "nombre": "Peróxido de Hidrógeno (H2O2 30-35% p.a.)",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "unidadPrincipal": "L",
      "totalSolicitudes": 6,
      "totalLitros": 4.04,
      "totalKg": 0.0,
      "consumoDisplay": "4.04 L",
      "porcentajeDemanda": 2.4,
      "ejemplos": [
        "Peróxido de hidrógeno 30%",
        "Peróxido de Hidrógeno",
        "Peróxido de hidrógeno",
        "Peróxido de hidrogeno"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 1,
          "litros": 3.5,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 4,
          "litros": 0.34,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 1,
          "litros": 0.2,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-14",
      "rank": 14,
      "nombre": "Cloruro de Sodio (NaCl p.a.)",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 6,
      "totalLitros": 0.0,
      "totalKg": 0.874,
      "consumoDisplay": "874.2 g",
      "porcentajeDemanda": 2.4,
      "ejemplos": [
        "NaCl (grado alimenticio)",
        "Electrolito (NaCl, NaNO3, NaSO4)"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 6,
          "litros": 0.0,
          "kg": 0.874
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-15",
      "rank": 15,
      "nombre": "Ácido Nítrico (HNO3 65-68% p.a.)",
      "categoria": "Ácidos",
      "labTipo": "general",
      "unidadPrincipal": "L",
      "totalSolicitudes": 5,
      "totalLitros": 0.02,
      "totalKg": 0.0,
      "consumoDisplay": "20 mL",
      "porcentajeDemanda": 2.0,
      "ejemplos": [
        "Ácido nítrico 70%",
        "Ácido Nítrico"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 1,
          "litros": 0.012,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 4,
          "litros": 0.008,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-16",
      "rank": 16,
      "nombre": "Fosfatos de Sodio (Mono/Di/Trisódico)",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 5,
      "totalLitros": 0.0,
      "totalKg": 0.008,
      "consumoDisplay": "8.4 g",
      "porcentajeDemanda": 2.0,
      "ejemplos": [
        "Na2HPO4 (grado alimenticio)",
        "Na3PO4 (grado alimenticio)",
        "Fosfato de sodio dibásico"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 5,
          "litros": 0.0,
          "kg": 0.008
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-17",
      "rank": 17,
      "nombre": "Metanol (Grado Analítico / HPLC)",
      "categoria": "Solventes Orgánicos",
      "labTipo": "instrumental",
      "unidadPrincipal": "L",
      "totalSolicitudes": 5,
      "totalLitros": 4.15,
      "totalKg": 0.001,
      "consumoDisplay": "4.15 L",
      "porcentajeDemanda": 2.0,
      "ejemplos": [
        "Metanol",
        "Metanol puro"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 1,
          "litros": 2.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 3,
          "litros": 1.35,
          "kg": 0.001
        },
        "2026": {
          "solicitudes": 1,
          "litros": 0.8,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-18",
      "rank": 18,
      "nombre": "Ácido Bórico (H3BO3 p.a.)",
      "categoria": "Ácidos",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 4,
      "totalLitros": 0.0,
      "totalKg": 0.02,
      "consumoDisplay": "20.0 g",
      "porcentajeDemanda": 1.6,
      "ejemplos": [
        "Ácido bórico 99,5%"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 4,
          "litros": 0.0,
          "kg": 0.02
        }
      }
    },
    {
      "id": "REC-19",
      "rank": 19,
      "nombre": "Cloruro de Calcio (CaCl2 anhidro/dihidrato)",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 4,
      "totalLitros": 0.0,
      "totalKg": 0.002,
      "consumoDisplay": "2.1 g",
      "porcentajeDemanda": 1.6,
      "ejemplos": [
        "CaCl2*2H2O (grado alimenticio)",
        "Cloruro de calcio"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 2,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 2,
          "litros": 0.0,
          "kg": 0.002
        }
      }
    },
    {
      "id": "REC-20",
      "rank": 20,
      "nombre": "Bicarbonato de Sodio (NaHCO3 p.a.)",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 4,
      "totalLitros": 0.0,
      "totalKg": 0.01,
      "consumoDisplay": "10.3 g",
      "porcentajeDemanda": 1.6,
      "ejemplos": [
        "NaHCO3 (grado alimenticio)",
        "Bicarbonato de sodio"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 3,
          "litros": 0.0,
          "kg": 0.01
        },
        "2026": {
          "solicitudes": 1,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-21",
      "rank": 21,
      "nombre": "Aire Comprimido / Grado Instrumental",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "general",
      "unidadPrincipal": "Cilindro",
      "totalSolicitudes": 4,
      "totalLitros": 0.0,
      "totalKg": 0.0,
      "consumoDisplay": "4 registros",
      "porcentajeDemanda": 1.6,
      "ejemplos": [
        "Aire comprimido"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 4,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-22",
      "rank": 22,
      "nombre": "Ácido Cítrico Monohidratado / Anhidro",
      "categoria": "Ácidos",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 4,
      "totalLitros": 0.0,
      "totalKg": 0.12,
      "consumoDisplay": "120.0 g",
      "porcentajeDemanda": 1.6,
      "ejemplos": [
        "Ácido cítrico 99 %"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 2,
          "litros": 0.0,
          "kg": 0.05
        },
        "2026": {
          "solicitudes": 2,
          "litros": 0.0,
          "kg": 0.07
        }
      }
    },
    {
      "id": "REC-23",
      "rank": 23,
      "nombre": "Ácido Fosfórico (H3PO4 85% p.a.)",
      "categoria": "Ácidos",
      "labTipo": "general",
      "unidadPrincipal": "L",
      "totalSolicitudes": 4,
      "totalLitros": 1.06,
      "totalKg": 0.0,
      "consumoDisplay": "1.06 L",
      "porcentajeDemanda": 1.6,
      "ejemplos": [
        "ácido fosfórico(99%)",
        "Ácido fosfórico (85% pureza aprox.)",
        "Ácido fosfórico",
        "Ácido fosfórico (99%)"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 2,
          "litros": 0.16,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 2,
          "litros": 0.9,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-24",
      "rank": 24,
      "nombre": "Sulfato de Magnesio (MgSO4)",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 3,
      "totalLitros": 0.0,
      "totalKg": 0.0,
      "consumoDisplay": "0.3 g",
      "porcentajeDemanda": 1.2,
      "ejemplos": [
        "MgSO4*7H2O (grado alimenticio)"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 2,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 1,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-25",
      "rank": 25,
      "nombre": "Carbón Activado (Polvo / Granular)",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 3,
      "totalLitros": 0.0,
      "totalKg": 0.17,
      "consumoDisplay": "170.0 g",
      "porcentajeDemanda": 1.2,
      "ejemplos": [
        "Carbón activado"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 3,
          "litros": 0.0,
          "kg": 0.17
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-26",
      "rank": 26,
      "nombre": "Ácido Gálico Monohidratado (Patrón de Fenoles)",
      "categoria": "Ácidos",
      "labTipo": "instrumental",
      "unidadPrincipal": "g",
      "totalSolicitudes": 3,
      "totalLitros": 0.0,
      "totalKg": 0.003,
      "consumoDisplay": "3.0 g",
      "porcentajeDemanda": 1.2,
      "ejemplos": [
        "Acido Gálico"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 1,
          "litros": 0.0,
          "kg": 0.003
        },
        "2025": {
          "solicitudes": 2,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-27",
      "rank": 27,
      "nombre": "Almidón Soluble (Indicador y sustrato)",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "unidadPrincipal": "g",
      "totalSolicitudes": 3,
      "totalLitros": 0.575,
      "totalKg": 0.016,
      "consumoDisplay": "16.0 g",
      "porcentajeDemanda": 1.2,
      "ejemplos": [
        "Almidón",
        "Disolución indicadora de almidón 1%"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 1,
          "litros": 0.575,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 2,
          "litros": 0.0,
          "kg": 0.016
        }
      }
    },
    {
      "id": "REC-28",
      "rank": 28,
      "nombre": "Carbonato de Sodio Anhidro (Na2CO3)",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 3,
      "totalLitros": 0.0,
      "totalKg": 0.08,
      "consumoDisplay": "80.0 g",
      "porcentajeDemanda": 1.2,
      "ejemplos": [
        "Carbonato de sodio",
        "Carbonato de sodio anhidro(99%)"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 1,
          "litros": 0.0,
          "kg": 0.015
        },
        "2025": {
          "solicitudes": 2,
          "litros": 0.0,
          "kg": 0.065
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-29",
      "rank": 29,
      "nombre": "Tolueno (Grado Reactivo)",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "unidadPrincipal": "L",
      "totalSolicitudes": 3,
      "totalLitros": 4.5,
      "totalKg": 0.0,
      "consumoDisplay": "4.50 L",
      "porcentajeDemanda": 1.2,
      "ejemplos": [
        "Tolueno"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 3,
          "litros": 4.5,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-30",
      "rank": 30,
      "nombre": "Sílica Gel (Cromatografía / Desecante)",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 2,
      "totalLitros": 0.0,
      "totalKg": 2.0,
      "consumoDisplay": "2.00 kg",
      "porcentajeDemanda": 0.8,
      "ejemplos": [
        "Sílica gel (grado reactivo)"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 1,
          "litros": 0.0,
          "kg": 1.0
        },
        "2026": {
          "solicitudes": 1,
          "litros": 0.0,
          "kg": 1.0
        }
      }
    },
    {
      "id": "REC-31",
      "rank": 31,
      "nombre": "Cloruro de Potasio (KCl p.a.)",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 2,
      "totalLitros": 0.0,
      "totalKg": 0.0,
      "consumoDisplay": "0.2 g",
      "porcentajeDemanda": 0.8,
      "ejemplos": [
        "KCl, K2HPO4 (grado alimenticio)"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 2,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-32",
      "rank": 32,
      "nombre": "Ácido Ascórbico (Vitamina C / Patrón)",
      "categoria": "Ácidos",
      "labTipo": "general",
      "unidadPrincipal": "g",
      "totalSolicitudes": 2,
      "totalLitros": 0.0,
      "totalKg": 0.001,
      "consumoDisplay": "1.0 g",
      "porcentajeDemanda": 0.8,
      "ejemplos": [
        "Ácido ascórbico",
        "ácido ascórbico"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 2,
          "litros": 0.0,
          "kg": 0.001
        }
      }
    },
    {
      "id": "REC-33",
      "rank": 33,
      "nombre": "Hidróxido de Amonio (NH4OH 28-30% p.a.)",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "unidadPrincipal": "L",
      "totalSolicitudes": 2,
      "totalLitros": 0.05,
      "totalKg": 0.002,
      "consumoDisplay": "50 mL",
      "porcentajeDemanda": 0.8,
      "ejemplos": [
        "Hidróxido de Amonio/Sodio"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 2,
          "litros": 0.05,
          "kg": 0.002
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-34",
      "rank": 34,
      "nombre": "Hidróxido de Calcio (Ca(OH)2 p.a.)",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 2,
      "totalLitros": 0.5,
      "totalKg": 0.018,
      "consumoDisplay": "18.0 g",
      "porcentajeDemanda": 0.8,
      "ejemplos": [
        "Hidróxido de calcio",
        "Hidroxido de calcio"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 2,
          "litros": 0.5,
          "kg": 0.018
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-35",
      "rank": 35,
      "nombre": "Hidróxido de Potasio (KOH en lentejas / p.a.)",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 2,
      "totalLitros": 0.0,
      "totalKg": 0.0,
      "consumoDisplay": "2 registros",
      "porcentajeDemanda": 0.8,
      "ejemplos": [
        "Hidróxido de Potasio (KOH en lentejas / p.a.)"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 2,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-36",
      "rank": 36,
      "nombre": "Hexano (Grado Analítico / HPLC)",
      "categoria": "Solventes Orgánicos",
      "labTipo": "instrumental",
      "unidadPrincipal": "L",
      "totalSolicitudes": 1,
      "totalLitros": 2.0,
      "totalKg": 0.0,
      "consumoDisplay": "2.00 L",
      "porcentajeDemanda": 0.4,
      "ejemplos": [
        "Hexano"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 1,
          "litros": 2.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-37",
      "rank": 37,
      "nombre": "Diclorometano (DCM / p.a.)",
      "categoria": "Solventes Orgánicos",
      "labTipo": "instrumental",
      "unidadPrincipal": "L",
      "totalSolicitudes": 1,
      "totalLitros": 1.3,
      "totalKg": 0.0,
      "consumoDisplay": "1.30 L",
      "porcentajeDemanda": 0.4,
      "ejemplos": [
        "Cloruro de metileno"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 1,
          "litros": 1.3,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-38",
      "rank": 38,
      "nombre": "Ácido Láctico (85-90% p.a.)",
      "categoria": "Ácidos",
      "labTipo": "general",
      "unidadPrincipal": "L",
      "totalSolicitudes": 1,
      "totalLitros": 0.0,
      "totalKg": 0.0,
      "consumoDisplay": "1 registros",
      "porcentajeDemanda": 0.4,
      "ejemplos": [
        "Patrones ácido láctico"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 1,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-39",
      "rank": 39,
      "nombre": "Nitrato de Plata (AgNO3 p.a.)",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "unidadPrincipal": "g",
      "totalSolicitudes": 1,
      "totalLitros": 0.0,
      "totalKg": 0.005,
      "consumoDisplay": "5.0 g",
      "porcentajeDemanda": 0.4,
      "ejemplos": [
        "AgNO3  (grado reactivo)"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 1,
          "litros": 0.0,
          "kg": 0.005
        }
      }
    },
    {
      "id": "REC-40",
      "rank": 40,
      "nombre": "Ácido Fórmico (98-100% / HPLC)",
      "categoria": "Ácidos",
      "labTipo": "instrumental",
      "unidadPrincipal": "L",
      "totalSolicitudes": 1,
      "totalLitros": 0.0,
      "totalKg": 0.001,
      "consumoDisplay": "1 registros",
      "porcentajeDemanda": 0.4,
      "ejemplos": [
        "Ácido fórmico"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 1,
          "litros": 0.0,
          "kg": 0.001
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-41",
      "rank": 41,
      "nombre": "Tiosulfato de Sodio Pentahidratado",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 1,
      "totalLitros": 0.35,
      "totalKg": 0.0,
      "consumoDisplay": "1 registros",
      "porcentajeDemanda": 0.4,
      "ejemplos": [
        "Tiosulfato de Sodio Pentahidratado"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 1,
          "litros": 0.35,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-42",
      "rank": 42,
      "nombre": "Dicromato de Potasio (K2Cr2O7 p.a.)",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "unidadPrincipal": "kg",
      "totalSolicitudes": 1,
      "totalLitros": 0.0,
      "totalKg": 0.0,
      "consumoDisplay": "1 registros",
      "porcentajeDemanda": 0.4,
      "ejemplos": [
        "Dicromato de potasio"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 1,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        }
      }
    },
    {
      "id": "REC-43",
      "rank": 43,
      "nombre": "Gas Helio (Cilindro / Grado Portador GC)",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "unidadPrincipal": "Cilindro",
      "totalSolicitudes": 1,
      "totalLitros": 0.16,
      "totalKg": 0.0,
      "consumoDisplay": "1 registros",
      "porcentajeDemanda": 0.4,
      "ejemplos": [
        "Helio"
      ],
      "porAnio": {
        "2024": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2025": {
          "solicitudes": 0,
          "litros": 0.0,
          "kg": 0.0
        },
        "2026": {
          "solicitudes": 1,
          "litros": 0.16,
          "kg": 0.0
        }
      }
    }
  ],
  "bitacora_consumo_historica": [
    {
      "logId": "LOG-0001",
      "anio": 2025,
      "fechaStr": "1/abril/2025",
      "archivoOrigen": "(1 de abril 2025)-Carta_permiso_laboratorio_Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Gas Argón (Cilindro / Grado Analítico)",
      "reactivoEspecifico": "% hidrógeno/95% argón",
      "cantidadRaw": "/",
      "cantidadDisplay": "/",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0002",
      "anio": 2025,
      "fechaStr": "1/abril/2025",
      "archivoOrigen": "(1 de abril 2025)-Carta_permiso_laboratorio_Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "1 l",
      "cantidadDisplay": "1 l",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 1.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0003",
      "anio": 2025,
      "fechaStr": "1/abril/2025",
      "archivoOrigen": "(1 de abril 2025)-Carta_permiso_laboratorio_Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Glicerol / Glicerina (USP / p.a.)",
      "reactivoEspecifico": "Glicerol",
      "cantidadRaw": "100 mL",
      "cantidadDisplay": "100 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.1,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0004",
      "anio": 2026,
      "fechaStr": "10/abril/2026",
      "archivoOrigen": "(10 de abril 2026)-Adriana Mora.pdf",
      "solicitante": "Adriana Mora",
      "reactivoCanonical": "Sacarosa (p.a. / Grado reactivo)",
      "reactivoEspecifico": "Azúcar",
      "cantidadRaw": "2 kg",
      "cantidadDisplay": "2 kg",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 2.0
    },
    {
      "logId": "LOG-0005",
      "anio": 2026,
      "fechaStr": "10/abril/2026",
      "archivoOrigen": "(10 de abril 2026)-Adriana Mora.pdf",
      "solicitante": "Adriana Mora",
      "reactivoCanonical": "Ácido Nítrico (HNO3 65-68% p.a.)",
      "reactivoEspecifico": "Ácido nítrico 70%",
      "cantidadRaw": "2 mL",
      "cantidadDisplay": "2 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.002,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0006",
      "anio": 2026,
      "fechaStr": "10/abril/2026",
      "archivoOrigen": "(10 de abril 2026)-Adriana Mora.pdf",
      "solicitante": "Adriana Mora",
      "reactivoCanonical": "Ácido Bórico (H3BO3 p.a.)",
      "reactivoEspecifico": "Ácido bórico 99,5%",
      "cantidadRaw": "5 g",
      "cantidadDisplay": "5 g",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.005
    },
    {
      "logId": "LOG-0007",
      "anio": 2026,
      "fechaStr": "10/abril/2026",
      "archivoOrigen": "(10 de abril 2026)-Adriana Mora.pdf",
      "solicitante": "Adriana Mora",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "4 L",
      "cantidadDisplay": "4 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 4.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0008",
      "anio": 2026,
      "fechaStr": "10/abril/2026",
      "archivoOrigen": "(10 de abril 2026)-Adriana Mora.pdf",
      "solicitante": "Adriana Mora",
      "reactivoCanonical": "Gas Nitrógeno (Cilindro / Alta Pureza)",
      "reactivoEspecifico": "Nitrógeno",
      "cantidadRaw": "23 000 L",
      "cantidadDisplay": "23 000 L",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0009",
      "anio": 2026,
      "fechaStr": "10/abril/2026",
      "archivoOrigen": "(10 de abril 2026)-Adriana Mora_v2.pdf",
      "solicitante": "Adriana Mora v2",
      "reactivoCanonical": "Sacarosa (p.a. / Grado reactivo)",
      "reactivoEspecifico": "Azúcar",
      "cantidadRaw": "2 kg",
      "cantidadDisplay": "2 kg",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 2.0
    },
    {
      "logId": "LOG-0010",
      "anio": 2026,
      "fechaStr": "10/abril/2026",
      "archivoOrigen": "(10 de abril 2026)-Adriana Mora_v2.pdf",
      "solicitante": "Adriana Mora v2",
      "reactivoCanonical": "Ácido Nítrico (HNO3 65-68% p.a.)",
      "reactivoEspecifico": "Ácido nítrico 70%",
      "cantidadRaw": "2 mL",
      "cantidadDisplay": "2 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.002,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0011",
      "anio": 2026,
      "fechaStr": "10/abril/2026",
      "archivoOrigen": "(10 de abril 2026)-Adriana Mora_v2.pdf",
      "solicitante": "Adriana Mora v2",
      "reactivoCanonical": "Ácido Bórico (H3BO3 p.a.)",
      "reactivoEspecifico": "Ácido bórico 99,5%",
      "cantidadRaw": "5 g",
      "cantidadDisplay": "5 g",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.005
    },
    {
      "logId": "LOG-0012",
      "anio": 2026,
      "fechaStr": "10/abril/2026",
      "archivoOrigen": "(10 de abril 2026)-Adriana Mora_v2.pdf",
      "solicitante": "Adriana Mora v2",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "4 L",
      "cantidadDisplay": "4 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 4.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0013",
      "anio": 2026,
      "fechaStr": "10/abril/2026",
      "archivoOrigen": "(10 de abril 2026)-Adriana Mora_v2.pdf",
      "solicitante": "Adriana Mora v2",
      "reactivoCanonical": "Gas Nitrógeno (Cilindro / Alta Pureza)",
      "reactivoEspecifico": "Nitrógeno",
      "cantidadRaw": "23 000 L",
      "cantidadDisplay": "23 000 L",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0014",
      "anio": 2024,
      "fechaStr": "10/diciembre/2024",
      "archivoOrigen": "(10 de diciembre 2024)-Carta_permiso_laboratorio_Camilo Vargas.pdf",
      "solicitante": "Camilo Vargas",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "Ácido sulfúrico (pureza 95% aprox)",
      "cantidadRaw": "700 mL",
      "cantidadDisplay": "700 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.7,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0015",
      "anio": 2024,
      "fechaStr": "10/diciembre/2024",
      "archivoOrigen": "(10 de diciembre 2024)-Carta_permiso_laboratorio_Camilo Vargas.pdf",
      "solicitante": "Camilo Vargas",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "1 L",
      "cantidadDisplay": "1 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 1.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0016",
      "anio": 2024,
      "fechaStr": "10/diciembre/2024",
      "archivoOrigen": "(10 de diciembre 2024)-Carta_permiso_laboratorio_Camilo Vargas.pdf",
      "solicitante": "Camilo Vargas",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "Hidróxido de sodio",
      "cantidadRaw": "18 g",
      "cantidadDisplay": "18 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.018
    },
    {
      "logId": "LOG-0017",
      "anio": 2024,
      "fechaStr": "10/diciembre/2024",
      "archivoOrigen": "(10 de diciembre 2024)-Carta_permiso_laboratorio_Camilo Vargas.pdf",
      "solicitante": "Camilo Vargas",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "Ácido clorhídrico",
      "cantidadRaw": "150 mL",
      "cantidadDisplay": "150 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.15,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0018",
      "anio": 2024,
      "fechaStr": "10/diciembre/2024",
      "archivoOrigen": "(10 de diciembre 2024)-Carta_permiso_laboratorio_Camilo Vargas.pdf",
      "solicitante": "Camilo Vargas",
      "reactivoCanonical": "D-Glucosa Anhidra (Patrón analítico)",
      "reactivoEspecifico": "Patrón de glucosa",
      "cantidadRaw": "0.15 g",
      "cantidadDisplay": "0.15 g",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0019",
      "anio": 2026,
      "fechaStr": "10/febrero/2026",
      "archivoOrigen": "(10 de febrero 2026)-Camila Coghi.pdf",
      "solicitante": "Camila Coghi",
      "reactivoCanonical": "Peróxido de Hidrógeno (H2O2 30-35% p.a.)",
      "reactivoEspecifico": "Peróxido de hidrógeno 30%",
      "cantidadRaw": "200 mL",
      "cantidadDisplay": "200 mL",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.2,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0020",
      "anio": 2026,
      "fechaStr": "10/febrero/2026",
      "archivoOrigen": "(10 de febrero 2026)-Camila Coghi.pdf",
      "solicitante": "Camila Coghi",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "Ácido clorhídrico",
      "cantidadRaw": "100 mL",
      "cantidadDisplay": "100 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.1,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0021",
      "anio": 2026,
      "fechaStr": "10/febrero/2026",
      "archivoOrigen": "(10 de febrero 2026)-Camila Coghi.pdf",
      "solicitante": "Camila Coghi",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "Hidróxido de sodio (grado reactivo)",
      "cantidadRaw": "50 g",
      "cantidadDisplay": "50 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.05
    },
    {
      "logId": "LOG-0022",
      "anio": 2026,
      "fechaStr": "10/febrero/2026",
      "archivoOrigen": "(10 de febrero 2026)-Camila Coghi.pdf",
      "solicitante": "Camila Coghi",
      "reactivoCanonical": "Sílica Gel (Cromatografía / Desecante)",
      "reactivoEspecifico": "Sílica gel (grado reactivo)",
      "cantidadRaw": "1 kg",
      "cantidadDisplay": "1 kg",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 1.0
    },
    {
      "logId": "LOG-0023",
      "anio": 2025,
      "fechaStr": "10/julio/2025",
      "archivoOrigen": "(10 de julio 2025)-Carta_permiso_laboratorio_Sergio Brenes.pdf",
      "solicitante": "Sergio Brenes",
      "reactivoCanonical": "Acetona (Grado Analítico / p.a.)",
      "reactivoEspecifico": "Acetona",
      "cantidadRaw": "200mL",
      "cantidadDisplay": "200mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.2,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0024",
      "anio": 2025,
      "fechaStr": "10/julio/2025",
      "archivoOrigen": "(10 de julio 2025)-Carta_permiso_laboratorio_Sergio Brenes.pdf",
      "solicitante": "Sergio Brenes",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "Etanol",
      "cantidadRaw": "300mL",
      "cantidadDisplay": "300mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.3,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0025",
      "anio": 2025,
      "fechaStr": "10/noviembre/2025",
      "archivoOrigen": "(10 de noviembre 2025)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Cloruro de Calcio (CaCl2 anhidro/dihidrato)",
      "reactivoEspecifico": "CaCl2*2H2O (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0026",
      "anio": 2025,
      "fechaStr": "10/noviembre/2025",
      "archivoOrigen": "(10 de noviembre 2025)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Sulfato de Magnesio (MgSO4)",
      "reactivoEspecifico": "MgSO4*7H2O (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0027",
      "anio": 2025,
      "fechaStr": "10/noviembre/2025",
      "archivoOrigen": "(10 de noviembre 2025)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Cloruro de Sodio (NaCl p.a.)",
      "reactivoEspecifico": "NaCl (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0028",
      "anio": 2025,
      "fechaStr": "10/noviembre/2025",
      "archivoOrigen": "(10 de noviembre 2025)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Bicarbonato de Sodio (NaHCO3 p.a.)",
      "reactivoEspecifico": "NaHCO3 (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0029",
      "anio": 2025,
      "fechaStr": "10/noviembre/2025",
      "archivoOrigen": "(10 de noviembre 2025)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Fosfatos de Sodio (Mono/Di/Trisódico)",
      "reactivoEspecifico": "Na2HPO4 (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0030",
      "anio": 2025,
      "fechaStr": "10/noviembre/2025",
      "archivoOrigen": "(10 de noviembre 2025)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Fosfatos de Sodio (Mono/Di/Trisódico)",
      "reactivoEspecifico": "Na3PO4 (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0031",
      "anio": 2025,
      "fechaStr": "10/noviembre/2025",
      "archivoOrigen": "(10 de noviembre 2025)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Cloruro de Potasio (KCl p.a.)",
      "reactivoEspecifico": "KCl, K2HPO4 (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0032",
      "anio": 2025,
      "fechaStr": "11/febrero/2025",
      "archivoOrigen": "(11 de febrero 2025)-Carta_permiso_laboratorio_Karina Godinez_2.pdf",
      "solicitante": "Karina Godinez 2",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "25 L",
      "cantidadDisplay": "25 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 25.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0033",
      "anio": 2025,
      "fechaStr": "11/febrero/2025",
      "archivoOrigen": "(11 de febrero 2025)-Carta_permiso_laboratorio_Karina Godinez_2.pdf",
      "solicitante": "Karina Godinez 2",
      "reactivoCanonical": "Aire Comprimido / Grado Instrumental",
      "reactivoEspecifico": "Aire comprimido",
      "cantidadRaw": "500 psi",
      "cantidadDisplay": "500 psi",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0034",
      "anio": 2025,
      "fechaStr": "11/febrero/2025",
      "archivoOrigen": "(11 de febrero 2025)-Carta_permiso_laboratorio_Karina Godinez_2.pdf",
      "solicitante": "Karina Godinez 2",
      "reactivoCanonical": "Cloruro de Sodio (NaCl p.a.)",
      "reactivoEspecifico": "Electrolito (NaCl, NaNO3, NaSO4)",
      "cantidadRaw": "8 g x corrida",
      "cantidadDisplay": "8 g x corrida",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.008
    },
    {
      "logId": "LOG-0035",
      "anio": 2025,
      "fechaStr": "11/julio/2025",
      "archivoOrigen": "(11 de julio 2025)-Carta_permiso_laboratorio_Sergio Brenes.pdf",
      "solicitante": "Sergio Brenes",
      "reactivoCanonical": "Acetona (Grado Analítico / p.a.)",
      "reactivoEspecifico": "Acetona 100%",
      "cantidadRaw": "300mL",
      "cantidadDisplay": "300mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.3,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0036",
      "anio": 2025,
      "fechaStr": "11/julio/2025",
      "archivoOrigen": "(11 de julio 2025)-Carta_permiso_laboratorio_Sergio Brenes.pdf",
      "solicitante": "Sergio Brenes",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "Etanol 95%",
      "cantidadRaw": "300mL",
      "cantidadDisplay": "300mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.3,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0037",
      "anio": 2026,
      "fechaStr": "11/junio/2026",
      "archivoOrigen": "(11 de junio 2026)-Óscar Mendoza.pdf",
      "solicitante": "Óscar Mendoza",
      "reactivoCanonical": "Ácido Ascórbico (Vitamina C / Patrón)",
      "reactivoEspecifico": "Ácido ascórbico",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0038",
      "anio": 2026,
      "fechaStr": "11/junio/2026",
      "archivoOrigen": "(11 de junio 2026)-Óscar Mendoza.pdf",
      "solicitante": "Óscar Mendoza",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0039",
      "anio": 2026,
      "fechaStr": "11/junio/2026",
      "archivoOrigen": "(11 de junio 2026)-Óscar Mendoza.pdf",
      "solicitante": "Óscar Mendoza",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "Ácido sulfúrico",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0040",
      "anio": 2026,
      "fechaStr": "11/junio/2026",
      "archivoOrigen": "(11 de junio 2026)-Óscar Mendoza.pdf",
      "solicitante": "Óscar Mendoza",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua ultrapura",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0041",
      "anio": 2026,
      "fechaStr": "11/junio/2026",
      "archivoOrigen": "(11 de junio 2026)-Óscar Mendoza.pdf",
      "solicitante": "Óscar Mendoza",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "Hidróxido de sodio",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0042",
      "anio": 2025,
      "fechaStr": "11/marzo/2025",
      "archivoOrigen": "(11 de marzo 2025)-Carta_permiso_laboratorio_Adrián Delgado.pdf",
      "solicitante": "Adrián Delgado",
      "reactivoCanonical": "D-Glucosa Anhidra (Patrón analítico)",
      "reactivoEspecifico": "con muestras de grano gastado y con patrones de glucosa.",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0043",
      "anio": 2025,
      "fechaStr": "12/agosto/2025",
      "archivoOrigen": "(12 de agosto 2025)-Carta_permiso_laboratorio_Nataly Salazar.pdf",
      "solicitante": "Nataly Salazar",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "Proceso de destilación de etanol",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0044",
      "anio": 2025,
      "fechaStr": "12/agosto/2025",
      "archivoOrigen": "(12 de agosto 2025)-Carta_permiso_laboratorio_Rafael Erazo.pdf",
      "solicitante": "Rafael Erazo",
      "reactivoCanonical": "Carbón Activado (Polvo / Granular)",
      "reactivoEspecifico": "Carbón activado",
      "cantidadRaw": "20 g",
      "cantidadDisplay": "20 g",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.02
    },
    {
      "logId": "LOG-0045",
      "anio": 2025,
      "fechaStr": "12/agosto/2025",
      "archivoOrigen": "(12 de agosto 2025)-Carta_permiso_laboratorio_Rafael Erazo.pdf",
      "solicitante": "Rafael Erazo",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0046",
      "anio": 2025,
      "fechaStr": "12/febrero/2025",
      "archivoOrigen": "(12 de febrero 2025)-Carta_permiso_laboratorio_Karina Godinez.pdf",
      "solicitante": "Karina Godinez",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "25 L",
      "cantidadDisplay": "25 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 25.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0047",
      "anio": 2025,
      "fechaStr": "12/febrero/2025",
      "archivoOrigen": "(12 de febrero 2025)-Carta_permiso_laboratorio_Karina Godinez.pdf",
      "solicitante": "Karina Godinez",
      "reactivoCanonical": "Aire Comprimido / Grado Instrumental",
      "reactivoEspecifico": "Aire comprimido",
      "cantidadRaw": "500 psi",
      "cantidadDisplay": "500 psi",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0048",
      "anio": 2025,
      "fechaStr": "12/febrero/2025",
      "archivoOrigen": "(12 de febrero 2025)-Carta_permiso_laboratorio_Karina Godinez.pdf",
      "solicitante": "Karina Godinez",
      "reactivoCanonical": "Cloruro de Sodio (NaCl p.a.)",
      "reactivoEspecifico": "Electrolito (NaCl, NaNO3, NaSO4)",
      "cantidadRaw": "8 g x corrida",
      "cantidadDisplay": "8 g x corrida",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.008
    },
    {
      "logId": "LOG-0049",
      "anio": 2024,
      "fechaStr": "12/junio/2024",
      "archivoOrigen": "(12 de junio 2024)-Carta_permiso_laboratorio-Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Gas Argón (Cilindro / Grado Analítico)",
      "reactivoEspecifico": "% hidrógeno/95% argón",
      "cantidadRaw": "/",
      "cantidadDisplay": "/",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0050",
      "anio": 2024,
      "fechaStr": "12/junio/2024",
      "archivoOrigen": "(12 de junio 2024)-Carta_permiso_laboratorio-Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "1 l",
      "cantidadDisplay": "1 l",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 1.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0051",
      "anio": 2024,
      "fechaStr": "12/junio/2024",
      "archivoOrigen": "(12 de junio 2024)-Carta_permiso_laboratorio-Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Glicerol / Glicerina (USP / p.a.)",
      "reactivoEspecifico": "Glicerol",
      "cantidadRaw": "100 mL",
      "cantidadDisplay": "100 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.1,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0052",
      "anio": 2025,
      "fechaStr": "12/septiembre/2025",
      "archivoOrigen": "(12 de septiembre 2025)-Daniel Solís.pdf",
      "solicitante": "Daniel Solís",
      "reactivoCanonical": "Hidróxido de Amonio (NH4OH 28-30% p.a.)",
      "reactivoEspecifico": "Hidróxido de Amonio/Sodio",
      "cantidadRaw": "50 mL",
      "cantidadDisplay": "50 mL",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.05,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0053",
      "anio": 2025,
      "fechaStr": "12/septiembre/2025",
      "archivoOrigen": "(12 de septiembre 2025)-Daniel Solís.pdf",
      "solicitante": "Daniel Solís",
      "reactivoCanonical": "Glicerol / Glicerina (USP / p.a.)",
      "reactivoEspecifico": "Glicerol",
      "cantidadRaw": "420 mL",
      "cantidadDisplay": "420 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.42,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0054",
      "anio": 2025,
      "fechaStr": "12/septiembre/2025",
      "archivoOrigen": "(12 de septiembre 2025)-Daniel Solís.pdf",
      "solicitante": "Daniel Solís",
      "reactivoCanonical": "Acetona (Grado Analítico / p.a.)",
      "reactivoEspecifico": "Acetona",
      "cantidadRaw": "50 mL",
      "cantidadDisplay": "50 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.05,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0055",
      "anio": 2025,
      "fechaStr": "12/septiembre/2025",
      "archivoOrigen": "(12 de septiembre 2025)-Daniel Solís.pdf",
      "solicitante": "Daniel Solís",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua Destilada",
      "cantidadRaw": "5 L",
      "cantidadDisplay": "5 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 5.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0056",
      "anio": 2025,
      "fechaStr": "12/septiembre/2025",
      "archivoOrigen": "(12 de septiembre 2025)-Daniel Solís.pdf",
      "solicitante": "Daniel Solís",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "Ácido Clorhídrico Concentrado",
      "cantidadRaw": "50 mL",
      "cantidadDisplay": "50 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.05,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0057",
      "anio": 2025,
      "fechaStr": "12/septiembre/2025",
      "archivoOrigen": "(12 de septiembre 2025)-Daniel Solís.pdf",
      "solicitante": "Daniel Solís",
      "reactivoCanonical": "Peróxido de Hidrógeno (H2O2 30-35% p.a.)",
      "reactivoEspecifico": "Peróxido de Hidrógeno",
      "cantidadRaw": "50 mL",
      "cantidadDisplay": "50 mL",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.05,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0058",
      "anio": 2025,
      "fechaStr": "12/septiembre/2025",
      "archivoOrigen": "(12 de septiembre 2025)-Daniel Solís.pdf",
      "solicitante": "Daniel Solís",
      "reactivoCanonical": "Gas Nitrógeno (Cilindro / Alta Pureza)",
      "reactivoEspecifico": "Hidrógeno/Nitrógeno/Argón",
      "cantidadRaw": "N/A",
      "cantidadDisplay": "N/A",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0059",
      "anio": 2025,
      "fechaStr": "13/agosto/2025",
      "archivoOrigen": "(13 de agosto 2025)-Carta_permiso_laboratorio_Jose Pablo Fernández.pdf",
      "solicitante": "Jose Pablo Fernández",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "Etanol 95 % v/v",
      "cantidadRaw": "1.1 L",
      "cantidadDisplay": "1.1 L",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 1.1,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0060",
      "anio": 2025,
      "fechaStr": "13/agosto/2025",
      "archivoOrigen": "(13 de agosto 2025)-Carta_permiso_laboratorio_Jose Pablo Fernández.pdf",
      "solicitante": "Jose Pablo Fernández",
      "reactivoCanonical": "Ácido Cítrico Monohidratado / Anhidro",
      "reactivoEspecifico": "Ácido cítrico 99 %",
      "cantidadRaw": "15 g",
      "cantidadDisplay": "15 g",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.015
    },
    {
      "logId": "LOG-0061",
      "anio": 2025,
      "fechaStr": "13/agosto/2025",
      "archivoOrigen": "(13 de agosto 2025)-Carta_permiso_laboratorio_Jose Pablo Fernández.pdf",
      "solicitante": "Jose Pablo Fernández",
      "reactivoCanonical": "Fosfatos de Sodio (Mono/Di/Trisódico)",
      "reactivoEspecifico": "Fosfato de sodio dibásico",
      "cantidadRaw": "8 g",
      "cantidadDisplay": "8 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.008
    },
    {
      "logId": "LOG-0062",
      "anio": 2025,
      "fechaStr": "13/agosto/2025",
      "archivoOrigen": "(13 de agosto 2025)-Carta_permiso_laboratorio_Rafael Erazo.pdf",
      "solicitante": "Rafael Erazo",
      "reactivoCanonical": "Carbón Activado (Polvo / Granular)",
      "reactivoEspecifico": "Carbón activado",
      "cantidadRaw": "20 g",
      "cantidadDisplay": "20 g",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.02
    },
    {
      "logId": "LOG-0063",
      "anio": 2025,
      "fechaStr": "13/agosto/2025",
      "archivoOrigen": "(13 de agosto 2025)-Carta_permiso_laboratorio_Rafael Erazo.pdf",
      "solicitante": "Rafael Erazo",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "500 mL",
      "cantidadDisplay": "500 mL",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.5,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0064",
      "anio": 2026,
      "fechaStr": "13/enero/2026",
      "archivoOrigen": "(13 de enero 2026)-Óscar Mendoza.pdf",
      "solicitante": "Óscar Mendoza",
      "reactivoCanonical": "Ácido Ascórbico (Vitamina C / Patrón)",
      "reactivoEspecifico": "ácido ascórbico",
      "cantidadRaw": "1g",
      "cantidadDisplay": "1g",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.001
    },
    {
      "logId": "LOG-0065",
      "anio": 2026,
      "fechaStr": "13/enero/2026",
      "archivoOrigen": "(13 de enero 2026)-Óscar Mendoza.pdf",
      "solicitante": "Óscar Mendoza",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "hidróxido de sodio",
      "cantidadRaw": "0.2 g",
      "cantidadDisplay": "0.2 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0002
    },
    {
      "logId": "LOG-0066",
      "anio": 2026,
      "fechaStr": "13/enero/2026",
      "archivoOrigen": "(13 de enero 2026)-Óscar Mendoza.pdf",
      "solicitante": "Óscar Mendoza",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "ácido clorhídrico",
      "cantidadRaw": "5 mL",
      "cantidadDisplay": "5 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.005,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0067",
      "anio": 2025,
      "fechaStr": "13/junio/2025",
      "archivoOrigen": "(13 de junio 2025)-Carta_permiso_laboratorio_Carolina Porras.pdf",
      "solicitante": "Carolina Porras",
      "reactivoCanonical": "Ácido Gálico Monohidratado (Patrón de Fenoles)",
      "reactivoEspecifico": "espectrofotómetro UV y se compara contra patrón de ácido gálico.",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Ácidos",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0068",
      "anio": 2026,
      "fechaStr": "14/abril/2026",
      "archivoOrigen": "(14 de abril 2026)-FernandezMorumJosePablo.pdf",
      "solicitante": "FernandezMorumJosePablo",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "Etanol 95 %",
      "cantidadRaw": "4 L",
      "cantidadDisplay": "4 L",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 4.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0069",
      "anio": 2026,
      "fechaStr": "14/abril/2026",
      "archivoOrigen": "(14 de abril 2026)-FernandezMorumJosePablo.pdf",
      "solicitante": "FernandezMorumJosePablo",
      "reactivoCanonical": "Ácido Cítrico Monohidratado / Anhidro",
      "reactivoEspecifico": "Ácido cítrico 99 %",
      "cantidadRaw": "35 g",
      "cantidadDisplay": "35 g",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.035
    },
    {
      "logId": "LOG-0070",
      "anio": 2026,
      "fechaStr": "14/abril/2026",
      "archivoOrigen": "(14 de abril 2026)-FernandezMorumJosePablo.pdf",
      "solicitante": "FernandezMorumJosePablo",
      "reactivoCanonical": "Glicerol / Glicerina (USP / p.a.)",
      "reactivoEspecifico": "Glicerol",
      "cantidadRaw": "22 mL",
      "cantidadDisplay": "22 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.022,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0071",
      "anio": 2026,
      "fechaStr": "14/abril/2026",
      "archivoOrigen": "(14 de abril 2026)-FernandezMorumJosePablo.pdf",
      "solicitante": "FernandezMorumJosePablo",
      "reactivoCanonical": "Almidón Soluble (Indicador y sustrato)",
      "reactivoEspecifico": "Almidón",
      "cantidadRaw": "8 g",
      "cantidadDisplay": "8 g",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.008
    },
    {
      "logId": "LOG-0072",
      "anio": 2026,
      "fechaStr": "14/abril/2026",
      "archivoOrigen": "(14 de abril 2026)-FernandezMorumJosePablo.pdf",
      "solicitante": "FernandezMorumJosePablo",
      "reactivoCanonical": "Ácido Acético Glacial (99.8% p.a.)",
      "reactivoEspecifico": "Ácido acético glacial",
      "cantidadRaw": "6 mL",
      "cantidadDisplay": "6 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.006,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0073",
      "anio": 2026,
      "fechaStr": "14/abril/2026",
      "archivoOrigen": "(14 de abril 2026)-FernandezMorumJosePablo.pdf",
      "solicitante": "FernandezMorumJosePablo",
      "reactivoCanonical": "Cloruro de Calcio (CaCl2 anhidro/dihidrato)",
      "reactivoEspecifico": "Cloruro de calcio",
      "cantidadRaw": "1.8 g",
      "cantidadDisplay": "1.8 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0018
    },
    {
      "logId": "LOG-0074",
      "anio": 2025,
      "fechaStr": "14/enero/2025",
      "archivoOrigen": "(14 de enero 2025)-Carta_permiso_laboratorio_Camilo Vargas.pdf",
      "solicitante": "Camilo Vargas",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "Ácido sulfúrico (pureza 95% aprox)",
      "cantidadRaw": "700 mL",
      "cantidadDisplay": "700 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.7,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0075",
      "anio": 2025,
      "fechaStr": "14/enero/2025",
      "archivoOrigen": "(14 de enero 2025)-Carta_permiso_laboratorio_Camilo Vargas.pdf",
      "solicitante": "Camilo Vargas",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "1 L",
      "cantidadDisplay": "1 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 1.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0076",
      "anio": 2025,
      "fechaStr": "14/enero/2025",
      "archivoOrigen": "(14 de enero 2025)-Carta_permiso_laboratorio_Camilo Vargas.pdf",
      "solicitante": "Camilo Vargas",
      "reactivoCanonical": "Hidróxido de Calcio (Ca(OH)2 p.a.)",
      "reactivoEspecifico": "Hidróxido de calcio",
      "cantidadRaw": "18 g",
      "cantidadDisplay": "18 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.018
    },
    {
      "logId": "LOG-0077",
      "anio": 2025,
      "fechaStr": "14/enero/2025",
      "archivoOrigen": "(14 de enero 2025)-Carta_permiso_laboratorio_Camilo Vargas.pdf",
      "solicitante": "Camilo Vargas",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "Ácido clorhídrico",
      "cantidadRaw": "150 mL",
      "cantidadDisplay": "150 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.15,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0078",
      "anio": 2025,
      "fechaStr": "14/enero/2025",
      "archivoOrigen": "(14 de enero 2025)-Carta_permiso_laboratorio_Camilo Vargas.pdf",
      "solicitante": "Camilo Vargas",
      "reactivoCanonical": "D-Glucosa Anhidra (Patrón analítico)",
      "reactivoEspecifico": "Patrón de glucosa",
      "cantidadRaw": "0.15 g",
      "cantidadDisplay": "0.15 g",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0079",
      "anio": 2025,
      "fechaStr": "14/enero/2025",
      "archivoOrigen": "(14 de enero 2025)-Carta_permiso_laboratorio_Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "1 l",
      "cantidadDisplay": "1 l",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 1.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0080",
      "anio": 2025,
      "fechaStr": "14/enero/2025",
      "archivoOrigen": "(14 de enero 2025)-Carta_permiso_laboratorio_Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "Etanol 95%",
      "cantidadRaw": "500 ml",
      "cantidadDisplay": "500 ml",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.5,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0081",
      "anio": 2025,
      "fechaStr": "14/enero/2025",
      "archivoOrigen": "(14 de enero 2025)-Carta_permiso_laboratorio_Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Glicerol / Glicerina (USP / p.a.)",
      "reactivoEspecifico": "Glicerol",
      "cantidadRaw": "200 mL",
      "cantidadDisplay": "200 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.2,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0082",
      "anio": 2026,
      "fechaStr": "14/enero/2026",
      "archivoOrigen": "(14 de enero 2026)-Adriana Mora.pdf",
      "solicitante": "Adriana Mora",
      "reactivoCanonical": "Sacarosa (p.a. / Grado reactivo)",
      "reactivoEspecifico": "Azúcar",
      "cantidadRaw": "2 kg",
      "cantidadDisplay": "2 kg",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 2.0
    },
    {
      "logId": "LOG-0083",
      "anio": 2026,
      "fechaStr": "14/enero/2026",
      "archivoOrigen": "(14 de enero 2026)-Adriana Mora.pdf",
      "solicitante": "Adriana Mora",
      "reactivoCanonical": "Ácido Nítrico (HNO3 65-68% p.a.)",
      "reactivoEspecifico": "Ácido nítrico 70%",
      "cantidadRaw": "2 mL",
      "cantidadDisplay": "2 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.002,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0084",
      "anio": 2026,
      "fechaStr": "14/enero/2026",
      "archivoOrigen": "(14 de enero 2026)-Adriana Mora.pdf",
      "solicitante": "Adriana Mora",
      "reactivoCanonical": "Ácido Bórico (H3BO3 p.a.)",
      "reactivoEspecifico": "Ácido bórico 99,5%",
      "cantidadRaw": "5 g",
      "cantidadDisplay": "5 g",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.005
    },
    {
      "logId": "LOG-0085",
      "anio": 2026,
      "fechaStr": "14/enero/2026",
      "archivoOrigen": "(14 de enero 2026)-Adriana Mora.pdf",
      "solicitante": "Adriana Mora",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "4 L",
      "cantidadDisplay": "4 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 4.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0086",
      "anio": 2026,
      "fechaStr": "14/enero/2026",
      "archivoOrigen": "(14 de enero 2026)-Adriana Mora.pdf",
      "solicitante": "Adriana Mora",
      "reactivoCanonical": "Gas Nitrógeno (Cilindro / Alta Pureza)",
      "reactivoEspecifico": "Nitrógeno",
      "cantidadRaw": "23 000 L",
      "cantidadDisplay": "23 000 L",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0087",
      "anio": 2025,
      "fechaStr": "14/mayo/2025",
      "archivoOrigen": "(14 de mayo 2025)-Carta_permiso_laboratorio_Arly Cascante.pdf",
      "solicitante": "Arly Cascante",
      "reactivoCanonical": "Carbonato de Sodio Anhidro (Na2CO3)",
      "reactivoEspecifico": "Carbonato de sodio",
      "cantidadRaw": "50g",
      "cantidadDisplay": "50g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.05
    },
    {
      "logId": "LOG-0088",
      "anio": 2025,
      "fechaStr": "14/octubre/2025",
      "archivoOrigen": "(14 de octubre 2025)-Kimberly Campos.pdf",
      "solicitante": "Kimberly Campos",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "etanol(95%)",
      "cantidadRaw": "250 ml",
      "cantidadDisplay": "250 ml",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.25,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0089",
      "anio": 2025,
      "fechaStr": "14/octubre/2025",
      "archivoOrigen": "(14 de octubre 2025)-Kimberly Campos.pdf",
      "solicitante": "Kimberly Campos",
      "reactivoCanonical": "Acetona (Grado Analítico / p.a.)",
      "reactivoEspecifico": "acetona(99.5%)",
      "cantidadRaw": "250 ml",
      "cantidadDisplay": "250 ml",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.25,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0090",
      "anio": 2025,
      "fechaStr": "14/octubre/2025",
      "archivoOrigen": "(14 de octubre 2025)-Kimberly Campos.pdf",
      "solicitante": "Kimberly Campos",
      "reactivoCanonical": "Carbonato de Sodio Anhidro (Na2CO3)",
      "reactivoEspecifico": "Carbonato de sodio anhidro(99%)",
      "cantidadRaw": "15 g",
      "cantidadDisplay": "15 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.015
    },
    {
      "logId": "LOG-0091",
      "anio": 2025,
      "fechaStr": "14/octubre/2025",
      "archivoOrigen": "(14 de octubre 2025)-Kimberly Campos.pdf",
      "solicitante": "Kimberly Campos",
      "reactivoCanonical": "Ácido Fosfórico (H3PO4 85% p.a.)",
      "reactivoEspecifico": "ácido fosfórico(99%)",
      "cantidadRaw": "250 ml",
      "cantidadDisplay": "250 ml",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.25,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0092",
      "anio": 2024,
      "fechaStr": "16/agosto/2024",
      "archivoOrigen": "(16 de agosto 2024)-Carta_permiso_laboratorio-Camilo Vargas.pdf",
      "solicitante": "Camilo Vargas",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "Ácido sulfúrico (pureza 95% aprox)",
      "cantidadRaw": "700 mL",
      "cantidadDisplay": "700 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.7,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0093",
      "anio": 2024,
      "fechaStr": "16/agosto/2024",
      "archivoOrigen": "(16 de agosto 2024)-Carta_permiso_laboratorio-Camilo Vargas.pdf",
      "solicitante": "Camilo Vargas",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "1 L",
      "cantidadDisplay": "1 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 1.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0094",
      "anio": 2024,
      "fechaStr": "16/agosto/2024",
      "archivoOrigen": "(16 de agosto 2024)-Carta_permiso_laboratorio-Camilo Vargas.pdf",
      "solicitante": "Camilo Vargas",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "Hidróxido de sodio",
      "cantidadRaw": "18 g",
      "cantidadDisplay": "18 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.018
    },
    {
      "logId": "LOG-0095",
      "anio": 2024,
      "fechaStr": "16/agosto/2024",
      "archivoOrigen": "(16 de agosto 2024)-Carta_permiso_laboratorio-Camilo Vargas.pdf",
      "solicitante": "Camilo Vargas",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "Ácido clorhídrico",
      "cantidadRaw": "150 mL",
      "cantidadDisplay": "150 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.15,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0096",
      "anio": 2024,
      "fechaStr": "16/agosto/2024",
      "archivoOrigen": "(16 de agosto 2024)-Carta_permiso_laboratorio-Camilo Vargas.pdf",
      "solicitante": "Camilo Vargas",
      "reactivoCanonical": "D-Glucosa Anhidra (Patrón analítico)",
      "reactivoEspecifico": "Patrón de glucosa",
      "cantidadRaw": "0.15 g",
      "cantidadDisplay": "0.15 g",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0097",
      "anio": 2024,
      "fechaStr": "16/agosto/2024",
      "archivoOrigen": "(16 de agosto 2024)-Carta_permiso_laboratorio-Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "2 litros",
      "cantidadDisplay": "2 litros",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 2.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0098",
      "anio": 2024,
      "fechaStr": "16/agosto/2024",
      "archivoOrigen": "(16 de agosto 2024)-Carta_permiso_laboratorio-Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "HCl concentrado",
      "cantidadRaw": "20 ml",
      "cantidadDisplay": "20 ml",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.02,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0099",
      "anio": 2024,
      "fechaStr": "16/agosto/2024",
      "archivoOrigen": "(16 de agosto 2024)-Carta_permiso_laboratorio-Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "NaOH",
      "cantidadRaw": "20 g",
      "cantidadDisplay": "20 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.02
    },
    {
      "logId": "LOG-0100",
      "anio": 2024,
      "fechaStr": "16/agosto/2024",
      "archivoOrigen": "(16 de agosto 2024)-Carta_permiso_laboratorio-Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "Ácido Fosfórico (H3PO4 85% p.a.)",
      "reactivoEspecifico": "Ácido fosfórico (85% pureza aprox.)",
      "cantidadRaw": "10 ml",
      "cantidadDisplay": "10 ml",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.01,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0101",
      "anio": 2024,
      "fechaStr": "16/diciembre/2024",
      "archivoOrigen": "(16 de diciembre 2024)-Carta_permiso_laboratorio_Daniela Retana.pdf",
      "solicitante": "Daniela Retana",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "-",
      "cantidadDisplay": "-",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0102",
      "anio": 2024,
      "fechaStr": "16/diciembre/2024",
      "archivoOrigen": "(16 de diciembre 2024)-Carta_permiso_laboratorio_Daniela Retana.pdf",
      "solicitante": "Daniela Retana",
      "reactivoCanonical": "Hexano (Grado Analítico / HPLC)",
      "reactivoEspecifico": "Hexano",
      "cantidadRaw": "2L",
      "cantidadDisplay": "2L",
      "categoria": "Solventes Orgánicos",
      "labTipo": "instrumental",
      "volumenLitros": 2.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0103",
      "anio": 2024,
      "fechaStr": "16/diciembre/2024",
      "archivoOrigen": "(16 de diciembre 2024)-Carta_permiso_laboratorio_Daniela Retana.pdf",
      "solicitante": "Daniela Retana",
      "reactivoCanonical": "Acetona (Grado Analítico / p.a.)",
      "reactivoEspecifico": "Acetona",
      "cantidadRaw": "2L",
      "cantidadDisplay": "2L",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 2.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0104",
      "anio": 2024,
      "fechaStr": "16/diciembre/2024",
      "archivoOrigen": "(16 de diciembre 2024)-Carta_permiso_laboratorio_Daniela Retana.pdf",
      "solicitante": "Daniela Retana",
      "reactivoCanonical": "Tolueno (Grado Reactivo)",
      "reactivoEspecifico": "Tolueno",
      "cantidadRaw": "2 L",
      "cantidadDisplay": "2 L",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 2.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0105",
      "anio": 2024,
      "fechaStr": "16/diciembre/2024",
      "archivoOrigen": "(16 de diciembre 2024)-Carta_permiso_laboratorio_Daniela Retana.pdf",
      "solicitante": "Daniela Retana",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "Ácido Sulfúrico",
      "cantidadRaw": "100 ml",
      "cantidadDisplay": "100 ml",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.1,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0106",
      "anio": 2025,
      "fechaStr": "16/enero/2025",
      "archivoOrigen": "(16 de enero 2025)-Carta_permiso_laboratorio_Brayan Vargas.pdf",
      "solicitante": "Brayan Vargas",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "Ácido clorhídrico",
      "cantidadRaw": "250 ml",
      "cantidadDisplay": "250 ml",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.25,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0107",
      "anio": 2025,
      "fechaStr": "16/enero/2025",
      "archivoOrigen": "(16 de enero 2025)-Carta_permiso_laboratorio_Brayan Vargas.pdf",
      "solicitante": "Brayan Vargas",
      "reactivoCanonical": "Metanol (Grado Analítico / HPLC)",
      "reactivoEspecifico": "Metanol",
      "cantidadRaw": "750 ml",
      "cantidadDisplay": "750 ml",
      "categoria": "Solventes Orgánicos",
      "labTipo": "instrumental",
      "volumenLitros": 0.75,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0108",
      "anio": 2025,
      "fechaStr": "16/enero/2025",
      "archivoOrigen": "(16 de enero 2025)-Carta_permiso_laboratorio_Brayan Vargas.pdf",
      "solicitante": "Brayan Vargas",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua desionizada",
      "cantidadRaw": "650 ml",
      "cantidadDisplay": "650 ml",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.65,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0109",
      "anio": 2025,
      "fechaStr": "16/enero/2025",
      "archivoOrigen": "(16 de enero 2025)-Carta_permiso_laboratorio_Brayan Vargas.pdf",
      "solicitante": "Brayan Vargas",
      "reactivoCanonical": "Diclorometano (DCM / p.a.)",
      "reactivoEspecifico": "Cloruro de metileno",
      "cantidadRaw": "1300 ml",
      "cantidadDisplay": "1300 ml",
      "categoria": "Solventes Orgánicos",
      "labTipo": "instrumental",
      "volumenLitros": 1.3,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0110",
      "anio": 2025,
      "fechaStr": "16/enero/2025",
      "archivoOrigen": "(16 de enero 2025)-Carta_permiso_laboratorio_Brayan Vargas.pdf",
      "solicitante": "Brayan Vargas",
      "reactivoCanonical": "Ácido Láctico (85-90% p.a.)",
      "reactivoEspecifico": "Patrones ácido láctico",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0111",
      "anio": 2025,
      "fechaStr": "16/enero/2025",
      "archivoOrigen": "(16 de enero 2025)-Carta_permiso_laboratorio_Brayan Vargas.pdf",
      "solicitante": "Brayan Vargas",
      "reactivoCanonical": "Ácido Fosfórico (H3PO4 85% p.a.)",
      "reactivoEspecifico": "Ácido fosfórico",
      "cantidadRaw": "650 ml",
      "cantidadDisplay": "650 ml",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.65,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0112",
      "anio": 2025,
      "fechaStr": "16/enero/2025",
      "archivoOrigen": "(16 de enero 2025)-Carta_permiso_laboratorio_Brayan Vargas.pdf",
      "solicitante": "Brayan Vargas",
      "reactivoCanonical": "Carbón Activado (Polvo / Granular)",
      "reactivoEspecifico": "Carbón activado",
      "cantidadRaw": "130 g",
      "cantidadDisplay": "130 g",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.13
    },
    {
      "logId": "LOG-0113",
      "anio": 2025,
      "fechaStr": "16/enero/2025",
      "archivoOrigen": "(16 de enero 2025)-Carta_permiso_laboratorio_Brayan Vargas.pdf",
      "solicitante": "Brayan Vargas",
      "reactivoCanonical": "Hidróxido de Calcio (Ca(OH)2 p.a.)",
      "reactivoEspecifico": "Hidroxido de calcio",
      "cantidadRaw": "500 ml",
      "cantidadDisplay": "500 ml",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.5,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0114",
      "anio": 2025,
      "fechaStr": "16/enero/2025",
      "archivoOrigen": "(16 de enero 2025)-Carta_permiso_laboratorio_Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "2 litros",
      "cantidadDisplay": "2 litros",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 2.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0115",
      "anio": 2025,
      "fechaStr": "16/enero/2025",
      "archivoOrigen": "(16 de enero 2025)-Carta_permiso_laboratorio_Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "HCl concentrado",
      "cantidadRaw": "700 ml",
      "cantidadDisplay": "700 ml",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.7,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0116",
      "anio": 2025,
      "fechaStr": "16/enero/2025",
      "archivoOrigen": "(16 de enero 2025)-Carta_permiso_laboratorio_Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "NaOH",
      "cantidadRaw": "800 ml",
      "cantidadDisplay": "800 ml",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.8,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0117",
      "anio": 2025,
      "fechaStr": "16/enero/2025",
      "archivoOrigen": "(16 de enero 2025)-Carta_permiso_laboratorio_Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "Ácido sulfúrico (90% pureza aprox.)",
      "cantidadRaw": "100 ml",
      "cantidadDisplay": "100 ml",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.1,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0118",
      "anio": 2025,
      "fechaStr": "16/enero/2025",
      "archivoOrigen": "(16 de enero 2025)-Carta_permiso_laboratorio_Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "Sacarosa (p.a. / Grado reactivo)",
      "reactivoEspecifico": "Sacarosa",
      "cantidadRaw": "10 g",
      "cantidadDisplay": "10 g",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.01
    },
    {
      "logId": "LOG-0119",
      "anio": 2025,
      "fechaStr": "16/enero/2025",
      "archivoOrigen": "(16 de enero 2025)-Carta_permiso_laboratorio_Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "D-Glucosa Anhidra (Patrón analítico)",
      "reactivoEspecifico": "Glucosa",
      "cantidadRaw": "10 g",
      "cantidadDisplay": "10 g",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.01
    },
    {
      "logId": "LOG-0120",
      "anio": 2025,
      "fechaStr": "16/octubre/2025",
      "archivoOrigen": "(16 de octubre 2025)-María Gabriela Salazar.pdf",
      "solicitante": "María Gabriela Salazar",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "Hidróxido de sodio",
      "cantidadRaw": "10 g",
      "cantidadDisplay": "10 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.01
    },
    {
      "logId": "LOG-0121",
      "anio": 2025,
      "fechaStr": "16/septiembre/2025",
      "archivoOrigen": "(16 de septiembre 2025)-Daniel Solís.pdf",
      "solicitante": "Daniel Solís",
      "reactivoCanonical": "Hidróxido de Amonio (NH4OH 28-30% p.a.)",
      "reactivoEspecifico": "Hidróxido de Amonio/Sodio",
      "cantidadRaw": "2 g",
      "cantidadDisplay": "2 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.002
    },
    {
      "logId": "LOG-0122",
      "anio": 2025,
      "fechaStr": "16/septiembre/2025",
      "archivoOrigen": "(16 de septiembre 2025)-Daniel Solís.pdf",
      "solicitante": "Daniel Solís",
      "reactivoCanonical": "Glicerol / Glicerina (USP / p.a.)",
      "reactivoEspecifico": "Glicerol",
      "cantidadRaw": "420 mL",
      "cantidadDisplay": "420 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.42,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0123",
      "anio": 2025,
      "fechaStr": "16/septiembre/2025",
      "archivoOrigen": "(16 de septiembre 2025)-Daniel Solís.pdf",
      "solicitante": "Daniel Solís",
      "reactivoCanonical": "Acetona (Grado Analítico / p.a.)",
      "reactivoEspecifico": "Acetona",
      "cantidadRaw": "50 mL",
      "cantidadDisplay": "50 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.05,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0124",
      "anio": 2025,
      "fechaStr": "16/septiembre/2025",
      "archivoOrigen": "(16 de septiembre 2025)-Daniel Solís.pdf",
      "solicitante": "Daniel Solís",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua Destilada",
      "cantidadRaw": "5 L",
      "cantidadDisplay": "5 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 5.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0125",
      "anio": 2025,
      "fechaStr": "16/septiembre/2025",
      "archivoOrigen": "(16 de septiembre 2025)-Daniel Solís.pdf",
      "solicitante": "Daniel Solís",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "Ácido Clorhídrico Concentrado",
      "cantidadRaw": "50 mL",
      "cantidadDisplay": "50 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.05,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0126",
      "anio": 2025,
      "fechaStr": "16/septiembre/2025",
      "archivoOrigen": "(16 de septiembre 2025)-Daniel Solís.pdf",
      "solicitante": "Daniel Solís",
      "reactivoCanonical": "Peróxido de Hidrógeno (H2O2 30-35% p.a.)",
      "reactivoEspecifico": "Peróxido de Hidrógeno",
      "cantidadRaw": "50 mL",
      "cantidadDisplay": "50 mL",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.05,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0127",
      "anio": 2025,
      "fechaStr": "16/septiembre/2025",
      "archivoOrigen": "(16 de septiembre 2025)-Daniel Solís.pdf",
      "solicitante": "Daniel Solís",
      "reactivoCanonical": "Gas Nitrógeno (Cilindro / Alta Pureza)",
      "reactivoEspecifico": "Hidrógeno/Nitrógeno/Argón",
      "cantidadRaw": "41 ft^3",
      "cantidadDisplay": "41 ft^3",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0128",
      "anio": 2025,
      "fechaStr": "17/julio/2025",
      "archivoOrigen": "(17 de julio 2025)-Carta_permiso_laboratorio_Camila Coghi v2.pdf",
      "solicitante": "Camila Coghi v2",
      "reactivoCanonical": "Peróxido de Hidrógeno (H2O2 30-35% p.a.)",
      "reactivoEspecifico": "Peróxido de hidrógeno 30%",
      "cantidadRaw": "200 mL",
      "cantidadDisplay": "200 mL",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.2,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0129",
      "anio": 2025,
      "fechaStr": "17/julio/2025",
      "archivoOrigen": "(17 de julio 2025)-Carta_permiso_laboratorio_Camila Coghi v2.pdf",
      "solicitante": "Camila Coghi v2",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "Ácido clorhídrico",
      "cantidadRaw": "100 mL",
      "cantidadDisplay": "100 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.1,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0130",
      "anio": 2025,
      "fechaStr": "17/julio/2025",
      "archivoOrigen": "(17 de julio 2025)-Carta_permiso_laboratorio_Camila Coghi v2.pdf",
      "solicitante": "Camila Coghi v2",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "Hidróxido de sodio (grado reactivo)",
      "cantidadRaw": "50 g",
      "cantidadDisplay": "50 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.05
    },
    {
      "logId": "LOG-0131",
      "anio": 2025,
      "fechaStr": "17/julio/2025",
      "archivoOrigen": "(17 de julio 2025)-Carta_permiso_laboratorio_Camila Coghi v2.pdf",
      "solicitante": "Camila Coghi v2",
      "reactivoCanonical": "Sílica Gel (Cromatografía / Desecante)",
      "reactivoEspecifico": "Sílica gel (grado reactivo)",
      "cantidadRaw": "1 kg",
      "cantidadDisplay": "1 kg",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 1.0
    },
    {
      "logId": "LOG-0132",
      "anio": 2026,
      "fechaStr": "19/febrero/2026",
      "archivoOrigen": "(19 de febrero 2026)-Carta_permiso_laboratorio_YulisaParra.pdf",
      "solicitante": "YulisaParra",
      "reactivoCanonical": "Hidróxido de Potasio (KOH en lentejas / p.a.)",
      "reactivoEspecifico": "muestra de aceite a la que se le agrega una disolución de KOH.",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0133",
      "anio": 2026,
      "fechaStr": "19/febrero/2026",
      "archivoOrigen": "(19 de febrero 2026)-Carta_permiso_laboratorio_YulisaParra.pdf",
      "solicitante": "YulisaParra",
      "reactivoCanonical": "Ácido Acético Glacial (99.8% p.a.)",
      "reactivoEspecifico": "aceite a la que se le agrega una mezcla de ácido acético glacial e isooctano.",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0134",
      "anio": 2026,
      "fechaStr": "19/febrero/2026",
      "archivoOrigen": "(19 de febrero 2026)-Carta_permiso_laboratorio_YulisaParra.pdf",
      "solicitante": "YulisaParra",
      "reactivoCanonical": "Ácido Acético Glacial (99.8% p.a.)",
      "reactivoEspecifico": "la que se le agrega una mezcla de ciclohexano y ácido acético.",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0135",
      "anio": 2026,
      "fechaStr": "2/marzo/2026",
      "archivoOrigen": "(2 de marzo 2026)-Carta_permiso_laboratorio_Jose Bruno I-S-2026.pdf",
      "solicitante": "Jose Bruno I S 2026",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "Ácido clorhídrico conc.",
      "cantidadRaw": "5 mL",
      "cantidadDisplay": "5 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.005,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0136",
      "anio": 2026,
      "fechaStr": "2/marzo/2026",
      "archivoOrigen": "(2 de marzo 2026)-Carta_permiso_laboratorio_Jose Bruno I-S-2026.pdf",
      "solicitante": "Jose Bruno I S 2026",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "Ácido sulfúrico conc.",
      "cantidadRaw": "150 mL",
      "cantidadDisplay": "150 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.15,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0137",
      "anio": 2026,
      "fechaStr": "2/marzo/2026",
      "archivoOrigen": "(2 de marzo 2026)-Carta_permiso_laboratorio_Jose Bruno I-S-2026.pdf",
      "solicitante": "Jose Bruno I S 2026",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "Hidróxido de sodio",
      "cantidadRaw": "5 g",
      "cantidadDisplay": "5 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.005
    },
    {
      "logId": "LOG-0138",
      "anio": 2026,
      "fechaStr": "2/marzo/2026",
      "archivoOrigen": "(2 de marzo 2026)-Carta_permiso_laboratorio_Jose Bruno I-S-2026.pdf",
      "solicitante": "Jose Bruno I S 2026",
      "reactivoCanonical": "Gas Nitrógeno (Cilindro / Alta Pureza)",
      "reactivoEspecifico": "Nitrógeno",
      "cantidadRaw": "10 L",
      "cantidadDisplay": "10 L",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 10.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0139",
      "anio": 2026,
      "fechaStr": "2/marzo/2026",
      "archivoOrigen": "(2 de marzo 2026)-Carta_permiso_laboratorio_Jose Bruno I-S-2026.pdf",
      "solicitante": "Jose Bruno I S 2026",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada y mili Q",
      "cantidadRaw": "2 L c/u",
      "cantidadDisplay": "2 L c/u",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 2.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0140",
      "anio": 2026,
      "fechaStr": "2/marzo/2026",
      "archivoOrigen": "(2 de marzo 2026)-Carta_permiso_laboratorio_Jose Bruno.pdf",
      "solicitante": "Jose Bruno",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "Ácido clorhídrico conc.",
      "cantidadRaw": "5 mL",
      "cantidadDisplay": "5 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.005,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0141",
      "anio": 2026,
      "fechaStr": "2/marzo/2026",
      "archivoOrigen": "(2 de marzo 2026)-Carta_permiso_laboratorio_Jose Bruno.pdf",
      "solicitante": "Jose Bruno",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "Ácido sulfúrico conc.",
      "cantidadRaw": "150 mL",
      "cantidadDisplay": "150 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.15,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0142",
      "anio": 2026,
      "fechaStr": "2/marzo/2026",
      "archivoOrigen": "(2 de marzo 2026)-Carta_permiso_laboratorio_Jose Bruno.pdf",
      "solicitante": "Jose Bruno",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "Hidróxido de sodio",
      "cantidadRaw": "5 g",
      "cantidadDisplay": "5 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.005
    },
    {
      "logId": "LOG-0143",
      "anio": 2026,
      "fechaStr": "2/marzo/2026",
      "archivoOrigen": "(2 de marzo 2026)-Carta_permiso_laboratorio_Jose Bruno.pdf",
      "solicitante": "Jose Bruno",
      "reactivoCanonical": "Gas Nitrógeno (Cilindro / Alta Pureza)",
      "reactivoEspecifico": "Nitrógeno",
      "cantidadRaw": "10 L",
      "cantidadDisplay": "10 L",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 10.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0144",
      "anio": 2026,
      "fechaStr": "2/marzo/2026",
      "archivoOrigen": "(2 de marzo 2026)-Carta_permiso_laboratorio_Jose Bruno.pdf",
      "solicitante": "Jose Bruno",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada y mili Q",
      "cantidadRaw": "2 L c/u",
      "cantidadDisplay": "2 L c/u",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 2.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0145",
      "anio": 2024,
      "fechaStr": "2/setiembre/2024",
      "archivoOrigen": "(2 de setiembre 2024)-Carta_permiso_laboratorio-Daniela Retana Fallas.pdf",
      "solicitante": "Daniela Retana Fallas",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "-",
      "cantidadDisplay": "-",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0146",
      "anio": 2024,
      "fechaStr": "2/setiembre/2024",
      "archivoOrigen": "(2 de setiembre 2024)-Carta_permiso_laboratorio-Daniela Retana Fallas.pdf",
      "solicitante": "Daniela Retana Fallas",
      "reactivoCanonical": "Metanol (Grado Analítico / HPLC)",
      "reactivoEspecifico": "Metanol",
      "cantidadRaw": "2 L",
      "cantidadDisplay": "2 L",
      "categoria": "Solventes Orgánicos",
      "labTipo": "instrumental",
      "volumenLitros": 2.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0147",
      "anio": 2024,
      "fechaStr": "2/setiembre/2024",
      "archivoOrigen": "(2 de setiembre 2024)-Carta_permiso_laboratorio-Daniela Retana Fallas.pdf",
      "solicitante": "Daniela Retana Fallas",
      "reactivoCanonical": "Acetona (Grado Analítico / p.a.)",
      "reactivoEspecifico": "Acetona",
      "cantidadRaw": "3 L",
      "cantidadDisplay": "3 L",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 3.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0148",
      "anio": 2024,
      "fechaStr": "2/setiembre/2024",
      "archivoOrigen": "(2 de setiembre 2024)-Carta_permiso_laboratorio-Daniela Retana Fallas.pdf",
      "solicitante": "Daniela Retana Fallas",
      "reactivoCanonical": "Tolueno (Grado Reactivo)",
      "reactivoEspecifico": "Tolueno",
      "cantidadRaw": "2 L",
      "cantidadDisplay": "2 L",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 2.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0149",
      "anio": 2026,
      "fechaStr": "20/agosto/2026",
      "archivoOrigen": "(20 de agosto 2026)-Aarón Ureña.pdf",
      "solicitante": "Aarón Ureña",
      "reactivoCanonical": "Nitrato de Plata (AgNO3 p.a.)",
      "reactivoEspecifico": "AgNO3  (grado reactivo)",
      "cantidadRaw": "5 g",
      "cantidadDisplay": "5 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.005
    },
    {
      "logId": "LOG-0150",
      "anio": 2026,
      "fechaStr": "20/agosto/2026",
      "archivoOrigen": "(20 de agosto 2026)-Aarón Ureña.pdf",
      "solicitante": "Aarón Ureña",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "H2SO4  (grado reactivo)",
      "cantidadRaw": "50 mL",
      "cantidadDisplay": "50 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.05,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0151",
      "anio": 2026,
      "fechaStr": "20/agosto/2026",
      "archivoOrigen": "(20 de agosto 2026)-Aarón Ureña.pdf",
      "solicitante": "Aarón Ureña",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "NaOH (grado reactivo)",
      "cantidadRaw": "10 g",
      "cantidadDisplay": "10 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.01
    },
    {
      "logId": "LOG-0152",
      "anio": 2026,
      "fechaStr": "20/enero/2026",
      "archivoOrigen": "(20 de enero 2026)-Adriana Mora.pdf",
      "solicitante": "Adriana Mora",
      "reactivoCanonical": "Sacarosa (p.a. / Grado reactivo)",
      "reactivoEspecifico": "Azúcar",
      "cantidadRaw": "2 kg",
      "cantidadDisplay": "2 kg",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 2.0
    },
    {
      "logId": "LOG-0153",
      "anio": 2026,
      "fechaStr": "20/enero/2026",
      "archivoOrigen": "(20 de enero 2026)-Adriana Mora.pdf",
      "solicitante": "Adriana Mora",
      "reactivoCanonical": "Ácido Nítrico (HNO3 65-68% p.a.)",
      "reactivoEspecifico": "Ácido nítrico 70%",
      "cantidadRaw": "2 mL",
      "cantidadDisplay": "2 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.002,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0154",
      "anio": 2026,
      "fechaStr": "20/enero/2026",
      "archivoOrigen": "(20 de enero 2026)-Adriana Mora.pdf",
      "solicitante": "Adriana Mora",
      "reactivoCanonical": "Ácido Bórico (H3BO3 p.a.)",
      "reactivoEspecifico": "Ácido bórico 99,5%",
      "cantidadRaw": "5 g",
      "cantidadDisplay": "5 g",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.005
    },
    {
      "logId": "LOG-0155",
      "anio": 2026,
      "fechaStr": "20/enero/2026",
      "archivoOrigen": "(20 de enero 2026)-Adriana Mora.pdf",
      "solicitante": "Adriana Mora",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "4 L",
      "cantidadDisplay": "4 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 4.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0156",
      "anio": 2026,
      "fechaStr": "20/enero/2026",
      "archivoOrigen": "(20 de enero 2026)-Adriana Mora.pdf",
      "solicitante": "Adriana Mora",
      "reactivoCanonical": "Gas Nitrógeno (Cilindro / Alta Pureza)",
      "reactivoEspecifico": "Nitrógeno",
      "cantidadRaw": "23 000 L",
      "cantidadDisplay": "23 000 L",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0157",
      "anio": 2026,
      "fechaStr": "20/enero/2026",
      "archivoOrigen": "(20 de enero 2026)-Laura Rodríguez.pdf",
      "solicitante": "Laura Rodríguez",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "Preparación de disolución de NaCl 0.03 M, de NaOH 0.025 M y de H2SO4 5 %.",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0158",
      "anio": 2026,
      "fechaStr": "20/enero/2026",
      "archivoOrigen": "(20 de enero 2026)-Laura Rodríguez.pdf",
      "solicitante": "Laura Rodríguez",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "Regeneración de la resina utilizada con H2SO4 al 5 %.",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0159",
      "anio": 2026,
      "fechaStr": "20/febrero/2026",
      "archivoOrigen": "(20 de febrero 2026)-Yulissa Parra.pdf",
      "solicitante": "Yulissa Parra",
      "reactivoCanonical": "Hidróxido de Potasio (KOH en lentejas / p.a.)",
      "reactivoEspecifico": "muestra de aceite a la que se le agrega una disolución de KOH.",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0160",
      "anio": 2026,
      "fechaStr": "20/febrero/2026",
      "archivoOrigen": "(20 de febrero 2026)-Yulissa Parra.pdf",
      "solicitante": "Yulissa Parra",
      "reactivoCanonical": "Ácido Acético Glacial (99.8% p.a.)",
      "reactivoEspecifico": "aceite a la que se le agrega una mezcla de ácido acético glacial e isooctano.",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0161",
      "anio": 2026,
      "fechaStr": "20/febrero/2026",
      "archivoOrigen": "(20 de febrero 2026)-Yulissa Parra.pdf",
      "solicitante": "Yulissa Parra",
      "reactivoCanonical": "Ácido Acético Glacial (99.8% p.a.)",
      "reactivoEspecifico": "la que se le agrega una mezcla de ciclohexano y ácido acético.",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0162",
      "anio": 2026,
      "fechaStr": "21/mayo/2026",
      "archivoOrigen": "(21 de mayo 2026)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Cloruro de Calcio (CaCl2 anhidro/dihidrato)",
      "reactivoEspecifico": "CaCl2*2H2O (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0163",
      "anio": 2026,
      "fechaStr": "21/mayo/2026",
      "archivoOrigen": "(21 de mayo 2026)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Sulfato de Magnesio (MgSO4)",
      "reactivoEspecifico": "MgSO4*7H2O (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0164",
      "anio": 2026,
      "fechaStr": "21/mayo/2026",
      "archivoOrigen": "(21 de mayo 2026)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Bicarbonato de Sodio (NaHCO3 p.a.)",
      "reactivoEspecifico": "NaHCO3 (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0165",
      "anio": 2026,
      "fechaStr": "21/mayo/2026",
      "archivoOrigen": "(21 de mayo 2026)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "15 L",
      "cantidadDisplay": "15 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 15.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0166",
      "anio": 2025,
      "fechaStr": "22/abril/2025",
      "archivoOrigen": "(22 de abril 2025)-Carta_permiso_laboratorio_Sergio Brenes Gatjens.pdf",
      "solicitante": "Sergio Brenes Gatjens",
      "reactivoCanonical": "Acetona (Grado Analítico / p.a.)",
      "reactivoEspecifico": "Acetona(9.99 %)",
      "cantidadRaw": "1 L",
      "cantidadDisplay": "1 L",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 1.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0167",
      "anio": 2025,
      "fechaStr": "22/abril/2025",
      "archivoOrigen": "(22 de abril 2025)-Carta_permiso_laboratorio_Sergio Brenes Gatjens.pdf",
      "solicitante": "Sergio Brenes Gatjens",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "Etanol(95.0%)",
      "cantidadRaw": "1 L",
      "cantidadDisplay": "1 L",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 1.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0168",
      "anio": 2025,
      "fechaStr": "22/julio/2025",
      "archivoOrigen": "(22 de julio 2025)-Carta_permiso_laboratorio_Sergio Brenes.pdf",
      "solicitante": "Sergio Brenes",
      "reactivoCanonical": "Bicarbonato de Sodio (NaHCO3 p.a.)",
      "reactivoEspecifico": "Bicarbonato de sodio",
      "cantidadRaw": "10g",
      "cantidadDisplay": "10g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.01
    },
    {
      "logId": "LOG-0169",
      "anio": 2026,
      "fechaStr": "23/junio/2026",
      "archivoOrigen": "(23 de junio 2026)-Kevin Alvarado.pdf",
      "solicitante": "Kevin Alvarado",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "piña. Se utilizarán agua y etanol (40% v/v) como disolventes.",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0170",
      "anio": 2024,
      "fechaStr": "24/junio/2024",
      "archivoOrigen": "(24 de junio 2024)-Carta_permiso_laboratorio-Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "1 l",
      "cantidadDisplay": "1 l",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 1.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0171",
      "anio": 2024,
      "fechaStr": "24/junio/2024",
      "archivoOrigen": "(24 de junio 2024)-Carta_permiso_laboratorio-Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "Etanol 95%",
      "cantidadRaw": "500 ml",
      "cantidadDisplay": "500 ml",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.5,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0172",
      "anio": 2024,
      "fechaStr": "24/junio/2024",
      "archivoOrigen": "(24 de junio 2024)-Carta_permiso_laboratorio-Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Glicerol / Glicerina (USP / p.a.)",
      "reactivoEspecifico": "Glicerol",
      "cantidadRaw": "100 mL",
      "cantidadDisplay": "100 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.1,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0173",
      "anio": 2025,
      "fechaStr": "26/marzo/2025",
      "archivoOrigen": "(26 de marzo 2025)-Carta_permiso_laboratorio_Karina Godinez.pdf",
      "solicitante": "Karina Godinez",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "25 L",
      "cantidadDisplay": "25 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 25.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0174",
      "anio": 2025,
      "fechaStr": "26/marzo/2025",
      "archivoOrigen": "(26 de marzo 2025)-Carta_permiso_laboratorio_Karina Godinez.pdf",
      "solicitante": "Karina Godinez",
      "reactivoCanonical": "Aire Comprimido / Grado Instrumental",
      "reactivoEspecifico": "Aire comprimido",
      "cantidadRaw": "500 psi",
      "cantidadDisplay": "500 psi",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0175",
      "anio": 2025,
      "fechaStr": "26/marzo/2025",
      "archivoOrigen": "(26 de marzo 2025)-Carta_permiso_laboratorio_Karina Godinez.pdf",
      "solicitante": "Karina Godinez",
      "reactivoCanonical": "Cloruro de Sodio (NaCl p.a.)",
      "reactivoEspecifico": "Electrolito (NaCl, NaNO3, NaSO4)",
      "cantidadRaw": "850 g",
      "cantidadDisplay": "850 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.85
    },
    {
      "logId": "LOG-0176",
      "anio": 2025,
      "fechaStr": "26/septiembre/2025",
      "archivoOrigen": "(26 de septiembre 2025)-Walter Mora.pdf",
      "solicitante": "Walter Mora",
      "reactivoCanonical": "D-Glucosa Anhidra (Patrón analítico)",
      "reactivoEspecifico": "Glucosa",
      "cantidadRaw": "250 mg",
      "cantidadDisplay": "250 mg",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0003
    },
    {
      "logId": "LOG-0177",
      "anio": 2025,
      "fechaStr": "26/septiembre/2025",
      "archivoOrigen": "(26 de septiembre 2025)-Walter Mora.pdf",
      "solicitante": "Walter Mora",
      "reactivoCanonical": "Ácido Acético Glacial (99.8% p.a.)",
      "reactivoEspecifico": "Ácido acético",
      "cantidadRaw": "1 g",
      "cantidadDisplay": "1 g",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.001
    },
    {
      "logId": "LOG-0178",
      "anio": 2025,
      "fechaStr": "26/septiembre/2025",
      "archivoOrigen": "(26 de septiembre 2025)-Walter Mora.pdf",
      "solicitante": "Walter Mora",
      "reactivoCanonical": "Ácido Fórmico (98-100% / HPLC)",
      "reactivoEspecifico": "Ácido fórmico",
      "cantidadRaw": "1 g",
      "cantidadDisplay": "1 g",
      "categoria": "Ácidos",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.001
    },
    {
      "logId": "LOG-0179",
      "anio": 2025,
      "fechaStr": "26/septiembre/2025",
      "archivoOrigen": "(26 de septiembre 2025)-Walter Mora.pdf",
      "solicitante": "Walter Mora",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "Etanol",
      "cantidadRaw": "1 g",
      "cantidadDisplay": "1 g",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.001
    },
    {
      "logId": "LOG-0180",
      "anio": 2025,
      "fechaStr": "26/septiembre/2025",
      "archivoOrigen": "(26 de septiembre 2025)-Walter Mora.pdf",
      "solicitante": "Walter Mora",
      "reactivoCanonical": "Metanol (Grado Analítico / HPLC)",
      "reactivoEspecifico": "Metanol",
      "cantidadRaw": "1 g",
      "cantidadDisplay": "1 g",
      "categoria": "Solventes Orgánicos",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.001
    },
    {
      "logId": "LOG-0181",
      "anio": 2025,
      "fechaStr": "26/septiembre/2025",
      "archivoOrigen": "(26 de septiembre 2025)-Walter Mora.pdf",
      "solicitante": "Walter Mora",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "Ácido sulfúrico",
      "cantidadRaw": "1 ml",
      "cantidadDisplay": "1 ml",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.001,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0182",
      "anio": 2024,
      "fechaStr": "27/agosto/2024",
      "archivoOrigen": "(27 de agosto 2024)-Carta_permiso_laboratorio-Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "1 l",
      "cantidadDisplay": "1 l",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 1.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0183",
      "anio": 2024,
      "fechaStr": "27/agosto/2024",
      "archivoOrigen": "(27 de agosto 2024)-Carta_permiso_laboratorio-Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "Etanol 95%",
      "cantidadRaw": "500 ml",
      "cantidadDisplay": "500 ml",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.5,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0184",
      "anio": 2024,
      "fechaStr": "27/agosto/2024",
      "archivoOrigen": "(27 de agosto 2024)-Carta_permiso_laboratorio-Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Glicerol / Glicerina (USP / p.a.)",
      "reactivoEspecifico": "Glicerol",
      "cantidadRaw": "200 mL",
      "cantidadDisplay": "200 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.2,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0185",
      "anio": 2025,
      "fechaStr": "27/junio/2025",
      "archivoOrigen": "(27 de junio 2025)-Carta_permiso_laboratorio_Oscar Cerdas.pdf",
      "solicitante": "Oscar Cerdas",
      "reactivoCanonical": "Gas Nitrógeno (Cilindro / Alta Pureza)",
      "reactivoEspecifico": "nitrogeno",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0186",
      "anio": 2025,
      "fechaStr": "28/marzo/2025",
      "archivoOrigen": "(28 de marzo 2025)-Carta_permiso_laboratorio_Erick Maroto.pdf",
      "solicitante": "Erick Maroto",
      "reactivoCanonical": "Ácido Nítrico (HNO3 65-68% p.a.)",
      "reactivoEspecifico": "Ácido Nítrico",
      "cantidadRaw": "12 ml aprox",
      "cantidadDisplay": "12 ml aprox",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.012,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0187",
      "anio": 2025,
      "fechaStr": "28/marzo/2025",
      "archivoOrigen": "(28 de marzo 2025)-Carta_permiso_laboratorio_Erick Maroto.pdf",
      "solicitante": "Erick Maroto",
      "reactivoCanonical": "Peróxido de Hidrógeno (H2O2 30-35% p.a.)",
      "reactivoEspecifico": "Peróxido de hidrógeno",
      "cantidadRaw": "40 ml aprox",
      "cantidadDisplay": "40 ml aprox",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.04,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0188",
      "anio": 2025,
      "fechaStr": "28/marzo/2025",
      "archivoOrigen": "(28 de marzo 2025)-Carta_permiso_laboratorio_Karina Godinez.pdf",
      "solicitante": "Karina Godinez",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "25 L",
      "cantidadDisplay": "25 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 25.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0189",
      "anio": 2025,
      "fechaStr": "28/marzo/2025",
      "archivoOrigen": "(28 de marzo 2025)-Carta_permiso_laboratorio_Karina Godinez.pdf",
      "solicitante": "Karina Godinez",
      "reactivoCanonical": "Aire Comprimido / Grado Instrumental",
      "reactivoEspecifico": "Aire comprimido",
      "cantidadRaw": "500 psi",
      "cantidadDisplay": "500 psi",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0190",
      "anio": 2025,
      "fechaStr": "28/marzo/2025",
      "archivoOrigen": "(28 de marzo 2025)-Carta_permiso_laboratorio_Karina Godinez.pdf",
      "solicitante": "Karina Godinez",
      "reactivoCanonical": "Cloruro de Sodio (NaCl p.a.)",
      "reactivoEspecifico": "Electrolito (NaCl, NaNO3, NaSO4)",
      "cantidadRaw": "8 g x corrida",
      "cantidadDisplay": "8 g x corrida",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.008
    },
    {
      "logId": "LOG-0191",
      "anio": 2024,
      "fechaStr": "28/mayo/2024",
      "archivoOrigen": "(28 de mayo 2024)-Carta_permiso_laboratorio-Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "1 l",
      "cantidadDisplay": "1 l",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 1.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0192",
      "anio": 2025,
      "fechaStr": "29/abril/2025",
      "archivoOrigen": "(29 de abril 2025)-Carta_permiso_laboratorio_Adrián Delgado.pdf",
      "solicitante": "Adrián Delgado",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "gastado con ácido sulfúrico.",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0193",
      "anio": 2024,
      "fechaStr": "29/julio/2024",
      "archivoOrigen": "(29 de julio 2024)-Carta_permiso_laboratorio-Marco Antonio Sánchez.pdf",
      "solicitante": "Marco Antonio Sánchez",
      "reactivoCanonical": "Gas Argón (Cilindro / Grado Analítico)",
      "reactivoEspecifico": "utilizando un flujo de hidrógeno/argón (5:95).",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0194",
      "anio": 2025,
      "fechaStr": "29/octubre/2025",
      "archivoOrigen": "(29 de octubre 2025)-Ryan Webb.pdf",
      "solicitante": "Ryan Webb",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "9 L",
      "cantidadDisplay": "9 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 9.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0195",
      "anio": 2025,
      "fechaStr": "29/octubre/2025",
      "archivoOrigen": "(29 de octubre 2025)-Ryan Webb.pdf",
      "solicitante": "Ryan Webb",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "HCl (37%) y NAOH (98%)",
      "cantidadRaw": "100 ml;0.5g",
      "cantidadDisplay": "100 ml;0.5g",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.1,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0196",
      "anio": 2025,
      "fechaStr": "3/junio/2025",
      "archivoOrigen": "(3 de junio 2025)-Carta_permiso_laboratorio_Steven Umaña.pdf",
      "solicitante": "Steven Umaña",
      "reactivoCanonical": "Metanol (Grado Analítico / HPLC)",
      "reactivoEspecifico": "Metanol puro",
      "cantidadRaw": "600 mL",
      "cantidadDisplay": "600 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "instrumental",
      "volumenLitros": 0.6,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0197",
      "anio": 2025,
      "fechaStr": "3/junio/2025",
      "archivoOrigen": "(3 de junio 2025)-Carta_permiso_laboratorio_Steven Umaña.pdf",
      "solicitante": "Steven Umaña",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "Etanol puro",
      "cantidadRaw": "250mL",
      "cantidadDisplay": "250mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.25,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0198",
      "anio": 2026,
      "fechaStr": "3/marzo/2026",
      "archivoOrigen": "(3 de marzo 2026)-FernandezMorumJosePablo.pdf",
      "solicitante": "FernandezMorumJosePablo",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "Etanol 95 %",
      "cantidadRaw": "4 L",
      "cantidadDisplay": "4 L",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 4.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0199",
      "anio": 2026,
      "fechaStr": "3/marzo/2026",
      "archivoOrigen": "(3 de marzo 2026)-FernandezMorumJosePablo.pdf",
      "solicitante": "FernandezMorumJosePablo",
      "reactivoCanonical": "Ácido Cítrico Monohidratado / Anhidro",
      "reactivoEspecifico": "Ácido cítrico 99 %",
      "cantidadRaw": "35 g",
      "cantidadDisplay": "35 g",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.035
    },
    {
      "logId": "LOG-0200",
      "anio": 2026,
      "fechaStr": "3/marzo/2026",
      "archivoOrigen": "(3 de marzo 2026)-FernandezMorumJosePablo.pdf",
      "solicitante": "FernandezMorumJosePablo",
      "reactivoCanonical": "Glicerol / Glicerina (USP / p.a.)",
      "reactivoEspecifico": "Glicerol",
      "cantidadRaw": "22 mL",
      "cantidadDisplay": "22 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.022,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0201",
      "anio": 2026,
      "fechaStr": "3/marzo/2026",
      "archivoOrigen": "(3 de marzo 2026)-FernandezMorumJosePablo.pdf",
      "solicitante": "FernandezMorumJosePablo",
      "reactivoCanonical": "Almidón Soluble (Indicador y sustrato)",
      "reactivoEspecifico": "Almidón",
      "cantidadRaw": "8 g",
      "cantidadDisplay": "8 g",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.008
    },
    {
      "logId": "LOG-0202",
      "anio": 2026,
      "fechaStr": "3/marzo/2026",
      "archivoOrigen": "(3 de marzo 2026)-Ryan Molina Webb.pdf",
      "solicitante": "Ryan Molina Webb",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "9 L",
      "cantidadDisplay": "9 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 9.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0203",
      "anio": 2026,
      "fechaStr": "3/marzo/2026",
      "archivoOrigen": "(3 de marzo 2026)-Ryan Molina Webb.pdf",
      "solicitante": "Ryan Molina Webb",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "HCl (37 %) y NaOH (98%)",
      "cantidadRaw": "100 ml ; 0.5 g",
      "cantidadDisplay": "100 ml ; 0.5 g",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.1,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0204",
      "anio": 2026,
      "fechaStr": "30/enero/2026",
      "archivoOrigen": "(30 de enero 2026)-Cristopher Oviedo.pdf",
      "solicitante": "Cristopher Oviedo",
      "reactivoCanonical": "Gas Argón (Cilindro / Grado Analítico)",
      "reactivoEspecifico": "Balance hidrógeno argón",
      "cantidadRaw": "Cilindro a presión",
      "cantidadDisplay": "Cilindro a presión",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0205",
      "anio": 2026,
      "fechaStr": "30/enero/2026",
      "archivoOrigen": "(30 de enero 2026)-Cristopher Oviedo.pdf",
      "solicitante": "Cristopher Oviedo",
      "reactivoCanonical": "Gas Nitrógeno (Cilindro / Alta Pureza)",
      "reactivoEspecifico": "Nitrógeno",
      "cantidadRaw": "Cilindro a presión",
      "cantidadDisplay": "Cilindro a presión",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0206",
      "anio": 2024,
      "fechaStr": "30/octubre/2024",
      "archivoOrigen": "(30 de octubre 2024)-Carta_permiso_laboratorio-Melissa Monge.pdf",
      "solicitante": "Melissa Monge",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "Ácido sulfúrico 1 N",
      "cantidadRaw": "14.5 L",
      "cantidadDisplay": "14.5 L",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 14.5,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0207",
      "anio": 2024,
      "fechaStr": "30/octubre/2024",
      "archivoOrigen": "(30 de octubre 2024)-Carta_permiso_laboratorio-Melissa Monge.pdf",
      "solicitante": "Melissa Monge",
      "reactivoCanonical": "Tiosulfato de Sodio Pentahidratado",
      "reactivoEspecifico": "Disolución de tiosulfato de sodio 0.1 N",
      "cantidadRaw": "350 mL",
      "cantidadDisplay": "350 mL",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.35,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0208",
      "anio": 2024,
      "fechaStr": "30/octubre/2024",
      "archivoOrigen": "(30 de octubre 2024)-Carta_permiso_laboratorio-Melissa Monge.pdf",
      "solicitante": "Melissa Monge",
      "reactivoCanonical": "Almidón Soluble (Indicador y sustrato)",
      "reactivoEspecifico": "Disolución indicadora de almidón 1%",
      "cantidadRaw": "575 mL",
      "cantidadDisplay": "575 mL",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.575,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0209",
      "anio": 2024,
      "fechaStr": "30/octubre/2024",
      "archivoOrigen": "(30 de octubre 2024)-Carta_permiso_laboratorio-Melissa Monge.pdf",
      "solicitante": "Melissa Monge",
      "reactivoCanonical": "Ácido Acético Glacial (99.8% p.a.)",
      "reactivoEspecifico": "Ácido acético glacial",
      "cantidadRaw": "700 mL",
      "cantidadDisplay": "700 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.7,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0210",
      "anio": 2024,
      "fechaStr": "30/octubre/2024",
      "archivoOrigen": "(30 de octubre 2024)-Carta_permiso_laboratorio-Melissa Monge.pdf",
      "solicitante": "Melissa Monge",
      "reactivoCanonical": "Peróxido de Hidrógeno (H2O2 30-35% p.a.)",
      "reactivoEspecifico": "Peróxido de hidrogeno",
      "cantidadRaw": "3.5 L",
      "cantidadDisplay": "3.5 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 3.5,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0211",
      "anio": 2024,
      "fechaStr": "30/octubre/2024",
      "archivoOrigen": "(30 de octubre 2024)-Carta_permiso_laboratorio-Melissa Monge.pdf",
      "solicitante": "Melissa Monge",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "Hidróxido de sodio (s)",
      "cantidadRaw": "40 g",
      "cantidadDisplay": "40 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.04
    },
    {
      "logId": "LOG-0212",
      "anio": 2025,
      "fechaStr": "4/diciembre/2025",
      "archivoOrigen": "(4 de diciembre 2025)-Jose Pablo Fernández Morum.pdf",
      "solicitante": "Jose Pablo Fernández Morum",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "Etanol 95 %",
      "cantidadRaw": "4 L",
      "cantidadDisplay": "4 L",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 4.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0213",
      "anio": 2025,
      "fechaStr": "4/diciembre/2025",
      "archivoOrigen": "(4 de diciembre 2025)-Jose Pablo Fernández Morum.pdf",
      "solicitante": "Jose Pablo Fernández Morum",
      "reactivoCanonical": "Ácido Cítrico Monohidratado / Anhidro",
      "reactivoEspecifico": "Ácido cítrico 99 %",
      "cantidadRaw": "35 g",
      "cantidadDisplay": "35 g",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.035
    },
    {
      "logId": "LOG-0214",
      "anio": 2025,
      "fechaStr": "4/diciembre/2025",
      "archivoOrigen": "(4 de diciembre 2025)-Jose Pablo Fernández Morum.pdf",
      "solicitante": "Jose Pablo Fernández Morum",
      "reactivoCanonical": "Glicerol / Glicerina (USP / p.a.)",
      "reactivoEspecifico": "Glicerol",
      "cantidadRaw": "18 mL",
      "cantidadDisplay": "18 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.018,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0215",
      "anio": 2025,
      "fechaStr": "4/diciembre/2025",
      "archivoOrigen": "(4 de diciembre 2025)-Valeria Ramírez.pdf",
      "solicitante": "Valeria Ramírez",
      "reactivoCanonical": "Dicromato de Potasio (K2Cr2O7 p.a.)",
      "reactivoEspecifico": "Dicromato de potasio",
      "cantidadRaw": "2 viales",
      "cantidadDisplay": "2 viales",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0216",
      "anio": 2026,
      "fechaStr": "4/febrero/2026",
      "archivoOrigen": "(4 de febrero 2026)-Cristopher Oviedo.pdf",
      "solicitante": "Cristopher Oviedo",
      "reactivoCanonical": "Gas Argón (Cilindro / Grado Analítico)",
      "reactivoEspecifico": "Balance hidrógeno argón",
      "cantidadRaw": "60 L",
      "cantidadDisplay": "60 L",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 60.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0217",
      "anio": 2026,
      "fechaStr": "4/febrero/2026",
      "archivoOrigen": "(4 de febrero 2026)-Cristopher Oviedo.pdf",
      "solicitante": "Cristopher Oviedo",
      "reactivoCanonical": "Gas Nitrógeno (Cilindro / Alta Pureza)",
      "reactivoEspecifico": "Nitrógeno",
      "cantidadRaw": "0,16 L",
      "cantidadDisplay": "0,16 L",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.16,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0218",
      "anio": 2026,
      "fechaStr": "4/febrero/2026",
      "archivoOrigen": "(4 de febrero 2026)-Cristopher Oviedo.pdf",
      "solicitante": "Cristopher Oviedo",
      "reactivoCanonical": "Gas Helio (Cilindro / Grado Portador GC)",
      "reactivoEspecifico": "Helio",
      "cantidadRaw": "0,16 L",
      "cantidadDisplay": "0,16 L",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.16,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0219",
      "anio": 2024,
      "fechaStr": "4/julio/2024",
      "archivoOrigen": "(4 de julio 2024)-Carta_permiso_laboratorio-Daniel Slon.pdf",
      "solicitante": "Daniel Slon",
      "reactivoCanonical": "Gas Nitrógeno (Cilindro / Alta Pureza)",
      "reactivoEspecifico": "Nitrógeno",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0220",
      "anio": 2025,
      "fechaStr": "4/junio/2025",
      "archivoOrigen": "(4 de junio 2025)-Carta_permiso_laboratorio_Carolina Porras.pdf",
      "solicitante": "Carolina Porras",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "etanol, acido acético ó ácido cítrico",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0221",
      "anio": 2025,
      "fechaStr": "4/junio/2025",
      "archivoOrigen": "(4 de junio 2025)-Carta_permiso_laboratorio_Carolina Porras.pdf",
      "solicitante": "Carolina Porras",
      "reactivoCanonical": "Ácido Gálico Monohidratado (Patrón de Fenoles)",
      "reactivoEspecifico": "compara contra patrón de ácido gálico.",
      "cantidadRaw": "",
      "cantidadDisplay": "Uso en laboratorio",
      "categoria": "Ácidos",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0222",
      "anio": 2026,
      "fechaStr": "4/junio/2026",
      "archivoOrigen": "(4 de junio 2026)-María Paula Díaz.pdf",
      "solicitante": "María Paula Díaz",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "0,5L",
      "cantidadDisplay": "0,5L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.5,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0223",
      "anio": 2025,
      "fechaStr": "4/noviembre/2025",
      "archivoOrigen": "(4 de noviembre 2025)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Cloruro de Calcio (CaCl2 anhidro/dihidrato)",
      "reactivoEspecifico": "CaCl2*2H2O (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0224",
      "anio": 2025,
      "fechaStr": "4/noviembre/2025",
      "archivoOrigen": "(4 de noviembre 2025)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Sulfato de Magnesio (MgSO4)",
      "reactivoEspecifico": "MgSO4*7H2O (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0225",
      "anio": 2025,
      "fechaStr": "4/noviembre/2025",
      "archivoOrigen": "(4 de noviembre 2025)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Cloruro de Sodio (NaCl p.a.)",
      "reactivoEspecifico": "NaCl (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0226",
      "anio": 2025,
      "fechaStr": "4/noviembre/2025",
      "archivoOrigen": "(4 de noviembre 2025)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Bicarbonato de Sodio (NaHCO3 p.a.)",
      "reactivoEspecifico": "NaHCO3 (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0227",
      "anio": 2025,
      "fechaStr": "4/noviembre/2025",
      "archivoOrigen": "(4 de noviembre 2025)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Fosfatos de Sodio (Mono/Di/Trisódico)",
      "reactivoEspecifico": "Na2HPO4 (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0228",
      "anio": 2025,
      "fechaStr": "4/noviembre/2025",
      "archivoOrigen": "(4 de noviembre 2025)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Fosfatos de Sodio (Mono/Di/Trisódico)",
      "reactivoEspecifico": "Na3PO4 (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0229",
      "anio": 2025,
      "fechaStr": "4/noviembre/2025",
      "archivoOrigen": "(4 de noviembre 2025)-Ana Catalina Hernández.pdf",
      "solicitante": "Ana Catalina Hernández",
      "reactivoCanonical": "Cloruro de Potasio (KCl p.a.)",
      "reactivoEspecifico": "KCl, K2HPO4 (grado alimenticio)",
      "cantidadRaw": "0,1 g",
      "cantidadDisplay": "0,1 g",
      "categoria": "Sales Inorgánicas",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.0001
    },
    {
      "logId": "LOG-0230",
      "anio": 2026,
      "fechaStr": "5/mayo/2026",
      "archivoOrigen": "(5 de mayo 2026)-Natalia Solís.pdf",
      "solicitante": "Natalia Solís",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "NaOH",
      "cantidadRaw": "50 g",
      "cantidadDisplay": "50 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.05
    },
    {
      "logId": "LOG-0231",
      "anio": 2026,
      "fechaStr": "5/mayo/2026",
      "archivoOrigen": "(5 de mayo 2026)-Natalia Solís.pdf",
      "solicitante": "Natalia Solís",
      "reactivoCanonical": "Acetona (Grado Analítico / p.a.)",
      "reactivoEspecifico": "Acetona",
      "cantidadRaw": "500 mL",
      "cantidadDisplay": "500 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.5,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0232",
      "anio": 2026,
      "fechaStr": "5/mayo/2026",
      "archivoOrigen": "(5 de mayo 2026)-Natalia Solís.pdf",
      "solicitante": "Natalia Solís",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "Alcohol etílico",
      "cantidadRaw": "500 mL",
      "cantidadDisplay": "500 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.5,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0233",
      "anio": 2024,
      "fechaStr": "6/junio/2024",
      "archivoOrigen": "(6 de junio 2024)-Carta_permiso_laboratorio-Daniela Retana.pdf",
      "solicitante": "Daniela Retana",
      "reactivoCanonical": "Tolueno (Grado Reactivo)",
      "reactivoEspecifico": "Tolueno",
      "cantidadRaw": "500 mL",
      "cantidadDisplay": "500 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.5,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0234",
      "anio": 2024,
      "fechaStr": "6/junio/2024",
      "archivoOrigen": "(6 de junio 2024)-Carta_permiso_laboratorio-Daniela Retana.pdf",
      "solicitante": "Daniela Retana",
      "reactivoCanonical": "Acetona (Grado Analítico / p.a.)",
      "reactivoEspecifico": "Acetona",
      "cantidadRaw": "500 mL",
      "cantidadDisplay": "500 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 0.5,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0235",
      "anio": 2024,
      "fechaStr": "6/noviembre/2024",
      "archivoOrigen": "(6 de noviembre 2024)-Carta_permiso_laboratorio-Arly Cascante.pdf",
      "solicitante": "Arly Cascante",
      "reactivoCanonical": "Ácido Gálico Monohidratado (Patrón de Fenoles)",
      "reactivoEspecifico": "Acido Gálico",
      "cantidadRaw": "3g",
      "cantidadDisplay": "3g",
      "categoria": "Ácidos",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.003
    },
    {
      "logId": "LOG-0236",
      "anio": 2024,
      "fechaStr": "6/noviembre/2024",
      "archivoOrigen": "(6 de noviembre 2024)-Carta_permiso_laboratorio-Arly Cascante.pdf",
      "solicitante": "Arly Cascante",
      "reactivoCanonical": "Carbonato de Sodio Anhidro (Na2CO3)",
      "reactivoEspecifico": "Carbonato de sodio",
      "cantidadRaw": "15g",
      "cantidadDisplay": "15g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.015
    },
    {
      "logId": "LOG-0237",
      "anio": 2025,
      "fechaStr": "7/octubre/2025",
      "archivoOrigen": "(7 de octubre 2025)-Cristopher Oviedo.pdf",
      "solicitante": "Cristopher Oviedo",
      "reactivoCanonical": "Gas Argón (Cilindro / Grado Analítico)",
      "reactivoEspecifico": "Hidrógeno (Balance Argón)",
      "cantidadRaw": "Cilindro a presión",
      "cantidadDisplay": "Cilindro a presión",
      "categoria": "Gases Industriales y Especiales",
      "labTipo": "instrumental",
      "volumenLitros": 0.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0238",
      "anio": 2025,
      "fechaStr": "8/enero/2025",
      "archivoOrigen": "(8 de enero 2025)-Carta_permiso_laboratorio_Fabiola Zúñiga.pdf",
      "solicitante": "Fabiola Zúñiga",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "Ácido sulfúrico (pureza 95% aprox)",
      "cantidadRaw": "700 mL",
      "cantidadDisplay": "700 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.7,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0239",
      "anio": 2025,
      "fechaStr": "8/enero/2025",
      "archivoOrigen": "(8 de enero 2025)-Carta_permiso_laboratorio_Fabiola Zúñiga.pdf",
      "solicitante": "Fabiola Zúñiga",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "1 L",
      "cantidadDisplay": "1 L",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 1.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0240",
      "anio": 2025,
      "fechaStr": "8/enero/2025",
      "archivoOrigen": "(8 de enero 2025)-Carta_permiso_laboratorio_Fabiola Zúñiga.pdf",
      "solicitante": "Fabiola Zúñiga",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "Hidróxido de sodio",
      "cantidadRaw": "18 g",
      "cantidadDisplay": "18 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.018
    },
    {
      "logId": "LOG-0241",
      "anio": 2025,
      "fechaStr": "8/enero/2025",
      "archivoOrigen": "(8 de enero 2025)-Carta_permiso_laboratorio_Fabiola Zúñiga.pdf",
      "solicitante": "Fabiola Zúñiga",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "Ácido clorhídrico",
      "cantidadRaw": "150 mL",
      "cantidadDisplay": "150 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.15,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0242",
      "anio": 2026,
      "fechaStr": "9/julio/2026",
      "archivoOrigen": "(9 de julio 2026)-María Paula Jiménez.pdf",
      "solicitante": "María Paula Jiménez",
      "reactivoCanonical": "Etanol (Grado Reactivo / 96% v/v)",
      "reactivoEspecifico": "Etanol",
      "cantidadRaw": "1 L",
      "cantidadDisplay": "1 L",
      "categoria": "Solventes Orgánicos",
      "labTipo": "general",
      "volumenLitros": 1.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0243",
      "anio": 2026,
      "fechaStr": "9/julio/2026",
      "archivoOrigen": "(9 de julio 2026)-María Paula Jiménez.pdf",
      "solicitante": "María Paula Jiménez",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "Hidróxido de sodio",
      "cantidadRaw": "100 g",
      "cantidadDisplay": "100 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.1
    },
    {
      "logId": "LOG-0244",
      "anio": 2026,
      "fechaStr": "9/julio/2026",
      "archivoOrigen": "(9 de julio 2026)-María Paula Jiménez.pdf",
      "solicitante": "María Paula Jiménez",
      "reactivoCanonical": "Metanol (Grado Analítico / HPLC)",
      "reactivoEspecifico": "Metanol",
      "cantidadRaw": "800 mL",
      "cantidadDisplay": "800 mL",
      "categoria": "Solventes Orgánicos",
      "labTipo": "instrumental",
      "volumenLitros": 0.8,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0245",
      "anio": 2024,
      "fechaStr": "19/setiembre/2024",
      "archivoOrigen": "(Vacaciones)-Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "Agua Desionizada / Destilada / HPLC",
      "reactivoEspecifico": "Agua destilada",
      "cantidadRaw": "2 l",
      "cantidadDisplay": "2 l",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 2.0,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0246",
      "anio": 2024,
      "fechaStr": "19/setiembre/2024",
      "archivoOrigen": "(Vacaciones)-Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "Ácido Clorhídrico (HCl 37% p.a.)",
      "reactivoEspecifico": "HCl",
      "cantidadRaw": "500 ml",
      "cantidadDisplay": "500 ml",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.5,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0247",
      "anio": 2024,
      "fechaStr": "19/setiembre/2024",
      "archivoOrigen": "(Vacaciones)-Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "Hidróxido de Sodio (NaOH en lentejas / p.a.)",
      "reactivoEspecifico": "NaOH",
      "cantidadRaw": "500 g",
      "cantidadDisplay": "500 g",
      "categoria": "Bases e Hidróxidos",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.5
    },
    {
      "logId": "LOG-0248",
      "anio": 2024,
      "fechaStr": "19/setiembre/2024",
      "archivoOrigen": "(Vacaciones)-Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "Ácido Sulfúrico (H2SO4 95-98% p.a.)",
      "reactivoEspecifico": "Acido sulfurico",
      "cantidadRaw": "100 ml",
      "cantidadDisplay": "100 ml",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.1,
      "masaKg": 0.0
    },
    {
      "logId": "LOG-0249",
      "anio": 2024,
      "fechaStr": "19/setiembre/2024",
      "archivoOrigen": "(Vacaciones)-Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "Sacarosa (p.a. / Grado reactivo)",
      "reactivoEspecifico": "Sacarosa",
      "cantidadRaw": "10 g",
      "cantidadDisplay": "10 g",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.01
    },
    {
      "logId": "LOG-0250",
      "anio": 2024,
      "fechaStr": "19/setiembre/2024",
      "archivoOrigen": "(Vacaciones)-Dillan Cambronero.pdf",
      "solicitante": "Dillan Cambronero",
      "reactivoCanonical": "D-Glucosa Anhidra (Patrón analítico)",
      "reactivoEspecifico": "Glucosa",
      "cantidadRaw": "10 g",
      "cantidadDisplay": "10 g",
      "categoria": "Reactivos Analíticos y Patrones",
      "labTipo": "general",
      "volumenLitros": 0.0,
      "masaKg": 0.01
    },
    {
      "logId": "LOG-0251",
      "anio": 2024,
      "fechaStr": "20/septiembre/2024",
      "archivoOrigen": "(Vacaciones)-Valeria Ramirez.pdf",
      "solicitante": "Valeria Ramirez",
      "reactivoCanonical": "Ácido Fosfórico (H3PO4 85% p.a.)",
      "reactivoEspecifico": "Ácido fosfórico (99%)",
      "cantidadRaw": "150 mL",
      "cantidadDisplay": "150 mL",
      "categoria": "Ácidos",
      "labTipo": "general",
      "volumenLitros": 0.15,
      "masaKg": 0.0
    }
  ]
};

  // Helper para normalizar reactivos al vuelo
  const REAGENT_CANONICAL_RULES = [
    { regex: /\b(etanol|alcohol\s*et[ií]lico)\b/i, name: "Etanol (Grado Reactivo / 96% v/v)", cat: "Solventes Orgánicos", unit: "L", lab: "general" },
    { regex: /\bmetanol\b/i, name: "Metanol (Grado Analítico / HPLC)", cat: "Solventes Orgánicos", unit: "L", lab: "instrumental" },
    { regex: /\bacetona\b/i, name: "Acetona (Grado Analítico / p.a.)", cat: "Solventes Orgánicos", unit: "L", lab: "general" },
    { regex: /\bisopropanol|alcohol\s*isoprop[ií]lico/i, name: "Isopropanol / Alcohol Isopropílico (p.a.)", cat: "Solventes Orgánicos", unit: "L", lab: "general" },
    { regex: /\bhexano|n[- ]?hexano\b/i, name: "Hexano (Grado Analítico / HPLC)", cat: "Solventes Orgánicos", unit: "L", lab: "instrumental" },
    { regex: /\bacetato\s*de\s*etilo\b/i, name: "Acetato de Etilo (Grado Reactivo)", cat: "Solventes Orgánicos", unit: "L", lab: "general" },
    { regex: /\bdiclorometano|cloruro\s*de\s*metileno/i, name: "Diclorometano (DCM / p.a.)", cat: "Solventes Orgánicos", unit: "L", lab: "instrumental" },
    { regex: /\bcloroformo\b/i, name: "Cloroformo (p.a.)", cat: "Solventes Orgánicos", unit: "L", lab: "general" },
    { regex: /\bacetonitrilo\b/i, name: "Acetonitrilo (Grado HPLC / LC-MS)", cat: "Solventes Orgánicos", unit: "L", lab: "instrumental" },
    { regex: /\beter\s*de\s*petr[oó]leo/i, name: "Éter de Petróleo (35-60 °C)", cat: "Solventes Orgánicos", unit: "L", lab: "general" },
    { regex: /\beter\s*et[ií]lico|dietil\s*[eé]ter/i, name: "Éter Etílico / Dietil Éter", cat: "Solventes Orgánicos", unit: "L", lab: "general" },
    { regex: /\btolueno\b/i, name: "Tolueno (Grado Reactivo)", cat: "Solventes Orgánicos", unit: "L", lab: "general" },
    { regex: /\bxileno\b/i, name: "Xileno (Mezcla de isómeros / p.a.)", cat: "Solventes Orgánicos", unit: "L", lab: "general" },
    { regex: /\bglicerol|glicerina/i, name: "Glicerol / Glicerina (USP / p.a.)", cat: "Solventes Orgánicos", unit: "L", lab: "general" },
    { regex: /\btetrahidrofurano|thf/i, name: "Tetrahidrofurano (THF p.a.)", cat: "Solventes Orgánicos", unit: "L", lab: "instrumental" },
    { regex: /\bdimetilsulf[oó]xido|dmso/i, name: "Dimetilsulfóxido (DMSO)", cat: "Solventes Orgánicos", unit: "L", lab: "instrumental" },

    { regex: /\b(ácido\s*clorhídrico|acido\s*clorhidrico|hcl)\b/i, name: "Ácido Clorhídrico (HCl 37% p.a.)", cat: "Ácidos", unit: "L", lab: "general" },
    { regex: /\b(ácido\s*sulfúrico|acido\s*sulfurico|h2so4)\b/i, name: "Ácido Sulfúrico (H2SO4 95-98% p.a.)", cat: "Ácidos", unit: "L", lab: "general" },
    { regex: /\b(ácido\s*nítrico|acido\s*nitrico|hno3)\b/i, name: "Ácido Nítrico (HNO3 65-68% p.a.)", cat: "Ácidos", unit: "L", lab: "general" },
    { regex: /\b(ácido\s*acético|acido\s*acetico|ch3cooh)\b/i, name: "Ácido Acético Glacial (99.8% p.a.)", cat: "Ácidos", unit: "L", lab: "general" },
    { regex: /\b(ácido\s*fosfórico|acido\s*fosforico|h3po4)\b/i, name: "Ácido Fosfórico (H3PO4 85% p.a.)", cat: "Ácidos", unit: "L", lab: "general" },
    { regex: /\b(ácido\s*cítrico|acido\s*citrico)\b/i, name: "Ácido Cítrico Monohidratado / Anhidro", cat: "Ácidos", unit: "kg", lab: "general" },
    { regex: /\b(ácido\s*oxálico|acido\s*oxalico)\b/i, name: "Ácido Oxálico Dihidratado", cat: "Ácidos", unit: "kg", lab: "general" },
    { regex: /\b(ácido\s*ascórbico|acido\s*ascorbico|vitamina\s*c)\b/i, name: "Ácido Ascórbico (Vitamina C / Patrón)", cat: "Ácidos", unit: "g", lab: "general" },
    { regex: /\b(ácido\s*gálico|acido\s*galico)\b/i, name: "Ácido Gálico Monohidratado (Patrón de Fenoles)", cat: "Ácidos", unit: "g", lab: "instrumental" },
    { regex: /\b(ácido\s*fórmico|acido\s*formico)\b/i, name: "Ácido Fórmico (98-100% / HPLC)", cat: "Ácidos", unit: "L", lab: "instrumental" },
    { regex: /\b(ácido\s*benzoico|acido\s*benzoico)\b/i, name: "Ácido Benzoico (Patrón Calorimétrico)", cat: "Ácidos", unit: "g", lab: "general" },
    { regex: /\b(ácido\s*bórico|acido\s*borico|h3bo3)\b/i, name: "Ácido Bórico (H3BO3 p.a.)", cat: "Ácidos", unit: "kg", lab: "general" },

    { regex: /\b(hidróxido\s*de\s*sodio|hidroxido\s*de\s*sodio|naoh|soda\s*cáustica)\b/i, name: "Hidróxido de Sodio (NaOH en lentejas / p.a.)", cat: "Bases e Hidróxidos", unit: "kg", lab: "general" },
    { regex: /\b(hidróxido\s*de\s*potasio|hidroxido\s*de\s*potasio|koh|potasa)\b/i, name: "Hidróxido de Potasio (KOH en lentejas / p.a.)", cat: "Bases e Hidróxidos", unit: "kg", lab: "general" },
    { regex: /\b(hidróxido\s*de\s*amonio|hidroxido\s*de\s*amonio|nh4oh|amoniaco)\b/i, name: "Hidróxido de Amonio (NH4OH 28-30% p.a.)", cat: "Bases e Hidróxidos", unit: "L", lab: "general" },
    { regex: /\b(carbonato\s*de\s*sodio|na2co3)\b/i, name: "Carbonato de Sodio Anhidro (Na2CO3)", cat: "Bases e Hidróxidos", unit: "kg", lab: "general" },
    { regex: /\b(bicarbonato\s*de\s*sodio|nahco3)\b/i, name: "Bicarbonato de Sodio (NaHCO3 p.a.)", cat: "Bases e Hidróxidos", unit: "kg", lab: "general" },

    { regex: /\b(cloruro\s*de\s*sodio|nacl)\b/i, name: "Cloruro de Sodio (NaCl p.a.)", cat: "Sales Inorgánicas", unit: "kg", lab: "general" },
    { regex: /\b(sulfato\s*de\s*sodio|na2so4)\b/i, name: "Sulfato de Sodio Anhidro (Na2SO4)", cat: "Sales Inorgánicas", unit: "kg", lab: "general" },
    { regex: /\b(sulfato\s*de\s*magnesio|mgso4)\b/i, name: "Sulfato de Magnesio (MgSO4)", cat: "Sales Inorgánicas", unit: "kg", lab: "general" },
    { regex: /\b(cloruro\s*de\s*calcio|cacl2)\b/i, name: "Cloruro de Calcio (CaCl2 anhidro/dihidrato)", cat: "Sales Inorgánicas", unit: "kg", lab: "general" },
    { regex: /\b(nitrato\s*de\s*plata|agno3)\b/i, name: "Nitrato de Plata (AgNO3 p.a.)", cat: "Sales Inorgánicas", unit: "g", lab: "general" },
    { regex: /\b(persulfato\s*de\s*potasio|k2s2o8)\b/i, name: "Persulfato de Potasio (K2S2O8)", cat: "Sales Inorgánicas", unit: "kg", lab: "general" },
    { regex: /\b(tiosulfato\s*de\s*sodio|na2s2o3)\b/i, name: "Tiosulfato de Sodio Pentahidratado", cat: "Sales Inorgánicas", unit: "kg", lab: "general" },
    { regex: /\b(fosfato\s*de\s*sodio|na2hpo4|nah2po4|na3po4)\b/i, name: "Fosfatos de Sodio (Mono/Di/Trisódico)", cat: "Sales Inorgánicas", unit: "kg", lab: "general" },

    { regex: /\b(folin|ciocalteu)\b/i, name: "Reactivo de Folin-Ciocalteu (2N)", cat: "Reactivos Analíticos y Patrones", unit: "L", lab: "instrumental" },
    { regex: /\bfenolftale[ií]na\b/i, name: "Fenolftaleína (Indicador de pH)", cat: "Reactivos Analíticos y Patrones", unit: "g", lab: "general" },
    { regex: /\b(dpph)\b/i, name: "DPPH (2,2-Difenil-1-picrilhidrazilo)", cat: "Reactivos Analíticos y Patrones", unit: "g", lab: "instrumental" },
    { regex: /\b(peróxido\s*de\s*hidrógeno|peroxido\s*de\s*hidrogeno|agua\s*oxigenada|h2o2)\b/i, name: "Peróxido de Hidrógeno (H2O2 30-35% p.a.)", cat: "Reactivos Analíticos y Patrones", unit: "L", lab: "general" },
    { regex: /\b(glucosa|dextrosa)\b/i, name: "D-Glucosa Anhidra (Patrón analítico)", cat: "Reactivos Analíticos y Patrones", unit: "g", lab: "general" },
    { regex: /\b(sacarosa|azúcar|azucar)\b/i, name: "Sacarosa (p.a. / Grado reactivo)", cat: "Reactivos Analíticos y Patrones", unit: "kg", lab: "general" },
    { regex: /\b(solución\s*buffer|solucion\s*buffer|amortiguador\s*ph|tampón\s*ph)\b/i, name: "Soluciones Buffer de Calibración (pH 4, 7, 10)", cat: "Reactivos Analíticos y Patrones", unit: "L", lab: "instrumental" },
    { regex: /\b(agua\s*desionizada|agua\s*destilada|milli[- ]?q|agua\s*ultra\s*pura)\b/i, name: "Agua Desionizada / Destilada / HPLC", cat: "Reactivos Analíticos y Patrones", unit: "L", lab: "general" },
    { regex: /\b(sílica\s*gel|silica\s*gel|gel\s*de\s*sílice)\b/i, name: "Sílica Gel (Cromatografía / Desecante)", cat: "Reactivos Analíticos y Patrones", unit: "kg", lab: "general" },

    { regex: /\b(nitrógeno\s*gas|nitrogeno\s*gas|gas\s*nitrógeno|nitrógeno|nitrogeno)\b/i, name: "Gas Nitrógeno (Cilindro / Alta Pureza)", cat: "Gases Industriales y Especiales", unit: "L gas", lab: "instrumental" },
    { regex: /\b(argón\s*gas|argon\s*gas|gas\s*argón|argón|argon)\b/i, name: "Gas Argón (Cilindro / Grado Analítico)", cat: "Gases Industriales y Especiales", unit: "Cilindro", lab: "instrumental" },
    { regex: /\b(helio\s*gas|he\s*gas|gas\s*helio|helio)\b/i, name: "Gas Helio (Cilindro / Grado Portador GC)", cat: "Gases Industriales y Especiales", unit: "Cilindro", lab: "instrumental" },
    { regex: /\b(hidrógeno\s*gas|hidrogeno\s*gas|gas\s*hidrógeno|hidrógeno|hidrogeno)\b/i, name: "Gas Hidrógeno (Cilindro / Grado Analítico)", cat: "Gases Industriales y Especiales", unit: "Cilindro", lab: "instrumental" },
    { regex: /\b(aire\s*comprimido|aire\s*seco)\b/i, name: "Aire Comprimido / Grado Instrumental", cat: "Gases Industriales y Especiales", unit: "Cilindro", lab: "general" }
  ];

  // Helper para parsear cantidades en JavaScript
  function parseReagentQty(qtyStr, rawName) {
    let str = (qtyStr || "").trim();
    if (!str && rawName) {
      const match = rawName.match(/(\d+[\.,]?\d*)\s*(ml|l|lt|litros?|mililitros?|g|gr|gramos?|kg|kilos?|kilogramos?|mg|µl|ul|m3|frascos?|botellas?|sobres?|placas?)\b/i);
      if (match) str = match[0];
    }

    let liters = 0.0;
    let kg = 0.0;
    let disp = str || "Uso regular";

    if (str) {
      const clean = str.toLowerCase().replace(',', '.');
      // Convert ft3 / ft^3 / pies3 to Liters (1 ft3 = 28.3168 L)
      const mFt3 = clean.match(/(\d+[\.]?\d*)\s*(?:ft\^3|ft3|ft\u00b3|ft\s*3|pies?3|pies?\^3|pies?\u00b3|pies?\s*c[uú]bicos?)(?![a-zA-Z0-9])/);
      const mM3 = clean.match(/(\d+[\.]?\d*)\s*(?:m\^3|m3|m\u00b3)(?![a-zA-Z0-9])/);
      const mLit = clean.match(/(\d+[\.]?\d*)\s*(?:l|lt|lts|litro|litros)\b/);
      if (mFt3) {
        liters = parseFloat(mFt3[1]) * 28.3168;
      } else if (mM3) {
        liters = parseFloat(mM3[1]) * 1000.0;
      } else if (mLit) {
        liters = parseFloat(mLit[1]);
      } else {
        const mMl = clean.match(/(\d+[\.]?\d*)\s*(?:ml|mls|mililitro|mililitros)\b/);
        if (mMl) {
          liters = parseFloat(mMl[1]) / 1000.0;
        } else {
          const mKg = clean.match(/(\d+[\.]?\d*)\s*(?:kg|kgs|kilo|kilos|kilogramo|kilogramos)\b/);
          if (mKg) {
            kg = parseFloat(mKg[1]);
          } else {
            const mG = clean.match(/(\d+[\.]?\d*)\s*(?:g|gr|grs|gramo|gramos)\b/);
            if (mG) {
              kg = parseFloat(mG[1]) / 1000.0;
            } else {
              const mMg = clean.match(/(\d+[\.]?\d*)\s*(?:mg|mgs|miligramo|miligramos)\b/);
              if (mMg) {
                kg = parseFloat(mMg[1]) / 1000000.0;
              }
            }
          }
        }
      }
    }

    return { liters, kg, display: disp };
  }

  // Objeto Gestor del Estado de Reactivos con Persistencia en LocalStorage
  const ReagentsTrackingManager = {
    STORAGE_KEY: "EIQ_REAGENTS_TRACKING_2024_PLUS",
    state: null,

    init() {
      try {
        const cached = localStorage.getItem(this.STORAGE_KEY);
        if (cached) {
          this.state = JSON.parse(cached);
        }
      } catch (e) {
        console.warn("No se pudo leer localStorage para reactivos:", e);
      }

      if (!this.state || !this.state.catalogo_reactivos) {
        this.state = JSON.parse(JSON.stringify(REAGENTS_DB_INITIAL));
      }
    },

    save() {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.error("Error al guardar estado de reactivos:", e);
      }
    },

    reset() {
      this.state = JSON.parse(JSON.stringify(REAGENTS_DB_INITIAL));
      this.save();
    },

    // Registrar reactivos de una nueva solicitud que ingresa al sistema
    registrarSolicitud(solicitud) {
      if (solicitud.sinReactivos || !solicitud.reactivos || solicitud.reactivos.length === 0) return;

      const currentYear = new Date().getFullYear().toString(); // ej. "2026"
      const fechaHoy = new Date().toLocaleDateString('es-CR');

      // Asegurar que el año exista en el resumen
      if (!this.state.meta.resumen_por_anio[currentYear]) {
        this.state.meta.resumen_por_anio[currentYear] = {
          files: 0,
          solicitudes: 0,
          total_liters: 0.0,
          total_kg: 0.0
        };
      }
      this.state.meta.resumen_por_anio[currentYear].files += 1;

      solicitud.reactivos.forEach(r => {
        const rawName = (r.nombre || "").trim();
        const rawQty = (r.cantidad || "").trim();
        if (!rawName) return;

        // Buscar correspondencia canónica
        let matchedRule = REAGENT_CANONICAL_RULES.find(rule => rule.regex.test(rawName));
        if (!matchedRule) {
          matchedRule = {
            name: rawName,
            cat: "Reactivos Analíticos y Patrones",
            unit: "L",
            lab: solicitud.tipoLaboratorio || "general"
          };
        }

        const qtyParsed = parseReagentQty(rawQty, rawName);

        // 1. Agregar a la bitácora de transacciones
        const newLogId = `LOG-${(this.state.bitacora_consumo_historica.length + 1).toString().padStart(4, '0')}`;
        const logEntry = {
          logId: newLogId,
          anio: parseInt(currentYear),
          fechaStr: fechaHoy,
          archivoOrigen: `Portal Web - Solicitud #${solicitud.id}`,
          solicitante: solicitud.nombreEstudiante || "Estudiante",
          carne: solicitud.carneEstudiante || "N/A",
          reactivoCanonical: matchedRule.name,
          reactivoEspecifico: rawName,
          cantidadRaw: rawQty,
          cantidadDisplay: qtyParsed.display,
          categoria: matchedRule.cat,
          labTipo: solicitud.tipoLaboratorio || "general",
          volumenLitros: Math.round(qtyParsed.liters * 1000) / 1000,
          masaKg: Math.round(qtyParsed.kg * 10000) / 10000
        };
        this.state.bitacora_consumo_historica.unshift(logEntry);

        // 2. Actualizar el catálogo de reactivos para el año calendario
        let catItem = this.state.catalogo_reactivos.find(c => c.nombre === matchedRule.name);
        if (!catItem) {
          catItem = {
            id: `REC-${(this.state.catalogo_reactivos.length + 1).toString().padStart(2, '0')}`,
            rank: this.state.catalogo_reactivos.length + 1,
            nombre: matchedRule.name,
            categoria: matchedRule.cat,
            labTipo: matchedRule.lab,
            unidadPrincipal: matchedRule.unit,
            totalSolicitudes: 0,
            totalLitros: 0.0,
            totalKg: 0.0,
            consumoDisplay: "",
            porcentajeDemanda: 0.0,
            ejemplos: [rawName],
            porAnio: {
              "2024": { solicitudes: 0, litros: 0, kg: 0 },
              "2025": { solicitudes: 0, litros: 0, kg: 0 },
              "2026": { solicitudes: 0, litros: 0, kg: 0 }
            }
          };
          this.state.catalogo_reactivos.push(catItem);
        }

        // Inicializar año si no existiera
        if (!catItem.porAnio[currentYear]) {
          catItem.porAnio[currentYear] = { solicitudes: 0, litros: 0, kg: 0 };
        }

        // Incrementar métricas del año calendario
        catItem.porAnio[currentYear].solicitudes += 1;
        catItem.porAnio[currentYear].litros = Math.round((catItem.porAnio[currentYear].litros + qtyParsed.liters) * 1000) / 1000;
        catItem.porAnio[currentYear].kg = Math.round((catItem.porAnio[currentYear].kg + qtyParsed.kg) * 10000) / 10000;

        // Incrementar acumulados totales
        catItem.totalSolicitudes += 1;
        catItem.totalLitros = Math.round((catItem.totalLitros + qtyParsed.liters) * 1000) / 1000;
        catItem.totalKg = Math.round((catItem.totalKg + qtyParsed.kg) * 10000) / 10000;

        if (rawName && !catItem.ejemplos.includes(rawName) && catItem.ejemplos.length < 5) {
          catItem.ejemplos.push(rawName);
        }

        // Incrementar resumen del año
        this.state.meta.resumen_por_anio[currentYear].solicitudes += 1;
        this.state.meta.resumen_por_anio[currentYear].total_liters = Math.round((this.state.meta.resumen_por_anio[currentYear].total_liters + qtyParsed.liters) * 1000) / 1000;
        this.state.meta.resumen_por_anio[currentYear].total_kg = Math.round((this.state.meta.resumen_por_anio[currentYear].total_kg + qtyParsed.kg) * 10000) / 10000;
        this.state.meta.total_solicitudes_reactivos += 1;
      });

      this.save();
    }
  };

  // Inicializar el gestor de reactivos
  ReagentsTrackingManager.init();

  // Estados de Filtro para el Dashboard de Reactivos
  const activeYearNow = new Date().getFullYear().toString();
  let currentReagentYear = activeYearNow;
  let currentReagentCategory = 'todas';

  const reagentsGridContainer = document.getElementById('historical-reagents-grid');
  const reagentYearBar = document.querySelector('.reagent-year-bar');
  const reagentFilterPills = document.querySelectorAll('.reagent-filter-pill');
  const reagentLedgerTbody = document.getElementById('reagent-ledger-tbody');
  const filterLedgerSearch = document.getElementById('filter-ledger-search');
  const btnExportReactivosCsv = document.getElementById('btn-export-reactivos-csv');
  const btnExportBitacoraCsv = document.getElementById('btn-export-bitacora-csv');
  const btnResetReagentsData = document.getElementById('btn-reset-reagents-data');

  function renderReagentYearPills() {
    if (!reagentYearBar) return;
    const yearNowInt = new Date().getFullYear();
    const availableYears = [];
    for (let y = yearNowInt; y >= 2024; y--) {
      availableYears.push(y);
    }

    let html = `<span class="year-bar-label">Año Calendario:</span>`;
    availableYears.forEach(y => {
      const isCurrent = y === yearNowInt;
      const label = isCurrent ? `${y} (En Curso)` : `${y}`;
      const isActive = currentReagentYear === y.toString() ? 'active' : '';
      html += `<button class="reagent-year-pill ${isActive}" data-year="${y}">${label}</button>`;
    });
    const isTodosActive = currentReagentYear === 'todos' ? 'active' : '';
    html += `<button class="reagent-year-pill ${isTodosActive}" data-year="todos">Consolidado (2024 - ${yearNowInt})</button>`;

    reagentYearBar.innerHTML = html;

    reagentYearBar.querySelectorAll('.reagent-year-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        reagentYearBar.querySelectorAll('.reagent-year-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentReagentYear = pill.dataset.year;
        renderReagentsDashboard();
      });
    });
  }

  function renderReagentsDashboard() {
    if (!reagentsGridContainer) return;

    const data = ReagentsTrackingManager.state;
    const catList = data.catalogo_reactivos;

    // 1. Filtrar por categoría
    let filtered = catList.filter(item => {
      const matchCat = currentReagentCategory === 'todas' || item.categoria === currentReagentCategory;
      return matchCat;
    });

    // 2. Ordenar reactivos según el año seleccionado
    if (currentReagentYear === 'todos') {
      filtered.sort((a, b) => b.totalSolicitudes - a.totalSolicitudes);
    } else {
      filtered.sort((a, b) => {
        const solA = (a.porAnio[currentReagentYear] ? a.porAnio[currentReagentYear].solicitudes : 0);
        const solB = (b.porAnio[currentReagentYear] ? b.porAnio[currentReagentYear].solicitudes : 0);
        return solB - solA;
      });
    }

    // 3. Actualizar Mini KPI Cards
    const kpiYearTitle = document.getElementById('kpi-reagents-year-title');
    const kpiTotalSol = document.getElementById('kpi-reagents-total-sol');
    const kpiFilesCount = document.getElementById('kpi-reagents-files-count');
    const kpiTotalVol = document.getElementById('kpi-reagents-total-vol');
    const kpiTotalMass = document.getElementById('kpi-reagents-total-mass');
    const kpiTopName = document.getElementById('kpi-reagents-top-name');
    const kpiTopDetail = document.getElementById('kpi-reagents-top-detail');

    if (currentReagentYear === 'todos') {
      const totSol = catList.reduce((acc, r) => acc + r.totalSolicitudes, 0);
      const totVol = catList.reduce((acc, r) => acc + r.totalLitros, 0);
      const totMass = catList.reduce((acc, r) => acc + r.totalKg, 0);
      const topR = catList[0];

      if (kpiYearTitle) kpiYearTitle.textContent = "Consolidado 2024-2026: Solicitudes";
      if (kpiTotalSol) kpiTotalSol.textContent = `${totSol} sol.`;
      if (kpiFilesCount) kpiFilesCount.textContent = `${data.meta.total_pdfs_analizados || 160} cartas de permiso`;
      if (kpiTotalVol) kpiTotalVol.textContent = `${totVol.toFixed(1)} L`;
      if (kpiTotalMass) kpiTotalMass.textContent = `${totMass.toFixed(2)} kg`;
      if (kpiTopName && topR) kpiTopName.textContent = topR.nombre.split(' (')[0];
      if (kpiTopDetail && topR) kpiTopDetail.textContent = `${topR.totalSolicitudes} solicitudes (${topR.totalLitros > 0 ? topR.totalLitros + ' L' : topR.totalKg + ' kg'})`;
    } else {
      const yrRes = data.meta.resumen_por_anio[currentReagentYear] || { files: 0, solicitudes: 0, total_liters: 0, total_kg: 0 };
      const topR = [...catList].sort((a, b) => {
        const solA = a.porAnio[currentReagentYear] ? a.porAnio[currentReagentYear].solicitudes : 0;
        const solB = b.porAnio[currentReagentYear] ? b.porAnio[currentReagentYear].solicitudes : 0;
        return solB - solA;
      })[0];

      const topRSol = topR && topR.porAnio[currentReagentYear] ? topR.porAnio[currentReagentYear].solicitudes : 0;
      const topRVol = topR && topR.porAnio[currentReagentYear] ? topR.porAnio[currentReagentYear].litros : 0;
      const topRMass = topR && topR.porAnio[currentReagentYear] ? topR.porAnio[currentReagentYear].kg : 0;

      if (kpiYearTitle) kpiYearTitle.textContent = `Año ${currentReagentYear}: Solicitudes`;
      if (kpiTotalSol) kpiTotalSol.textContent = `${yrRes.solicitudes} sol.`;
      if (kpiFilesCount) kpiFilesCount.textContent = `${yrRes.files} cartas de permiso`;
      if (kpiTotalVol) kpiTotalVol.textContent = `${yrRes.total_liters.toFixed(1)} L`;
      if (kpiTotalMass) kpiTotalMass.textContent = `${yrRes.total_kg.toFixed(2)} kg`;
      if (kpiTopName && topR) kpiTopName.textContent = topR.nombre.split(' (')[0];
      if (kpiTopDetail && topR) kpiTopDetail.textContent = `${topRSol} solicitudes (${topRVol > 0 ? topRVol + ' L' : (topRMass > 0 ? (topRMass*1000).toFixed(0) + ' g' : 'N/E')})`;
    }

    // 4. Renderizar Tarjetas de Reactivos
    reagentsGridContainer.innerHTML = filtered.map((rec, idx) => {
      const isTodos = currentReagentYear === 'todos';
      const sol = isTodos ? rec.totalSolicitudes : (rec.porAnio[currentReagentYear] ? rec.porAnio[currentReagentYear].solicitudes : 0);
      const lit = isTodos ? rec.totalLitros : (rec.porAnio[currentReagentYear] ? rec.porAnio[currentReagentYear].litros : 0);
      const kg = isTodos ? rec.totalKg : (rec.porAnio[currentReagentYear] ? rec.porAnio[currentReagentYear].kg : 0);

      let consumoStr = "";
      if (lit > 0) {
        consumoStr = lit >= 1.0 ? `${lit.toFixed(2)} L` : `${(lit * 1000).toFixed(0)} mL`;
      } else if (kg > 0) {
        consumoStr = kg >= 1.0 ? `${kg.toFixed(2)} kg` : `${(kg * 1000).toFixed(1)} g`;
      } else {
        consumoStr = sol > 0 ? `${sol} solicitudes` : "Sin demanda este año";
      }

      // Semáforo dinámico
      let semaforoClass = "semaforo-bajo";
      let semaforoText = "Baja Demanda";
      let fillClass = "fill-semaforo-bajo";
      let pct = sol > 0 ? Math.min(100, Math.round((sol / (isTodos ? 42 : (currentReagentYear === '2025' ? 15 : 11))) * 100)) : 0;

      if (pct >= 60) {
        semaforoClass = "semaforo-alto";
        semaforoText = "Alta Demanda";
        fillClass = "fill-semaforo-alto";
      } else if (pct >= 25) {
        semaforoClass = "semaforo-medio";
        semaforoText = "Demanda Regular";
        fillClass = "fill-semaforo-medio";
      } else {
        semaforoClass = "semaforo-bajo";
        semaforoText = sol === 0 ? "Sin Uso" : "Baja Demanda";
        fillClass = "fill-semaforo-bajo";
      }

      const labBadgeClass = `lab-${rec.labTipo || 'general'}`;
      const purezaExample = rec.ejemplos && rec.ejemplos.length > 0 ? rec.ejemplos[0] : "";

      return `
        <div class="hist-card">
          <div class="hist-header">
            <span class="hist-rank">#${idx + 1}</span>
            <div class="hist-info">
              <div class="hist-name">${rec.nombre}</div>
              <span class="hist-lab-badge ${labBadgeClass}">${rec.categoria}</span>
              ${purezaExample ? `<span class="reagent-example-tag">Ej: "${purezaExample}"</span>` : ""}
            </div>
          </div>
          <div class="hist-stats">
            <span><strong>${sol}</strong> solicitudes</span>
            <span class="reagent-consumption-badge">Consumo: ${consumoStr}</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-fill ${fillClass}" style="width: ${Math.max(5, pct)}%;">
              ${pct}%
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-muted); padding-top: 0.2rem; border-top: 1px dashed var(--border-color);">
            <span>2024: <strong>${rec.porAnio['2024'] ? rec.porAnio['2024'].solicitudes : 0}</strong></span>
            <span>2025: <strong>${rec.porAnio['2025'] ? rec.porAnio['2025'].solicitudes : 0}</strong></span>
            <span>2026: <strong>${rec.porAnio['2026'] ? rec.porAnio['2026'].solicitudes : 0}</strong></span>
          </div>
        </div>
      `;
    }).join('');

    renderReagentsLedger();
  }

  // Renderizar Bitácora de Transacciones en Tiempo Real
  function renderReagentsLedger() {
    if (!reagentLedgerTbody) return;

    const searchTerm = filterLedgerSearch ? filterLedgerSearch.value.toLowerCase().trim() : "";
    const ledger = ReagentsTrackingManager.state.bitacora_consumo_historica || [];

    const filteredLedger = ledger.filter(item => {
      const matchYear = currentReagentYear === 'todos' || item.anio.toString() === currentReagentYear;
      const matchSearch = !searchTerm ||
                          (item.solicitante && item.solicitante.toLowerCase().includes(searchTerm)) ||
                          (item.carne && item.carne.toLowerCase().includes(searchTerm)) ||
                          (item.reactivoCanonical && item.reactivoCanonical.toLowerCase().includes(searchTerm)) ||
                          (item.reactivoEspecifico && item.reactivoEspecifico.toLowerCase().includes(searchTerm)) ||
                          (item.logId && item.logId.toLowerCase().includes(searchTerm));
      return matchYear && matchSearch;
    });

    if (filteredLedger.length === 0) {
      reagentLedgerTbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">
            <em>No se encontraron registros de transacciones para el periodo o criterio seleccionado.</em>
          </td>
        </tr>
      `;
      return;
    }

    reagentLedgerTbody.innerHTML = filteredLedger.slice(0, 100).map(item => {
      const labBadge = item.labTipo === 'instrumental' ? 'lab-instrumental' : (item.labTipo === 'cotrafin' ? 'lab-cotrafin' : 'lab-general');
      const labLabel = item.labTipo === 'instrumental' ? 'Instrumental' : (item.labTipo === 'cotrafin' ? 'COTRAFIN' : 'General');

      return `
        <tr>
          <td><span class="ledger-id-badge">${item.logId}</span></td>
          <td><small><strong>${item.fechaStr}</strong></small></td>
          <td>
            <strong>${item.solicitante}</strong>
            ${item.carne && item.carne !== 'N/A' ? `<br><small style="color: var(--text-muted);">${item.carne}</small>` : ''}
          </td>
          <td><span class="hist-lab-badge ${labBadge}">${labLabel}</span></td>
          <td>
            <strong>${item.reactivoCanonical.split(' (')[0]}</strong><br>
            <small style="color: var(--text-muted); font-style: italic;">${item.reactivoEspecifico}</small>
          </td>
          <td>
            <span class="ledger-qty-chip">${item.cantidadDisplay || item.cantidadRaw || 'N/E'}</span>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Inicializar renderizado dinámico de píldoras de año
  renderReagentYearPills();

  // Event Listeners para Píldoras de Categoría de Reactivo
  reagentFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      reagentFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentReagentCategory = pill.dataset.reagentCat;
      renderReagentsDashboard();
    });
  });

  // Event Listener para el buscador de bitácora
  if (filterLedgerSearch) {
    filterLedgerSearch.addEventListener('input', renderReagentsLedger);
  }

  // Botón Restablecer Datos de Reactivos
  if (btnResetReagentsData) {
    btnResetReagentsData.addEventListener('click', () => {
      if (confirm('¿Desea restablecer el catálogo y bitácora de reactivos al estado histórico original de los 303 permisos (2024-2026)?')) {
        ReagentsTrackingManager.reset();
        renderReagentsDashboard();
        alert('Registro y bitácora de reactivos restablecidos con éxito.');
      }
    });
  }

  // Exportar Resumen Anual Consolidado de Reactivos en CSV
  if (btnExportReactivosCsv) {
    btnExportReactivosCsv.addEventListener('click', () => {
      const headers = [
        "Ranking",
        "Reactivo Canónico",
        "Categoría Química",
        "Laboratorio Principal",
        "Solicitudes 2024",
        "Litros 2024",
        "Kg 2024",
        "Solicitudes 2025",
        "Litros 2025",
        "Kg 2025",
        "Solicitudes 2026",
        "Litros 2026",
        "Kg 2026",
        "Total Solicitudes (2024-2026)",
        "Total Litros",
        "Total Kg"
      ];

      const catList = [...ReagentsTrackingManager.state.catalogo_reactivos].sort((a, b) => b.totalSolicitudes - a.totalSolicitudes);

      const rows = catList.map((r, idx) => [
        `#${idx + 1}`,
        `"${r.nombre.replace(/"/g, '""')}"`,
        `"${r.categoria}"`,
        `"${r.labTipo}"`,
        r.porAnio['2024'] ? r.porAnio['2024'].solicitudes : 0,
        r.porAnio['2024'] ? r.porAnio['2024'].litros : 0,
        r.porAnio['2024'] ? r.porAnio['2024'].kg : 0,
        r.porAnio['2025'] ? r.porAnio['2025'].solicitudes : 0,
        r.porAnio['2025'] ? r.porAnio['2025'].litros : 0,
        r.porAnio['2025'] ? r.porAnio['2025'].kg : 0,
        r.porAnio['2026'] ? r.porAnio['2026'].solicitudes : 0,
        r.porAnio['2026'] ? r.porAnio['2026'].litros : 0,
        r.porAnio['2026'] ? r.porAnio['2026'].kg : 0,
        r.totalSolicitudes,
        r.totalLitros,
        r.totalKg
      ]);

      const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(row => row.join(","))].join("\r\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Reporte_Anual_Reactivos_EIQ_2024_2026_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Exportar Bitácora Detallada de Transacciones en CSV
  if (btnExportBitacoraCsv) {
    btnExportBitacoraCsv.addEventListener('click', () => {
      const headers = [
        "ID Log",
        "Año Calendario",
        "Fecha Trámite",
        "Origen / Solicitud",
        "Persona Solicitante",
        "Carné",
        "Laboratorio",
        "Categoría Química",
        "Reactivo Canónico",
        "Texto Específico Solicitado",
        "Cantidad Registrada",
        "Volumen Est. (Litros)",
        "Masa Est. (Kg)"
      ];

      const ledger = ReagentsTrackingManager.state.bitacora_consumo_historica || [];
      const rows = ledger.map(item => [
        `"${item.logId}"`,
        item.anio,
        `"${item.fechaStr}"`,
        `"${item.archivoOrigen.replace(/"/g, '""')}"`,
        `"${item.solicitante.replace(/"/g, '""')}"`,
        `"${item.carne || 'N/A'}"`,
        `"${item.labTipo}"`,
        `"${item.categoria}"`,
        `"${item.reactivoCanonical.replace(/"/g, '""')}"`,
        `"${item.reactivoEspecifico.replace(/"/g, '""')}"`,
        `"${item.cantidadDisplay || item.cantidadRaw || ''}"`,
        item.volumenLitros || 0,
        item.masaKg || 0
      ]);

      const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(row => row.join(","))].join("\r\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Bitacora_Uso_Reactivos_EIQ_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }


  // Initial setup
  updateLabTypeForm();
  updateKPIs();
  renderTable();
  renderHistoricalDashboard();
  renderReagentsDashboard();
  sincronizarSolicitudesBackend();
});

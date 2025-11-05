// Obtener referencias a las manecillas del DOM
const manecillaHora = document.querySelector('.hora');
const manecillaMinuto = document.querySelector('.minuto');
const manecillaSegundo = document.querySelector('.segundo');

function setReloj() {
    // 1. Obtener la hora actual
    const ahora = new Date();
    
    const segundos = ahora.getSeconds();
    const minutos = ahora.getMinutes();
    const horas = ahora.getHours();

    const subdialDiaSemana = document.querySelector('.dia-semana .indicador');
    const subdialMes = document.querySelector('.mes .indicador');
    const subdialFecha = document.querySelector('.fecha .indicador');
    // 🗓️ NUEVO: Referencia al display del año
    const displayAno = document.querySelector('.display-ano');
    
    // 2. Calcular la rotación en grados (Manecillas principales)
    const gradosSegundos = (segundos / 60) * 360;
    manecillaSegundo.style.transform = `translate(-50%, -100%) rotate(${gradosSegundos}deg)`;

    const gradosMinutos = ((minutos / 60) * 360) + ((segundos / 60) * 6);
    manecillaMinuto.style.transform = `translate(-50%, -100%) rotate(${gradosMinutos}deg)`;

    const gradosHoras = ((horas % 12 / 12) * 360) + ((minutos / 60) * 30);
    manecillaHora.style.transform = `translate(-50%, -100%) rotate(${gradosHoras}deg)`;


    // =========================================================
    // 🧠 LÓGICA DE SUBDIALES (Consistente con el patrón Día de la Semana)
    // =========================================================
    
    // --- 1. DÍA DE LA SEMANA (0=Dom, 6=Sáb) ---
    // Rotación: Domingo (0) = 0 grados.
    const diaDeLaSemana = ahora.getDay(); 
    const gradosDiaSemana = (diaDeLaSemana / 7) * 360; 
    subdialDiaSemana.style.transform = `translate(-50%, -100%) rotate(${gradosDiaSemana}deg)`;
    
    
    // --- 2. DÍA DEL MES (Día 31 = 12 en punto / 0 grados) ---
    const diaDelMes = ahora.getDate(); // 1 a 31
    
    // Lógica del offset: Usamos Módulo 31.
    // Ej: Día 31 % 31 = 0 (0 grados). Día 1 % 31 = 1 (1 paso).
    const diaAjustado = diaDelMes % 31; 
    
    // Grados: (Valor ajustado / Total) * 360.
    const gradosFecha = (diaAjustado / 31) * 360;
    subdialFecha.style.transform = `translate(-50%, -100%) rotate(${gradosFecha}deg)`;


    // --- 3. MES DEL AÑO (Diciembre = 12 en punto / 0 grados) ---
    const mesActual = ahora.getMonth(); // 0 (Ene) a 11 (Dic)
    
    // Lógica del offset: Diciembre (11) se mapea a 0, Enero (0) se mapea a 1.
    const mesAjustado = (mesActual + 1) % 12;

    // Grados: (Valor ajustado / Total) * 360.
    const gradosMes = (mesAjustado / 12) * 360;
    subdialMes.style.transform = `translate(-50%, -100%) rotate(${gradosMes}deg)`;
    
    // =========================================================

    // 🗓️ NUEVO: Mostrar el Año
    const anoActual = ahora.getFullYear();
    displayAno.textContent = anoActual;
}

// Ejecutar la función inmediatamente para que el reloj muestre la hora correcta al cargar
setReloj();

// Actualizar el reloj cada 1000 milisegundos (1 segundo)
setInterval(setReloj, 1000);
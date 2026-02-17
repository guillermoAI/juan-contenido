/**
 * GH Consulting - Apps Script v2.1
 * Maneja: Fathom, Cal.com, Onboarding, Tracking de Métricas
 * 
 * ACTUALIZACIÓN: Formularios v2 con campos detallados
 * 
 * Para actualizar:
 * 1. Abre Apps Script: https://script.google.com
 * 2. Pega este código
 * 3. Deploy > Manage deployments > New deployment
 * 4. Copia la nueva URL
 */

// Sheet IDs
const SHEETS = {
  FATHOM: '1DQL-x67xjo8QZntbW3D9lA2qwEYl2ZoOH2NwvrfvBt0',
  CLIENTES: '1HgGc_W_NLLON0a49GbhlsAQKf8w9qbTnMqCuwWRCHNY',
  TRACKING: '1HgGc_W_NLLON0a49GbhlsAQKf8w9qbTnMqCuwWRCHNY'
};

// Main entry point
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Detect type and route
    if (data.call_id) {
      return handleFathom(data);
    } else if (data.triggerEvent) {
      return handleCalCom(data);
    } else if (data.type === 'onboarding') {
      return handleOnboarding(data);
    } else if (data.type === 'tracking') {
      return handleTracking(data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Unknown request type'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle Fathom webhooks
function handleFathom(data) {
  const sheet = SpreadsheetApp.openById(SHEETS.FATHOM).getSheetByName('Calls') 
    || SpreadsheetApp.openById(SHEETS.FATHOM).insertSheet('Calls');
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Call ID', 'Title', 'Duration', 
      'Participants', 'Summary', 'Action Items', 'Transcript URL'
    ]);
  }
  
  sheet.appendRow([
    new Date().toISOString(),
    data.call_id || '',
    data.title || '',
    data.duration || '',
    data.participants ? data.participants.join(', ') : '',
    data.summary || '',
    data.action_items ? data.action_items.join('\n') : '',
    data.transcript_url || ''
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    type: 'fathom'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Handle Cal.com webhooks
function handleCalCom(data) {
  const sheet = SpreadsheetApp.openById(SHEETS.CLIENTES).getSheetByName('Bookings')
    || SpreadsheetApp.openById(SHEETS.CLIENTES).insertSheet('Bookings');
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Event Type', 'Event Title', 'Start Time',
      'End Time', 'Attendee Name', 'Attendee Email', 'Status'
    ]);
  }
  
  const payload = data.payload || {};
  
  sheet.appendRow([
    new Date().toISOString(),
    data.triggerEvent || '',
    payload.title || '',
    payload.startTime || '',
    payload.endTime || '',
    payload.attendees?.[0]?.name || '',
    payload.attendees?.[0]?.email || '',
    payload.status || ''
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    type: 'calcom'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Handle Onboarding form submissions (v2)
function handleOnboarding(data) {
  const sheet = SpreadsheetApp.openById(SHEETS.CLIENTES).getSheetByName('Onboarding')
    || SpreadsheetApp.openById(SHEETS.CLIENTES).insertSheet('Onboarding');
  
  const headers = [
    'Timestamp', 'Source',
    // Contacto
    'Nombre', 'Email', 'WhatsApp', 'Instagram', 'YouTube', 'Timezone',
    // Negocio
    'Nicho', 'Avatar', 'Transformación', 'Productos',
    // Métricas financieras
    'Facturación Mensual', 'Mejor Mes', 'Ticket Medio', 'Clientes Activos', 'Margen %',
    // Audiencia
    'Seguidores IG', 'Subs YouTube', 'Lista Email',
    // Embudo
    'Leads/Mes', 'Calls Agendadas', 'Ventas Cerradas', 'Tasa Conversión',
    // Estrategia
    'Canales Captación', 'Reels/Semana', 'Stories/Semana', 'Videos YT/Semana', 'Posts/Semana',
    'Lead Magnets', 'Usa Ads',
    // Objetivos
    'Objetivo 6m €', 'Objetivo Cualitativo', 'Bloqueo Principal', 'Experiencia Mentores', 'Notas'
  ];
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  
  const d = data.data || data;
  
  sheet.appendRow([
    d.timestamp || new Date().toISOString(),
    d.source || 'onboarding_form',
    // Contacto
    d.nombre || '',
    d.email || '',
    d.whatsapp || '',
    d.instagram || '',
    d.youtube || '',
    d.timezone || '',
    // Negocio
    d.nicho || '',
    d.avatar || '',
    d.transformacion || '',
    d.productos || '',
    // Métricas financieras
    d.facturacion_mensual || '',
    d.mejor_mes || '',
    d.ticket_medio || '',
    d.clientes_activos || '',
    d.margen || '',
    // Audiencia
    d.seguidores_ig || '',
    d.suscriptores_yt || '',
    d.lista_email || '',
    // Embudo
    d.leads_mes || '',
    d.calls_agendadas || '',
    d.ventas_cerradas || '',
    d.tasa_conversion || '',
    // Estrategia
    d.canales_captacion || '',
    d.contenido_reels || '',
    d.contenido_stories || '',
    d.contenido_youtube || '',
    d.contenido_posts || '',
    d.lead_magnets || '',
    d.usa_ads || '',
    // Objetivos
    d.objetivo_6m || '',
    d.objetivo_cualitativo || '',
    d.bloqueo_principal || '',
    d.experiencia_mentores || '',
    d.notas_adicionales || ''
  ]);
  
  // Create/update client entry
  createOrUpdateClient(d);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    type: 'onboarding',
    cliente: d.nombre
  })).setMimeType(ContentService.MimeType.JSON);
}

// Handle Tracking form submissions (v2)
function handleTracking(data) {
  const sheet = SpreadsheetApp.openById(SHEETS.TRACKING).getSheetByName('Tracking')
    || SpreadsheetApp.openById(SHEETS.TRACKING).insertSheet('Tracking');
  
  const headers = [
    'Timestamp', 'Source', 'Cliente', 'Semana', 'Week Number', 'Año',
    // Audiencia
    'IG Followers', 'YT Subs', 'TikTok Followers', 'Email List',
    // Contenido
    'Reels Publicados', 'Stories', 'Videos Largos', 'Views Totales',
    // Embudo
    'Leads', 'Conversaciones', 'Calls Agendadas', 'Calls Realizadas', 'Ventas', 'Ingresos Semana',
    // Conversión (calculado)
    'Conversion Rate %', 'Show Rate %',
    // Facturación
    'Facturación Mes', 'Clientes Activos',
    // Tareas
    'Tareas Completadas', 'Bloqueos', 'Prioridades'
  ];
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  
  const d = data.data || data;
  
  sheet.appendRow([
    d.timestamp || new Date().toISOString(),
    d.source || 'tracking_form',
    d.cliente || '',
    d.week_type || 'current',
    d.week_number || '',
    d.year || new Date().getFullYear(),
    // Audiencia
    d.ig_followers || '',
    d.yt_subs || '',
    d.tiktok_followers || '',
    d.email_list || '',
    // Contenido
    d.reels_published || '',
    d.stories_published || '',
    d.long_videos || '',
    d.total_views || '',
    // Embudo
    d.leads_week || '',
    d.conversations || '',
    d.calls_booked || '',
    d.calls_done || '',
    d.sales_closed || '',
    d.revenue_week || '',
    // Conversión
    d.conversion_rate || '',
    d.show_rate || '',
    // Facturación
    d.monthly_revenue || '',
    d.active_clients || '',
    // Tareas
    d.tasks_completed || '',
    d.blockers || '',
    d.next_priorities || ''
  ]);
  
  // Update client's latest metrics
  updateClientMetrics(d);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    type: 'tracking',
    cliente: d.cliente,
    week: d.week_number
  })).setMimeType(ContentService.MimeType.JSON);
}

// Create or update client in Clientes sheet
function createOrUpdateClient(onboardingData) {
  try {
    const ss = SpreadsheetApp.openById(SHEETS.CLIENTES);
    let sheet = ss.getSheetByName('Clientes');
    
    if (!sheet) {
      sheet = ss.insertSheet('Clientes');
      sheet.appendRow([
        'ID', 'Nombre', 'Email', 'WhatsApp', 'Instagram', 'YouTube',
        'Nicho', 'Facturación Inicial', 'Objetivo 6m', 'Fecha Onboarding',
        'Estado', 'Última Actualización',
        // Métricas actuales (se actualizan con tracking)
        'Seguidores IG', 'Subs YT', 'Facturación Actual', 'Clientes Activos'
      ]);
      sheet.getRange(1, 1, 1, 16).setFontWeight('bold');
    }
    
    const d = onboardingData;
    const clientId = generateClientId(d.nombre);
    
    // Check if client exists
    const data = sheet.getDataRange().getValues();
    let existingRow = -1;
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] && data[i][1].toString().toLowerCase() === d.nombre.toLowerCase()) {
        existingRow = i + 1;
        break;
      }
    }
    
    const rowData = [
      clientId,
      d.nombre || '',
      d.email || '',
      d.whatsapp || '',
      d.instagram || '',
      d.youtube || '',
      d.nicho || '',
      d.facturacion_mensual || '',
      d.objetivo_6m || '',
      new Date().toISOString(),
      'Activo',
      new Date().toISOString(),
      d.seguidores_ig || '',
      d.suscriptores_yt || '',
      d.facturacion_mensual || '',
      d.clientes_activos || ''
    ];
    
    if (existingRow > 0) {
      // Update existing
      sheet.getRange(existingRow, 1, 1, rowData.length).setValues([rowData]);
    } else {
      // Add new
      sheet.appendRow(rowData);
    }
    
  } catch (e) {
    console.log('Error creating/updating client:', e);
  }
}

// Update client metrics from tracking
function updateClientMetrics(trackingData) {
  try {
    const sheet = SpreadsheetApp.openById(SHEETS.CLIENTES).getSheetByName('Clientes');
    if (!sheet) return;
    
    const data = sheet.getDataRange().getValues();
    const clientName = trackingData.cliente;
    
    for (let i = 1; i < data.length; i++) {
      const rowName = data[i][1] ? data[i][1].toString().toLowerCase() : '';
      if (rowName.includes(clientName.toLowerCase()) || clientName.toLowerCase().includes(rowName)) {
        const row = i + 1;
        
        // Update metrics columns
        sheet.getRange(row, 12).setValue(new Date().toISOString()); // Última Actualización
        
        if (trackingData.ig_followers) {
          sheet.getRange(row, 13).setValue(trackingData.ig_followers); // Seguidores IG
        }
        if (trackingData.yt_subs) {
          sheet.getRange(row, 14).setValue(trackingData.yt_subs); // Subs YT
        }
        if (trackingData.monthly_revenue) {
          sheet.getRange(row, 15).setValue(trackingData.monthly_revenue); // Facturación Actual
        }
        if (trackingData.active_clients) {
          sheet.getRange(row, 16).setValue(trackingData.active_clients); // Clientes Activos
        }
        
        break;
      }
    }
  } catch (e) {
    console.log('Error updating client metrics:', e);
  }
}

// Generate client ID
function generateClientId(nombre) {
  const initials = nombre.split(' ').map(n => n[0]).join('').toUpperCase();
  const timestamp = Date.now().toString(36).slice(-4).toUpperCase();
  return `${initials}-${timestamp}`;
}

// Test functions
function testOnboarding() {
  const testData = {
    type: 'onboarding',
    data: {
      nombre: 'Test User',
      email: 'test@test.com',
      whatsapp: '+34600000000',
      nicho: 'fitness',
      facturacion_mensual: '5000',
      objetivo_6m: '15000'
    }
  };
  console.log(handleOnboarding(testData));
}

function testTracking() {
  const testData = {
    type: 'tracking',
    data: {
      cliente: 'pablo',
      week_type: 'current',
      ig_followers: '5000',
      monthly_revenue: '3000',
      leads_week: '10',
      sales_closed: '2'
    }
  };
  console.log(handleTracking(testData));
}

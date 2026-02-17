/**
 * GH Consulting - Apps Script v2
 * Maneja: Fathom, Cal.com, Onboarding, Tracking de Métricas
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
  TRACKING: '1HgGc_W_NLLON0a49GbhlsAQKf8w9qbTnMqCuwWRCHNY' // Mismo sheet, pestaña diferente
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
  
  // Add headers if empty
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
  
  // Add headers if empty
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

// Handle Onboarding form submissions
function handleOnboarding(data) {
  const sheet = SpreadsheetApp.openById(SHEETS.CLIENTES).getSheetByName('Onboarding')
    || SpreadsheetApp.openById(SHEETS.CLIENTES).insertSheet('Onboarding');
  
  // Add headers if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Nombre', 'Email', 'Teléfono',
      'Nicho', 'Producto', 'Precio', 'Objetivo',
      'Facturación Actual', 'Seguidores', 'Notas'
    ]);
  }
  
  const d = data.data || data;
  
  sheet.appendRow([
    new Date().toISOString(),
    d.nombre || '',
    d.email || '',
    d.telefono || '',
    d.nicho || '',
    d.producto || '',
    d.precio || '',
    d.objetivo || '',
    d.facturacion_actual || '',
    d.seguidores || '',
    d.notas || ''
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    type: 'onboarding'
  })).setMimeType(ContentService.MimeType.JSON);
}

// NEW: Handle Tracking form submissions
function handleTracking(data) {
  const sheet = SpreadsheetApp.openById(SHEETS.TRACKING).getSheetByName('Tracking')
    || SpreadsheetApp.openById(SHEETS.TRACKING).insertSheet('Tracking');
  
  // Add headers if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Cliente', 'Semana', 
      'Seguidores IG', 'Seguidores YT', 'Views Semana',
      'Leads', 'Llamadas Agendadas', 'Ventas',
      'Facturación Mes', 'Contenido Publicado', 'Videos Largos',
      'Notas'
    ]);
  }
  
  const d = data.data || data;
  
  sheet.appendRow([
    d.timestamp || new Date().toISOString(),
    d.cliente || '',
    d.semana || 'current',
    d.seguidores_ig || '',
    d.seguidores_yt || '',
    d.views_semana || '',
    d.leads_semana || '',
    d.llamadas_agendadas || '',
    d.ventas_semana || '',
    d.facturacion_mes || '',
    d.contenido_publicado || '',
    d.videos_largos || '',
    d.notas || ''
  ]);
  
  // Update client's last metrics in Clientes sheet
  updateClientMetrics(d);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    type: 'tracking'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Helper: Update client metrics in main sheet
function updateClientMetrics(trackingData) {
  try {
    const sheet = SpreadsheetApp.openById(SHEETS.CLIENTES).getSheetByName('Clientes');
    if (!sheet) return;
    
    const data = sheet.getDataRange().getValues();
    const clientName = trackingData.cliente;
    
    // Find client row (assuming column A has names)
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] && data[i][0].toString().toLowerCase().includes(clientName.toLowerCase())) {
        // Update metrics columns (adjust column numbers as needed)
        const row = i + 1;
        
        // Example: Update last activity date
        sheet.getRange(row, 10).setValue(new Date()); // Column J = Last Update
        
        // Add more updates as needed based on your sheet structure
        break;
      }
    }
  } catch (e) {
    console.log('Error updating client metrics:', e);
  }
}

// Test function
function testWebhook() {
  const testData = {
    type: 'tracking',
    data: {
      cliente: 'Test',
      semana: 'current',
      seguidores_ig: '1000',
      leads_semana: '5',
      notas: 'Test tracking'
    }
  };
  
  console.log(handleTracking(testData));
}

const iframe = document.getElementById('content-iframe');

function navigate(page) {
  switch (page) {
    case 'legal-entities':
      iframe.src = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRPqMvR0wTxnSj4YaCbBj6KVRKjnDc5BeW8QK_lI3Cz056c2PYMIgf7Thf8nvWw_6J8fdBA7eNzMtYf/pubhtml?widget=true&amp;headers=false';
      break;
    case 'services':
      iframe.src = 'URL_FOR_SERVICES_GOOGLE_SHEET';
      break;
    case 'cost-center-mapping':
      iframe.src = 'URL_FOR_COST_CENTER_MAPPING_GOOGLE_SHEET';
      break;
    case 'cost-data-input':
      iframe.src = 'URL_FOR_COST_DATA_INPUT_GOOGLE_SHEET';
      break;
    case 'allocation-key-input':
      iframe.src = 'URL_FOR_ALLOCATION_KEY_INPUT_GOOGLE_SHEET';
      break;
    case 'report':
      iframe.src = 'URL_FOR_POWER_BI_REPORT';
      break;
  }
}

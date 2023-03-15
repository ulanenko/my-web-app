const iframe = document.getElementById('content-iframe');

function navigate(page) {
  switch (page) {
    case 'legal-entities':
      iframe.src = 'https://docs.google.com/spreadsheets/d/1Bw5kk5tZ9zA7r0yviU5rquksbsp3Lgu_UqAhSiy5UuI/edit?usp=sharing';
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

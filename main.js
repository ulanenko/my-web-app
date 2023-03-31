const url = 'https://docs.google.com/spreadsheets/d/1h4pArBk1KhcRuTL_vmQI-Fln-OFDC5OvGaYCF04zBnA/pub?output=xlsx';

async function fetchData() {
  const response = await fetch(url, { method: 'GET', mode: 'cors' });
  const arrayBuffer = await response.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = XLSX.read(data, { type: 'array' });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert sheet to JSON
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  return jsonData;
}

function createEntityPage(entity) {
  const entityDiv = document.createElement('div');
  entityDiv.classList.add('entity');
  entityDiv.innerText = entity;

  const dataPointsDiv = document.createElement('div');
  jsonData.forEach(item => {
    if (item.Entity === entity) {
      const dataPointDiv = document.createElement('div');
      dataPointDiv.classList.add('data-point');
      dataPointDiv.innerText = item['Data point (attribute)'];
      dataPointsDiv.appendChild(dataPointDiv);
    }
  });

  entityDiv.appendChild(dataPointsDiv);

  return entityDiv;
}

function createDataPointPage(dataPoint, definition) {
  const dataPointDiv = document.createElement('div');
  dataPointDiv.classList.add('data-point');
  dataPointDiv.innerText = dataPoint;

  const definitionDiv = document.createElement('div');
  definitionDiv.classList.add('definition');
  definitionDiv.innerText = definition;

  dataPointDiv.appendChild(definitionDiv);

  return dataPointDiv;
}

async function buildPage() {
  const jsonData = await fetchData();

  const entities = [...new Set(jsonData.map(item => item.Entity))];
  const mainDiv = document.createElement('div');

  entities.forEach(entity => {
    const entityPage = createEntityPage(entity);
    mainDiv.appendChild(entityPage);
  });

  jsonData.forEach(item => {
    const dataPointPage = createDataPointPage(item['Data point (attribute)'], item['Definition']);
    mainDiv.appendChild(dataPointPage);
  });

  document.body.appendChild(mainDiv);
}

buildPage();

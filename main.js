const url = 'https://docs.google.com/spreadsheets/d/1h4pArBk1KhcRuTL_vmQI-Fln-OFDC5OvGaYCF04zBnA/pub?output=xlsx';

async function fetchData() {
  try {
    const response = await fetch(url, { method: 'GET', mode: 'cors' });
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    return jsonData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function createEntityLink(entity) {
  const link = document.createElement('a');
  link.href = `#${entity}`;
  link.innerText = entity;
  return link;
}

function createDataPointLink(dataPoint) {
  const link = document.createElement('a');
  link.href = `#${dataPoint}`;
  link.innerText = dataPoint;
  return link;
}

function createEntityPage(entity) {
  const entityDiv = document.createElement('div');
  entityDiv.classList.add('entity');
  entityDiv.innerText = entity;

  const dataPointsDiv = document.createElement('div');
  jsonData.forEach(item => {
    if (item.Entity === entity) {
      const dataPointLink = createDataPointLink(item['Data point (attribute)']);
      dataPointsDiv.appendChild(dataPointLink);
      dataPointsDiv.appendChild(document.createElement('br'));
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

  const entityLink = createEntityLink(dataPoint);
  definitionDiv.appendChild(document.createElement('br'));
  definitionDiv.appendChild(entityLink);

  return dataPointDiv;
}

async function buildPage() {
  const jsonData = await fetchData();

  if (jsonData.length === 0) {
    console.error('No data fetched from the sheet');
    return;
  }

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

  document.getElementById('content').appendChild(mainDiv);
}

buildPage();

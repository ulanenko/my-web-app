
const googleSheetID = 'https://docs.google.com/spreadsheets/d/1h4pArBk1KhcRuTL_vmQI-Fln-OFDC5OvGaYCF04zBnA/pub?output=xlsx';
const publicSpreadsheetUrl = `https://docs.google.com/spreadsheets/d/${googleSheetID}/pubhtml`;

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: buildPage,
    simpleSheet: true
  });
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

function createEntityPage(entity, jsonData) {
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

function buildPage(jsonData) {
  const entities = [...new Set(jsonData.map(item => item.Entity))];
  const mainDiv = document.createElement('div');

  entities.forEach(entity => {
    const entityPage = createEntityPage(entity, jsonData);
    mainDiv.appendChild(entityPage);
  });

  jsonData.forEach(item => {
    const dataPointPage = createDataPointPage(item['Data point (attribute)'], item['Definition']);
    mainDiv.appendChild(dataPointPage);
  });

  document.getElementById('content').appendChild(mainDiv);
}

init();

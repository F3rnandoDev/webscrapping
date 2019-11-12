const puppeteer = require('puppeteer');
const pdfParse = require('pdfParse');

run().then(() => console.log('Terminado')).catch(error => console.log(error));

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://paginadepruebatecnica.com');
  
  //Logeamos el usuario
  await page.type('#loginusuario', 'algunusuario');
  await page.type('#logincontrasena', 'algunacontraseña');
  await page.click('[name="loginsubmit"]');
  await page.waitForNavigation();

  //Búsqueda
  await page.evaluate(() => {
    document.querySelector('input[name="documento"]').value = 'Reimpresion Acuse de Recibo';
    document.querySelector('input[name="rfc"]').value = 'ECE0612045DO';
    document.querySelector('input[name="declaracion"]').value = 'Provisional o Definitiva de Impuestos Fiscales';
    document.querySelector('input[name="tipodeclaracion"]').value = 'Complementaria';
    document.querySelector('input[name="ejercicio"]').value = '2017';
    document.querySelector(`select[name="periodo"] [value="Enero"]`).selected = true;
   // await page.click('[name="buscar"]')
  });

  // Click en la búsqueda y esperamos a que termine la carga de la página
  const waitForLoad = new Promise(resolve => page.on('load', () => resolve()));
  await page.evaluate(() => {
    document.querySelector('input[value="buscar"]').click();
  });
  await waitForLoad;

  // Obtenemos la respuesta de la busqueda
  const result = await page.evaluate(function getUrls() {
    return Array.from(document.querySelectorAll('nodeoperacion').values()).  //suponemos que ese elemento contiene los links
      map(el => el.innerHTML);
  });
  
  array.forEach(element => {
    resultados = pdfParse.element;
    JSON.parse(resultados);
  });

  console.log(resultados); //visualizamoen en pantalla los datos a manera de ejemplo
  //return resultados; 
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  await browser.close();
}
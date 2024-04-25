// apiService.js
const axios = require('axios');
const https = require('https');
async function fetchPages(slug) {
  try {
      const response = await axios.get('https://idakoos.s3.us-east-2.amazonaws.com/json/pages.json', {
          httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Añade esta línea para ignorar la verificación del certificado
      });

      const jsonData = response.data;
      const filteredData = jsonData.filter(item => item.slug === slug);

      return filteredData.length > 0 ? filteredData[0] : null;
  } catch (error) {
      console.error('Error al obtener los datos de la API:', error);
      throw new Error('Hubo un error al obtener los datos de la API');
  }
}
  
  module.exports = { fetchPages };
  
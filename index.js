(async () => {
  const fetch = (await import('node-fetch')).default;
  const moment = require('moment-timezone');

  const apiKey = 'usmCmHSELiA1SijeIeexWuicoahY1MHP';

  async function getWeather(location) {
    const url = `https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature&apikey=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        console.log('Gagal mengambil data cuaca!');
        return;
      }

      const temperature = data.data.timelines[0].intervals[0].values.temperature;
      console.log(`Suhu di ${location} saat ini: ${temperature}°C`);
    } catch (error) {
      console.log('Terjadi kesalahan:', error);
    }
  }

  const location = process.argv[2];
  const timezone = process.argv[3];

  if (!location || !timezone) {
    console.log('Tolong masukkan lokasi dan zona waktu, contoh: node index.js Jakarta Asia/Indonesia/Jakarta');
  } else {
    const currentTime = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
    console.log(`Waktu lokal di ${timezone}: ${currentTime}`);
    getWeather(location);
  }
})();

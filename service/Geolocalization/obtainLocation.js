import axios from 'axios';

const apiKey = '176501be4efa778d7c778b479460fea8';

class Geolocalization {
    async getGeolocation(ip) {
        const apiUrl = `http://api.ipstack.com/${ip}?access_key=${apiKey}`;
        try {
            const response = await axios.get(apiUrl);
            return response;
        } catch (error) {
            console.error('Error getting geolocation:', error);
            throw error;
        }
  }
}

export default Geolocalization;
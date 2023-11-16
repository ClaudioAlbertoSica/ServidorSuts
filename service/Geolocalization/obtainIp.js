import axios from 'axios'


class obtainIp {
    
    async getUserIP() {
        try {
        const response = await axios.get('https://httpbin.org/ip');
        const userIP = response.data.origin;
        return userIP;
        } catch (error) {
        console.error('Error getting user IP:', error);
        throw error;
        }
  }
}

export default obtainIp
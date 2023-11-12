import axios from 'axios' // Use axios for making HTTP requests

// Function to get the public IP address of the machine
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
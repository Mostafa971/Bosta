// api/tracking.ts
import axios from 'axios';

const API_URL = 'https://tracking.bosta.co/shipments/track';

export const fetchShipmentDetails = async (trackingNumber: string) => {
  try {
    console.log(trackingNumber);
    
    const response = await axios.get(`${API_URL}/${trackingNumber}`, {
      headers: {
        'x-requested-by': 'Bosta',
      },
    });
    console.log(response);
    
    return response.data;
  } catch (error) {
    throw new Error('Error fetching shipment details');
  }
};
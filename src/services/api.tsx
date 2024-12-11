import axios from 'axios';

export async function fetchShipmentData(trackingNumber: string) {
  const response = await axios.get(
    `https://tracking.bosta.co/shipments/track/${trackingNumber}`
  );
  return response.data;
}

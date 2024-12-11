export interface Shipment {
    trackingNumber: string;
    status: string;
    history: Array<HistoryItem>;
    address: string;
  }
  
  export interface HistoryItem {
    branch: string;
    date: string;
    time: string;
    details: string;
  }
  
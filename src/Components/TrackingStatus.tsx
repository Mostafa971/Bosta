import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../Redux/store';


const statusMapping: Record<string, string> = {
  Delivered: 'تم التوصيل',
  'In Transit': 'قيد النقل',
  Canceled: 'تم الإلغاء',
};

const TrackingStatus: React.FC = () => {
  const { status, error, loading } = useSelector((state: RootState) => state.tracking); // Use RootState here

  return (
    <div>
      {  loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {status && !loading && !error && (
        <p>Status: {statusMapping[status] || status}</p>
      )}
    </div>
  );
};

export default TrackingStatus;
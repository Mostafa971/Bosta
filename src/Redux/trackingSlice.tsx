import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface TrackingState {
    trackingNumber: string;
    status: string;
    error: string | null;
    loading: boolean;
    timeline: string[];
    expectedDeliveryDate: string | null;
  }
const initialState: TrackingState = {
    trackingNumber: '',
    status: '',
    error: null,
    loading: false,
    timeline: [],
    expectedDeliveryDate: null,
  };
  
const trackingSlice = createSlice({
    name: 'tracking',
    initialState,
    reducers: {
        setTrackingNumber: (state, action: PayloadAction<string>) => {
          state.trackingNumber = action.payload;
        },
        setStatus: (state, action: PayloadAction<string>) => {
          state.status = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
          state.error = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
          state.loading = action.payload;
        },
        setTimeline: (state, action: PayloadAction<string[]>) => {
          state.timeline = action.payload;
        },
        setExpectedDeliveryDate: (state, action: PayloadAction<string | null>) => {
          state.expectedDeliveryDate = action.payload;
        },
      },
})
export const { setTrackingNumber, setStatus, setError, setLoading, setTimeline, setExpectedDeliveryDate } = trackingSlice.actions;

export default trackingSlice.reducer;
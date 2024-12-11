import React, { useState, useEffect } from 'react';
import { RootState } from '../Redux/store';
import logo from '../../src/assets/location.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShipmentDetails } from '../api/tracking';
import { setStatus, setError, setLoading, setTimeline, setExpectedDeliveryDate } from '../Redux/trackingSlice';
import CustomStepper from './CustomStepper';

const TrackingForm: React.FC = () => {
  
  const [lastTwoDay2, setLastTwoDay2] = useState('');
  const [lastTwoDay1, setLastTwoDay1] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [time, setTime] = useState('');
  const [adrees, setAdrees] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [dayName, setDayName] = useState('');
  
  const dispatch = useDispatch();
  const { status, error, loading } = useSelector((state: RootState) => state.tracking);
  const [code, setCode] = useState<number>(0);
  const [state, setState] = useState('');
  const [stateTime, setStateTime] = useState('');

  const getLastTwoDays = (inputDate: string) => {
    console.log(inputDate);
    
    // const currentYear = new Date().getFullYear();
   
    const currentYear = new Date().getFullYear(); // Get the current year
    console.log(currentYear);
const targetDate = new Date(`${inputDate.split(", ")[1]} ${currentYear}`); 



    const getDateFormatted = (date: Date) => date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

    const yesterday = new Date(targetDate);
    yesterday.setDate(targetDate.getDate() - 1);

    const dayBeforeYesterday = new Date(targetDate);
    dayBeforeYesterday.setDate(targetDate.getDate() - 2);

    return {
      yesterday: getDateFormatted(yesterday),
      dayBeforeYesterday: getDateFormatted(dayBeforeYesterday)
    };
  };




  const currentStatus = {
    state,
    code,
    stateTime,
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));

    const formatDateToDay = (timestamp: string) =>
      new Date(timestamp).toLocaleDateString("en-US", {
        weekday: "short", month: "short", day: "numeric",
      });

    try {
      const data = await fetchShipmentDetails(trackingNumber);
      setCode(data.CurrentStatus.code);
      setOrderNumber(data.TrackingNumber)
      setState(data.CurrentStatus.state);
      setAdrees(data.DropOffAddress.city.name);
      setStateTime(data.CurrentStatus.timestamp);
      dispatch(setStatus(data.CurrentStatus.state));
      dispatch(setTimeline(data.CurrentStatus.timeline));
  
      const date = new Date(data.CurrentStatus.timestamp); // Convert string to Date object
      const currentDay = new Date(data.CurrentStatus.timestamp);

// Get the name of the day (e.g., "Monday")
const dayName = currentDay.toLocaleDateString('en-US', { weekday: 'long' });
      // Extract time components
      console.log(dayName);
      setDayName(dayName)
      const hours = date.getHours();
      const minutes = date.getMinutes();

      
      // Format the time as HH:MM:SS
      const time = `${hours}:${minutes}`;
      setTime(time)
console.log(time);

      const days = formatDateToDay(data.CurrentStatus.timestamp);
   
      
      const responce = getLastTwoDays(days);

      setLastTwoDay1(responce.yesterday)
      setLastTwoDay2(responce.dayBeforeYesterday)
      // console.log("Yesterday:", yesterday);
      // console.log("Day Before Yesterday:", dayBeforeYesterday);

      dispatch(setExpectedDeliveryDate(data.PromisedDate));
    } catch (error) {
      dispatch(setStatus(''));
      dispatch(setError('Invalid tracking number or network error'));
    } finally {
      dispatch(setLoading(false));
    }
  };




  return (
    <div className="py-7 tracking-form min-h-screen  bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
             
             
       



        <div className="logo mainColor text-center flex justify-center py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <img className="text-center" width={100} src={logo} alt="Logo" />
        </div>


      <div className="py-10 track text-center flex justify-center items-center flex-col">
        <h1 className="py-3">Track Your Order</h1>
      </div>

      <form className=" dark:bg-gray-700 p-4 rounded" onSubmit={handleSearch}>
        <div className="flex w-1/4 mx-auto">
          <label htmlFor="location-search" className="mb-2 text-sm font-medium sr-only">
            Tracking Number
          </label>
          <div className="relative w-full">
            <input
              onChange={(e) => setTrackingNumber(e.target.value)}
              value={trackingNumber}
              type="search"
              id="location-search"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-red-500"
              placeholder="Search for tracking number"
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-red-600 rounded-e-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {status && (
        <div>
          <span> {orderNumber?`#ORDER ${orderNumber}`:''}  </span>
          <h1>Arriving By <span className='text-teal-600'>{dayName}</span></h1>
          <span>Your Order Is expected to arrive within 2-3 days</span>
      

  
          {status !== 'Delivered' && (
            <p></p>
          )}
          <div>
            <CustomStepper currentStatus={currentStatus} />
            <h1 className="text-center text-xl font-semibold p-4">Order Tracker</h1>
     
          </div>

 <ol className=" p-5 m-5 relative border-s dark:text-white border-gray-200 dark:border-gray-700">                  
 <li className="mb-10 dark:text-white  ">
    <div className="absolute w-3 h-3 bg-gray-200 dark:text-white  rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
  
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark:text-white">{lastTwoDay1}</h3>

<div className=" dark:text-white data ms-2 border bottom-1 p-2 rounded-lg my-3 py-4">


    <p className="text-base font-normal text-gray-500 dark:text-gray-400">The order is being delivered</p>
    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{time}</time>
</div>

<div className="data dark:text-white ms-2 border bottom-1 p-2 rounded-lg my-3 py-4">


    <p className=" dark:text-white text-base font-normal text-gray-500 dark:text-gray-400">The order has been received at warehouse because we were unable to contact you by phone</p>
    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{time} . {adrees}</time>
</div>
  </li>

  <li className="mb-10  ">
    <div className=" dark:text-white absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
  
    <h3 className=" dark:text-white text-lg font-semibold text-gray-900 dark:text-white">{lastTwoDay2}</h3>

<div className=" dark:text-white data ms-2 border bottom-1 p-2 rounded-lg my-3 py-4">


    <p className=" dark:text-white  text-base font-normal text-gray-500 dark:text-gray-400">The order is being Created</p>
    <time className=" dark:text-white mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{time}</time>
</div>

<div className="data dark:text-white  ms-2 border bottom-1 p-2 rounded-lg my-3 py-4">


    <p className="dark:text-white text-base font-normal text-gray-500 dark:text-gray-400">The order has been created when the merchant is ready , we will receive the shipment</p>
    <time className=" dark:text-white mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{time} . {adrees}</time>
</div>
  </li>

</ol>




        </div>
      )}
    </div>
  );
};

export default TrackingForm;

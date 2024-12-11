import React from 'react';
import TrackingStatus from './Components/TrackingStatus';
import TrackingForm from './Components/TrackingForm';
import Navbar from './Components/Navbar/Navbar';


const App: React.FC = () => {

  return (
    <div className="App py-10">

<Navbar/>
 




      <TrackingForm/>
      {/* <TrackingStatus /> */}
  
    </div>
  );
};

export default App;
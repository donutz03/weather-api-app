import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import CurrentLocation from "./components/CurrentLocation";
import Cities from "./components/Cities";
import './App.css'



function App() {
  return (
    <div className="all">
      <div>
        <p className='cities'>Try to find the weather for the following cities:</p> 
        <Cities/>
        </div>
      
      <CurrentLocation/> 
      <Weather/>
      <Forecast/>
    
    </div>
  );
}

export default App;

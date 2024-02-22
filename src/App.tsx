import { useContext, useState } from 'react';
import WorldMapView from './components/WorldMap';
import worldData from './assets/data/nigeria.json';
import { WorldMapContext } from './contexts/WorldMapProvider';



function App() {
  // * STATES
  const [countriesObj, setCountriesObj] = useState<object | any>({});
  const [countryInput, setCountryInput] = useState<string>('');
  const [colorPalette, setColorPalette] = useState<object>({});
  const { highlightCountries } = useContext<any>(WorldMapContext);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>('visaFree');
  
  // * VARIABLES
  const filterValues = [
    "visaFree", "visaOnArrival", "eta", "visaOnline", "visaRequired"
  ];



  // * FUNCTIONS
  function processAvailability(countryName: string) {
    // takes in a country name / ios , returns all the coun `try where it can travel 
    // visa free 
    // data format : ['za', 'uk', 'in', us]
    const resultAvailable = worldData.hasOwnProperty(countryName)
    // console.log('result available ? ', resultAvailable)
    const visaCategoryColors = {
      'visa-free' : 'green',
      // 'visa-free' : 'fill-green-500',
      'visa-on-arrival' : 'blue',
      // 'visa-on-arrival' : 'fill-green-300',
      "electronic-travel-authorization": 'yellow',
      // "electronic-travel-authorization": 'fill-yellow-500',
      "visa-online" : 'orange',
      // "visa-online" : 'fill-red-100',
      "visa-required" : 'red'
      // "visa-required" : 'fill-red-900'
    }  
    
    let newObj = []
  
    for (const country in worldData) {
      if (country !== countryName) return;

      for (const visaCategory in worldData[country]) {        
        newObj = [...newObj, [visaCategory, Object.fromEntries([["countries", worldData[country][visaCategory]], ["color", visaCategoryColors[visaCategory]]])]];  
      }
      
      return Object.fromEntries(newObj);
    }

  }


  function _handleCountryProcessing() {
    // console.log('processing country ', countryInput);
    const availableCountries = processAvailability(countryInput);
    setIsFiltering(false);

    for (const visaCategory in availableCountries) {
      highlightCountries(availableCountries[visaCategory]['countries'].map(data =>  data['iso'].toLowerCase()));
    }

    if (!availableCountries) {
      console.error('available countries error');
      setCountriesObj({});
      setColorPalette({});
      return;
    }

    const visaFreeColor = availableCountries['visa-free']['color'];
    const visaOnArrivalColor = availableCountries['visa-on-arrival']['color'];
    const etaColor = availableCountries['electronic-travel-authorization']['color'];
    const visaOnlineColor = availableCountries['visa-online']['color'];
    const visaRequiredColor = availableCountries['visa-required']['color'];

    const colorData = {
      visaFreeColor: visaFreeColor,
      visaOnArrivalColor: visaOnArrivalColor,
      etaColor: etaColor,
      visaOnlineColor: visaOnlineColor,
      visaRequiredColor: visaRequiredColor
    };

    const data = {
      visaFree : availableCountries['visa-free']['countries'].map(data => data['iso'].toLowerCase()),
      visaOnArrival : availableCountries['visa-on-arrival']['countries'].map(data => data['iso'].toLowerCase()),
      eta : availableCountries['electronic-travel-authorization']['countries'].map(data => data['iso'].toLowerCase()),
      visaOnline : availableCountries['visa-online']['countries'].map(data => data['iso'].toLowerCase()),
      visaRequired : availableCountries['visa-required']['countries'].map(data => data['iso'].toLowerCase())
    };

    setColorPalette(colorData);
    setCountriesObj(data);    

  }


  function _handleCategoryFiltering(value : string) {
    setFilterValue(value);
    setIsFiltering(true);
    highlightCountries([]);
    console.log(filterValue);
    highlightCountries((countriesObj[filterValue]));
  }



  return (
    <div className="flex justify-center h-screen border border-black p-16 m-16">
      <WorldMapView colorPalette={colorPalette} countryData={countriesObj} isFilter={isFiltering} filterValue={filterValue} />
      <div className="control-center">
        <input
          type="text"
          placeholder="Enter country name"
          className="border border-slate-700 p-2"
          onChange={e => setCountryInput(e.target.value)}
          value={countryInput}
        />
        <button
          className="bg-slate-800 p-2 text-white"
          onClick={_handleCountryProcessing}>Check</button>
        <p>You are searching for {countryInput}</p>

        {
          filterValues?.map(filter => (
            <FilterBtn key={filter} btnValue={filter} onFilter={() => _handleCategoryFiltering(filter)}>{filter}</FilterBtn>
          ))
        }

      </div>
    </div>
  )
}



function FilterBtn({btnValue, onFilter, children} : {btnValue : string, onFilter : any, children : string}) {
  return(
    <button
      className='bg-white border border-black rounded mb-2 p-2 text-black block'
      onClick={onFilter}
      value={btnValue}>
      {children}
    </button>
  )
}



export default App
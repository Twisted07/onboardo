import worldmap from '../assets/worldmap.json';
import { GenericTemplate } from '../utils/generic';

import cn from 'classnames';

function WorldMapView({ colorPalette, countryData, isFilter, filterValue }: { colorPalette: any, countryData: any, isFilter: boolean, filterValue: string }) {
  // get the data from context 
  // console.log('world map : ', worldmap);
  return (
    <div className="world-map border border-yellow-500 inline-block m-auto">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="784.077px"
        height="458.627px"
        viewBox="30.767 241.591 784.077 458.627"
        id="world-map"
      >
        { !isFilter ?
          worldmap.map(mapData => (
            <GenericTemplate
              key={mapData.id}
              {...mapData}
              // className={cn(`hover:fill-slate-500`,
              //             {'fill-yellow-500': validCountries.includes(mapData.id)})}
              style={countryData['visaFree']?.includes(mapData.id) ? {fill : colorPalette['visaFreeColor']}
                      : countryData['visaOnArrival']?.includes(mapData.id) ? {fill : colorPalette['visaOnArrivalColor']}
                      : countryData['eta']?.includes(mapData.id) ? {fill : colorPalette['etaColor']}
                      : countryData['visaOnline']?.includes(mapData.id) ? {fill : colorPalette['visaOnlineColor']}
                      : countryData['visaRequired']?.includes(mapData.id) ? {fill : colorPalette['visaRequiredColor']}
                      : null 
                    }
              // className={cn(`hover:fill-slate-500`,  countryData['visaFree'] : )}
            />
            
          ))
          : worldmap.map(mapData => (
            <GenericTemplate
              key={mapData.id}
              {...mapData}
              // className={cn(`hover:fill-slate-500`,
              //             {'fill-yellow-500': validCountries.includes(mapData.id)})}
              style={countryData[filterValue]?.includes(mapData.id) && filterValue === 'visaFree' ? {fill : colorPalette['visaFreeColor']}
                      : countryData[filterValue]?.includes(mapData.id) && filterValue === 'visaOnArrival' ? {fill : colorPalette['visaOnArrivalColor']}
                      : countryData[filterValue]?.includes(mapData.id) && filterValue === 'eta' ? {fill : colorPalette['etaColor']}
                      : countryData[filterValue]?.includes(mapData.id) && filterValue === 'visaOnline' ? {fill : colorPalette['visaOnlineColor']}
                      : countryData[filterValue]?.includes(mapData.id) && filterValue === 'visaRequired' ? {fill : colorPalette['visaRequiredColor']}
                      : null 
                    }
              // className={cn(`hover:fill-slate-500`,  countryData['visaFree'] : )}
            />))
        }
      </svg>
    </div>
  )
}

export default WorldMapView;

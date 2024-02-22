import { createContext, useState } from "react";

interface WorldMapContextProps {
  highlightCountries: (countriesName: string) => void;
  selectedCountries: string[];
}
export const WorldMapContext = createContext<WorldMapContextProps | null>(null)

function WorldMapProvider({ children }: { children: React.ReactNode }) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const isCountryHighlighted = (countryName: string) => {
    return selectedCountries.includes(countryName)
  }

  const toggleCountry = (countryName: string) => {
    setSelectedCountries(prevCountries => (
      prevCountries.includes(countryName) ?
        prevCountries.filter(p => p !== countryName) :
        [...prevCountries, countryName]
    ))
  }

  const highlightCountry = (countryName: string) => {
    setSelectedCountries(prevCountries =>
      prevCountries.includes(countryName) ?
        prevCountries : [...prevCountries, countryName]
    )
  }

  const highlightCountries = (countriesName: string[]) => {
    setSelectedCountries(prevCountries => (
      prevCountries.concat(countriesName.filter(i => !prevCountries.includes(i))))
    )
    // console.log(countriesName, 'countries name');
    // console.log(selectedCountries, 'selected countries');
  }

  // const highlightCountries = (countryName: string[]) => {
  //   for (const )
  //   setSelectedCountries()
  // }



  

  return (
    <WorldMapContext.Provider value={{
      isCountryHighlighted,
      toggleCountry,
      highlightCountries,
      highlightCountry,
      selectedCountries
    }}>
      {children}
    </WorldMapContext.Provider>
  )
}

export default WorldMapProvider;

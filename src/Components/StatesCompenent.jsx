import React, { useState, useEffect } from "react";

const SelectorComp = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // selection items to be stored

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const getCountryList =
    "https://crio-location-selector.onrender.com/countries";

  useEffect(() => {
    fetch(getCountryList)
      .then((data) => data.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
    if (selectedCountry) {
      const getStateList = `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`;

      fetch(getStateList)
        .then((data) => data.json())
        .then((data) => {
          setStates(data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [selectedCountry]);
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const getCityList = `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`;

      fetch(getCityList)
        .then((data) => data.json())
        .then((data) => {
          setCities(data);
          //   setSelectedState("");
          //   setCities([]);
          //   setSelectedCity("");
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [selectedCountry, selectedState]);

  return (
    <div>
      <h1>Select Location</h1>

      <select
        value={selectedCountry}
        onChange={(e) => {
          setSelectedCountry(e.target.value);
        }}
        disabled={!countries.length}
      >
        <option value="" disabled>
          Select Country
        </option>
        {countries.map((country, index) => (
          <option 
          key={index}
          value={country}>{country}</option>
        ))}
      </select>
      <select
        value={selectedState}
        onChange={(e) => {
          setSelectedState(e.target.value);
        }}
        disabled={!states.length}
      >
        <option value="" disabled>
          Select State
        </option>
        {states.map((country, index) => (
          <option 
          key={index}
          value={country}>{country}</option>
        ))}
      </select>
      <select
        value={selectedCity}
        onChange={(e) => {
          setSelectedCity(e.target.value);
        }}
        disabled={!cities.length}
      >
        <option value="" disabled>
          Select City
        </option>
        {cities.map((country, index) => (
          <option 
           key={index}
          value={country}>{country}</option>
        ))}
      </select>
      {selectedCity && (
        <h2 style={{ fontWeight: 400 }}>
          You selected{" "}
          <span style={{ fontWeight: 600, fontSize: 35 }}>
            {selectedCity},{" "}
          </span>
          {/* <span style={{fontWeight: 400}}> */}
          {selectedState}, {selectedCountry}
          {/* </span> */}
        </h2>
      )}
    </div>
  );
};

export default SelectorComp;

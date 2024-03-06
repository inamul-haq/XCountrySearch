import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function getCountries(){
      try{
        let data = await axios.get('https://restcountries.com/v3.1/all')
        setAllCountries(data.data);
        setFilteredCountries(data.data);
      }
      catch(error){
        console.error("Error fetching data: ", error)
      }
    };
    getCountries();
  }, []);

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchInput(searchText);
    const filtered = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const countryCard = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const searchBar= {
    margin:"10px",
    padding:"10px",
    width:'50vw',
    display:"flex",
    justifyContent: "center",
    
  };

  const searchContainer={
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#ebeae8',
  }


  return (
    <div>
      <div style={searchContainer}>
        <input value={searchInput} onChange={handleSearch} style={searchBar} placeholder="Search for country" type="text"></input>
      </div>
    <div style={containerStyle}>
      {filteredCountries.map((country) => (
        <div key={country.cc3} style={countryCard}>
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            style={imageStyle}
          />
          <h2>{country.name.common}</h2>
        </div>
      ))}
    </div>
    </div>
  );
}

import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";

//website to call covid data api
//https://disease.sh/v3/covid-19/countries
const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        //change lat and lng
        //console.log(data);
        //console.log([data.countryInfo.lat, data.countryInfo.long]);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      })
      .catch((e) => console.log(e.message));
  };
  //console.log(countryInfo);
  //console.log(country);
  return (
    <AppContainer>
      <AppLeft>
        <Header>
          <h1 style={{ color: "red" }}>COVID-19 TRACKER</h1>
          <AppDropDownFormControl>
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              {/* Loop through all the countries and show the drop down list of the options */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country, i) => (
                <MenuItem key={i} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </AppDropDownFormControl>
        </Header>

        <StatsContainer>
          <InfoBox
            isred={true}
            active={Boolean(casesType === "cases")}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo?.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            active={Boolean(casesType === "recovered")}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo?.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            isred={true}
            active={Boolean(casesType === "deaths")}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo?.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </StatsContainer>

        <Map
          casesType={casesType}
          country={country}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </AppLeft>
      <AppRight>
        <CardContent
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 style={{ padding: "10px" }}>Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </AppRight>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled("div")`
  display: flex;
  justify-content: space-evenly;
  padding: 20px;

  @media (max-width: 990px) {
    flex-direction: column;
  }
`;

const AppDropDownFormControl = styled(FormControl)`
  background-color: white;
`;

const AppLeft = styled("div")`
  flex: 0.9;
  display: flex;
  flex-direction: column;

  &.map {
    flex: 1;
  }
`;

const AppRight = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const Header = styled("div")`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const StatsContainer = styled("div")`
  display: flex;
  justify-content: space-between;
`;

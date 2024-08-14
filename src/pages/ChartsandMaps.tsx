import React from 'react';
import { Line } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {HistoricalData, CountryData} from '../types/types'
import L from 'leaflet';
import { useQuery } from 'react-query';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'leaflet/dist/leaflet.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });
  


const ChartsAndMaps: React.FC = () => {
  const { data: chartData, isLoading: chartLoading } = useQuery<HistoricalData>('chartData', async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    return response.json();
  });

  const { data: countriesData, isLoading: countriesLoading } = useQuery<CountryData[]>('countriesData', async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/countries');
    return response.json();
  });

  const lineChartData = chartData
    ? {
        labels: Object.keys(chartData.cases),
        datasets: [
          {
            label: 'Cases',
            data: Object.values(chartData.cases),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
          {
            label: 'Deaths',
            data: Object.values(chartData.deaths),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
          },
          {
            label: 'Recovered',
            data: Object.values(chartData.recovered),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
          },
        ],
      }
    : null;

    
  return (
    <div className="p-4" style={{width: '80vw'}}>
      <h1 className="text-2xl mb-4">Charts and Maps Page</h1>
      <div className="mb-8">
        <h2 className="text-xl mb-2">COVID-19 Cases Over Time</h2>
        {chartLoading ? (
          <p>Loading chart...</p>
        ) : (
          lineChartData && <Line data={lineChartData} />
        )}
      </div>
      <div>
        <h2 className="text-xl mb-2">Map of COVID-19 Cases by Country</h2>
        {countriesLoading ? (
          <p>Loading map...</p>
        ) : (
            <div className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
            <MapContainer
            center={[35.8333,14.5833]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {countriesData?.map((country) =>
              country.countryInfo.lat && country.countryInfo.long ? (
            <Marker
            position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup> 
              <div>
                      <strong>{country.country}</strong>
                      <p>Active: {country.active}</p>
                      <p>Recovered: {country.recovered}</p>
                      <p>Deaths: {country.deaths}</p>
                    </div>
              </Popup>
            </Marker>
              ):null
            )}
          </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartsAndMaps;

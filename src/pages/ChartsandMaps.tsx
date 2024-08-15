import React from 'react';
import { Line } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { HistoricalData, CountryData } from '../types/types'
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
    <div className="p-4 w-full">
      <h1 className="text-2xl mb-4">Charts and Maps Page</h1>
      <div className="mb-8">
        <h2 className="text-xl mb-2">COVID-19 Cases Over Time</h2>
        {chartLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader">Loading...</div>
          </div>
        ) : (
          lineChartData && <Line data={lineChartData} />
        )}
      </div>
      <div>
        <h2 className="text-xl mb-2">Map of COVID-19 Cases by Country</h2>
        {countriesLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader">Loading...</div>
          </div>
        ) : (
          <div className="w-full h-96 overflow-hidden mt-6">
            <MapContainer
              center={[20, 0]}
              zoom={2}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%"}}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {countriesData?.map((country) =>
                country.countryInfo.lat && country.countryInfo.long ? (
                  <Marker
                    key={country.country}
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
                ) : null
              )}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartsAndMaps;

import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';

interface WeatherData {
    location: {
        region: string;
        name: string;
    };
    current: {
        temp_f: string;
        feelslike_f: string;
        condition: {
            text: string;
            icon: string;
        };
    };
}

interface ForecastItem {
    date: string;
    day: {
        condition: {
        icon: string;
        text: string;
        };
        maxtemp_f: number;
        mintemp_f: number;
    };
}

const key = 'de5b188350294df9978221448231608';

export const useFetch = (zip: string) => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get<WeatherData>(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${zip}`);
                setData(response.data);
            } catch (error) {
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    return { data, loading, error };
};

export const useFetchDays = (zip: string, days: string) => {
    const [data, setData] = React.useState<ForecastItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchForecast = async () => {
          try {
            const response = await axios.get(
              `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${zip}&days=${days}`
            );
            const forecast = response.data.forecast.forecastday;
            setData(forecast);
          } catch (error) {
            setError('An error occurred while fetching data.');
          } finally {
            setLoading(false);
        }
        };
    
        fetchForecast();
      }, []);

    return { data, loading, error };
};

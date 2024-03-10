import React, { useState, useEffect } from 'react';
import './openWeatherMap.css';

const Weather = () => {
    const [coordinates, setCoordinates] = useState(null);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const fetchWeather = async () => {
        try {
            if (!coordinates) {
                return;
            }

            const { latitude, longitude } = coordinates;
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
            );

            if (!response.ok) {
                throw new Error(`Weather API request failed with status ${response.status}`);
            }

            const data = await response.json();
            setWeather(data);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    };

    const getGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoordinates({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Error getting location', error);
                    setError('Failed to retrieve location');
                    setLoading(false);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            setError('Geolocation is not supported by this browser.');
            setLoading(false);
        }
    };

    useEffect(() => {
        getGeolocation();
    }, []);

    useEffect(() => {
        if (coordinates) {
            fetchWeather();
        }
    }, [coordinates]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!weather) {
        return <div>No weather data available.</div>;
    }

    return (
            <div className="weather">

                <h3>{weather.name}</h3>
                <p>날씨: {weather.weather[0].description}</p>
                {weather.weather[0].icon && (
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                        alt="Weather Icon"
                    />
                )}
                {weather.main && <p>온도: {weather.main.temp}</p>}
                {weather.main && <p>체감 온도: {weather.main.feels_like}</p>}
                {weather.main && <p>습도: {weather.main.humidity}</p>}
            </div>
    );
};

export default Weather;

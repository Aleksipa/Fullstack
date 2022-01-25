import React from 'react'

const Weather = ({ weatherData }) => (
    <>
        {weatherData.main && (
            <div>
                <h3>Weather in {weatherData?.name}</h3>
                <div><strong>temperature</strong> {weatherData?.main.temp} Celcius</div>
                <div><strong>wind:</strong> {weatherData?.wind.speed} km/h direction {weatherData?.wind.deg}</div>
            </div>
        )}
    </>
)

export default Weather



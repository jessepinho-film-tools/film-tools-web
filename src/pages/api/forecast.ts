import type { NextApiRequest, NextApiResponse } from 'next'

import Forecast from '@/types/Forecast'

const getSimpleForecastForDate = (
  forecastData: any,
  date?: any
): Forecast | {} => {
  const days = forecastData.forecast.forecastday

  let simpleForecast: Forecast | {} = {}

  days.forEach((day: any) => {
    if (day.date !== date) return
    simpleForecast = {
      highC: Math.round(day.day.maxtemp_c),
      highF: Math.round(day.day.maxtemp_f),
      lowC: Math.round(day.day.mintemp_c),
      lowF: Math.round(day.day.mintemp_f),
      sunrise: day.astro.sunrise,
      sunset: day.astro.sunset,
      condition: day.day.condition.text,
    }
  })

  return simpleForecast
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Forecast | {}>
) {
  return fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&days=14&q=${req.query.latlng}`
  )
    .then((res) => res.json())
    .then((forecastData) =>
      res
        .status(200)
        .json(getSimpleForecastForDate(forecastData, req.query.date))
    )
    .catch((error) => res.json(error))
}

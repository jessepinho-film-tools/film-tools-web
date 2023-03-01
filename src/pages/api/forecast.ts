// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
  | {
      highC: number
      highF: number
      lowC: number
      lowF: number
      sunrise: string
      sunset: string
      condition: string
    }
  | {}

const getSimpleForecastForDate = (forecastData: any, date?: any): Data => {
  const days = forecastData.forecast.forecastday

  let simpleForecast: Data = {}

  days.forEach((day: any) => {
    if (day.date !== date) return
    simpleForecast = {
      highC: day.day.maxtemp_c,
      highF: day.day.maxtemp_f,
      lowC: day.day.mintemp_c,
      lowF: day.day.mintemp_f,
      sunrise: day.astro.sunrise,
      sunset: day.astro.sunset,
      condition: day.day.condition.text,
    }
  })

  return simpleForecast
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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

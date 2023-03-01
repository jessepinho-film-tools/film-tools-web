// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&days=14&q=${req.query.latlng}`
  )
    .then((res) => res.json())
    .then((forecast) => res.status(200).json(forecast))
    .catch((error) => res.json(error))
}

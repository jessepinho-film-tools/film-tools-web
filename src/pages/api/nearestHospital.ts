import type { NextApiRequest, NextApiResponse } from 'next'

const getAddresses = (resultFromGoogle: any) =>
  resultFromGoogle?.results.map((result: any) => ({
    name: result.name,
    address: result.vicinity,
    coordinates: result.geometry.location,
  }))

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  return fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.latlng}&rankby=distance&type=hospital&key=${process.env.GOOGLE_MAPS_SERVER_SIDE_API_KEY}`
  )
    .then((res) => res.json())
    .then((hospitals) => res.status(200).json(getAddresses(hospitals)))
    .catch((error) => res.json(error))
}

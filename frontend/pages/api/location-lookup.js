import debug from 'debug'

const info = debug('app/location-form-handler')
const error = debug('error/location-form-handler')

const searchURL = 'http://api.geonames.org/searchJSON'

const API_USERNAME = process.env.API_USERNAME
const API_PASSWORD = process.env.API_PASSWORD

/**
 * Constructs query based on provided input 'location',
 * and sends json back to client
 *
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse } res
 */
export default async function handler(req, res) {
    try {
        const { body } = req
        info('request body is: ', body)
        const data = JSON.parse(body)

        const searchQuery = new URL(searchURL)
        searchQuery.searchParams.set('q', data?.locationText)
        searchQuery.searchParams.set('username', API_USERNAME)
        searchQuery.searchParams.set('password', API_PASSWORD)
        searchQuery.searchParams.set('maxRows', 10)

        info('Constructed search query: ', searchQuery.toString())

        const resSearch = await fetch(searchQuery)
        const searchData = await resSearch.json()

        res.status(200).json({ error: false, locations: searchData.geonames })
    } catch (err) {
        error('Something went wrong: ', err)
        res.status(500).end({
            error: true,
            message: err?.message || 'Something went wrong',
        })
    }
}

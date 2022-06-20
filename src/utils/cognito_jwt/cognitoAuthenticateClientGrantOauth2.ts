import axios, { AxiosResponse, AxiosInstance, AxiosError } from 'axios'
import bufferFrom from 'buffer-from'

const cognitoAuthenticateClientGrantOauth2 = async (
    url: string,
    clientId: string,
    clientSecret: string,
    scope?: string
): Promise<string | Error> => {
    if (url === '' || clientId === '' || clientSecret === '') {
        throw new Error('cognitoAuthenticateClientGrantOauth2: url, clientId, clientSecret are required')
    }

    const client: AxiosInstance = axios.create({
        baseURL: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + bufferFrom(clientId + ':' + clientSecret).toString('base64'),
        },
    })

    const body: string = `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials&scope=${scope}`

    try {
        const response: AxiosResponse = await client.post(url, body)
        return response.data.access_token ? response.data.access_token : 'undefined'

        // @ts-ignore
    } catch (error: AxiosError) {
        return error.response.data.message
    }
}

export default cognitoAuthenticateClientGrantOauth2

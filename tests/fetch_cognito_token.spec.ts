import fetch_cognito_access_token from '../src/utils/cognito_jwt/fetch_cognito_access_token'
const axios = require('axios')

const url: string = 'https://cognito-idp.us-east-1.amazonaws.com/us-east-112345678900'
const clientId: string = 'djc98u3jiedmi283eu928&'
const clientSecret: string = 'aSdxd892iujendek328uedj'
const scope: string = 'resourceServerIdentifier1/scope1'
const mock_jwt: string ='eyJz9sdfsdfsdfsd'

jest.mock('axios')

describe('fetch_cognito_access_token', () => {
    beforeAll(() => {
        axios.create.mockReturnThis()
    })

    it('should return a promise', () => {
        // @ts-ignore
        axios.post.mockResolvedValueOnce({ data: { access_token: mock_jwt } })

        expect(fetch_cognito_access_token(url, clientId, clientSecret, scope)).toBeInstanceOf(Promise)
    })

    it('should return a promise that resolves to an string, when request is successful', async () => {
        // @ts-ignore
        axios.post.mockResolvedValueOnce({ data: { access_token: mock_jwt } })

        const result: string | Error = await fetch_cognito_access_token(url, clientId, clientSecret, scope)
        expect(typeof result).toBe('string')
    })

    it('should return a promise that resolves to an JWT Access Token string when request is successful', async () => {
        // @ts-ignore
        axios.post.mockResolvedValueOnce({ data: { access_token: mock_jwt } })

        const result: string | Error = await fetch_cognito_access_token(url, clientId, clientSecret, scope)
        expect(result).toBe(mock_jwt)
    })

    it('should return a promise that rejects to an Error message when request is unsuccessful', async () => {
        // @ts-ignore
        axios.post.mockRejectedValueOnce({
            response: { data: { message: 'The server did not understand the operation that was requested.' } },
        })

        try {
            await fetch_cognito_access_token(url, clientId, clientSecret, scope)
        } catch (e) {
            expect(e).toEqual(new Error('The server did not understand the operation that was requested.'))
        }
    })

    it('should return a promise that rejects to an Error message when url is an empty string', async () => {
        try {
            await fetch_cognito_access_token('', clientId, clientSecret)
        } catch (e) {
            expect(e).toEqual(new Error('fetch_cognito_access_token: url, clientId, clientSecret are required'))
        }
    })

    it('should return a promise that rejects to an Error message when clientId is an empty string', async () => {
        try {
            await fetch_cognito_access_token(url, '', clientSecret)
        } catch (e) {
            expect(e).toEqual(new Error('fetch_cognito_access_token: url, clientId, clientSecret are required'))
        }
    })

    it('should return a promise that rejects to an Error message when clientSecret is an empty string', async () => {
        try {
            await fetch_cognito_access_token(url, clientId, '')
        } catch (e) {
            expect(e).toEqual(new Error('fetch_cognito_access_token: url, clientId, clientSecret are required'))
        }
    })
})

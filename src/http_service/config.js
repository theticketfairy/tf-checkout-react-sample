import axios from 'axios'
import { ENV } from '../constants/env'

const headers = {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
    ...(ENV.X_SOURCE_ORIGIN
        ? {
            'X-Source-Origin': ENV.X_SOURCE_ORIGIN,
            //Temporary for development - https://test.ticketfairy.com
            'Authorization': 'Basic dGVzdDp0dGY='
        }
        : {}
    ),
}

export const baseRequest = axios.create({
    baseURL: `${ENV.API_BASE}`,
    withCredentials: true,
    headers
})
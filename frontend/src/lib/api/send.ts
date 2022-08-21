import env, { API_COOKIE, API_URL } from "../env";
import { removeLeadingAndTrailingSlash } from "../helpers";

export interface Request {
    method: string;
    path: string;
    data?: Record<string, any>;
    token?: string;
    multipart?: boolean;
}


const base = API_URL;
async function send(request: Request) {
    const { method, path, data, token, multipart } = request;
    const opts: RequestInit = {
        method
    };
    const url = API_URL + (path ? '/' + removeLeadingAndTrailingSlash(path) : '');
    try {
        opts.headers = {};
        if (data) {
            if (!multipart) {
                opts.headers['Content-Type'] = 'application/json';
                opts.body = JSON.stringify(data);
            } else {
                opts.body = data as FormData;
            }
        }
        if (token) {
            opts.headers['cookie'] = `${API_COOKIE}=${token}`;
        }
        if (!['/auth/login', '/auth/registration'].includes(path)) {
        }
        opts.credentials = 'include'

        const response = await fetch(url, opts);
        if (response.ok) {
            const result = await response.text();
            try {
                return { status: 1, data: await JSON.parse(result) };
            } catch (error: any) {
                return { status: -1, message: error.message };
            }
        }
        try {
            const _response = await response.json();
            return {
                status: -1, message: _response.message || response.statusText || 'Unexpected error',
                statusCode: response.status
            };
        } catch (error: any) {
            return {
                status: -1,
                message: response.statusText || 'Unexpected error',
                statusCode: response.status
            };
        }

    } catch (error: any) {
        return { status: -1, message: error.message, statusCode: 500 };
    }
}
export default send;

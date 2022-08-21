import send from './send';


function get(path: string, token?: string) {
	return send({ method: 'GET', path, token, });
}
function del(path: string, token?: string) {
	return send({ method: 'DELETE', path, token, });
}

function post(path: string, data: object, token?: string) {
	return send({ method: 'POST', path, data, token, });
}
function postFile(path: string, data: FormData, token?: string) {
	return send({ method: 'POST', path, data, token, multipart: true, });
}

function put(path: string, data: object, token?: string) {
	return send({ method: 'PUT', path, data, token, });
}


export { get, post, del, put, postFile };

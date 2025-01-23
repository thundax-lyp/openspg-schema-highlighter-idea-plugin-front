export const post = async <T = unknown>(url: string, data: any, headers: any = {}) => {
	let body = data
	if (data instanceof FormData) {
		body = data
	} else {
		headers = {
			'Content-Type': 'application/json;charset=UTF-8',
			...headers,
		}
		if (typeof data !== 'string') {
			body = JSON.stringify(data)
		}
	}

	return fetch(url, {
		method: 'POST',
		headers: headers,
		body
	}).then(r => r.json()).then((wrapper) => {
		if (wrapper.code !== 0) {
			console.log(wrapper.message || '网络请求错误')
			return
		}
		return wrapper.data

	}).catch(e => {
		console.log(e.description)
	})
}

export default {
	post,
	// postStream,
}

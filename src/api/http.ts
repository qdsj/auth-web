const baseUrl = import.meta.env.VITE_BASE_URL;

const fetchApi = (url: string, options: RequestInit & { isNeedResponse?: boolean }) => {
	return fetch(baseUrl + url, options).then(async (res) => {
		if (res.status >= 200 && res.status < 400) {
			if (options.isNeedResponse) return res;
			return res.json();
		}
		throw (await res.json()).message;
	});
};

const postFetch = (url: string, data: Record<string, any>, options?: { isNeedResponse?: boolean }) => {
	return fetchApi(url, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(data),
		...options,
	});
};

const getFetch = (url: string) => {
	return fetchApi(url, { method: "GET" });
};

export { postFetch, getFetch };

const fetchApi = (url: string, options: RequestInit) => {
	return fetch(url, options).then(async (res) => {
		if (res.status >= 200 && res.status < 400) {
			return res.json();
		}
		throw (await res.json()).message;
	});
};

const postFetch = (url: string, data: Record<string, any>) => {
	return fetchApi(url, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(data),
	});
};

const getFetch = (url: string) => {
	return fetchApi(url, { method: "GET" });
};

const register = (username: string, password: string) => {
	return postFetch("/api/auth/register", { username, password });
};

const login = (username: string, password: string) => {
	return postFetch("/api/auth/login", { username, password });
};

const logout = () => {
	return getFetch("/api/auth/logout");
};

export { register, login, logout };

const isProduction = import.meta.env.PROD;
const baseUrl = isProduction ? "http://dev.qdsj.com/server/authqdsj" : "/api";

const fetchApi = (url: string, options: RequestInit) => {
	return fetch(baseUrl + url, options).then(async (res) => {
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
	return postFetch("/auth/register", { username, password });
};

const login = (username: string, password: string) => {
	return postFetch("/auth/login", { username, password });
};

const logout = () => {
	return getFetch("/auth/logout");
};

export { register, login, logout };

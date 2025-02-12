const isProduction = import.meta.env.PROD;
const baseUrl = isProduction ? "https://dev.qdsj.top/server/authqdsj" : "/api";

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

const register = (username: string, password: string) => {
	return postFetch("/auth/register", { username, password });
};

const login = async (username: string, password: string) => {
	// 登录成功之后，需要将用户信息交给打开它的页面
	// 但是这个页面并不是我们的页面，而是第三方页面
	// 所以我们需要将用户信息交给第三方页面
	try {
		const response = await postFetch("/auth/login", { username, password }, { isNeedResponse: true });
		if (response.status >= 200 && response.status <= 400) {
			const token = response.headers.get("token");
			if (token) {
				sendTokenToOpener(token);
				return true;
			}
		}
		return true;
	} catch {
		return false;
	}
};

const sendTokenToOpener = (token: string) => {
	if (!token || !window.opener) return false;
	window.opener.postMessage({ type: "auth-token", token }, "*");

	window.addEventListener("message", (event) => {
		if (event.data.type === "auth-token") {
			const urlParams = new URLSearchParams(window.location.search);
			setTimeout(() => {
				window.location.href = urlParams.get("redirect") || "https://qdsj.top";
			}, 1000);
		}
	});

	return true;
};

const logout = () => {
	return getFetch("/auth/logout");
};

export { register, login, logout };

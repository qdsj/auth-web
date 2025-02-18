import { message } from "antd";
import { getFetch, postFetch } from "./http";

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
	if (!token) return;
	if (!window.opener) {
		localStorage.setItem("refresh-token", token);
		setTimeout(() => {
			window.location.href = import.meta.env.VITE_DEFAULT_REDIRECT;
		}, 2000);
	} else {
		redirectOpenPage(token);
	}
	return true;
};

const redirectOpenPage = (token: string) => {
	// 发送给father页面后，father页面会校验信息，校验通过就会关闭当前页面
	window.opener.postMessage({ type: "auth-token", token }, "*");

	window.addEventListener("message", (event) => {
		if (event.data.type === "close") {
			message.success("准备跳回之前页面");
		}
	});
};

const logout = () => {
	return getFetch("/auth/logout");
};

export { register, login, logout };

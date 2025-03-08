import { RegisterDto } from "../types/register.dto";
import { getFetch, postFetch } from "./http";
import { sendTokenToOpener } from "./util";

const register = (data: RegisterDto) => {
	return postFetch("/auth/register", data);
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

const logout = () => {
	return getFetch("/auth/logout");
};

export { login, logout, register };

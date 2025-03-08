import { message } from "antd";

export const sendTokenToOpener = (token: string) => {
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

export const redirectOpenPage = (token: string) => {
	// 发送给father页面后，father页面会校验信息，校验通过就会关闭当前页面
	window.opener.postMessage({ type: "auth-token", token }, "*");

	window.addEventListener("message", (event) => {
		if (event.data.type === "close") {
			message.success("准备跳回之前页面");
		}
	});
};

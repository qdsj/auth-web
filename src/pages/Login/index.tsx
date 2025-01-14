import { Button, Input, message, Form } from "antd";
import { login } from "../../api/auth";
import { useLocation } from "react-router";

type FieldType = {
	username: string;
	password: string;
};

export default function Login() {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const redirect = searchParams.get("redirect");

	const [messageApi, contextHolder] = message.useMessage();

	const loginClick = async (username: string, password: string) => {
		try {
			await login(username, password);

			messageApi.success("登录成功");
			setTimeout(() => {
				window.location.href = redirect || "https://qdsj.com";
			}, 1000);
		} catch (error) {
			messageApi.error(error as string);
		}
	};

	const onFinish = (values: FieldType) => {
		console.log(values);
		loginClick(values.username, values.password);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div>
			{contextHolder}
			<center>
				<h2 className='text-2xl font-bold mt-[10vh]'>登录</h2>
			</center>
			<div className='mt-[10vh] flex justify-center items-center '>
				<div className='w-[600px] w-max-[90vw] shadow-md p-10'>
					<Form
						name='register'
						labelCol={{ span: 4 }}
						layout='vertical'
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}>
						<Form.Item<FieldType>
							label='用户名'
							name='username'
							rules={[{ required: true, message: "请输入用户名" }]}>
							<Input />
						</Form.Item>
						<Form.Item<FieldType>
							label='密码'
							name='password'
							rules={[{ required: true, message: "请输入密码" }]}>
							<Input.Password />
						</Form.Item>

						<Form.Item<FieldType>>
							<Button type='primary' htmlType='submit' className='w-full'>
								登录
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}

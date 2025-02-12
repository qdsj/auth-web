import { Button, Form, Input, message } from "antd";
import { login } from "../../api/auth";

type FieldType = {
	username: string;
	password: string;
};

export default function Login() {
	const loginClick = async (username: string, password: string) => {
		try {
			const isSucceed = await login(username, password);
			if (isSucceed) {
				message.success("登录成功");
			} else {
				message.error("登录失败");
			}
		} catch (error) {
			message.error(error as string);
		}
	};

	const onFinish = (values: FieldType) => {
		loginClick(values.username, values.password);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div>
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
						<div>
							<Button
								type='link'
								onClick={() => {
									window.location.href = "register";
								}}>
								注册
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}

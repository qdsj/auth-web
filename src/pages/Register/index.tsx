import { Button, Form, Input, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import { useState } from "react";
import { RegisterDto } from "../../types/register.dto";

type FieldType = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export default function Register() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const registerClick = async (data: RegisterDto) => {
		setLoading(true);
		try {
			await register(data);

			message.success("注册成功");
			setTimeout(() => {
				navigate("/login");
				setLoading(false);
			}, 1000);
		} catch (error) {
			message.error(error as string);
		}
	};

	const onFinish = (values: FieldType) => {
		console.log(values);
		registerClick(values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div>
			<center>
				<h2 className='text-2xl font-bold mt-[10vh]'>注册</h2>
			</center>
			<div className='mt-[10vh] flex justify-center items-center '>
				<Spin spinning={loading} tip='loading...'>
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
								label='邮箱'
								name='email'
								rules={[
									{ required: true, message: "请输入邮箱" },
									{
										pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
										message: "邮箱格式不正确",
									},
								]}>
								<Input />
							</Form.Item>
							<Form.Item<FieldType>
								label='密码'
								name='password'
								rules={[{ required: true, message: "请输入密码" }]}>
								<Input.Password />
							</Form.Item>
							<Form.Item<FieldType>
								label='确认密码'
								name='confirmPassword'
								dependencies={["password"]}
								rules={[
									{ required: true, message: "请输入密码" },
									({ getFieldValue }) => ({
										validator: (_, value) => {
											if (!value || value == getFieldValue("password")) return Promise.resolve();

											return Promise.reject("两次密码不一致");
										},
									}),
								]}>
								<Input.Password />
							</Form.Item>

							<Form.Item<FieldType>>
								<Button type='primary' htmlType='submit' className='w-full'>
									注册
								</Button>
							</Form.Item>
							<div>
								<Button
									type='link'
									onClick={() => {
										navigate("/login");
									}}>
									已有账号？去登录
								</Button>
							</div>
						</Form>
					</div>
				</Spin>
			</div>
		</div>
	);
}

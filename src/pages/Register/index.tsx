import { Button, Form, Input, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import { useState } from "react";

type FieldType = {
	username: string;
	password: string;
};

export default function Register() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const registerClick = async (username: string, password: string) => {
		setLoading(true);
		try {
			await register(username, password);

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
		registerClick(values.username, values.password);
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
								label='密码'
								name='password'
								rules={[{ required: true, message: "请输入密码" }]}>
								<Input.Password />
							</Form.Item>

							<Form.Item<FieldType>>
								<Button type='primary' htmlType='submit' className='w-full'>
									注册
								</Button>
							</Form.Item>
						</Form>
					</div>
				</Spin>
			</div>
		</div>
	);
}

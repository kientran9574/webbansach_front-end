import { Button, Divider, Form, Input, message } from 'antd'
import React from 'react'
import "./Register.scss"
import { Link, useNavigate } from 'react-router-dom';
import { postRegister } from '../../../service/api';
const Register = () => {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        const { fullName, email, password, phone } = values
        const res = await postRegister(fullName, email, password, phone);
        if (res && res.data) {
            message.success("Đăng ký thành công")
            navigate("/login")
        }
        else {
            message.error(res.message)
        }
    };
    return (
        <>
            <div className="bg-white p-10 mt-20 w-[600px] h-auto mx-auto rounded-lg shadow-2xl">
                <h1 className='text-center font-bold text-3xl mt-10'>Register</h1>
                <Divider></Divider>
                <div className='flex items-end justify-center py-10 flex-wrap'>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 24,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Họ tên"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    type: 'email',
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider>Or</Divider>
                    <div>Bạn đã có tài khoản-<Link className='font-bold inline-block p-1 text-blue-400' to={"/register"}>Đăng ký</Link></div>
                </div>

            </div>
        </>
    )
}

export default Register
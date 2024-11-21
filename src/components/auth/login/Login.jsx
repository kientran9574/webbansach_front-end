import { Button, Divider, Form, Input, message } from 'antd'
import React from 'react'
import "./Login.scss"
import { Link, useNavigate } from 'react-router-dom';
import { postLogin } from '../../../service/api';
import { useDispatch } from 'react-redux';
import { doLoginAccount } from '../../../redux/account/accountSlice';
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async (values) => {

    const { username, password } = values
    const res = await postLogin(username, password)
    if (res && res.data) {
      localStorage.setItem("access_token", res.data.data.access_token)
      dispatch(doLoginAccount(res.data.data.user))
      message.success('Bạn đã đăng nhập thành công')
      navigate("/")
    }
    else {
      message.error('Bạn đã đăng nhập thất bại')
    }
  };
  return (
    <>
      <div className="bg-white p-10 mt-20 w-[1280px] mx-auto rounded-lg shadow-2xl">
        <h1 className='text-center font-bold text-3xl mt-10'>Login</h1>
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
              label="Email"
              name="username"
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
              wrapperCol={{
                offset: 16,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Divider>Or</Divider>
          <div>Chưa có tài khoản ?<Link className='font-bold inline-block p-1 text-blue-400' to={"/register"}>Đăng ký</Link></div>
        </div>

      </div>
    </>
  )
}

export default Login
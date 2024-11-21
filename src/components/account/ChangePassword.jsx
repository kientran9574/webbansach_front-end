import { Button, Col, Form, Input, Row, message, notification } from 'antd'
import React from 'react'
import { callUpdatePassword } from '../../service/api'
import { useSelector } from 'react-redux'

const ChangePassword = () => {
    const [form] = Form.useForm()
    const user = useSelector(state => state.account.user)
    const onFinish = async (values) => {
        const { email, oldpass, newpass } = values
        const res = await callUpdatePassword(email, oldpass, newpass);
        if (res && res.data) {
            message.success("Cập nhật mật khẩu thành công");
            form.setFieldValue("oldpass", "")
            form.setFieldValue("newpass", "")
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })
        }

    }
    return (
        <>
            <div style={{ minHeight: 400 }}>
                <Row>
                    <Col span={1}></Col>
                    <Col span={12}>
                        <Form
                            name="Change Password"
                            onFinish={onFinish}
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Email"
                                name="email"
                                initialValue={user?.email}
                                rules={[{ required: true, message: 'Email không được để trống!' }]}
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Mật khẩu hiện tại"
                                name="oldpass"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Mật khẩu mới"
                                name="newpass"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                            >
                                <Input.Password />
                            </Form.Item>


                            <Form.Item
                            // wrapperCol={{ offset: 6, span: 16 }}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                        
                                >
                                    Xác nhận
                                </Button>
                            </Form.Item>

                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ChangePassword
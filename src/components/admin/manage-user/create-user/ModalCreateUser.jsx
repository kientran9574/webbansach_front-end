/* eslint-disable react/prop-types */
import { Col, Form, Input, Modal, Row, message } from 'antd'
import React from 'react'
import { postCreateUser } from '../../../../service/api'

const ModalCreateUser = (props) => {
    const { openModalCreate, setOpenModalCreate, getListUsers } = props
    const [form] = Form.useForm()
    const onFinish = async (values) => {
        const { fullName, email, phone, password } = values
        console.log(fullName, email, phone, password)
        const res = await postCreateUser({ fullName, email, phone, password })
        if (res && res.data) {
            message.success("Bạn đã tạo thành công")
            form.resetFields()
            setOpenModalCreate(false)
            await getListUsers()
        } else {
            message.error(res.message)
        }
    };
    return (
        <>

            <Modal title="Thêm người dùng mới" okText="Tạo" onOk={() => {
                form.submit();
            }} open={openModalCreate} onCancel={() => {
                setOpenModalCreate(false)
            }}>
                <Form
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={[16]}>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Tên hiển thị"
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
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
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
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Phone"
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
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default ModalCreateUser
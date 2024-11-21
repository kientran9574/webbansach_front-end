import { Col, Divider, Form, Input, Modal, Row, message } from 'antd'
import React, { useEffect } from 'react'
import { postCreateUser, putCreateUser } from '../../../../service/api'

const ModalUpdateUser = (props) => {
    const { openModalUpdate, setOpenModalUpdate, getListUsers, dataUpdate, setDataUpdate } = props
    const [form] = Form.useForm()

    useEffect(() => {
        console.log("check update", dataUpdate)
        form.setFieldsValue(dataUpdate)
    }, [dataUpdate])
    const onFinish = async (values) => {
        const { fullName, phone, _id } = values
        const res = await putCreateUser(fullName, phone, _id)
        if (res && res.data) {
            message.success("Bạn đã tạo thành công")
            form.resetFields()
            setOpenModalUpdate(false)
            setDataUpdate(null)
            await getListUsers()
        } else {
            message.error(res.message)
        }
    };

    return (
        <>

            <Modal title="Chỉnh sửa người dùng " okText="Sửa" onOk={() => {
                form.submit();
            }} open={openModalUpdate} onCancel={() => {
                setOpenModalUpdate(false)
                setDataUpdate(null)
            }}>
                <Divider></Divider>
                <Form
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={[16]}>
                        <Col span={24} hidden>
                            <Form.Item
                                hidden
                                labelCol={{ span: 24 }}
                                label="Id"
                                name="_id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your id!',
                                    },
                                ]}
                            >
                                <Input hidden />
                            </Form.Item>
                        </Col>
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
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input disabled />
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

export default ModalUpdateUser
import { AntDesignOutlined, UploadOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Form, Input, Row, Upload, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { callUpdateUserInfo, callUploadAvatar } from '../../service/api'
import { doUpdateUserInfo, doUploadAvatarAction } from '../../redux/account/accountSlice'

const UserInfo = () => {
    const [form] = Form.useForm()
    const user = useSelector(state => state.account.user)
    const tempAvatar = useSelector(state => state.account.tempAvatar);

    const urlAvatar = `https://webbansach-backend.onrender.com/images/avatar/${tempAvatar || user?.avatar}`

    const [userAvatar, setUserAvatar] = useState(user?.avatar ?? "")
    const dispatch = useDispatch()

    const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
        const res = await callUploadAvatar(file)
        if (res && res.data) {
            const newAvatar = res.data.data.fileUploaded
            setUserAvatar(newAvatar)
            dispatch(doUploadAvatarAction({ avatar: newAvatar }))
            onSuccess("OK")
        }
        else {
            onError("Error")
        }
    }
    const propsUpload = {
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        customRequest: handleUploadAvatar,
        onChange(info) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`Upload file thành công`);
            } else if (info.file.status === 'error') {
                message.error(`Upload file thất bại`);
            }
        },
    };
    const onFinish = async (values) => {
        const { _id, fullName, phone } = values
        const res = await callUpdateUserInfo(_id, fullName, phone, userAvatar)
        if (res && res.data) {
            dispatch(doUpdateUserInfo({ avatar: userAvatar, fullName, phone }))
            message.success("Cập nhật thông tin thành công")
            localStorage.removeItem("access_token")
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })
        }
    };
    return (
        <>
            <Row>
                <Col xs={24} md={12}>
                    <Row gutter={[30, 30]}>
                        <Col span={24}>
                            <Avatar
                                size={{ xs: 32, sm: 64, md: 80, lg: 128, xl: 160, xxl: 200 }}
                                icon={<AntDesignOutlined />}
                                src={urlAvatar}
                                shape="circle"
                            />
                        </Col>
                        <Col span={24}>
                            <Upload {...propsUpload}>
                                <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                            </Upload>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={12}>
                    <Form
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            hidden
                            labelCol={{ span: 24 }}
                            label="Email"
                            name="_id"
                            initialValue={user?.id}

                        >
                            <Input disabled hidden />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Email"
                            name="email"
                            initialValue={user?.email}

                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Tên hiển thị"
                            name="fullName"
                            initialValue={user?.fullName}
                            rules={[{ required: true, message: 'Tên hiển thị không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Số điện thoại"
                            name="phone"
                            initialValue={user?.phone}
                            rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Button onClick={() => form.submit()}>Cập nhật</Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default UserInfo
import React from 'react'
import { Button, Col, Form, Input, Row } from 'antd';
const FilterUser = (props) => {
    const [form] = Form.useForm()
    const { handleFilter, setFilter } = props
    const onFinish = (values) => {
        let query = ""
        const { fullName, email, phone } = values
        if (fullName) {
            query += `fullName=/${fullName}/i`
        }
        if (email) {
            query += `&email=/${email}/i`
        }
        if (phone) {
            query += `&phone=/${phone}/i`
        }
        if (query) {
            handleFilter(query)
        }
    };
    return (
        <>

            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label=<>
                                <span className='text-blue-400'>Tên hiển thị:</span>
                            </>
                            name="fullName"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label=<>
                                <span className='text-blue-400'>Email:</span>
                            </>
                            name="email"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label=<>
                                <span className='text-blue-400'>Phone:</span>
                            </>
                            name="phone"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col offset={21} span={24} >
                        <Button type="primary" onClick={() => {
                            form.submit()
                        }}>Tìm kiếm</Button>
                        <Button type='secondary' className='ml-3' onClick={() => {
                            form.resetFields()
                            setFilter("")

                        }}>Clear</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default FilterUser
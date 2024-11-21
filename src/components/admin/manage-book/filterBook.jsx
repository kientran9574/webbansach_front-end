import React from 'react'
import { Button, Col, Form, Input, Row } from 'antd';
const FilterBook = (props) => {
    const [form] = Form.useForm()
    const { handleFilter, setFilter } = props
    const onFinish = (values) => {
        let query = ""
        const { mainText, author, category } = values
        if (mainText) {
            query += `mainText=/${mainText}/i`
        }
        if (author) {
            query += `&author=/${author}/i`
        }
        if (category) {
            query += `&category=/${category}/i`
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
                                <span className='text-blue-400'>Tên sách:</span>
                            </>
                            name="mainText"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label=<>
                                <span className='text-blue-400'>Tác giả:</span>
                            </>
                            name="author"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label=<>
                                <span className='text-blue-400'>Thể loại:</span>
                            </>
                            name="category"
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

export default FilterBook
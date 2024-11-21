import { Modal, Form, Row, Col, Input, InputNumber, Select, Flex, message, Upload, notification } from 'antd';
import React, { useEffect, useState } from 'react'
import { callUploadBookImg, getListCategoryApi, postCreateBook } from '../../../service/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const ModalCreateBook = (props) => {
    const { openModalCreateBook, setOpenModalCreateBook, getListBook } = props
    const [listCategory, setListCategory] = useState([])
    const [loading, setLoading] = useState(false);
    const [loadingSlider, setLoadingSlider] = useState(false)
    const [imageUrl, setImageUrl] = useState();
    const [imgThumbnail, setImgThumbnail] = useState([])
    const [imgSlider, setImgSlider] = useState([])

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState("");

    const [form] = Form.useForm()
    const onFinish = async (values) => {

        if (imgThumbnail.length === 0) {
            notification.error({
                message: "Lỗi validate",
                description: "Vui lòng upload ảnh thumbnail",
            });
            return;
        }

        if (imgSlider.length === 0) {
            notification.error({
                message: "Lỗi validate",
                description: "Vui lòng upload ảnh slider",
            });
            return;
        }
        const { mainText, author, category, price, sold, quantity } = values
        const thumbnail = imgThumbnail[0].name
        console.log(thumbnail)

        const slider = imgSlider.map((item) => item.name)
        console.log(slider)
        const res = await postCreateBook(mainText, author, category, price, sold, quantity, thumbnail, slider)
        if (res && res.data) {
            message.success("Tạo 1 quyển sách thành công")
            setImgSlider([])
            setImgThumbnail([])
            setOpenModalCreateBook(false)
            form.resetFields()
            getListBook()
        } else {
            notification.error({
                message: "Lỗi tạo 1 quyển sách",
                description: res.message
            })
        }
    };
    useEffect(() => {
        handleCategory()
    }, [])
    const handleCategory = async () => {
        const res = await getListCategoryApi()
        if (res && res.data) {
            const d = res.data.data.map((item) => {
                return {
                    label: item,
                    value: item
                }
            })
            setListCategory(d)
        }
    }
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info, type) => {
        if (info.file.status === 'uploading') {
            type ? setLoadingSlider(true) : setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                type ? setLoadingSlider(false) : setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const handleCustomUpload = async ({ file, onSuccess, onError }) => {
        const res = await callUploadBookImg(file)
        console.log(res)
        if (res && res.data) {
            setImgThumbnail([
                {
                    name: res.data.data.fileUploaded,
                    uuid: file.uid
                }
            ])
            onSuccess("OK")
        }
        else {
            onError("Error")
        }
    }
    const handleCustomUploadSlider = async ({ file, onSuccess, onError }) => {
        const res = await callUploadBookImg(file)
        console.log(res)
        if (res && res.data) {
            setImgSlider((imgSlider) => [
                ...imgSlider,
                {
                    name: res.data.data.fileUploaded,
                    uid: file.uid,
                },
            ]);
            onSuccess("ok");
        } else {
            onError("Đã có lỗi khi upload file");
        }
    }
    const handlePreview = async (file) => {
        getBase64(file.originFileObj, (url) => {
            setPreviewImage(url);
            setPreviewOpen(true);
            setPreviewTitle(
                file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
            );
        });
    };
    return (
        <>
            <Modal title="Thêm sách" width={"50vw"} open={openModalCreateBook} onOk={() => {
                form.submit()
            }} onCancel={() => {
                setOpenModalCreateBook(false)
                form.resetFields()
            }}>
                <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    maskClosable={false}
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label="Tên sách"
                                labelCol={{ span: 24 }}
                                name="mainText"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your tên sách',
                                    },
                                ]}
                            >
                                <Input width={"100%"} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Tác giả"
                                labelCol={{ span: 24 }}
                                name="author"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Tác giả',
                                    },
                                ]}
                            >
                                <Input width={"100%"} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Gía tiền"
                                labelCol={{ span: 24 }}
                                name="price"

                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your giá tiền',
                                    },
                                ]}
                            >
                                <InputNumber formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} className='w-full' width={"100%"} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Thể loại"
                                labelCol={{ span: 24 }}
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your giá tiền',
                                    },
                                ]}
                            >
                                <Select
                                    defaultValue={null}
                                    showSearch
                                    allowClear
                                    className='w-full'
                                    options={listCategory}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Số lượng"
                                labelCol={{ span: 24 }}
                                name="quantity"

                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your số lượng',
                                    },
                                ]}
                            >
                                <InputNumber min={1} className='w-full' />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Đã bán"
                                labelCol={{ span: 24 }}
                                name="sold"
                                initialValue={0}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your đã bán',
                                    },
                                ]}
                            >
                                <InputNumber className='w-full' min={0} defaultValue={0} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Ảnh thumbnail"
                                labelCol={{ span: 24 }}
                                name="thumbnail"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your hình ảnh',
                                    },
                                ]}
                            >
                                <Upload
                                    name="thumbnail"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    multiple={false}
                                    maxCount={1}
                                    beforeUpload={beforeUpload}
                                    customRequest={handleCustomUpload}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                >
                                    <div>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Ảnh slider"
                                labelCol={{ span: 24 }}
                                name="slider"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your hình ảnh slider',
                                    },
                                ]}
                            >
                                <Upload
                                    name="slider"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    multiple
                                    customRequest={handleCustomUploadSlider}
                                    beforeUpload={beforeUpload}
                                    onPreview={handlePreview}
                                    onChange={(info) => handleChange(info, "slider")}
                                >
                                    <div>
                                        {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
            >
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </>
    )
}

export default ModalCreateBook
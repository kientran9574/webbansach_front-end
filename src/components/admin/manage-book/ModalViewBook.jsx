import { Badge, Descriptions, Divider, Drawer, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
const ModalViewBook = (props) => {
    const { openModalViewBook, setOpenModalViewBook, dataViewBook, setDataViewBook } = props
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([])



    useEffect(() => {
        if (dataViewBook) {
            let imgThumbnail = {}, imgSlider = []
            if (dataViewBook.thumbnail) {
                imgThumbnail = {
                    uid: uuidv4(),
                    name: dataViewBook.thumbnail,
                    status: "done",
                    url: `https://webbansach-backend.onrender.com/images/book/${dataViewBook.thumbnail}`
                }
            }
            if (dataViewBook.slider) {
                dataViewBook.slider.map((item) => {
                    imgSlider.push({
                        uid: uuidv4(),
                        name: item,
                        status: "done",
                        url: `https://webbansach-backend.onrender.com/images/book/${item}`
                    })
                })
            }
            setFileList([imgThumbnail, ...imgSlider])
        }
    }, [dataViewBook])
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    const handlePreview = async (file) => {
        setPreviewImage(file.url);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const handleCancel = () => setPreviewOpen(false);
    return (
        <>
            <Drawer title="Thông tin chi tiết Book" onClose={() => {
                setOpenModalViewBook(false)
                setDataViewBook(null)
            }} open={openModalViewBook} width={"50vw"}>
                <Descriptions title="Tên sách" column={2}>
                    <Descriptions.Item label="Tên hiển thị">
                        {dataViewBook?.mainText}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tác giả">{dataViewBook?.author}</Descriptions.Item>
                    <Descriptions.Item label="Gía tiền">

                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataViewBook?.price ?? 0)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số lượng">{dataViewBook?.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Đã mua">{dataViewBook?.sold}</Descriptions.Item>
                    <Descriptions.Item label="Thể loại">
                        <Badge status="processing" text={dataViewBook?.category} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo user">
                        {moment(dataViewBook?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày sửa user">
                        {moment(dataViewBook?.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
                    </Descriptions.Item>
                </Descriptions>
                <Divider>Ảnh Sách</Divider>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    showUploadList={
                        { showRemoveIcon: false }
                    }
                >
                    {fileList.length >= 8}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Drawer>
        </>
    )
}

export default ModalViewBook
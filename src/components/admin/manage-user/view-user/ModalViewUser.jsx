import { Badge, Descriptions, Drawer, Modal } from 'antd'
import React, { useState } from 'react'
import moment from 'moment'
const ModalViewUser = (props) => {
    const { openModalView, setOpenModalView, dataView } = props
    const handleOk = () => {
        setOpenModalView(false);
    };
    return (
        <>
            <Drawer title="Thông tin chi tiết User" onClose={() => {
                setOpenModalView(false)
            }} open={openModalView} width={"50vw"}>
                <Descriptions title="Thông tin User" column={2}>
                    <Descriptions.Item label="Tên hiển thị">
                        {dataView?.fullName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">{dataView?.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{dataView?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Role">
                        <Badge status="processing" text={dataView?.role} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo user">
                        {moment(dataView?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày sửa user">
                        {moment(dataView?.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}

export default ModalViewUser
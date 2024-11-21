import { Modal, message, Upload, Table, notification } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import * as XLSX from "xlsx"
import { postCreateUserBulk } from '../../../../service/api';
import templateFile from "./template.xlsx?url"
const UserModalImport = (props) => {
    const { openModalImport, setOpenModalImport, getListUsers } = props
    const [dataExcel, setDataExcel] = useState([])
    const { Dragger } = Upload;
    const handleOk = async () => {
        const data = dataExcel.map((item) => {
            item.password = "123456"
            return item
        })
        const res = await postCreateUserBulk(data)
        if (res && res.data) {
            notification.success({
                message: "Import thành công",
                description: `Success: ${res.data.data.countSuccess} - Error: ${res.data.data.countError}`
            })
            setDataExcel([])
            setOpenModalImport(false)
            await getListUsers()
        } else {
            notification.error({
                message: "Import thất bại",
                description: `Error: ${res.data.data.countError}`
            })
        }
    };
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    };
    const propsUpload = {
        name: 'file',
        multiple: true,
        customRequest: dummyRequest,
        accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj;
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onload = function (e) {
                        const data = new Uint8Array(reader.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const sheet = workbook.Sheets[workbook.SheetNames[0]];
                        // const json = XLSX.utils.sheet_to_json(sheet)
                        const json = XLSX.utils.sheet_to_json(sheet, {
                            header: ["fullName", "email", "phone"],
                            range: 1 //skip header row
                        });
                        console.log(json)
                        if (json && json.length > 0) setDataExcel(json)
                    }
                }
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <>
            <Modal width={"50vw"} okText="Import Data" title="Import User" open={openModalImport} onOk={() => handleOk()} onCancel={() => {
                setOpenModalImport(false);
                setDataExcel([]);
            }} okButtonProps={{
                disabled: dataExcel.length < 1
            }}>
                <Dragger {...propsUpload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files  <a onClick={e => e.stopPropagation()} href={templateFile} download className='text-lg text-blue-500'>Download Sample File</a>
                    </p>
                </Dragger>
                <div className='my-10'></div>
                <h2 className='font-bold text-lg'>Dữ liệu Upload:</h2>
                <Table dataSource={dataExcel} columns={[
                    { dataIndex: "fullName", title: "Tên hiển thị" },
                    { dataIndex: "email", title: "Email" },
                    { dataIndex: "phone", title: "Số điện thoại" }
                ]} />
            </Modal>
        </>
    )
}



export default UserModalImport
import { Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { callOrderHistory } from '../../service/api';
import moment from 'moment';
import { render } from 'react-dom';
import ReactJson from 'react-json-view';
const History = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    useEffect(() => {
        handleCallApiHistory()
    }, [])

    const handleCallApiHistory = async () => {
        const res = await callOrderHistory();
        if (res && res.data) {
            setOrderHistory(res.data.data)
        }
    }
    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (item, record, index) => <>{index + 1}</>
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAT',
            key: 'createdAT',
            render: (item, record, index) => {
                return moment(item).format("DD-MM-YYYY HH:mm:ss")
            }
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (item, record, index) => {
                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(item);
            }
        },
        {
            title: "Trạng thái",
            render: (_, { tags }) => <Tag color={"green"}>Thành công</Tag>,
        },
        {
            title: "Chi tiết",
            key: "action",
            render: (_, record) => (
                <ReactJson
                    src={record.detail}
                    name={"Chi tiết đơn mua"}
                    collapsed={true}
                    enableClipboard={false}
                    displayDataTypes={false}
                    displayObjectSize={false}
                />
            ),
        },
    ];
    return (
        <Table className='w-[1680px] mx-auto mt-5' dataSource={orderHistory} columns={columns}  />
    )
}

export default History
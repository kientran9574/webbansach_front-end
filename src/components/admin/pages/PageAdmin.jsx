import React, { useEffect, useState } from 'react'
import { callFetchDashboard } from '../../../service/api'
import CountUp from 'react-countup';
import { Card, Col, Row, Statistic } from 'antd'

const PageAdmin = () => {
    const [dashboardAdmin, setDashboardAdmin] = useState({
        countUser: 0,
        countOrder: 0
    })
    useEffect(() => {
        handleDashboard()
    }, [])
    const handleDashboard = async () => {
        const res = await callFetchDashboard()
        if (res && res.data) setDashboardAdmin(res.data.data)
    }
    const formatter = (value) => <CountUp end={value} separator=',' ></CountUp>
    return (
        <>
            <Row gutter={[40, 40]}>
                <Col span={10}>
                    <Card title="" bordered={false} style={{ width: 300 }} className='drop-shadow-2xl'>
                        <Statistic title="Tổng User" value={dashboardAdmin.countUser} formatter={formatter} />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="" bordered={false} style={{ width: 300 }} className='drop-shadow-2xl'>
                        <Statistic title="Tổng Order" value={dashboardAdmin.countOrder} formatter={formatter} />
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PageAdmin
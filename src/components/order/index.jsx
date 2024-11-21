
import React, { useState } from 'react'
import ViewDetails from './ViewDetails'
import { Button, Result, Steps } from 'antd'
import Payment from './Payment'
import { useNavigate } from 'react-router-dom'
import { SmileOutlined } from '@ant-design/icons'
const OrdersPage = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const navigate = useNavigate();
    return (
        <>
            <Steps
                className=' w-[1460px] mx-auto p-8 bg-white my-8 rounded-lg'
                size="small"
                current={currentStep}
                status={"finish"}
                items={[
                    {
                        title: 'Đơn hàng',
                    },
                    {
                        title: 'Đặt hàng',
                    },
                    {
                        title: 'Thanh toán',
                    },
                ]}
            />
            {currentStep === 0 && <ViewDetails setCurrentStep={setCurrentStep}>
            </ViewDetails>}
            {currentStep === 1 && <Payment setCurrentStep={setCurrentStep}>
            </Payment>}
            {currentStep === 2 && <Result
                icon={<SmileOutlined />}
                title="Đơn hàng đã được đặt thành công!"
                extra={<Button type="primary"
                    onClick={() => navigate('/history')}
                >Xem lịch sử</Button>}
            />}
        </>
    )
}

export default OrdersPage
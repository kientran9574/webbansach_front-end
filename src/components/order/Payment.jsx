import { DeleteTwoTone } from '@ant-design/icons'
import { Col, Divider, Form, Input, InputNumber, Radio, Row, message, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doDeleteItemCartAction, doPlaceOrder, doUpdateCart } from '../../redux/order/orderSlice'
import { useNavigate } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'
import { useForm } from 'antd/es/form/Form'
import { callPlaceOrder } from '../../service/api'

const Payment = (props) => {
    const dispatch = useDispatch()
    const carts = useSelector(state => state.order.cart)
    const [totalPrice, setTotalPrice] = useState(0);
    const user = useSelector(state => state.account.user)
    const [form] = Form.useForm()
    useEffect(() => {
        if (carts && carts.length > 0) {
            let sum = 0;
            carts.map((item) => {
                sum += item.quantity * item.detail.price;
            });
            setTotalPrice(sum);
        } else {
            setTotalPrice(0);
        }
    }, [carts])

    const handleInputChange = (value, book) => {
        if (!value && value < 1) return

        if (!isNaN(value)) {
            dispatch(doUpdateCart({ quantity: value, detail: book, _id: book._id }))
        }
    }
    const onFinish = async (values) => {
        const { name, phone, address } = values
        const detailOrder = carts.map((item) => {
            return {
                quantity: item.quantity,
                bookName: item.detail.mainText,
                _id: item.detail._id
            }
        })
        const data = {
            name: name,
            phone: phone,
            address: address,
            detail: detailOrder,
            totalPrice: totalPrice
        }
        const res = await callPlaceOrder(data)
        if (res && res.data) {
            message.success("Đặt hàng thành công")
            dispatch(doPlaceOrder())
            props.setCurrentStep(2)
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message,
            });
        }
    };
    return (
        <>


            <div className="p-10 bg-slate-400 h-auto flex gap-10">
                <div className="w-3/4">
                    {carts.map((item, index) => {
                        const currentBookPrice = item?.detail?.price ?? 0;
                        return (
                            <div className="flex items-center bg-white p-5 rounded mb-10 " key={`book-${index + 1}`}>
                                <img src={`https://webbansach-backend.onrender.com/images/book/${item.detail.thumbnail}`} alt="" className="w-[100px] h-[100px] inline-block rounded object-contain" />
                                <p className="text-sm font-semibold">{item.detail.mainText}</p>
                                <div className="flex items-center ml-44 ">
                                    <div className='text-sm font-bold'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.detail?.price ?? 0)}
                                    </div>
                                    <div className="ml-2">
                                        <InputNumber
                                            onChange={(value) => handleInputChange(value, item)}
                                            value={item.quantity}
                                        />
                                    </div>
                                </div>
                                <div className="pl-96 flex items-center gap-2">
                                    <span>Tổng:</span>
                                    <span className='font-bold'>
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(currentBookPrice * (item?.quantity ?? 0))}
                                    </span>
                                </div>
                                <DeleteTwoTone
                                    className='ml-auto'
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        dispatch(doDeleteItemCartAction({ _id: item._id }))
                                    }
                                    twoToneColor="#eb2f96"
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="w-1/4 bg-white h-auto p-3 rounded-md">
                    <Form
                        form={form}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Row gutter={[24]}>
                            <Col span={24}>
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Tên người nhận"
                                    name="name"
                                    initialValue={user?.fullName}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tên người nhận không được để trống!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Số điện thoại"
                                    initialValue={user?.phone}
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Số điện thoại không được để trống!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Địa chỉ"
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Địa chỉ không được để trống!',
                                        },
                                    ]}
                                >
                                    <TextArea autoFocus rows={4} rootClassName='textarea-payment' />
                                </Form.Item>
                            </Col>

                            <Col span={24}>  <Radio checked>Thanh toán khi nhận hàng</Radio></Col>
                            <Divider></Divider>
                            <Col span={24} className=' flex justify-between'>
                                <p className='text-base font-bold'>Tổng tiền:</p>
                                <span className="text-xl font-bold text-orange-500">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(totalPrice || 0)}
                                </span>
                            </Col>
                            <button type='submit' className='h-[48px] w-3/4 text-xl font-bold mx-auto mt-5 flex items-center justify-center text-white bg-orange-500 rounded-md' onClick={() => form.submit()}>
                                Đặt hàng ({carts?.length ?? 0})
                            </button>
                        </Row>
                    </Form>
                </div>
            </div>
        </>
    )
}
// onClick={() => props.setCurrentStep(2)}
export default Payment
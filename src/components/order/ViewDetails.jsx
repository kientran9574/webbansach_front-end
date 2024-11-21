import { DeleteTwoTone } from '@ant-design/icons'
import { Divider, InputNumber } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doDeleteItemCartAction, doUpdateCart } from '../../redux/order/orderSlice'
import { useNavigate } from 'react-router-dom'

const ViewDetails = (props) => {
    const dispatch = useDispatch()
    const carts = useSelector(state => state.order.cart)
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
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
                    <div className='flex items-center justify-between'>
                        <span className='text-lg font-semibold'>Tạm tính </span>
                        <span>
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(totalPrice || 0)}
                        </span>
                    </div>
                    <Divider></Divider>
                    <div className='flex items-center justify-between mt05'>
                        <span className='text-lg font-semibold'>Tổng tiền </span>
                        <span className='text-orange-500 text-2xl font-bold'>
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(totalPrice || 0)}
                        </span>
                    </div>
                    <Divider></Divider>
                    <button className='h-[48px] p-3 text-center text-white w-full bg-orange-500 rounded-lg mt-5' onClick={() => {
                        props.setCurrentStep(1)
                    }}>Mua hàng</button>
                </div>
            </div>
        </>
    )
}

export default ViewDetails
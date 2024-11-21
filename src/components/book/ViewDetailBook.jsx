import React, { useRef, useState } from 'react'
import ImageGallery from "react-image-gallery";
import "./ViewDetailsBook.css"
import { Rate } from 'antd';
import ModalGallery from './ModalGallery';
import { useDispatch } from 'react-redux';
import { doAddCart } from '../../redux/order/orderSlice';
const ViewDetailBook = (props) => {
    const { dataBook } = props
    const image = dataBook?.items ?? []
    const refCurrent = useRef(null)
    const [openModal, setOpenModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(null)
    const [currentQuantity, setCurrentQuantity] = useState(1)
    const dispatch = useDispatch()
    const handleOnClickImg = () => {
        setOpenModal(true)
        setCurrentIndex(refCurrent?.current?.getCurrentIndex() ?? 0)
    }
    const handleChangeButton = (type) => {
        if (type === "MINUS") {
            if (currentQuantity - 1 <= 0) return
            setCurrentQuantity(currentQuantity - 1)
        }

        if (type === "PLUS") {
            if (currentQuantity === +dataBook.quantity) return
            setCurrentQuantity(currentQuantity + 1)
        }
    }
    const handleChangeInput = (value) => {
        if (!isNaN(+value)) {
            if (+value > 0 && +value <= +dataBook.quantity) {
                setCurrentQuantity(+value)
            }
        }
    }
    const handleAddCart = (quantity, book) => {
        dispatch(doAddCart({ quantity, detail: book, _id: book._id }))
    }
    return (
        <>
            <div className=" bg-slate-100 h-full w-full p-5 ">
                <div className="flex justify-center">
                    <div className="wrap-images w-[40%]"> <ImageGallery ref={refCurrent} showPlayButton={false} //hide play button
                        showFullscreenButton={false} //hide fullscreen button
                        renderLeftNav={() => <></>} //left arrow === <> </>
                        renderRightNav={() => <></>} //right arrow === <> </>
                        slideOnThumbnailOver={true} //onHover => auto scroll
                        items={image}
                        onClick={() => handleOnClickImg()}
                    /></div>
                    <div className="wrap-content w-[60%] ml-20  ">
                        <p className='flex items-center gap-2'><span className='font-bold text-base'>Tác giả:</span><span className='text-lg font-bold text-blue-400'>{dataBook.author}</span> </p>
                        <h1 className='text-2xl font-bold mt-2'>{dataBook.mainText}</h1>
                        <div className="flex items center gap-4 mt-3">
                            <Rate value={5} disabled></Rate>
                            <p className="font-semibold">Đã bán {dataBook.sold}</p>
                        </div>
                        <p className='p-3 w-full bg-gray-300 mt-5 font-bold text-2xl text-blue-400'>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataBook.price ?? 0)}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                            <span className="text-sm font-medium">Vận chuyển</span>
                            <span className='text-sm font-medium'>Miễn phí vận chuyển</span>
                        </div>
                        <div className="flex items-center gap-10 mt-3">
                            <span>Số lượng</span>
                            <div className="flex items-center justify-center gap-1">
                                <button className='w-[28px] h-[28px] p-1 bg-white rounded' onClick={() => handleChangeButton("MINUS")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                    </svg>
                                </button>
                                <input type="text" className='inline-block w-[58px] h-[28px] bg-white rounded outline-none text-center' onChange={(event) => handleChangeInput(event.target.value)} value={currentQuantity} />
                                <button className='w-[28px] h-[28px] p-1 bg-white rounded' onClick={() => handleChangeButton("PLUS")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-10 mt-8">
                            <button className='h-[48px] w-[220px] border border-orange-500 p-2 rounded-md flex items-center justify-center gap-2 font-bold hover:shadow-lg ' onClick={() => handleAddCart(currentQuantity, dataBook)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-orange-500 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                                Thêm vào giỏ hàng
                            </button>
                            <button className='h-[48px] w-[120px] border border-white p-2 rounded-md flex items-center justify-center gap-2 font-bold hover:shadow-lg bg-orange-500 text-white'>
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalGallery openModal={openModal} setOpenModal={setOpenModal} dataBook={dataBook} currentIndex={currentIndex} image={image}></ModalGallery>
        </>
    )
}

export default ViewDetailBook
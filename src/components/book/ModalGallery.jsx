import { Col, Image, Modal, Row } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import ImageGallery from "react-image-gallery";
const ModalGallery = (props) => {
    const { openModal, setOpenModal, dataBook, currentIndex } = props
    const image = dataBook?.items ?? []
    const refCurrent = useRef(null)
    const [activeThumbnail, setActiveThumbnail] = useState(null)
    useEffect(() => {
        if (openModal) {
            setActiveThumbnail(currentIndex)
        }
    }, [openModal, currentIndex])
    return (
        <>

            <Modal title="Hình ảnh chi tiết" open={openModal} onCancel={() => setOpenModal(false)} width={"60vw"} footer={null} closable={false}>
                <Row>
                    <Col span={16}>
                        <ImageGallery ref={refCurrent} showPlayButton={false} //hide play button
                            showFullscreenButton={false} //hide fullscreen button
                            renderLeftNav={() => <></>} //left arrow === <> </>
                            renderRightNav={() => <></>} //right arrow === <> </>
                            slideOnThumbnailOver={true}
                            showThumbnails={false} //onHover => auto scroll
                            items={image}
                            startIndex={currentIndex}
                            slideDuration={0}
                            onSlide={(i) => setActiveThumbnail(i)}
                        />
                    </Col>
                    <Col span={8}>
                        <Row gutter={[20, 20]}>
                            {image.map((item, index) => (
                                <>
                                    <Col className="flex " key={index}>
                                        <Image
                                            className='cursor-pointer'
                                            src={item.original}
                                            width={100}
                                            height={100}
                                            preview={false}
                                            onClick={() => {
                                                refCurrent.current.slideToIndex(index);
                                            }}
                                        ></Image>
                                        <div className={activeThumbnail === index ? "active:shadow-2xl cursor-pointer" : ""}></div>
                                    </Col>
                                </>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default ModalGallery
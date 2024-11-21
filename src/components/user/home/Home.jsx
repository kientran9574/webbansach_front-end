import { Col, Row, Button, Checkbox, Form, Input, Divider, InputNumber, Tabs, Rate, Pagination } from 'antd'
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosRefresh } from "react-icons/io";
import React, { useEffect, useState } from 'react'
import { getListBooksApi, getListCategoryApi } from '../../../service/api';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [listCategory, setListCategory] = useState([])
    const [listBook, setListBook] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [filter, setFilter] = useState("")
    const [sorter, setSorter] = useState("sort=-sold")
    const navigate = useNavigate()
    const items = [
        {
            key: 'sort=-sold',
            label: 'Phổ biến',
            children: <></>,
        },
        {
            key: 'sort=-updatedAt',
            label: 'Hàng mới',
            children: <></>,
        },
        {
            key: 'sort=price',
            label: 'Gía thấp đến cao',
            children: <></>,
        },
        {
            key: 'sort=-price',
            label: 'Gía cao đến thấp',
            children: <></>,
        },
    ];
    useEffect(() => {
        handleCategory()
    }, [])
    const handleCategory = async () => {
        const res = await getListCategoryApi()
        if (res && res.data) {
            const d = res.data.data.map((item) => {
                return {
                    label: item,
                    value: item
                }
            })
            setListCategory(d)
        }
    }
    useEffect(() => {
        getListBook()
    }, [current, pageSize, filter, sorter])
    const getListBook = async () => {
        let query = `current=${current}&pageSize=${pageSize}`
        if (filter) {
            query += `&${filter}`
        }
        if (sorter) {
            query += `&${sorter}`
        }
        const res = await getListBooksApi(query)
        if (res && res.data) {
            setListBook(res.data.data.result)
            setTotal(res.data.data.meta.total)
        }
    }
    const onFinish = (values) => {
        if (values.range.from >= 0 && values.range.to >= 0) {
            let c = `price>=${values.range.from}&price<=${values.range.to}`
            if (values.category.length > 0) {
                const cate = values.category.join(",")
                c += `&category=${cate}`
            }
            setFilter(c)
        }
    };
    const handleChangeFilter = (changedValues, values) => {
        if (changedValues.category) {
            const cate = values.category
            if (cate && cate.length > 0) {
                const c = cate.join(",")
                setFilter(`category=${c}`)
            }
            else {
                setFilter("")
            }
        }
    }
    const handleChangePagination = (pagination) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1)
        }
    }
    const nonAccentVietnamese = (str) => {
        str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    const convertSlug = (str) => {
        str = nonAccentVietnamese(str);
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
        const to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    }
    const handleClickRedirect = (book) => {
        const slug = convertSlug(book.mainText)
        navigate(`/book/${slug}?id=${book._id}`)
    }
    return (
        <>
            <div>
                <Row className='grid grid-cols-[300px,minmax(0,1fr)] min-h-screen p-5 bg-white'>
                    <Col className='p-2 border-r border-gray-300 '>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <AiOutlineFilter className='text-blue-500 text-base'></AiOutlineFilter>
                                <span className="text-base font-bold">Bộ lọc tìm kiếm</span>
                            </div>
                            <IoIosRefresh className='text-xl text-blue-500'></IoIosRefresh>
                        </div>
                        <Divider></Divider>
                        <h2 className='text-xl font-bold mb-5'>Danh mục sản phẩm:</h2>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                            onValuesChange={(changedValues, values) => handleChangeFilter(changedValues, values)}
                        >
                            <Form.Item
                                labelCol={{ span: 24 }}
                                name="category"
                            >
                                <Checkbox.Group>
                                    <Row>
                                        {listCategory?.map((item, index) => (
                                            <><Col key={`index ${index + 1}`} span={24}>
                                                <Checkbox value={item.value} className='text-base'>
                                                    {item.label}
                                                </Checkbox>
                                            </Col></>
                                        ))}
                                    </Row>
                                </Checkbox.Group>

                            </Form.Item>
                            <Divider></Divider>
                            <h2 className='mb-5 text-xl font-bold text-center'>Khoảng giá:</h2>
                            <Form.Item labelCol={{ span: 24 }}>
                                <Row gutter={[20, 20]}>
                                    <Col xl={11} md={24}>
                                        <Form.Item name={["range", "from"]}>
                                            <InputNumber
                                                name='from'
                                                min={0}
                                                className='w-full'
                                                placeholder='Khoảng giá đ từ .....'
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            ></InputNumber>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={2} md={24}><div>-</div></Col>
                                    <Col xl={11} md={24} name={["range", "to"]}>

                                        <Form.Item name={["range", "to"]}>
                                            <InputNumber
                                                name='to'
                                                min={0}
                                                className='w-full'
                                                placeholder='Đến đ .....'
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            ></InputNumber>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Button type='primary' className='w-full' htmlType='submit'>Áp dụng</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col className='px-4 '>
                        <Tabs defaultActiveKey="sort=-sold" items={items} onChange={(value) => setSorter(value)} />
                        <div className="grid grid-cols-5 gap-8">
                            {listBook && listBook.map((item, index) => (
                                <>
                                    <div className="shadow-lg w-full h-auto p-4 border border-gray-300 rounded-md cursor-pointer hover:shadow-xl transition-all" onClick={() => handleClickRedirect(item)}>
                                        <div className="w-full h-[200px] rounded-md mb-4">
                                            <img src={`https://webbansach-backend.onrender.com/images/book/${item.thumbnail}`} alt="" className='block w-full h-full object-contain rounded-md' />
                                        </div>
                                        <p className='font-bold text-base w-auto h-14 '>{item.mainText}</p>
                                        <span className='text-base font-semibold mt-4 inline-block'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.price ?? 0)}
                                        </span>
                                        <div className="flex items-center gap-4 mt-4">
                                            <Rate value={5} disabled className='text-sm '></Rate>
                                            <span className='inline-block font-semibold text-base'>Đã bán {item.sold}</span>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                        <div className="flex justify-center mt-10"><Pagination total={total} current={current} pageSize={pageSize} responsive onChange={(p, s) => handleChangePagination({ current: p, pageSize: s })} /></div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Home
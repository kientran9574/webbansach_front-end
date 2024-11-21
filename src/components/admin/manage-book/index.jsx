import React, { useEffect, useState } from 'react'
import { Button, Col, Popconfirm, Row, Table, message } from 'antd'
import { deleteBook, getListBooksApi } from '../../../service/api'
import FilterBook from './filterBook'
import { IoIosRefresh } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ModalViewBook from './ModalViewBook';
import ModalCreateBook from './ModalCreateBook';
import ModalUpdateBook from './ModalUpdateBook';
import * as XLSX from "xlsx";
const BookAdmin = () => {
    const [listBook, setListBook] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [filter, setFilter] = useState("")
    const [sorter, setSorter] = useState("sort=ascend")


    const [openModalViewBook, setOpenModalViewBook] = useState(false)
    const [dataViewBook, setDataViewBook] = useState(null)

    const [openModalCreateBook, setOpenModalCreateBook] = useState(false)

    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [dataUpdateBook, setDataUpdateBook] = useState(null)

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
    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current != current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize != pageSize) {
            setCurrent(pagination.current)
            setPageSize(pagination.pageSize)
        }
        if (sorter && sorter.field) {
            const q = sorter.order === "ascend" ? `sort=${sorter.field}` : `sort=-${sorter.field}`
            setSorter(q)
        }
    };
    const columns = [
        {
            title: 'Tên sách',
            dataIndex: 'mainText',
            sorter: true
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            sorter: true
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            sorter: true
        },
        {
            title: 'Gía tiền',
            dataIndex: 'createdAt',
            sorter: true
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            sorter: true
        },
        {
            title: 'Action',
            render: (title, record, index) => {
                return (
                    <>
                        <div className='flex items-center gap-5'>
                            <IoEyeSharp className='inline-block font-bold text-lg text-blue-500 hover:text-blue-300 cursor-pointer shadow-xl active:shadow-blue-400' onClick={(e) => {
                                e.stopPropagation()
                                setOpenModalViewBook(true)
                                setDataViewBook(record)
                            }
                            }></IoEyeSharp>

                            <MdModeEdit className='inline-block font-bold text-lg text-yellow-500 hover:text-blue-300 cursor-pointer shadow-xl active:shadow-yellow-400' onClick={() => {
                                setOpenModalUpdate(true)
                                setDataUpdateBook(record)
                            }
                            }></MdModeEdit>

                            <Popconfirm
                                placement="topRight"
                                title={"Are you sure to delete?"}
                                description={'Delete'}
                                okText="Yes"
                                onConfirm={() => handleDelete(record._id)}
                                cancelText="No"
                            >
                                <MdDelete className='inline-block font-bold text-lg text-red-500 hover:text-blue-300 cursor-pointer shadow-xl active:shadow-red-400'></MdDelete>
                            </Popconfirm>
                        </div>
                    </>
                )
            }
        },
    ];
    const renderHeader = () => {
        return <>
            <div className="flex items-center justify-between">
                <p className='font-bold text-xl'>Table</p>
                <div className='flex items-center gap-5'>
                    <Button type="primary" onClick={() => handleExport()}>Export</Button>
                    <Button type="primary" onClick={() => {
                        setOpenModalCreateBook(true)
                    }}>Create User</Button>
                    <IoIosRefresh className='text-xl font-bold cursor-pointer hover:opacity-40 ' onClick={() => {
                        setCurrent(1)
                    }}></IoIosRefresh>
                </div>
            </div>
        </>
    }
    const handleFilter = (query) => {
        setCurrent(1)
        setFilter(query)
    }
    const handleDelete = async (bookId) => {
        const res = await deleteBook(bookId);
        if (res && res.data) {
            message.success("Xóa quyển sách thành công")
            getListBook()
        }
        else {
            message.error(res.message)
        }
    }
    const handleExport = () => {
        if (listBook.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listBook);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportBook.csv");
        }
    }
    return (
        <>

            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <FilterBook setFilter={setFilter} handleFilter={handleFilter} ></FilterBook>
                </Col>
                <Col span={24}>
                    <Table title={renderHeader} dataSource={listBook} columns={columns} onChange={onChange} pagination={
                        {
                            current: current,
                            pageSize: pageSize,
                            total: total
                        }
                    } />
                </Col>
            </Row>
            <ModalViewBook openModalViewBook={openModalViewBook} setOpenModalViewBook={setOpenModalViewBook} dataViewBook={dataViewBook} setDataViewBook={setDataViewBook}></ModalViewBook>
            <ModalCreateBook openModalCreateBook={openModalCreateBook} setOpenModalCreateBook={setOpenModalCreateBook} getListBook={getListBook}></ModalCreateBook>


            <ModalUpdateBook openModalUpdate={openModalUpdate} setOpenModalUpdate={setOpenModalUpdate} getListBook={getListBook} dataUpdateBook={dataUpdateBook} setDataUpdateBook={setDataUpdateBook}></ModalUpdateBook>
        </>
    )
}

export default BookAdmin
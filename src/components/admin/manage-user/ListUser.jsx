import { Button, Col, Popconfirm, Row, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { deleteUser, getListUser } from '../../../service/api'
import FilterUser from './filter-user/FilterUser'
import { IoIosRefresh } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import ModalViewUser from './view-user/ModalViewUser';
import ModalCreateUser from './create-user/ModalCreateUser';
import { MdModeEdit } from "react-icons/md";
import ModalUpdateUser from './update-user/ModalUpdateUser';
import { MdDelete } from "react-icons/md";
import UserModalImport from './data/UserModalImport';
import * as XLSX from "xlsx";
const ListUser = () => {
    const [listUser, setListUser] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [filter, setFilter] = useState("")
    const [sorter, setSorter] = useState("sort=ascend")
    const [openModalView, setOpenModalView] = useState(false)
    const [dataView, setDataView] = useState([])
    const [openModalImport, setOpenModalImport] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)

    const [openModalCreate, setOpenModalCreate] = useState(false)
    useEffect(() => {
        getListUsers()
    }, [current, pageSize, filter, sorter])
    const getListUsers = async () => {
        let query = `current=${current}&pageSize=${pageSize}`
        if (filter) {
            query += `&${filter}`
        }
        if (sorter) {
            query += `&${sorter}`
        }
        const res = await getListUser(query)
        console.log("check user", res)
        if (res && res.data) {
            setListUser(res.data.data.result)
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
    const renderHeader = () => {
        return <>
            <div className="flex items-center justify-between">
                <p className='font-bold text-xl'>Table</p>
                <div className='flex items-center gap-5'>
                    <Button type="primary" onClick={() => handleExport()}>Export</Button>
                    <Button type="primary" onClick={() => {
                        setOpenModalImport(true)
                    }}>Import </Button>
                    <Button type="primary" onClick={() => {
                        setOpenModalCreate(true)
                    }}>Create User</Button>
                    <IoIosRefresh className='text-xl font-bold cursor-pointer hover:opacity-40 '></IoIosRefresh>
                </div>
            </div>
        </>
    }
    const handleDelete = async (userId) => {
        const res = await deleteUser(userId)
        if (res && res.data) {
            message.success("Xóa người dùng thành công")
            getListUsers()
        } else {
            message.error(res.message)
        }
    }
    const columns = [
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: true
        },
        {
            title: 'Ngày tạo ',
            dataIndex: 'createdAt',
            sorter: true
        },
        {
            title: 'Action',
            render: (title, record, index) => {
                return (
                    <>
                        <div className='flex items-center gap-5'>
                            <IoEyeSharp className='inline-block font-bold text-lg text-blue-500 hover:text-blue-300 cursor-pointer shadow-xl active:shadow-blue-400' onClick={() => {
                                setOpenModalView(true)
                                setDataView(record)
                            }
                            }></IoEyeSharp>
                            <MdModeEdit className='inline-block font-bold text-lg text-yellow-500 hover:text-blue-300 cursor-pointer shadow-xl active:shadow-yellow-400' onClick={() => {
                                setOpenModalUpdate(true)
                                setDataUpdate(record)
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
    const handleFilter = (query) => {
        setCurrent(1)
        setFilter(query)
    }
    const handleExport = () => {
        if (listUser.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listUser);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportUser.csv");
        }
    }
    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <FilterUser setFilter={setFilter} handleFilter={handleFilter} ></FilterUser>
                </Col>
                <Col span={24}>
                    <Table title={renderHeader} dataSource={listUser} columns={columns} onChange={onChange} pagination={
                        {
                            current: current,
                            pageSize: pageSize,
                            total: total

                        }
                    } />
                </Col>
            </Row>
            <ModalViewUser dataView={dataView} openModalView={openModalView} setOpenModalView={setOpenModalView}></ModalViewUser>
            <ModalCreateUser openModalCreate={openModalCreate} setOpenModalCreate={setOpenModalCreate} getListUsers={getListUsers}></ModalCreateUser>
            <ModalUpdateUser openModalUpdate={openModalUpdate} setOpenModalUpdate={setOpenModalUpdate} getListUsers={getListUsers} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate}></ModalUpdateUser>
            <UserModalImport openModalImport={openModalImport} setOpenModalImport={setOpenModalImport} getListUsers={getListUsers}></UserModalImport>
        </>
    )
}

export default ListUser
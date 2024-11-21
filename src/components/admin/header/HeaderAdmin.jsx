import React, { useEffect, useState } from 'react'
import { Avatar, Button, Dropdown, Layout, Menu, Space, message, theme } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DownOutlined
} from '@ant-design/icons';
import { IoBookOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { FaBorderAll } from "react-icons/fa";
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doLogoutAccount } from '../../../redux/account/accountSlice';
import { logoutAccess } from '../../../service/api';
import { FaBookOpen } from "react-icons/fa";
const HeaderAdmin = () => {
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    // const [activeMenu , setActiveMenu] = useState(null)
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const user = useSelector(state => state.account.user)
    const [activeMenu, setActiveMenu] = useState("dashboard")
    const url = `https://webbansach-backend.onrender.com/images/avatar/${user?.avatar}`
    const dispatch = useDispatch()

    useEffect(() => {
        if (window.location.pathname.startsWith("/admin/book")) {
            setActiveMenu("book")

        }
        if (window.location.pathname.startsWith("/admin/user")) {
            setActiveMenu("crud")
        }
    }, [activeMenu])
    const items = [
        {
            key: '1',
            label: (
                <label className="cursor-pointer">
                    Trang quản trị tài khoản
                </label>
            ),
        },
        {
            key: '2',
            label: (
                <label className="cursor-pointer">
                    Lịch sử mua hàng
                </label>
            ),
        },
        {
            ...(isAuthenticated && {
                key: '3',
                label: (
                    <label onClick={() => handleLogout()} className="cursor-pointer block">
                        Đăng xuất
                    </label>
                ),
            })
        },
    ];
    if (user?.role === "ADMIN") {
        items.unshift({
            key: 'dashboard',
            label: (
                <label className="cursor-pointer">
                    Trang quản trị
                </label>
            ),
        })
    }
    const handleLogout = async () => {
        const res = await logoutAccess()
        if (res && res.data) {
            message.success("Đăng xuất thành công")
            dispatch(doLogoutAccount())
        } else null
    }
    return (
        <>

            <Layout className='h-screen'>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <h1 className='text-center p-3 font-bold text-white text-3xl mb-10'>Admin</h1>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[activeMenu]}
                        onClick={(e) => {
                            setActiveMenu(e.key)
                        }}
                        items={[
                            {
                                key: 'dashboard',
                                icon: <MdDashboard />,
                                label: <Link to={"/admin"}>DashBoard</Link>
                            },
                            {
                                icon: <UserOutlined />,
                                label: 'Manage User',
                                children: [{
                                    key: 'crud',
                                    icon: <UserOutlined />,
                                    label: <Link to={"/admin/user"}>CRUD</Link>,
                                }]
                            },
                            {
                                icon: <IoBookOutline />,
                                label: 'Manage Book',
                                children: [{
                                    key: 'book',
                                    icon: <FaBookOpen />,
                                    label: <Link to={"/admin/book"}>CRUD</Link>,
                                }]
                            },
                            {
                                key: 'order',
                                icon: <FaBorderAll />,
                                label: 'Manage Order',
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                        className='flex items-center justify-between'
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}

                        />
                        <Dropdown
                            className="ml-10"
                            menu={{
                                items,
                            }}
                            placement="bottomLeft"
                            arrow={{
                                pointAtCenter: true,
                            }}
                        >
                            <Space className='mr-10'>
                                {isAuthenticated ? <div className="flex items-center gap-2">
                                    <Avatar size={38} icon={<UserOutlined />} src={url} />

                                    <span>{user?.fullName}</span>
                                </div> : <span>Tài khoản</span>}
                                <DownOutlined className="cursor-pointer block"></DownOutlined>
                            </Space>
                        </Dropdown>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet></Outlet>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default HeaderAdmin
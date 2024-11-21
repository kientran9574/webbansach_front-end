import { FaReact } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { Avatar, Badge, Dropdown, Popover, Space, message } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutAccess } from "../../../service/api";
import { doLogoutAccount } from "../../../redux/account/accountSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ManagerAccount from "../../account/ManagerAccount";
const Headers = () => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const user = useSelector(state => state.account.user)
    const url = `https://webbansach-backend.onrender.com/images/avatar/${user?.avatar}`
    const dispatch = useDispatch()
    const carts = useSelector(state => state.order.cart)
    const navigate = useNavigate()
    const [openModalAccount, setOpenModalAccount] = useState(false)
    const items = [
        {
            key: '1',
            label: (
                <label className="cursor-pointer" onClick={() => { setOpenModalAccount(true) }}>
                    Quản lý tài khoản
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
                <label className="cursor-pointer" onClick={() => navigate("/admin")}>
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
    const contentPopover = () => {
        return (
            <>
                <div className=" rounded-md w-auto h-auto">

                    {carts.map((item, index) => (
                        <div className="flex items-center mt-4 pb-3" key={`book-${index + 1}`}>
                            <img src={`https://webbansach-backend.onrender.com/images/book/${item.detail.thumbnail}`} alt="" className="w-[80px] h-[80px] inline-block rounded object-contain" />
                            <p className="text-sm font-semibold">{item.detail.mainText}</p>
                            <div className='text-sm font-bold ml-4'>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.detail?.price ?? 0)}
                            </div>
                        </div>
                    ))}
                    <div className="flex">
                        <button onClick={() => navigate("/order")} className="ml-auto p-2  w-[100px] h-[48px] bg-orange-500 text-white rounded-md">Xem chi tiết</button>
                    </div>


                </div>

            </>
        )
    }
    return (
        <div className="max-w-full h-[50px] mx-auto px-3 p-2">
            <div className="h-full max-w-[1440px] flex items-center mx-auto w-full">
                <FaReact className="size-6 text-blue-400 font-bold animate-spin-slow"></FaReact>
                <div className="ml-2 text-blue-400 font-medium cursor-pointer ">KO Dev </div>
                <div className="w-[550px] h-full ml-10 relative">
                    <input type="text" className="w-full h-full pl-7 py-2 rounded-lg border-none outline-none text-black font-semibold" placeholder="Bạn cần tìm gì cho hôm nay" />
                    <CiSearch className="absolute top-[2px] left-1 text-xl text-blue-400 rounded-lg "></CiSearch>
                </div>
                {isAuthenticated ? <></> : <div className="ml-36 flex items-center mt-1">
                    <Link to={"/register"} className="block text-lg text-blue-400 bg-white font-medium rounded-md p-1">Register</Link>
                    <Link to={"/login"} className="block text-lg text-blue-400 font-medium ml-5">Login</Link>
                </div>}
                <div className="flex items-end ml-40">
                    <Popover placement="bottomLeft" title={"Sản phẩm mới thêm"} content={contentPopover()} arrow={true}>
                        <Badge count={carts?.length ?? []} size="small" showZero >
                            <CiShoppingCart className="text-2xl font-bold text-blue-400 hover:text-gray-500 hover:text-opacity-30 cursor-pointer"></CiShoppingCart>
                        </Badge>
                    </Popover>
                </div>
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
                    <Space>
                        {isAuthenticated ? <div className="flex items-center gap-2">
                            <Avatar className="flex-shrink-0" size={38} icon={<UserOutlined />} src={url} />
                            <span>{user?.fullName}</span>
                        </div> : <span>Tài khoản</span>}
                        <DownOutlined className="cursor-pointer block"></DownOutlined>
                    </Space>
                </Dropdown>
            </div>
            <ManagerAccount setOpenModalAccount={setOpenModalAccount} openModalAccount={openModalAccount}></ManagerAccount>
        </div>
    )
}

export default Headers
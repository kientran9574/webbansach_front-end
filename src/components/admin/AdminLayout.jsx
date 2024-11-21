import React from 'react'
import HeaderAdmin from './header/HeaderAdmin'
import FooterAdmin from './footer/FooterAdmin'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <>
            <HeaderAdmin></HeaderAdmin>
            <FooterAdmin></FooterAdmin>
        </>
    )
}

export default AdminLayout
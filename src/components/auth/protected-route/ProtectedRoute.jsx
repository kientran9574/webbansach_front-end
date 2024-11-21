import { Button, Result } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

const RoleIsAdmin = ({ children }) => {
    const isAdmin = window.location.pathname === "/admin"
    const user = useSelector(state => state.account.user)
    const userRole = user.role === "ADMIN"

    if (isAdmin && userRole || window.location.pathname.includes("/admin")) {
        return <>{children}</>
    }
    else {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Link to={'/'} type="primary">
                    Back home
                </Link>}
            />
        )
    }

}

const ProtectedRoute = ({ children }) => {
    return (
        <>
            <RoleIsAdmin>
                {children}
            </RoleIsAdmin>
        </>
    )
}

export default ProtectedRoute
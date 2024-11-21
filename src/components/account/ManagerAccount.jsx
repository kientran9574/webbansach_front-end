import React from 'react'
import { Modal, Tabs } from "antd";
import ChangePassword from './ChangePassword';
import UserInfo from './UserInfo';
const ManagerAccount = (props) => {
    const { openModalAccount, setOpenModalAccount } = props
    const items = [
        {
            key: '1',
            label: 'User Info',
            children: <UserInfo></UserInfo>,
        },
        {
            key: '2',
            label: 'Change Password',
            children: <ChangePassword> </ChangePassword>,
        },
    ];
    return (
        <> 
            <Modal footer={null} title="Quản lý tài khoản" width={"50vw"} open={openModalAccount} onCancel={() => setOpenModalAccount(false)}>
                <Tabs defaultActiveKey="1" items={items} />
            </Modal>

        </>
    )
}

export default ManagerAccount
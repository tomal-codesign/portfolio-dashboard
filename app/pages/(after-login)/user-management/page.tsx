'use client'
import React, { use, useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { UserService } from '../../../services/userService';
import { User } from '@/app/types/user';
import { Skeleton } from 'primereact/skeleton';
import { useToast } from '@/app/component/reusable-component/ToastProvider';
import { Dialog } from 'primereact/dialog';

const page = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User[]>();
    const toast = useToast();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = await UserService.getUser();
                console.log(data.users);
                setUser(data.users);
            } catch (error: any) {
                console.error('Failed to fetch user:', error);
                toast.current?.show({ severity: "error", summary: "Login Failed", detail: error.response.data.error, life: 3000 });
            } finally {
                setLoading(false);
            }
        })();
    }, []);
    const skeletonUsers: User[] = Array(5).fill({
        id: '',
        name: '',
        email: '',
        password: '',
        profileImg: '',
    });

    const handleEdit = (rowData: any) => {
        console.log('Edit clicked for:', rowData);
        // You can open a modal or navigate to another page
    };

    const handleDelete = (rowData: any) => {
        console.log('Delete clicked for:', rowData);
        // You can show a confirmation and delete the item
    };
    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className="flex items-center gap-2 py-2">
                <Button
                    icon="pi pi-pen-to-square"
                    className="p-button-sm p-button-rounded p-button-text !text-blue-500 !bg-blue-500/20 !w-10 !h-10 hover:!bg-blue-500 hover:!text-white"
                    onClick={() => handleEdit(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-sm p-button-rounded p-button-text !text-red-500 !bg-red-500/20 !w-10 !h-10 hover:!bg-red-500 hover:!text-white"
                    onClick={() => handleDelete(rowData)}
                />
            </div>
        );
    };
    return (
        <div className='custom-spotlight-card bg-white/40 p-[20px] border border-[#fff]/80 rounded-[26px] backdrop-blur-lg'>
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-800'>User Management</h1>
                    <p className='text-gray-600 mt-1'>Manage your users effectively with our user management system.</p>
                </div>
                <div>
                    <Button label="Add User" icon="pi pi-plus" className="p-button-success !text-blue-500 !bg-white hover:!bg-blue-500 hover:!text-white !border-none !text-sm !px-4 !py-3 !font-normal mt-3" onClick={() => setVisible(true)} />
                </div>
            </div>
            {/* Add more content or components as needed */}
            <div className='mt-4'>
                <DataTable value={loading ? skeletonUsers : user} showGridlines tableStyle={{ minWidth: '50rem' }} responsiveLayout="scroll" className='rounded-2xl overflow-hidden'>
                    {/* <Column field="sl" header="sl"></Column> */}
                    <Column field="name" header="Name" body={(rowData) => loading ? <Skeleton /> : rowData.name} ></Column>
                    <Column field="email" header="Email" body={(rowData) => loading ? <Skeleton /> : rowData.email}></Column>
                    <Column field="password" header="Password" body={(rowData) => loading ? <Skeleton /> : rowData.password}></Column>
                    <Column header="Actions" body={loading ? <Skeleton /> : actionBodyTemplate} style={{ width: '120px', height: '40px' }} />

                </DataTable>
            </div>
            <Dialog header="Header" visible={visible} position={"top"} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </Dialog>
        </div>
    )
}

export default page
'use client'
import React, { use, useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { UserService } from '../../../services/userService';
import { User } from '@/app/types/user';
import { Skeleton } from 'primereact/skeleton';
import { useToast } from '@/app/component/reusable-component/ToastProvider';
import DynamicModal from '@/app/component/reusable-component/DynamicModal';
import DynamicInputField from '@/app/component/reusable-component/DynamicInputField';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { RoleService } from '@/app/services/roleServices';
import { Roles } from '@/app/types/role';
import DynamicDropdown from '@/app/component/reusable-component/DynamicDropdown';

const userSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email({ message: "Invalid email address" }),
    password: z.string().min(1, "Password is required"),
    profileImg: z.string().optional(),
    roleId: z.number().min(1, "Role is required"),
});

type LoginForm = z.infer<typeof userSchema>;

const page = () => {
    const [loading, setLoading] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [user, setUser] = useState<User[]>();
    const [role, setRole] = useState<Roles[]>();
    const toast = useToast();
    const [visible, setVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const methods = useForm<LoginForm>({
        resolver: zodResolver(userSchema),
        mode: "onBlur",
        reValidateMode: "onBlur"
    });

    const { handleSubmit, reset } = methods;

    useEffect(() => {
        (async () => {
            try {
                const data = await RoleService.getRole();
                setRole(data.roles);
            } catch (error: any) {
                console.error('Failed to fetch Role:', error);
                toast.current?.show({ severity: "error", summary: "Failed to fetch Role", detail: error.response.data.error, life: 3000 });
            }
        })();
    }, [])

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = await UserService.getUser();
                console.log(data.users);
                const users = data.users.map((user: any, index) => ({ ...user, sl: index + 1 }));
                setUser(users);
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
        setIsEdit(true);
        setVisible(true);
        reset(rowData);
    };

    const handleDelete = (rowData: any) => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: async () => {
                try {
                    await UserService.deleteUser(rowData.id);
                    toast.current?.show({ severity: "success", summary: "Success", detail: "User deleted successfully", life: 3000 });
                    const res = await UserService.getUser();
                    const users = res.users.map((user: any, index) => ({ ...user, sl: index + 1 }));
                    setUser(users);
                } catch (error: any) {
                    console.error('Failed to delete user:', error);
                    toast.current?.show({ severity: "error", summary: "Login Failed", detail: error.response.data.error, life: 3000 });
                }
            },
        });
    };
    const onSubmit = async (data: any) => {
        setLoadingCreate(true);
        try {
            if (!isEdit) {

                await UserService.postUser(data);
                toast.current?.show({ severity: "success", summary: "Success", detail: "User added successfully", life: 3000 });
                const res = await UserService.getUser();
                const users = res.users.map((user: any, index) => ({ ...user, sl: index + 1 }));
                setUser(users);
                setVisible(false);
            }
            else {
                await UserService.updateUser(data.id, data);
                toast.current?.show({ severity: "success", summary: "Success", detail: "User updated successfully", life: 3000 });
                const res = await UserService.getUser();
                const users = res.users.map((user: any, index) => ({ ...user, sl: index + 1 }));
                setUser(users);
                setVisible(false);
            }
            reset();
        } catch (error: any) {
            console.error('Failed to add user:', error);
            toast.current?.show({ severity: "error", summary: "Error", detail: error.response.data.error, life: 3000 });
        } finally {
            setLoadingCreate(false);
        }
    }
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
    const profileImgBodyTemplate = (rowData: any) => {
        return (
            <div className='flex items-center gap-2'>
                <img src={rowData.profileImg} alt="Profile" className="w-10 h-10 rounded-full" />
                <span>{rowData.name}</span>
            </div>
        );
    }

    return (
        <div className='custom-spotlight-card bg-white/40 p-[20px] border border-[#fff]/80 rounded-[26px] backdrop-blur-lg'>
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-800'>User Management</h1>
                    <p className='text-gray-600 mt-1'>Manage your users effectively with our user management system.</p>
                </div>
                <div>
                    <Button label="Add User" icon="pi pi-plus" className="!rounded-full p-button-success !text-blue-500 !bg-white hover:!bg-blue-500 hover:!text-white !border-none !text-sm !px-4 !py-3 !font-normal mt-3"
                        onClick={() => {
                            setIsEdit(false)
                            setVisible(true)
                            reset({
                                id: undefined,
                                name: '',
                                email: '',
                                password: '',
                                profileImg: '',
                            })
                        }} />
                </div>
            </div>
            <div className='mt-4'>
                <DataTable value={loading ? skeletonUsers : user} showGridlines tableStyle={{ minWidth: '50rem' }} responsiveLayout="scroll" className='rounded-2xl overflow-hidden'>
                    <Column field="sl" header="SL" body={(rowData) => loading ? <Skeleton /> : rowData.sl} ></Column>
                    <Column field="name" header="Name" body={(rowData) => loading ? <Skeleton /> : profileImgBodyTemplate(rowData)} ></Column>
                    <Column field="email" header="Email" body={(rowData) => loading ? <Skeleton /> : rowData.email}></Column>
                    <Column field="password" header="Password" body={(rowData) => loading ? <Skeleton /> : rowData.password}></Column>
                    <Column field="roleName" header="Role" body={(rowData) => loading ? <Skeleton /> : rowData.roleName}></Column>
                    <Column header="Actions" body={loading ? <Skeleton /> : actionBodyTemplate} style={{ width: '120px', height: '40px' }} />
                </DataTable>
            </div>
            <DynamicModal header={isEdit ? 'Edit User' : 'Add User'} isvisible={visible} onHide={() => setVisible(false)}>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                        <DynamicInputField label="Name" placeholder="Name***" name="name" />
                        <DynamicInputField label="Profile Image URL" placeholder="Profile image URL" name="profileImg" />
                        <DynamicDropdown label="Role" placeholder="Role***" name="roleId" options={role || []} />
                        <DynamicInputField label="Email" placeholder="Email***" name="email" />
                        <DynamicInputField label="Password" placeholder="Password***" name="password" />
                        <Button loading={loadingCreate} type="submit" label={isEdit ? 'Update User' : 'Add User'} className=" !rounded-full !bg-blue-500/20 !text-blue-500 !border-none hover:!bg-blue-500 hover:!text-white !mt-3" />
                    </form>
                </FormProvider>
            </DynamicModal>
            <ConfirmDialog />
        </div>
    )
}

export default page
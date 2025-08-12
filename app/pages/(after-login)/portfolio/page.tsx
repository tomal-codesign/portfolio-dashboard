"use client"
import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import { portfolioData } from '@/app/types/portfolioData'
import { PortfolioService } from '@/app/services/portfolioService'
import { useToast } from '@/app/component/reusable-component/ToastProvider'
import DynamicModal from '@/app/component/reusable-component/DynamicModal'
import z from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DynamicInputField from '@/app/component/reusable-component/DynamicInputField'
import DynamicTextareaField from '@/app/component/reusable-component/DynamicTextareaField'
import { User } from '@/app/types/user'
import PortfolioCard from '@/app/component/reusable-component/PortfolioCard'
import Skeleton from '@/app/component/reusable-component/Skeleton'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'

const userSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional(),
    imageUrl: z.string().min(1, { message: "imageUrl is required" }),
    link: z.string().optional(),
    userId: z.number().min(1, { message: "userId is required" })
});

type LoginForm = z.infer<typeof userSchema>;


const portfolio = () => {
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [portfolio, setPortfolio] = useState<portfolioData[]>([]);
    const [userData, setUserData] = useState<User>()
    const [loadingCreate, setLoadingCreate] = useState(false);
    const toast = useToast();
    const [isEdit, setIsEdit] = useState(false)

    const methods = useForm<LoginForm>({
        resolver: zodResolver(userSchema),
        mode: "onBlur",
        reValidateMode: "onBlur"
    });

    const { handleSubmit, reset } = methods;

    useEffect(() => {
        const user = localStorage.getItem("user")
        const userData = user ? JSON.parse(user) : null;
        console.log(userData, "user Data")
        setUserData(userData)
        if (userData?.id) {
            console.log(userData.id);
            (async () => {
                setIsLoading(true)
                try {
                    const data = await PortfolioService.getPortfolio({ userId: userData.id });
                    setPortfolio(data.portfolios);
                } catch (error: any) {
                    console.error('Failed to fetch Portfolio:', error);
                    toast.current?.show({ severity: "error", summary: "Failed to fetch Portfolio", detail: error.response.data.error, life: 3000 });
                } finally {
                    setIsLoading(false)
                }
            })();
        }
    }, []);

    const onSubmit = async (data: any) => {
        setLoadingCreate(true);
        try {
            if (!isEdit) {
                await PortfolioService.createPortfolio(data);
                toast.current?.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Portfolio added successfully",
                    life: 3000
                });
            } else {
                await PortfolioService.updatePortfolio(data.id, data);
                toast.current?.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Portfolio updated successfully",
                    life: 3000
                });
            }

            // Refresh portfolio list
            const res = await PortfolioService.getPortfolio({ userId: userData?.id ?? 0 });
            setPortfolio(res.portfolios);

            // Close modal & reset form
            setVisible(false);
            reset();

        } catch (error: any) {
            console.error('Failed to save portfolio:', error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error?.response?.data?.error || "Something went wrong",
                life: 3000
            });
        } finally {
            setLoadingCreate(false);
        }
    };
    const onDelete = async (id: number) => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: async () => {
                try {
                    await PortfolioService.deletePortfolio(id);
                    toast.current?.show({
                        severity: "success",
                        summary: "Success",
                        detail: "Portfolio deleted successfully",
                        life: 3000
                    });
                    // Refresh portfolio list
                    const res = await PortfolioService.getPortfolio({ userId: userData?.id ?? 0 });
                    setPortfolio(res.portfolios);
                } catch (error: any) {
                    console.error('Failed to delete portfolio:', error);
                    toast.current?.show({
                        severity: "error",
                        summary: "Error",
                        detail: error?.response?.data?.error || "Something went wrong",
                        life: 3000
                    });
                }
            }
        });
    };



    return (
        <div className='custom-spotlight-card bg-white/40 p-[20px] border border-[#fff]/80 rounded-[26px] backdrop-blur-lg'>
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-800'>Portfolio Management</h1>
                    <p className='text-gray-600 mt-1'>Manage your Items effectively with our Portfolio management system.</p>
                </div>
                <div>
                    <Button
                        label="Add Portfolio Item"
                        icon="pi pi-plus"
                        className="!rounded-full p-button-success !text-blue-500 !bg-white hover:!bg-blue-500 hover:!text-white !border-none !text-sm !px-4 !py-3 !font-normal mt-3"
                        onClick={() => {
                            setIsEdit(false);
                            setVisible(true)
                            reset({
                                id: undefined,
                                title: "",
                                description: "",
                                imageUrl: "",
                                link: "",
                                userId: userData?.id ?? 0
                            });
                        }} />
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {isLoading ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />) :
                    (portfolio.map((item, index) => (
                        <PortfolioCard
                            key={index}
                            item={item}
                            index={index}
                            setIsEdit={() => {
                                setIsEdit(true);
                                setVisible(true);
                                reset({
                                    id: item.id,
                                    title: item.title,
                                    description: item.description,
                                    imageUrl: item.imageUrl,
                                    link: item.link,
                                    userId: userData?.id ?? 0
                                });
                            }}
                            setIsDelete={() => onDelete(item?.id ?? 0)} />
                    )))}
            </div>
            <DynamicModal header={isEdit ? 'Edit Portfolio Item' : 'Add Portfolio Item'} isvisible={visible} onHide={() => setVisible(false)}>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                        <DynamicInputField label="Title" placeholder="Title***" name="title" />
                        <DynamicInputField label="Image URL" placeholder="Image URL***" name="imageUrl" />
                        <DynamicInputField label="Link" placeholder="Link" name="link" />
                        <DynamicTextareaField label="Description" placeholder="Description" name="description" />
                        <Button loading={loadingCreate} type="submit" label={isEdit ? 'Update Portfolio Item' : 'Add Portfolio Item'} className="!bg-blue-500/20 !rounded-full !text-blue-500 !border-none hover:!bg-blue-500 hover:!text-white !mt-3" />
                    </form>
                </FormProvider>
            </DynamicModal>
            <ConfirmDialog />
        </div>
    )
}

export default portfolio
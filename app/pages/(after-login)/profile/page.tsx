"use client"
import DynamicInputField from '@/app/component/reusable-component/DynamicInputField'
import { useToast } from '@/app/component/reusable-component/ToastProvider';
import { UserService } from '@/app/services/userService';
import { User } from '@/app/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import Image from 'next/image';


const userSchema = z.object({
    id: z.number().min(1, "Id is required"),
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email({ message: "Invalid email address" }),
    password: z.string().min(1, "Password is required"),
    profileImg: z.string().optional(),
});


type LoginForm = z.infer<typeof userSchema>;

const Portfolio = () => {
    const [loading, setLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [userData, setUserData] = useState<User>();
    const [isCopied, setIsCopied] = useState(false);
    const [img, setImg] = useState("");
    const toast = useToast();

    const methods = useForm<LoginForm>({
        resolver: zodResolver(userSchema),
        mode: "onBlur",
        reValidateMode: "onBlur"
    });

    const { handleSubmit, reset } = methods;

    useEffect(() => {
        const user = localStorage.getItem("user");
        const userData = user ? JSON.parse(user) : null;
        (async () => {
            setLoading(true);
            try {
                const data = await UserService.getUserById(userData.id.toString());
                setUserData(data.user);
                reset(data.user);
                setImg(data.user.profileImg);
            } catch (error: any) {
                console.error('Failed to fetch user:', error);
                toast.current?.show({ severity: "error", summary: "Failed to fetch user", detail: error.response.data.error, life: 3000 });
            } finally {
                setLoading(false);
            }
        })();

    }, [reset]);

    const copyToClipboard = () => {
        const text = `https://backend-portfilo.vercel.app/api/public/portfolios/${userData?.id}`;
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
        });
    };

    const onSubmit = async (data: LoginForm) => {
        setEditLoading(true);
        try {
            await UserService.updateUser(data.id, data);
            toast.current?.show({ severity: "success", summary: "Success", detail: "User updated successfully", life: 3000 });
        } catch (error: any) {
            console.error('Failed to update user:', error);
            toast.current?.show({ severity: "error", summary: "Error", detail: error.response.data.error, life: 3000 });
        } finally {
            setEditLoading(false);
        }
    }
    return (
        <div>
            <div className='lg:w-[600px] lg:mx-auto w-full custom-spotlight-card bg-white/40 p-[20px] border border-[#fff]/80 rounded-[26px] backdrop-blur-lg relative overflow-hidden'>
                {loading && <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white/40 text-gray-800 z-10'>
                    <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
                </div>}
                <h1 className='text-xl font-semibold text-gray-800'>Profile</h1>
                <p className='text-gray-600'>You can update your profile information here.</p>

                <h2 className='text-lg font-medium text-gray-800 mt-4 mb-2'>Your Portfolio Api Link</h2>
                <div className='p-3 text-gray-800 text-md font-medium bg-emerald-600/20 rounded-full flex justify-between items-center '>
                    <span className='pl-2 '>
                        https://backend-portfilo.vercel.app/api/public/portfolios/{userData?.id}
                    </span>
                    <Button icon={`pi ${isCopied ? 'pi-check' : 'pi-copy'}`} onClick={copyToClipboard} tooltip={isCopied ? 'Copied' : 'Copy'} className="p-button-sm p-button-rounded p-button-text !text-blue-500 !bg-white/60 !w-9 !h-9 hover:!bg-blue-500 hover:!text-white" />
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 mt-5'>
                        <div className='w-full flex justify-center'>
                            <Image className='w-[140px] h-[140px] object-cover rounded-full' src={img || "https://avatar.iran.liara.run/public/45"} width={800} height={600} alt="Image" />
                        </div>
                        <DynamicInputField label="Profile Image URL" placeholder="Profile image URL" name="profileImg" onChange={(e) => { setImg(e.target.value) }} />
                        <DynamicInputField label="Name" placeholder="Name***" name="name" />
                        <DynamicInputField label="Email" placeholder="Email***" name="email" />
                        <DynamicInputField label="Password" placeholder="Password***" name="password" />
                        <Button loading={editLoading} type="submit" label='Update Profile' className=" !rounded-full !bg-blue-500/20 !text-blue-500 !border-none hover:!bg-blue-500 hover:!text-white !mt-3" />
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default Portfolio
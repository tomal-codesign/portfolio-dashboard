"use client"
import { Button } from 'primereact/button'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import { portfolioData } from '@/app/types/portfolioData'
import { PortfolioService } from '@/app/services/portfolioService'
import { useToast } from '@/app/component/reusable-component/ToastProvider'


const portfolio = () => {
    const [visible, setVisible] = React.useState(false);
    const [portfolio, setPortfolio] = React.useState<portfolioData[]>([]);
    const toast = useToast();

    useEffect(() => {
        const user = localStorage.getItem("user")
        const userData = user ? JSON.parse(user) : null;
        if (userData?.id) {
            console.log(userData.id);
            (async () => {
                try {
                    const data = await PortfolioService.getPortfolio({ userId: userData.id });
                    setPortfolio(data.portfolios);
                } catch (error: any) {
                    console.error('Failed to fetch Portfolio:', error);
                    toast.current?.show({ severity: "error", summary: "Failed to fetch Portfolio", detail: error.response.data.error, life: 3000 });
                }
            })();
        }
    }, []);

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
                        className="p-button-success !text-blue-500 !bg-white hover:!bg-blue-500 hover:!text-white !border-none !text-sm !px-4 !py-3 !font-normal mt-3"
                        onClick={() => setVisible(true)} />
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {portfolio.length !== 0 ? portfolio.map((item, index) => (
                    <div key={index} className='overflow-hidden relative custom-spotlight-card p-4 bg-white/40 border border-[#fff]/80 rounded-[26px] backdrop-blur-lg group' >
                        <div className='h-[200px] lg:h-[330px] overflow-hidden rounded-[20px] group relative'>
                            <Image className='object-cover w-full h-full ease-in duration-400' src={item.imageUrl} width={800} height={600} alt="Image" />
                            <div className='absolute top-0 left-0 w-full h-full  flex justify-end gap-2 p-4 '>
                                <button className='bg-white w-[40px] h-[40px] rounded-full text-black flex justify-center items-center hover:bg-blue-500 cursor-pointer hover:text-white'>
                                    <Icon icon="hugeicons:edit-04" width="18" height="18" />
                                </button>
                                <button className='bg-white w-[40px] h-[40px] rounded-full text-black flex justify-center items-center hover:bg-red-500 cursor-pointer hover:text-white'>
                                    <Icon icon="fluent:delete-20-regular" width="18" height="18" />
                                </button>
                            </div>
                        </div>
                        <div className='lg:px-[15px] pt-[20px] pb-[5px]  bottom-0 left-0 z-[10] w-full '>
                            <h2 className='whitespace-nowrap overflow-hidden text-ellipsis text-gray-800 text-lg lg:text-[22px] font-semibold'>{item.title}</h2>
                            <p className='text-gray-600 mt-1'>{item.description}</p>
                        </div>
                    </div>
                )) :
                    <div className='col-span-3 flex items-center justify-center'>
                        <div className="w-full max-w-md rounded-xl p-6">
                            <div className="h-72 flex flex-col items-center justify-center text-center text-gray-500">
                                <Icon icon="iconamoon:box-thin" width="40" height="40" />
                                <p className="text-md font-medium">No Data Found</p>
                            </div>
                        </div>
                    </div>}

            </div>
        </div>
    )
}

export default portfolio
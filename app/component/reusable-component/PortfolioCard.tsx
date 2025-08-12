import React from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { portfolioData } from '@/app/types/portfolioData'

type props = {
    item: portfolioData,
    index: number,
    setIsEdit: () => void,
    setIsDelete: () => void,
}

const PortfolioCard = ({ item, index, setIsEdit, setIsDelete }: props) => {
    return (
        <div key={index} className='overflow-hidden relative custom-spotlight-card p-4 bg-white/40 border border-[#fff]/80 rounded-[26px] backdrop-blur-lg group' >
            <div className='h-[200px] lg:h-[300px] overflow-hidden rounded-[20px] group relative'>
                <Image className='object-cover w-full h-full ease-in duration-400' src={item.imageUrl} width={800} height={600} alt="Image" />
                <div className='absolute top-0 left-0 w-full h-full  flex justify-end gap-2 p-4 '>
                    <button
                        className='bg-white w-[40px] h-[40px] rounded-full text-black flex justify-center items-center hover:bg-blue-500 cursor-pointer hover:text-white'
                        onClick={setIsEdit}
                    >
                        <Icon icon="hugeicons:edit-04" width="18" height="18" />
                    </button>
                    <button
                        onClick={setIsDelete}
                        className='bg-white w-[40px] h-[40px] rounded-full text-black flex justify-center items-center hover:bg-red-500 cursor-pointer hover:text-white'>
                        <Icon icon="fluent:delete-20-regular" width="18" height="18" />
                    </button>
                </div>
            </div>
            <div className='lg:px-[15px] pt-[20px] pb-[5px]  bottom-0 left-0 z-[10] w-full '>
                <h2 className='whitespace-nowrap overflow-hidden text-ellipsis text-gray-800 text-lg lg:text-[22px] font-semibold'>{item.title}</h2>
                <p className='text-gray-600 mt-1'>{item.description ? item.description : "---"}</p>
            </div>
        </div>
    )
}

export default PortfolioCard
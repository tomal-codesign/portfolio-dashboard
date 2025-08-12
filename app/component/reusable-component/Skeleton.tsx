import React from 'react'

const Skeleton = () => {
    return (
        <div className='overflow-hidden relative custom-spotlight-card p-4 bg-white/40 border border-[#fff]/80 rounded-[26px] backdrop-blur-lg group animate-pulse'>
            <div className='h-[200px] lg:h-[300px] overflow-hidden rounded-[20px] bg-gray-300 relative'>
                {/* Simulate buttons on top-right */}
                <div className='absolute top-0 left-0 w-full h-full flex justify-end gap-2 p-4'>
                    <div className='bg-gray-400 w-[40px] h-[40px] rounded-full' />
                    <div className='bg-gray-400 w-[40px] h-[40px] rounded-full' />
                </div>
            </div>

            <div className='lg:px-[15px] pt-[20px] pb-[5px] bottom-0 left-0 z-[10] w-full'>
                {/* Title skeleton */}
                <div className='h-6 w-3/4 bg-gray-400 rounded mb-2' />
                {/* Description skeleton */}
                <div className='h-4 w-full max-w-[90%] bg-gray-300 rounded' />
            </div>
        </div>
    )
}

export default Skeleton
"use client";
import { InputText } from 'primereact/inputtext';

type props = {
  label?: string;
  placeholder?: string;
  type?: string;
  icon?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DynamicInput = ({ label, placeholder, type = "text", icon = 'pi-user', value, onChange }: props) => {
  return (
    <div className='flex flex-col gap-1'>
      {label && <label className='pl-2 text-[#1D2939] text-md'>{label}</label>}
      <div className='relative h-12 rounded-full'>
        <div className='absolute left-2 top-[50%] translate-y-[-50%] bg-[#D8D9DB] rounded-full w-8 h-8 flex items-center justify-center'>
          <i className={`pi ${icon}  text-gray-500`}></i>
        </div>
        <InputText type={type} className='w-full !rounded-full h-full !pl-[50px] !bg-[#FFFFFF]/60 border !border-[#D8D9DB] !text-sm' placeholder={placeholder} value={value} onChange={onChange} />
      </div>
    </div>
  )
}

export default DynamicInput
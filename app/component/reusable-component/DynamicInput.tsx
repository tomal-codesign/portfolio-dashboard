"use client";
import { InputText } from 'primereact/inputtext';
import { useFormContext } from 'react-hook-form';

type props = {
  label?: string;
  placeholder?: string;
  type?: string;
  icon?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DynamicInput = ({ label, placeholder, type = "text", icon = 'pi-user', value, name, onChange }: props) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className='flex flex-col gap-1'>
      {label && <label className='pl-2 text-gray-800 text-md'>{label}</label>}
      <div className='relative h-12 rounded-full'>
        <div className='absolute left-2 top-[50%] translate-y-[-50%] bg-[#e1e1e1] rounded-full w-8 h-8 flex items-center justify-center'>
          <i className={`pi ${icon}  text-gray-500`}></i>
        </div>
        <InputText {...register(name)} type={type} className='w-full !rounded-full h-full !pl-[50px] !bg-[#FFFFFF]/60 border !border-[#D8D9DB] !text-sm' placeholder={placeholder} value={value} onChange={onChange} />
      </div>
      {error && (
        <p className="text-red-500 text-sm pl-2">{error}</p>
      )}
    </div>
  )
}

export default DynamicInput
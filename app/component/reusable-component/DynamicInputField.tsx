"use client";
import { InputText } from 'primereact/inputtext';
import { useFormContext } from 'react-hook-form';

type props = {
  label?: string;
  placeholder?: string;
  type?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DynamicInputField = ({ label, placeholder, type = "text", value, name, onChange }: props) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className='flex flex-col gap-2'>
      {label && <label className='pl-3 text-gray-800 text-md'>{label}</label>}
      <div className='relative h-12 rounded-full'>
        <InputText {...register(name)} type={type} className={`w-full !pl-4 !rounded-full h-full !bg-gray-100/60 border !border-[#D8D9DB] !text-sm ${error ? '!border-red-500' : ''}`} placeholder={placeholder} value={value} onChange={onChange} />
      </div>
      {error && (
        <p className="text-red-500 text-sm pl-2">{error}</p>
      )}
    </div>
  )
}

export default DynamicInputField
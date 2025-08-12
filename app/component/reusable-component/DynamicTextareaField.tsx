"use client";
import { InputTextarea } from 'primereact/inputtextarea';
import { useFormContext } from 'react-hook-form';

type Props = {
    label?: string;
    placeholder?: string;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
};

const DynamicTextareaField = ({ label, placeholder, value, name, onChange, rows = 4 }: Props) => {
    const { register, formState: { errors } } = useFormContext();
    const error = errors[name]?.message as string | undefined;

    return (
        <div className='flex flex-col gap-2'>
            {label && <label className='pl-3 text-gray-800 text-md'>{label}</label>}
            <div className='relative rounded-lg'>
                <InputTextarea
                    {...register(name)}
                    className={`w-full !pl-4 !rounded-[26px] !bg-gray-100/60 border !border-[#D8D9DB] !text-sm resize-none ${error ? '!border-red-500' : ''}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    rows={rows}
                />
            </div>
            {error && (
                <p className="text-red-500 text-sm pl-2">{error}</p>
            )}
        </div>
    );
};

export default DynamicTextareaField;

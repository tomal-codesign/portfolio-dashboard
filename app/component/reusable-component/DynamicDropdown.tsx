import { Dropdown } from 'primereact/dropdown'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type Option = {
    name: string
    id: number
}

type Props = {
    label?: string
    placeholder?: string
    name: string
    options: Option[]
}

const DynamicDropdown = ({ label, placeholder, name, options }: Props) => {
    const {
        control,
        formState: { errors }
    } = useFormContext()

    const error = (errors as Record<string, any>)[name]?.message as string | undefined

    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-gray-800 text-md">{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Dropdown
                        id={name}
                        value={options.find(option => option.id === field.value) || null}
                        onChange={(e) => field.onChange(e.value.id)}
                        options={options}
                        optionLabel="name"
                        placeholder={placeholder}
                        className={`w-full !text-2xl ${error ? '!border-red-500' : ''}`}
                    />
                )}
            />
            {error && <p className="text-red-500 text-sm pl-2">{error}</p>}
        </div>
    )
}

export default DynamicDropdown

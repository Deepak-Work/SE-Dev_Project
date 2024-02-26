import React from "react";

interface FormElementProps {
    type: string;
    placeholder: string;
    id: string;
    label: string;
}

const FormTextElement: React.FC<FormElementProps> = ({type, placeholder, id, label })=>{
    return (
        <>
            <div className="mb-5">
                {label ? <label htmlFor={id} className="block text-3xl mb-2  text-gray-600 dark:text-gray-400">{label}</label> : null}
            </div>
            <div className="relative my-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <input type={type} className="form-control" id={id} placeholder={placeholder}/>
                </div>

            </div>
        </>
    )
}

export default FormTextElement;
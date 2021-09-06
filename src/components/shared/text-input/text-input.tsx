import React from 'react';
import classNames from 'classnames';
import './text-input.scss';

interface TextInputProps {
    name: string;
    value: string;
    label: string;
    placeholder?:string;
    error: any;
    required?: boolean;
    onChange?: (data: any) => void;
}

const TextInput: React.FC<TextInputProps> = ({name, label, value, placeholder, error, required, onChange}) => {
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(event);
    }

    return(
        <div className="text-input">
            <h4 className={classNames("text-input--title", { error: !!error })}>{label} {required? <strong className="required">*</strong>: ''}</h4>
            <input className="text-input--input" name={name} placeholder={placeholder?placeholder:''} type="text" onChange={(event) => handleTextChange(event)} value={value}/>
        </div>
    )
}

export default TextInput;
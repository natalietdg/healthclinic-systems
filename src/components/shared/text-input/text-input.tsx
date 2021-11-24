import React from 'react';
import classNames from 'classnames';
import './text-input.scss';

interface TextInputProps {
    icon?: boolean;
    onSearch?: (name: string, value: any) => void;
    name: string;
    value: any;
    disabled?: boolean;
    label: string;
    type?: string;
    subtitle?: string;
    placeholder?:string;
    error: any;
    required?: boolean;
    onChange?: (name: string, value: any) => void;
}

const TextInput: React.FC<TextInputProps> = ({icon, type='text', disabled = false, name, label, value, placeholder, error, required, onChange, subtitle=''}) => {
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.selectionStart = event.target.selectionStart
        if (onChange) onChange(event.target.name, event.target.value);
    }

    return(
        <div className="text-input">
            <h4 className={classNames("text-input--title", { error: !!error })}>{label} {required? <strong className="required">*</strong>: ''}</h4>
            {subtitle !='' && <p>{subtitle}</p>}
            {icon && <img alt="search" src="/assets/images/search.png"></img>  }
            <input aria-label={label} disabled={disabled} className={classNames("text-input--input", {'error-input': !!error })} name={name} placeholder={placeholder?placeholder:''} type={type} onChange={(event) => handleTextChange(event)} value={value} />      
            
        </div>
    )
}

export default TextInput;
import React from 'react';
import classNames from 'classnames';
import './text-area.scss';

interface TextAreaProps {
    name: string;
    value: any;
    label: string;
    placeholder?:string;
    disabled?: boolean;
    error: any;
    required?: boolean;
    onChange?: (name: string, value: any) => void;
}

const TextArea: React.FC<TextAreaProps> = ({name, label, disabled = false, value, placeholder, error, required, onChange}) => {
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(event.target.name, event.target.value);
    }

    return(
        <div className="text-area">
            <h4 className={classNames("text-area--title", { error: !!error })}>{label} {required? <strong className="required">*</strong>: ''}</h4>
            <textarea disabled={disabled} className={classNames("text-area--input", {'error-input': !!error })} name={name} placeholder={placeholder?placeholder:''} rows={4} cols={50} maxLength={1000} onChange={(event:any) => handleTextChange(event)} value={value}/>
        </div>
    )
}

export default TextArea;
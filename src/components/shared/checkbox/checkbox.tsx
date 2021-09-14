import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import './checkbox.scss';

interface CheckboxProps {
    defaultValue?: string;
    label: string;
    name: string;
    placeholder?:string;
    error: any;
    values: {
        name: string;
        value: string;
        label: string;
    }[];
    required?: boolean;
    onCheck?: (name: string, value: string) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({label, defaultValue, placeholder, name, error, required, values, onCheck}) => {
    
    const handleChecked = (event: any) => {
      
        if (onCheck) onCheck(name, event.target?.name, event.target?.checked);
        // document.querySelector(`input[name='${event.target?.name}']`) as HTMLInputElement;
    }

    return(
        <div className="checkbox">
            <h4 className={classNames("checkbox--title", { error: !!error })}>{label} {required? <strong className="required">*</strong>: ''}</h4>
            <div className={"checkbox--values"}>
                {
                    values.map((value, index) => {
                        return ( 
                            <div key={index}><input key={index} className="checkbox--input" name={value.name} placeholder={placeholder?placeholder:''} type="checkbox" onClick={(event: any) => handleChecked(event)} value={value.value} />
                                <label className="checkbox--label">{value.label}</label>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Checkbox;
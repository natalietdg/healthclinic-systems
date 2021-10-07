import React, { useState, useEffect } from 'react';
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
        value: any;
        label: string;
    }[];
    input: any;
    required?: boolean;
    onCheck?: (name: string, subName: string, value: any) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({label, defaultValue, placeholder, name, error, required, input, values, onCheck}) => {
    const [checkBoxInput, setCheckBoxInput ] = useState<any>({});
    useEffect(()=> {
        if(input) setCheckBoxInput(input);
    },[input])
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
                            <div key={index}>
                                <input 
                                    checked={input && checkBoxInput[`${value.name}`]?true: false}
                                    key={index} 
                                    className="checkbox--input" 
                                    name={value.name} 
                                    placeholder={placeholder?placeholder:''} 
                                    type="checkbox" onChange={(event: any) => handleChecked(event)} 
                                    value={value.value} 
                                />
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
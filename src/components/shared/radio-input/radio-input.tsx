import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import './radio-input.scss';

interface RadioInputProps {
    defaultValue?: string;
    label: string;
    name: string;
    placeholder?:string;
    error: any;
    multiple: boolean;
    values: {
        name: string;
        value: string;
        label: string;
    }[];
    required?: boolean;
    onSelect?: (name: string, value: string) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({label, name, defaultValue, placeholder, error, required, values, multiple, onSelect}) => {
    
    const handleChecked = (event: React.MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
      
        if (onSelect) onSelect(name, e?.target.value);

        const checked = document.querySelector(`input[name='${event.target?.name}']`) as HTMLInputElement;
        checked.checked = true;

        if(multiple==false) {
            values.map((value)=> {
                if(value.name!==event.target?.name) {
                    (document.querySelector(`input[name='${value.name}']`) as HTMLInputElement).checked = false;
                }
            })
        }
    }

    return(
        <div className="radio-input">
            <h4 className={classNames("radio-input--title", { error: !!error })}>{label} {required? <strong className="required">*</strong>: ''}</h4>
            <div className={"radio-input--values"}>
                {
                    values.map((value, index) => {
                        return  <div key={index} style={{padding: '0px 10px 0px 0px'}}><input key={index} className="radio-input--input" name={value.name} placeholder={placeholder?placeholder:''} type="radio" onClick={(event: any) => handleChecked(event)} value={value.value} />
                        <label className="radio-input--label">{value.label}</label></div>
                    })
                }
            </div>
        </div>
    )
}

export default RadioInput;
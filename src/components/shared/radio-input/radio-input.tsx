import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './radio-input.scss';

interface RadioInputProps {
    defaultValue?: any;
    label: string;
    name: string;
    subtitle?: any;
    placeholder?:string;
    error: any;
    multiple?: boolean;
    values: any;
    required?: boolean;
    onSelect?: (name: string, value: any) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({label, name, subtitle, defaultValue, placeholder, error, required, values, multiple, onSelect}) => {
      
    useEffect(()=> {
        
        values.map((value:any)=> {
           
            if((value.value)==defaultValue) {
                (document.querySelector(`input[name='${name}.${value.name}']`) as HTMLInputElement).checked = true;
            }
            else {
                (document.querySelector(`input[name='${name}.${value.name}']`) as HTMLInputElement).checked = false;
            }
        })
    },[defaultValue])
    const handleChecked = (event: any) => { //React.MouseEvent<HTMLInputElement, globalThis.MouseEvent>
       
        if (onSelect) onSelect(name,  event.target.value);

        if(multiple==false) {
            values.map((value:any)=> {
                if((name+"."+value.name)!==event.target?.name) {
                    (document.querySelector(`input[name='${name}.${value.name}']`) as HTMLInputElement).checked = false;
                }
            })
        }
    }

    return(
        <div className="radio-input">
            <h4 className={classNames("radio-input--title", { error: !!error })}>{label} {required? <strong className="required">*</strong>: ''}</h4>
            <p><i>{subtitle}</i></p>
            <div key={name} className={"radio-input--values"}>
                {
                    values.map((value:any, index:number) => {
                        return  <div key={index} style={{padding: '0px 10px 0px 0px', display: 'flex'}}>
                                    <input aria-label={label} key={index} className="radio-input--input" name={`${name}.${value.name}`} placeholder={placeholder?placeholder:''} type="radio" onClick={(event: any) => handleChecked(event)} value={value.value} />
                            <label className="radio-input--label">{value.label}</label></div>
                    })
                }
            </div>
        </div>
    )
}

export default RadioInput;
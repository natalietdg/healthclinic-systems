import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './radio-input.scss';

interface RadioInputProps {
    defaultValue?: string;
    label: string;
    name: string;
    placeholder?:string;
    error: any;
    multiple?: boolean;
    values: any;
    required?: boolean;
    onSelect?: (name: string, value: any) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({label, name, defaultValue, placeholder, error, required, values, multiple, onSelect}) => {
    const [ currentValue, setCurrentValue] = useState<any>('');
    useEffect(()=> {
        // console.log('values length', values.length);
        // if(values.length > 3) {
        //     (document.querySelector(`div[name='${name}'].radio-input--values`) as HTMLInputElement).style.flexDirection = 'column';
        // }
    },[]);
    
    useEffect(()=> {
     
        setCurrentValue(defaultValue);

        
        values.map((value:any)=> {
           
            if((value.value)==defaultValue) {
                (document.querySelector(`input[name='${name}.${value.name}']`) as HTMLInputElement).checked = true;
            }
        })
    },[defaultValue])
    const handleChecked = (event: any) => { //React.MouseEvent<HTMLInputElement, globalThis.MouseEvent>
        // console.log('event.target.name', event.target.name);
        // console.log('event', event);
        // const checked = event;
        // console.log('checked', checked);
        // var checked = document.querySelector(`input[name='${event.target?.name}']`) as HTMLInputElement;
        // console.log('checked', checked);
        // console.log('selector.checked1', selector.checked);
        // selector.checked=!(selector.checked);
        // checked.checked = true;
        // console.log('defaultValue',defaultValue);
        // if(defaultValue==event.target.value) {
        //     event.target.value = '';
        // }

        if (onSelect) onSelect(name,  event.target.value);

        if(multiple==false) {
            values.map((value:any)=> {
                console.log(typeof(value.value));
                if((name+value.name)!==event.target?.name) {
                    (document.querySelector(`input[name='${name}.${value.name}']`) as HTMLInputElement).checked = false;
                }
            })
        }
    }

    return(
        <div className="radio-input">
            <h4 className={classNames("radio-input--title", { error: !!error })}>{label} {required? <strong className="required">*</strong>: ''}</h4>
            <div name={name} className={"radio-input--values"}>
                {
                    values.map((value:any, index:number) => {
                        return  <div key={index} style={{padding: '0px 10px 0px 0px', display: 'flex'}}>
                                    <input key={index} className="radio-input--input" name={`${name}.${value.name}`} placeholder={placeholder?placeholder:''} type="radio" onClick={(event: any) => handleChecked(event)} value={value.value} />
                            <label className="radio-input--label">{value.label}</label></div>
                    })
                }
            </div>
        </div>
    )
}

export default RadioInput;
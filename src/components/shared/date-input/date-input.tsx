import React, { useEffect, useState } from 'react';
import './date-input.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import addressInput from '../address-input';
interface DateInputProps {
    name: string;
    value: any;
    required?: boolean;
    defaultValue?: string;
    error: any;
    label: string;
    onChange: (name: string, value: any) => void;
}

const DateInput: React.FC<DateInputProps> = ({label, name, required, error, value, defaultValue, onChange}) => {
    const [ date, setDate ] = useState('');
    useEffect(()=> {
        setDate(value);
    },[value])

    const { t } = useTranslation();

    const handleSelect = (e: any) => {
        onChange(name, e.target?.value);
    }



    return (
        <div className="date-input">
            <h4 className={classNames("date-input--title", { error: !!error })}>{label} {required? <strong className="required">*</strong>: ''}</h4>
                {/* <date className="date-input--input" onChange={(e:any) => handleDate(e)}>
                    {
                        dateOptions.map((option, index) => {
                            return <option name={option.name} key={index} value={option.value}>
                                {option.label || t(`label.${option.name}`)}
                            </option>
                        })
                    }
                </date> */}
            <input name={name} className={classNames("date-input--input", {'error-input': !!error })} value={date} type='date' list="options" defaultValue={defaultValue} onChange={(e:any) => handleSelect(e)}/>
        </div>
    )
}

export default DateInput;
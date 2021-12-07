import React, { useEffect, useState } from 'react';
import './date-input.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
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
        console.log('e', e.target?.value);
        onChange(name, e.target?.value);
    }

    return (
        <div className="date-input">
            <h4 className={classNames("date-input--title", { error: !!error })}>{label} {required? <strong className="required">*</strong>: ''}</h4>
               
            <input aria-label={label} data-date-format="YYYY MM DD" name={name} className={classNames("date-input--input", {'error-input': !!error })} value={date} type='date' list="options" onChange={(e:any) => handleSelect(e)}/>
        </div>
    )
}

export default DateInput;
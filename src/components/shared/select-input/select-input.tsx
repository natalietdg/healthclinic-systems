import React, { useEffect } from 'react';
import './select-input.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
interface SelectInputProps {
    defaultValue?:any;
    subtitle?: any;
    selectOptions: any[];
    name: string;
    required?: boolean;
    value?: any;
    error: any;
    label: string;
    onSelect: (name: string, value: any) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({defaultValue, subtitle, selectOptions, label, name, required, error, value, onSelect}) => {

    const { t } = useTranslation();

    const handleSelect = (e: any) => { //React.MouseEvent<HTMLInputElement, globalThis.MouseEvent>
        onSelect(name, e.target.value);
    }

    return (
        <div className="select-input">
            <h4 className={classNames("select-input--title", { error: !!error })}>{label} {required? <strong className="required">*</strong>: ''}</h4>
            {subtitle && <p><i>{subtitle}</i></p>}
            <select className={classNames("select-input--input", {'error-input': !!error })} onChange={(e:any) => handleSelect(e)} defaultValue={value}>
                {
                    selectOptions.map((option, index) => {
                        return <option key={index} value={option.value}>
                            { option.label || t(`label.${option.name}`) }
                        </option>
                    })
                }
                <option value="" disabled>Please select an option.</option>
            </select>
        </div>
    )
}

export default SelectInput;
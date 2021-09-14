import React, { useEffect } from 'react';
import './select-input.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import addressInput from '../address-input';
interface SelectInputProps {
    selectOptions: any[];
    name: string;
    required?: boolean;
    defaultValue?: string;
    error: any;
    label: string;
    onSelect: (name: string, value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({selectOptions, label, name, required, error, defaultValue, onSelect}) => {

    const { t } = useTranslation();

    const handleSelect = (e: React.MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
        onSelect(name, e.target.value);
    }

    return (
        <div className="select-input">
            <h4 className={classNames("select-input--title", { error: !!error })}>{label} {required? <strong className="required">*</strong>: ''}</h4>
            <select className="select-input--input" onChange={(e:any) => handleSelect(e)} defaultValue={defaultValue}>
                {
                    selectOptions.map((option, index) => {
                        return <option name={option.name} key={index} value={option.value}>
                            { option.label || t(`label.${option.name}`) }
                        </option>
                    })
                }
            </select>
        </div>
    )
}

export default SelectInput;
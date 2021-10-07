import React from 'react';
import './search-input.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import addressInput from '../address-input';
interface SearchInputProps {
    searchOptions: string[];
    name: string;
    value: any;
    required?: boolean;
    defaultValue?: string;
    error: any;
    label: string;
    onSearch: (name: string, value: any) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({searchOptions, label, name, required, error, value, defaultValue, onSearch}) => {

    const { t } = useTranslation();
    const handleSelect = (e: React.MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
        onSearch(name, e.target?.value);
    }

    return (
        <div className="search-input">
            <h4 className={classNames("search-input--title", { error: !!error })}>{label} {required? <strong className="required">*</strong>: ''}</h4>
                {/* <search className="search-input--input" onChange={(e:any) => handleSearch(e)}>
                    {
                        searchOptions.map((option, index) => {
                            return <option name={option.name} key={index} value={option.value}>
                                {option.label || t(`label.${option.name}`)}
                            </option>
                        })
                    }
                </search> */}
            <input className="search-input--input" type='search' list={name} defaultValue={defaultValue} onChange={(e:any) => handleSelect(e)}/>
            <datalist id={name}>
                {searchOptions.map((data, index)=> {
                    return (                       
                        <option key={data} value={data}>{data}</option>
                        )
                })}
            </datalist>
        </div>
    )
}

export default SearchInput;
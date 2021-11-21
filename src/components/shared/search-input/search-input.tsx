import React from 'react';
import './search-input.scss';
import classNames from 'classnames';

interface SearchInputProps {
    searchOptions: string[];
    subtitle?: any;
    name: string;
    value: any;
    required?: boolean;
    defaultValue?: string;
    error: any;
    label: string;
    onSearch: (name: string, value: any) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({searchOptions, subtitle, label, name, required, error, value, defaultValue, onSearch}) => {

    const handleSelect = (e: any ) => { //React.MouseEvent<HTMLInputElement, globalThis.MouseEvent>
        onSearch(name, e.target?.value);
    }

    return (
        <div className="search-input">
            <h4 className={classNames("search-input--title", { error: !!error })}>{label} {required? <strong className="required">*</strong>: ''}</h4>
            <p><i>{subtitle}</i></p>
              
            <input className="search-input--input" type='search' list={name} defaultValue={defaultValue} onChange={(e:any) => handleSelect(e)}/>
            
            <datalist id={name} style={{zIndex: 996}}>
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
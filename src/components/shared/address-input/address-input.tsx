import React, {useState, useEffect} from 'react';
import { Row } from '..';
import { useTranslation } from 'react-i18next';
import { isEmpty, isNil, isUndefined, omitBy } from 'lodash';
import { TextInput, SelectInput, SearchInput, AlertBox } from '..';
import classNames from 'classnames';
import statesPostCodes from 'src/data/statesPostcodes.json'
import './address-input.scss';

interface AddressInputProps {
    addressInput: {
        street1: string;
        street2?: string;
        postcode: string;
        country: string;
        state: string;
        city: string;
    }
    onChange: (name: string, value: string) => void;
    error: any;
}

const AddressInput: React.FC<AddressInputProps> = ({error, addressInput, onChange}) => {
    const [ postCodes, setPostCodes ] = useState<any>([]);

    useEffect(()=> {
        let filteredStates = [];

        if (!isEmpty(addressInput.state)) {
             let [postcodes, ...otherItems] = (statesPostCodes.filter(state => state.value==addressInput.state).map((filteredObj)=> {
                return [...filteredObj.postalCodesArray];
            }));

            filteredStates = postcodes;
        }
        else {
            let postcodes: any = [];
            statesPostCodes.map((state)=> {
                state.postalCodesArray.map((postalCode)=> {
                    postcodes.push(...[postalCode]);
                });
                })
            
                console.log('postcodes', postcodes);
            filteredStates = postcodes;
        }
        
    
        setPostCodes(filteredStates);

    },[addressInput.state])
    const { t } = useTranslation();

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(event.target.name, event.target.value);
    }

    const handleSelectChange = (name: string, value: string) => {
        onChange(name, value);
    }
    
    const handleSearchChange = (name: string, value: string) => {
        onChange(name, value);
    }

    return(
        <div className="address-input">
            <h4 className={classNames("address-input--title", { error: !!error })}>Address</h4>
            <div className="address-input--content">
                <Row>
                    <TextInput value={addressInput.street1} required error={!!error?.street1} name='street1' label={t('label.street1')} onChange={handleTextChange} />
                    <TextInput value={addressInput.street2 || ''} required error={!!error?.street2} name='street2' label={t('label.street2')} onChange={handleTextChange} />
                </Row>
                <Row>
                    <SearchInput defaultValue={addressInput.postcode} searchOptions={postCodes || []} value={addressInput.postcode} required error={!!error?.postcode} name='postcode' label={t('label.postcode')} onSearch={handleSearchChange} />
                    <TextInput value={addressInput.city} required error={!!error?.city} name='city' label={t('label.city')} onChange={handleTextChange} />
                </Row>
                <Row>
                    <SelectInput 
                        required
                        selectOptions={statesPostCodes} 
                        error={!!error?.state}
                        name="state"
                        defaultValue={addressInput.state}
                        label={t ('label.state')}
                        onSelect={handleSelectChange}
                    />
                </Row>
            </div>
        </div>
    )
}

export default AddressInput;
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
            filteredStates = postcodes;
        }
        
        setPostCodes(filteredStates);

    },[addressInput.state])
    const { t } = useTranslation();

    const handleTextChange = (name: string, value: string) => {
        if (onChange) onChange(name, value);
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
                    <div>
                        <TextInput value={addressInput.street1} required error={!!error?.street1} name='street1' label={t('label.street1')} onChange={handleTextChange} />
                        <AlertBox error={error?.street1} name={t('label.street1')} />
                    </div>
                    <div>
                        <TextInput value={addressInput.street2 || ''} error={!!error?.street2} name='street2' label={t('label.street2')} onChange={handleTextChange} />
                        <AlertBox error={error?.street2} name={t('label.street2')} />
                    </div>
                </Row>
                <Row>
                    <div>
                        <SearchInput defaultValue={addressInput.postcode} searchOptions={postCodes || []} value={addressInput.postcode} required error={!!error?.postcode} name='postcode' label={t('label.postcode')} onSearch={handleSearchChange} />
                        <AlertBox error={error?.postcode} name={t('label.postcode')} />
                        
                    </div>
                    <div>
                        <TextInput value={addressInput.city} required error={!!error?.city} name='city' label={t('label.city')} onChange={handleTextChange} />
                        <AlertBox error={error?.city} name={t('label.city')} />
                    </div>
                </Row>
                <Row>
                    <div>
                        <SelectInput 
                            required
                            selectOptions={statesPostCodes} 
                            error={!!error?.state}
                            name="state"
                            defaultValue={addressInput.state}
                            label={t ('label.state')}
                            onSelect={handleSelectChange}
                        />
                        <AlertBox error={error?.state} name={t('label.state')} />
                    </div>
                    
                </Row>
            </div>
        </div>
    )
}

export default AddressInput;
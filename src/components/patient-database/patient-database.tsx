import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { encode, decode } from 'Helpers/';
import { Table, Row, TextInput, Page } from 'Components/shared';
import classNames from 'classnames';
import PagePane from 'Components/shared/page/page-pane';
import { useTranslation } from 'react-i18next';
import './patient-database.scss';
import { IndexedAccessType } from 'typescript';
import { max } from 'moment';
import page from 'Components/shared/page';

interface PatientDatabseProps {
    patients: any;
}

const PatientDatabse: React.FC<PatientDatabseProps> = ({patients}) => {
    const [pagePagination, setPagePagination] = useState([]);
    const [ hiddenFirstPartButtons, setHiddenFirstPartButtons ] = useState<any>([]);
    const [ hiddenLastPartButtons, setHiddenLastPartButtons ] = useState<any>([]);

    const [maxSize, setMaxSize] = useState(0);
    const [ pageVisibility, setPageVisibility ] = useState(0);

    const columns = [
        {
            colName: 'ID'
        },
        {
            colName: 'Full Name'
        },
        {
            colName: 'Race',
        },
        {
            colName: 'Gender',
        },
        {
            colName: 'Date of Birth'
        },
        {
            colName: 'IC',
        },
        {
            colName: 'Email',
        },
        {
            colName: 'Phone Number',
        },
        {
            colName: 'Report',
        },
        {
            colName: ''
        }
    ];
    const { t } = useTranslation();
    const [filter, setFilter] = useState<any>('');
    const [filteredData, setFilteredData]=useState<any>([]);
    const changePage = (e: any) => {
        const parsedPageNumber = parseInt(e.target.innerText)-1;
        setPageVisibility(parsedPageNumber);

        console.log(parsedPageNumber);
    }
    const showOptions = (e:any) => {
        const selector =  e.target.parentElement.nextElementSibling;
        if(selector.style.display=='none') selector.style.display = 'flex';
        else selector.style.display = 'none';
    }

    const updatePaginationAndFilter = () => {
        console.log(pageVisibility);
        const filteredPatientData = patients.filter((patientData: any, index: any) => {
            let values = Object.values(patientData);
            // console.log('values', values);
            let filteredValues:any = values.reduce(function(allFilteredValues: any, value) {
                // console.log('tempvalue', value);
                if(typeof(value)=='string') if((value.toLowerCase()).includes(filter) || filter=='') allFilteredValues.push(value);
                return allFilteredValues;
                
            },[])

            return Object.values(patientData).some(sameValue => filteredValues.includes(sameValue));
        })
        console.log('filteredPatientData', filteredPatientData);
        var filteredDataArray: any = [];
        var tempArrayForCategorizing: any = [];

        filteredPatientData.map((filteredData: any, index: any)=> {
            console.log('filteredData', filteredData);
            let patientData = {
                'ID': filteredData.id,
                'Email': filteredData.email,
                'Full Name':  <a href={`/patient/${encode(filteredData.id)}`}>{filteredData.fullName}</a>,
                "Date of Birth": filteredData.dateOfBirth,
                'IC': filteredData.ic,
                "Phone Number": filteredData.phoneNumber,
                "Race": filteredData.race,
                "Gender": filteredData.gender,
                "Report": <a href={`/report/${filteredData.reportID}`}>View Report</a>,
                // 'Diagnosis': filteredData['Diagnosis'],
                "": <div style={{display: 'flex'}}>
                        <button onClick={showOptions}>
                            <img src="/assets/images/menu-vertical.png" />
                        </button>
                        <span id="span">
                            <a href="https://google.com"><img src="/assets/images/edit-dark.png"/>Edit</a><br></br>
                            <a href="https://google.com"><img src="/assets/images/view.png"/>View</a>
                        </span>
                    </div>
            };
            tempArrayForCategorizing.push(patientData);

            if((index+1)%10==0 || (index+1)==filteredPatientData.length) {
                filteredDataArray.push(tempArrayForCategorizing);
                tempArrayForCategorizing = [];
            }
        });
        console.log('filteredDataArray', filteredDataArray);
        console.log('filteredPatientData', filteredPatientData);
        if(filter!='') setPageVisibility(0);
        setMaxSize(filteredDataArray.length);
        setFilteredData(filteredDataArray);

        var pagePaginationArray: any = [];
        console.log('pageVisibility', pageVisibility);

        for(let x = 0; x < maxSize; x++) {
            let button = <><button onClick={(e)=>changePage(e)} className={classNames({current: (x==pageVisibility)})} key={x+1}>{x+1}</button></>
            let pageButton = {
                index: x+1,
                props: button
            }
            pagePaginationArray.push(pageButton);
        }

        var pagination: any = [];

        // then then if
            // there if the distance of the current page and the last page is more than 5, just show the last page
            //then if the distance of current page and last page is less than 5, 
                //the indexes which are 2 lesser and 2 more than current page
            //the rest are in the middle.
            //if distance of the current page and the first page is more than 5, just show the first page
            //then if the distance of current page and first page is less than 5, 
                //the indexes which are 2 lesser and 2 more than current page
            //the rest are in the middle.

        var hiddenFirstPartOfArray: any = {
            index: 0,
            props: <button id="hiddenFirstPart">...</button>
        };

        var hiddenLastPartOfArray: any = {
            index: 0,
            props: <button id="hiddenLastPart">...</button>
        };

        var hiddenFirstPartIndexes = [];
        var hiddenLastPartIndexes = [];

        for (let x = 0; x < pagePaginationArray.length; x++) {
            if (pagePaginationArray.length < 6) {
                pagination.push(pagePaginationArray[x]);
            }
            else {
                if (pageVisibility < 3) {
                    if (x < 3) pagination.push(pagePaginationArray[x]);
                    else if(((pagePaginationArray.length-1) - x) < 3) {
                        pagination.push(pagePaginationArray[x]);
                    }else {
                        if(hiddenFirstPartIndexes.length == 0 && hiddenLastPartIndexes.length == 0) {
                            hiddenFirstPartOfArray.index = x+1;
                            pagination.push(hiddenFirstPartOfArray);
                        }
                        hiddenFirstPartIndexes.push(pagePaginationArray[x].index);
                    }
                    
                }
                else if (pageVisibility >= 3 && pageVisibility < (pagePaginationArray.length - 5)) {
                    if (x < 2) {
                        pagination.push(pagePaginationArray[x]);
                    } 
                    else if (x < (pageVisibility -1)) {
                        if(hiddenFirstPartIndexes.length == 0) {
                            hiddenFirstPartOfArray.index = x+1;
                            pagination.push(hiddenFirstPartOfArray);
                        }
                        hiddenFirstPartIndexes.push(pagePaginationArray[x].index);
                    }
                    else if (((pagePaginationArray.length-1) - x) < 2) {
                        pagination.push(pagePaginationArray[x]);
                    }
                    else if((x < pageVisibility && (pageVisibility - x) < 2) || (x > pageVisibility && (x-pageVisibility) <2) || x==pageVisibility) {
                        pagination.push(pagePaginationArray[x]);
                    }else {
                        if(hiddenLastPartIndexes.length == 0) {
                            hiddenLastPartOfArray.index = x+1;
                            pagination.push(hiddenLastPartOfArray);
                        }
                        hiddenLastPartIndexes.push(pagePaginationArray[x].index);
                    }
                }
                else {
                    if (x < 2) {
                        pagination.push(pagePaginationArray[x]);
                    } 
                    else if(((pagePaginationArray.length-1) - x) < 3) {
                        pagination.push(pagePaginationArray[x]);
                    }
                    else {
                        if(hiddenFirstPartIndexes.length == 0 && hiddenLastPartIndexes.length == 0) {
                            pagination.push(hiddenLastPartOfArray);
                        }
                        hiddenLastPartIndexes.push(pagePaginationArray[x].index);
                    }
                }
            }
        }
        
        if(hiddenFirstPartIndexes.length !=0) setHiddenFirstPartButtons(hiddenFirstPartIndexes);
        if(hiddenLastPartIndexes.length !=0) setHiddenLastPartButtons(hiddenLastPartIndexes);
        console.log('pagination', pagination);
        setPagePagination(pagination);
    }

    // useEffect(()=> {
    //     var filterData: any= [];
    //     var tempData: any = [];
    //     patients.map((patient: any, index: any)=> {
    //         let patientData = {
    //             ID: patient.ID,
    //             'First Name':  <a href="/new-patient">{patient['First Name']}</a>,
    //             'Last Name': <a href="/new-patient">{patient['Last Name']}</a>,
    //             'IC': patient['IC'],
    //             'Last Edited': patient['Last Edited'],
    //             'Diagnosis': patient['Diagnosis'],
    //             "": <div style={{display: 'flex'}}>
    //                     <button onClick={showOptions}>
    //                         <img src="/assets/images/menu-vertical.png" />
    //                     </button>
    //                     <span id="span">
    //                         <a href="https://google.com"><img src="/assets/images/edit-dark.png"/>Edit</a><br></br>
    //                         <a href="https://google.com"><img src="/assets/images/view.png"/>View</a>
    //                     </span>
    //                 </div>
    //         };
    //        filterData.push(...Object.values(patient));
    //        tempData.push(patientData);
    //     })
    //     setPatientList(tempData);
    //     setPatientFilterData(filterData);
        
    // },[patients])

    useEffect(()=> {
        updatePaginationAndFilter();
    },[filter]);

    useEffect(()=> {
        updatePaginationAndFilter();
    },[maxSize]);

    useEffect(()=> {
        updatePaginationAndFilter();
    },[pageVisibility]);

    useEffect(()=> {
            updatePaginationAndFilter();
    },[patients]);

    const showHiddenFirstPartButtons = () => {
        for (let x =0; x < hiddenFirstPartButtons.length; x++) {
            
        }
    }
  

    const handleSearchChange = (name: string, value: any) => {
        setFilter(value);
    }

    return (
        <div className="patient-database">
             <Row style={{marginBottom: '20px'}}>
                <div style={{width: '30%'}}>
                <TextInput icon={true} placeholder="Search for a patient" value={filter} required={false} error={''} name='search' label="" onChange={handleSearchChange} />
                </div>
            </Row>
           
            <Table 
                columns={columns}
                filteredData={filteredData[pageVisibility]? filteredData[pageVisibility]: []}
            />
            <Row className="pagination">
                <button><img src="/assets/images/left.png" /></button>
                <div>
                   {
                       pagePagination != [] &&  
                       pagePagination.map((prop: any, index: any)=> {
                            return prop.props;                  
                       })
                   }
                </div>
                
                <button><img src="/assets/images/right.png" /></button>
            </Row>
        </div>
    )
}

export default PatientDatabse;
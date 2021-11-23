import React, { useState, useEffect } from 'react';
import _,{ isEmpty, isEqual } from 'lodash';
import { styles } from 'Components/shared/animation';
import { encode, decode } from 'Helpers/';
import Radium from 'radium';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Table, Row, TextInput, Page, Button } from 'Components/shared';
import classNames from 'classnames';
import './patient-database.scss';

interface PatientDatabseProps {
    patients: any;
    visible: string;
    columnProps?: any;
}

const PatientDatabse: React.FC<PatientDatabseProps> = ({patients, columnProps, visible}) => {
    const [pagePagination, setPagePagination] = useState([]);
    const [error, setError] = useState<any>({});
    const [ hiddenFirstPartButtons, setHiddenFirstPartButtons ] = useState<any>([]);
    const [ hiddenLastPartButtons, setHiddenLastPartButtons ] = useState<any>([]);

    const { t } = useTranslation();
    const [maxSize, setMaxSize] = useState(0);
    const { date }:any = useParams();
    var todaysDate: any = date? decode(date): null;
    if(todaysDate!=null) {
        todaysDate = (new Date (todaysDate)).toLocaleDateString([], {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    const [ pageVisibility, setPageVisibility ] = useState(0);

    const columns = columnProps? columnProps :[
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
            colName: 'IC',
        },
        {
            colName: 'Email',
        },
        {
            colName: 'Phone Number',
        },
        {
            colName: 'Report Number',
        },
        {
            colName: 'Medical Report',
        },
        {
            colName: ''
        }
    ];
    const [filter, setFilter] = useState<any>('');
    const [filteredData, setFilteredData]=useState<any>([]);

    const changePage = (e: any) => {
        const parsedPageNumber = parseInt(e.target.innerText)-1;
        setPageVisibility(parsedPageNumber);
    }

    const setLocalStorage = (key: any) => {
        let page = parseInt(key.split(',')[0]);
        key = parseInt(key.split(',')[1]);
        var patientData =  filteredData[page][key];

        if (error.error) {
            patientData = {
                ID: patientData['ID'],
                email: patientData['Email'],
                fullName: patientData['Full Name'],
                dateOfBirth: patientData['Date of Birth'],
                gender: patientData['Gender'],
                race: patientData['Race'],
                ic: patientData['IC'],
                phoneNumber: patientData['Phone Number'],
            }

            patientData.fullName = patientData.fullName.props.children;
            localStorage.setItem('patient', JSON.stringify(patientData));
            localStorage.setItem('fullName', patientData.fullName);
         
        }        
    }
    
    const hideHiddenFirstPartButtons = () => {
        let lastPartArray = (document.getElementById('hiddenLastPartArray') as HTMLElement);
        if(lastPartArray!= null)  lastPartArray.style.display = 'none';
        (document.getElementById('hiddenFirstPartArray') as HTMLElement).style.display = 'none';
    }

    const hideHiddenLastPartButtons = () => {
        let firstPartArray = (document.getElementById('hiddenFirstPartArray') as HTMLElement);
        if(firstPartArray!= null)  firstPartArray.style.display = 'none';
        (document.getElementById('hiddenLastPartArray') as HTMLElement).style.display = 'none';
    }

    const showHiddenFirstPartButtons = () => {
        let lastPartArray = (document.getElementById('hiddenLastPartArray') as HTMLElement);
        if(lastPartArray!= null)  lastPartArray.style.display = 'none';
        (document.getElementById('hiddenFirstPartArray') as HTMLElement).style.display = 'block';
        if (pageVisibility >=24) {
            (document.getElementById('hiddenFirstPartArray') as HTMLElement).style.setProperty('--rightArray', '48%');
        }
        else if (pageVisibility >=4 ) {
            (document.getElementById('hiddenFirstPartArray') as HTMLElement).style.setProperty('--rightArray', '49%');
           
        }
        else if (pageVisibility >=3) {
            (document.getElementById('hiddenFirstPartArray') as HTMLElement).style.setProperty('--rightArray', '43%');
         
        }
        else {
            (document.getElementById('hiddenFirstPartArray') as HTMLElement).style.setProperty('--rightArray', '45%');
           
        }
    }

    const showHiddenLastPartButtons = () => {
        let firstPartArray = (document.getElementById('hiddenFirstPartArray') as HTMLElement);
        if(firstPartArray!= null) firstPartArray.style.display = 'none';
       
        (document.getElementById('hiddenLastPartArray') as HTMLElement).style.display = 'block';
            if (pageVisibility >=25 ) {
                (document.getElementById('hiddenLastPartArray') as HTMLElement).style.setProperty('--rightArray', '46%');
            }
            else if (pageVisibility >=24) {
                (document.getElementById('hiddenLastPartArray') as HTMLElement).style.setProperty('--rightArray', '41%');
            }
            else {
                (document.getElementById('hiddenLastPartArray') as HTMLElement).style.setProperty('--rightArray', '42%');
            }

    }

    useEffect(()=> {
        if(hiddenLastPartButtons.length > 0) createHiddenLastPartButtons();
    },[hiddenLastPartButtons])

    useEffect(()=> {
        if(hiddenFirstPartButtons.length > 0) createHiddenFirstPartButtons();
    },[hiddenFirstPartButtons])
    
    const createHiddenFirstPartButtons = () => {
        var child =  (document.getElementById('hiddenFirstPartArray') as HTMLElement);
      
        var parent = (document.getElementById('hiddenFirstPart') as HTMLElement);
        var child2 = (document.getElementById('hiddenLastPartArray') as HTMLElement);
        if (child && parent && parent.contains(child)) parent.removeChild(child);
        if (child2 && parent && parent.contains(child2)) parent.removeChild(child2);
       
            let tempDiv:any = document.createElement('div');
            tempDiv.id = 'hiddenFirstPartArray'
            for (let x =0; x < hiddenFirstPartButtons.length; x++) {
                let button =document.createElement('button');
                button.addEventListener('click', function (event: any) {
                    if(event.target) {
                        changePage(event);
                    };   
                });

                button.addEventListener('mouseenter', function(event: any) {
                    if(event.target) {
                        showHiddenFirstPartButtons();
                    }; 
                });

                button.addEventListener('mouseleave', function(event: any) {
                    if(event.target) {
                        hideHiddenFirstPartButtons();
                    }; 
                });
                if (hiddenFirstPartButtons[x]==pageVisibility+1) button.className = 'current';
                button.innerText=hiddenFirstPartButtons[x];
                button.style.padding = '8px';
                button.setAttribute('key', `${hiddenFirstPartButtons[x]}`);
                tempDiv.appendChild(button);
            }
            tempDiv.className = 'button-array';
            tempDiv.style.display = 'none';
            tempDiv.style.padding = '10px';
            
            parent.appendChild(tempDiv);
        }
       
    
  
    const createHiddenLastPartButtons = () => {
        
            var child =  (document.getElementById('hiddenLastPartArray') as HTMLElement);
            var child2 = (document.getElementById('hiddenFirstPartArray') as HTMLElement);
            var parent = (document.getElementById('hiddenLastPart') as HTMLElement);
         
            if (child && parent  && parent.contains(child)) parent.removeChild(child);
            if (child2 && parent && parent.contains(child2)) parent.removeChild(child2);
            let tempDiv:any = document.createElement('div');
            tempDiv.id = 'hiddenLastPartArray'
            for (let x =0; x < hiddenLastPartButtons.length; x++) {
                let button =document.createElement('button');
                button.addEventListener('click', function (event: any) {
                    if(event.target) {
                        changePage(event);
                    };   
                });
                button.addEventListener('mouseenter', function(event: any) {
                    if(event.target) {
                        showHiddenLastPartButtons();
                    }; 
                });

                button.addEventListener('mouseleave', function(event: any) {
                    if(event.target) {
                        hideHiddenLastPartButtons();
                    }; 
                });
                if (hiddenLastPartButtons[x]==pageVisibility+1) button.className = 'current';
                button.innerText=hiddenLastPartButtons[x];
                button.setAttribute('key', `${hiddenLastPartButtons[x]}`);
                button.style.padding = '8px';
                tempDiv.appendChild(button);
            }
            
            tempDiv.className = 'button-array';
            tempDiv.style.padding = '10px';
            tempDiv.style.display = 'none';
            parent.appendChild(tempDiv);
    }

    const updatePaginationAndFilter = () => {
        if(patients) {    
            setError({});
            if(patients.length == 0 || patients.error ) {
                setError({error: 'Unable to fetch patients'})
            }

            const filteredPatientData = patients.filter((patientData: any, index: any) => {
                let values = Object.values(patientData);
                
                let filteredValues:any = values.reduce(function(allFilteredValues: any, value) {
                
                    if(typeof(value)=='string') if((value.toLowerCase()).includes(filter.toLowerCase()) || filter=='') allFilteredValues.push(value);
                    return allFilteredValues;
                }, []);
    
                return Object.values(patientData).some(sameValue => filteredValues.includes(sameValue));
            });

            var filteredDataArray: any = [];
            var tempArrayForCategorizing: any = [];
            let currLength = 0;
            filteredPatientData.map((filteredData: any, index: any)=> {
                if((index+1)%10==0) {
                    currLength++;
                }
                
                var patientData = {}
                if(todaysDate== null) {
                    patientData = {
                        "ID": filteredData.patientID || filteredData['ID'],
                        'Email': filteredData.email || filteredData['Email'],
                        'Full Name':  <a href={`/patient/view/${encode(filteredData.patientID) || filteredData['ID']}}`}>{filteredData.fullName || filteredData['Full Name']}</a>,
                      
                        'IC': filteredData.ic || filteredData['IC'],
                        "Phone Number": filteredData.phoneNumber || filteredData['Phone Number'],
                        "Race": filteredData.race? t(`label.${filteredData.race.toLowerCase()}`): filteredData.race || filteredData['Race'],
                        "Gender": filteredData.gender? t(`label.${filteredData.gender.toLowerCase()}`): filteredData.gender || filteredData['Gender'],
                        "Report Number": filteredData.reportID || filteredData['Report'],
                        "Medical Report": <Button id="span" keyName={`${currLength}, ${index}`} onClick={(key) => setLocalStorage(key)}> 
                                    <a href={`/report/${encode(filteredData.reportID)}` || filteredData['Report']}>
                                        <img src="/assets/images/view.png"/><br />
                                        View Report
                                    </a><br></br>
                                </Button>,
                        "": <div style={{display: 'flex'}}>
                                <Button id="span" keyName={`${currLength}, ${index}`} onClick={(key) => setLocalStorage(key)}> 
                                    <a href={`/patient/view/${encode(filteredData.reportID) || filteredData['ID']}`}><img src="/assets/images/view.png"/><br />View Patient</a>
                                    <br></br>
                                </Button>
                            </div>
                    };
                }
                else{
                    var hasDiagnosis = false;
                    if(filteredData.comments) {
                        hasDiagnosis = filteredData.comments.some((comment: any)=> {
                            let tempDate = (new Date(comment.created)).toLocaleDateString([], {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            });
                        
                            if (_.isEqual(tempDate, todaysDate))  return true;
                        })
                    }

                    patientData = {
                        "ID": filteredData.patientID || filteredData['ID'],
                        'Email': filteredData.email || filteredData['Email'],
                        'Full Name':  <a href={`/patient/view/${encode(filteredData.patientID) || filteredData['ID']}}`}>{filteredData.fullName || filteredData['Full Name']}</a>,
                      
                        'IC': filteredData.ic || filteredData['IC'],
                        "Phone Number": filteredData.phoneNumber || filteredData['Phone Number'],
                        "Race": filteredData.race? t(`label.${filteredData.race.toLowerCase()}`): filteredData.race || filteredData['Race'],
                        "Gender": filteredData.gender? t(`label.${filteredData.gender.toLowerCase()}`): filteredData.gender || filteredData['Gender'],
                      
                        "Report Number": filteredData.reportID || filteredData['Report'],
                        "Medical Report": <Button id="span" keyName={`${currLength}, ${index}`} onClick={(key) => setLocalStorage(key)}> 
                                    <a href={`/report/${encode(filteredData.reportID)}` || filteredData['Report']}>
                                        <img src="/assets/images/view.png"/><br />
                                        View Report
                                    </a><br></br>
                                </Button>,
                        "": <div style={{display: 'flex'}}>
                                <Button id="span" keyName={`${currLength}, ${index}`} onClick={(key) => setLocalStorage(key)}> 
                                    <a href={`/patient/view/${encode(filteredData.patientID) || filteredData['ID']}`}><img src="/assets/images/view.png"/><br />View Patient</a>
                                    <br></br>
                                </Button>
                            </div>
                    }
                }
             
                tempArrayForCategorizing.push(patientData);
    
                if((index+1)%10==0 || (index+1)==filteredPatientData.length) {
                    filteredDataArray.push(tempArrayForCategorizing);
                    tempArrayForCategorizing = [];
                }
            });
            if(filter!='') setPageVisibility(0);
            setMaxSize(filteredDataArray.length);
            setFilteredData(filteredDataArray);
    
            var pagePaginationArray: any = [];
    
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
                props: <button onClick={showHiddenFirstPartButtons} id="hiddenFirstPart">......</button>
            };
    
            var hiddenLastPartOfArray: any = {
                index: 0,
                props: <button onClick={showHiddenLastPartButtons} id="hiddenLastPart">......</button>
            };
    
            var hiddenFirstPartIndexes = [];
            var hiddenLastPartIndexes = [];
    
            for (let x = 0; x < pagePaginationArray.length; x++) {
                if (pagePaginationArray.length < 6) {
                    pagination.push(pagePaginationArray[x]);
                }
                else {
                    if (pageVisibility < 3) {
                        if ((x < 3) || ((pagePaginationArray.length-1) - x) < 3) {
                            pagination.push(pagePaginationArray[x]);
                        }else {
                            if(hiddenFirstPartIndexes.length == 0 && hiddenLastPartIndexes.length == 0) {
                                hiddenFirstPartOfArray.index = x+1;
                                pagination.push(hiddenFirstPartOfArray);
                            }
                            hiddenFirstPartIndexes.push(pagePaginationArray[x].index);
                        }
                    }
                    else if (pageVisibility >= 3 && pageVisibility < (pagePaginationArray.length - 3)) {
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
                        else if (((pagePaginationArray.length-1) - x) < 2 || ((x < pageVisibility && (pageVisibility - x) < 2) || (x > pageVisibility && (x - pageVisibility) <2) || x == pageVisibility)) {
                            pagination.push(pagePaginationArray[x]);
                        }
                        else {
                            if(hiddenLastPartIndexes.length == 0) {
                                hiddenLastPartOfArray.index = x+1;
                                pagination.push(hiddenLastPartOfArray);
                            }
                            hiddenLastPartIndexes.push(pagePaginationArray[x].index);
                        }
                    }
                    else {
                        if (x < 3 || (((pagePaginationArray.length-1) - x) < 3)) {
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
            
           
            if(hiddenFirstPartIndexes.length > 0) {
                setHiddenFirstPartButtons(hiddenFirstPartIndexes);
                
            }
            
            if(hiddenLastPartIndexes.length > 0) {
                setHiddenLastPartButtons(hiddenLastPartIndexes);
            }
            
            setPagePagination(pagination);

        }
    }

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
      
        if(localStorage.getItem('fullName') != null) localStorage.removeItem('fullName');
    },[patients]);


    const handleSearchChange = (name: string, value: any) => {
        setFilter(value);
    }

    return (
        <Radium.StyleRoot>
            <div className="patient-database" style={{...styles.fadeIn}}>
                
                <Row style={{marginBottom: '20px'}}>
                    <div style={{width: '30%'}}>
                    <TextInput icon={true} placeholder="Search for a patient" value={filter} required={false} error={''} name='search' label="" onChange={handleSearchChange} />
                    </div>
                </Row>
                <div style={{width: 'inherit', display: 'flex', alignItems:'center', flexDirection:'column'}}>
                    <Table 
                        columns={columns}
                        filteredData={filteredData[pageVisibility]? filteredData[pageVisibility]: []}
                        filter={filter}
                        visibility={visible}
                    />
                </div>
                
                <Row className="pagination">
                    <button onClick={()=> {pageVisibility != 0? setPageVisibility(pageVisibility-1): {}}}><img src="/assets/images/left.png" /></button>
                    <div>
                    {
                        pagePagination != [] &&  
                        pagePagination.map((prop: any, index: any)=> {
                                return prop.props;                  
                        })
                    }
                    </div>
                    
                    <button onClick={()=> {pageVisibility != (maxSize-1)? setPageVisibility(pageVisibility+1): {}}}><img src="/assets/images/right.png" /></button>
                </Row>
            </div>
        </Radium.StyleRoot>
    )
}

export default PatientDatabse;
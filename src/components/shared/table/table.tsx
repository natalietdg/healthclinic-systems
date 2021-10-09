import React, { useEffect, useState } from 'react';
import _, { isEmpty , omit} from 'lodash';
import { HelmetProvider } from 'react-helmet-async';
import './table.scss';

interface TableProps {
    columns: {
        colName: string;
    }[];
    width?: any;
    filteredData: any;
}

const Table: React.FC<TableProps> = ({columns, width, filteredData}) => {
    const [rows, setRows ] = useState<any>();
    // useEffect(()=> {
    //     console.log('filter', filter);
    //     if(filter!='') {
    //         const tempRow = data.filter((tempData: any, index: any) => {
    //             let values = Object.values(tempData);
    //             console.log('values', values);
    //             let tempValues:any = values.reduce(function(totalValue: any, tempValue) {
    //                 console.log('tempvalue', tempValue);
    //                 if(typeof(tempValue)=='string') if(tempValue.includes(filter)) totalValue.push(tempValue);
    //                 return totalValue;
                    
    //             },[])
    //             console.log('tempValues', tempValues);
    //             return Object.values(tempData).some(sameElement => tempValues.includes(sameElement));
    //         })
    //         console.log('tempRow', tempRow);
    //         setRows(tempRow);
    //     }else setRows(data);
       
    // },[filter || data])

    const subMenu = () => {
        
    }

    useEffect(()=> {
        console.log('filteredData', filteredData);
    },[filteredData])

    return (
        <table style={{width: width? width: '80%'}}>
            <tbody>
                <tr onMouseEnter={(e) => { e.target.parentElement.style.boxShadow = "3px 3px 6px white"}}>
                    {
                        columns.map((column: any, index: number)=> {
                            return (
                                <th key={index}>{column.colName}</th>
                            )
                        })
                    }
                </tr>
                {
                    filteredData.map((rowValues: any, index: any)=> {
                        return (
                            <tr key={index}>
                                {/* {
                                    columns.reduce(function (endColumns: any, column: any) {
                                        
                                        if(Object.values(column).includes(filter) || filter =='') return(<td onClick={column.colName ==''? subMenu : ()=> {}}>
                                        {rowValues[column.colName]}</td>);
                                    },[])
                                } */}
                                {columns.map((column: any, index: any) => {
                                    
                                    return <td key={index} onClick={column.colName ==''? subMenu : ()=> {}}>
                                        {rowValues[column.colName]}
                                    </td>
                                })}
                            </tr>
                            
                        )
                        
                    })
                }
            </tbody>
            
        </table>
    )
}   

export default Table;
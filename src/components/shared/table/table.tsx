import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import './table.scss';

interface TableProps {
    data: any;
    columns: {
        colName: string;
    }[];
    width?: any;
}

const Table: React.FC<TableProps> = ({data, columns, width}) => {

    const subMenu = () => {

    }

    return (
        <table style={{width: width? width: '80%'}}>
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
                data.map((rowValues: any, index: any)=> {
                    return (
                        <tr>
                            
                            {columns.map((column: any, index: any) => {
                                
                                return <td onClick={column.colName ==''? subMenu : ()=> {}}>
                                    {rowValues[column.colName]}
                                </td>
                             })}
                        </tr>
                        
                    )
                    
                })
            }
        </table>
    )
}   

export default Table;
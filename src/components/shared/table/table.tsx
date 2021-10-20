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

    const subMenu = () => {
        
    }

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
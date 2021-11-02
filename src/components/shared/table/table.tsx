import React, { useEffect, useState } from 'react';
import _, { isEmpty , omit} from 'lodash';
import Radium from 'radium';
import { styles } from '../animation';
import { fadeIn } from 'react-animations';
import './table.scss';

interface TableProps {
    columns: {
        colName: string;
    }[];
    width?: any;
    filteredData: any;
}

const Table: React.FC<TableProps> = ({columns, width, filteredData}) => {


    const DisplayWaiting = () => {
      
           return( 
            <Radium.StyleRoot>
                <h4 style={{...styles.fadeIn, textAlign: 'center', color: '#7e4ed1'}}>Fetching patient data
                {
                    
                    [1,2,3].map((number)=> {
                        return <span style={{...styles.fadeIn}}>.</span>
                    })
                    
                }
            </h4>
            </Radium.StyleRoot>)
        
    }

    const subMenu = () => {
        
    }

    return (
        <table style={{width: width? width: '80%'}}>
            {
                filteredData.length > 0 ? <tbody>
                <tr onMouseEnter={(e: any) => { e.target.parentElement.style.boxShadow = "3px 3px 6px white"}}>
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
            : 
                <DisplayWaiting />
            }
            
        </table>
    )
}   

export default Table;
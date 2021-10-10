import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchBackground } from 'Services/background.services';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useQuery} from 'src/hooks';
import { Links } from 'src/links';
import './navbar.scss';

interface NavbarProps {
    navbar: any;
}

const Navbar: React.FC<NavbarProps> = ({navbar}) => {
    let location = useLocation();
    const { t } = useTranslation();
    // console.log('location', location);
    // const query = useQuery();
    // const ref = query.get('ref');
    var name = '';
    
    const path = location.pathname.split('/')[1];

    const removeItem = () => {
        const patient = localStorage.getItem('patient');
        const fullName = localStorage.getItem('fullName');
        if(patient) localStorage.removeItem('patient');
        if(fullName) localStorage.removeItem('patient')
    }

    if(typeof(Storage) !== 'undefined' && path == 'patient') {

        console.log('storage', localStorage);
        const values = Object.keys(localStorage);
        console.log('values', values);
        const response = localStorage.getItem("fullName");
        console.log('response storage', response);
        if (response != null || response != undefined) name = response;
    }
    else {
        console.log('error in storage');
    }

    const pageName = name != ''? name : t(`path.${path}`);
    // console.log('ref', ref);
    // console.log('ref', query);
    return (       
        <div className="navbar-bg"> {/*style={{backgroundImage: `url(${navbar['side-bar']?.imageUrl})`}}*/}
            <div className="blurred" > {/*style={{backgroundImage: `url(${navbar['side-bar-blurred']?.imageUrl})`}}*/}
            {/* <span><img style={{top: 0, width: '25px', height: '25px', paddingTop: '20px'}} src="/assets/images/menu.png"/></span> */}
                <ul className="link-list">
                    {
                        Links.map((link: any, index:number)=> {
                            return (link.name=='placeholder')? <h3>{pageName}</h3> : 
                            <li key={index}><Link key={index} to={link.to} onClick={removeItem} ><span className="span">{link.name}</span></Link></li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
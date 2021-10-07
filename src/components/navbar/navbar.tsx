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
    const pageName = location.pathname.split('/')[1];
    // console.log('ref', ref);
    // console.log('ref', query);
    return (       
        <div className="navbar-bg"> {/*style={{backgroundImage: `url(${navbar['side-bar']?.imageUrl})`}}*/}
            <div className="blurred" > {/*style={{backgroundImage: `url(${navbar['side-bar-blurred']?.imageUrl})`}}*/}
            {/* <span><img style={{top: 0, width: '25px', height: '25px', paddingTop: '20px'}} src="/assets/images/menu.png"/></span> */}
                <ul className="link-list">
                    {
                        Links.map((link: any, index:number)=> {
                            return (link.name=='placeholder')? <h3>{t(`path.${pageName}`)}</h3> : 
                            <li key={index}><Link key={index} to={link.to}><span className="span">{link.name}</span></Link></li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
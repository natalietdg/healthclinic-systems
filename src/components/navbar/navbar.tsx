import React, { useEffect, useState } from 'react';
import { fetchBackground } from 'Services/background.services';
import { Link } from 'react-router-dom';
import { Links } from 'src/links';
import './navbar.scss';

interface NavbarProps {
    navbar: any;
}

const Navbar: React.FC<NavbarProps> = ({navbar}) => {
    
    return (       
        <div className="navbar-bg"> {/*style={{backgroundImage: `url(${navbar['side-bar']?.imageUrl})`}}*/}
            <div className="blurred" > {/*style={{backgroundImage: `url(${navbar['side-bar-blurred']?.imageUrl})`}}*/}
            <span><img style={{top: 0, width: '25px', height: '25px', paddingTop: '20px'}} src="/assets/images/menu.png"/></span>
                <ul className="link-list">
                    
                    {
                        Links.map((link: any, index:number)=> {
                            return <li key={index}><Link key={index} to={link.to}><img  key={index} src={link.img}/><span className="span">{link.name}</span></Link></li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Switch, Route } from 'react-router-dom';
import Navbar from 'Components/navbar';
import { fetchBackground } from 'Services/background.services';

interface ShellProps {
    routes: any;
}

const Shell: React.FC<ShellProps> = ({routes}) => {
    
    const [ navbar, setNavbar ] = useState({ 'side-bar': {}, 'side-bar-blurred': {}});
    
    useEffect(()=> {
        getBackground();        
    },[])

    const getBackground = async() => {
        const response = await fetchBackground();
        setNavbar({...navbar, "side-bar": response['side-bar'], 'side-bar-blurred': response['side-bar-blurred']});
    }

    return (
        <Switch>
            {
                Array.isArray(routes.private) &&

                routes.private.map((route:any, index:number) => {
                    return (
                        <Route exact key={index} path={route.path}>
                            <div>
                                {
                                    route.withNavbar && 
                                    <Navbar navbar={navbar} />
                                }
                            
                                {route.component}
                            </div>
                           
                        </Route>
                    )
                })
            }
    
            {
                Array.isArray(routes.public) &&
                routes.public.map((route:any, index: number) => {
                    return <Route exact key={index} path={route.path}>
                        {route.component}
                    </Route>
                })
            }
        </Switch>
    )
}

export default Shell;
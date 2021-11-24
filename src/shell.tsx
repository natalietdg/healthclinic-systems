import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from 'Components/navbar';

interface ShellProps {
    routes: any;
}

const Shell: React.FC<ShellProps> = ({routes}) => {

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
                                    <Navbar />
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
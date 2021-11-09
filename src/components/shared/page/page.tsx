import React, { useEffect } from 'react';

interface PageProps {
    visibility: string | number;
    numOfChildren: (size: number) => void;
}

const Page: React.FC<PageProps> = ({children, visibility, numOfChildren}) => {

    useEffect(()=> {
        console.log('children', children);
        numOfChildren(children?.length);
    },[]);

    return(
        <div style={{width: 'inherit', display: 'flex', flexDirection: 'row', justifyContent: 'center',  padding: '40px 0px'}}>
            {
                children?.length > 0 && children?.map((child: any)=> {
                    if(child != false) {
                        if(child.props.index==visibility) {
                            return child;
                        }
                    }
                    
                })
            }
        </div>
    )
}

export default Page;
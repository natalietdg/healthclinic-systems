import React, { useEffect } from 'react';

interface PageProps {
    visibility: string | number;
    numOfChildren: (size: number) => void;
}

const Page: React.FC<PageProps> = ({children, visibility, numOfChildren}) => {

    useEffect(()=> {
        numOfChildren(children.length);
    },[])

    return(
        <div>
            {
                children.map((child)=> {
                    if(child.props.index==visibility) {
                        return child
                    }
                })
            }
        </div>
    )
}

export default Page;
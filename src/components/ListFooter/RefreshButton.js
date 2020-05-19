import React, { useState } from 'react'
import style from './Button.less'
import appStyle from '../../App.less'
import Sync from './syncAlt';

export default function RefreshButton(props) {
    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    }

    const handleMouseLeave = () => {
        setHover(false);
    }
    
    // Workaround for svg fill
    let fill = hover ? "#D3FCF5" : "#E7664E" ;

    return (
        <div
            className={`${style['button']} ${style['short-button']}`}
            onClick={props.handleRefresh}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}    
        >
        <Sync fill={fill}/>
        </div>
    )
}

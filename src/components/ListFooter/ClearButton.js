import React from 'react'
import style from './Button.less'
import appStyle from '../../App.less'

export default function ClearButton(props) {
    return (
        <div
            className={`${style['button']} ${appStyle['noselect']} ${style['long-button']}`}
            onClick={props.handleClearAll}      
        >
        <div className={style['clear-button-text']}>Clear all To-dos</div>
        </div>
    )
}

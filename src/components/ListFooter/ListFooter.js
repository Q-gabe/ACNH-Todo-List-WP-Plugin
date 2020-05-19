import React from 'react'
import style from './ListFooter.less'
import ClearButton from './ClearButton';
import RefreshButton from './RefreshButton';

export default function ListFooter(props) {
    return (
        <div className={style['todo-footer']}>
            <ClearButton handleClearAll={props.handleClearAll}/>
            <RefreshButton handleRefresh={props.handleRefresh}/>
        </div>
    )
}

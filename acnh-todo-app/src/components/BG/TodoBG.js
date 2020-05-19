import React from 'react';
import style from './TodoBG.less';
import appStyle from '../../App.less';
import Leaf from '../../assets/leaf.svg';
import TodoBody from '../../containers/TodoBody';

export default function TodoBG() {
    return (
        <div className={style['outer-bg']}> 
            <div className={style['inner-bg']}>
                <div className={style['list-header']}>
                    <Leaf className={`${style['list-header-logo']} ${appStyle['noselect']}`} />
                    <span className={`${style['list-header-name']} ${appStyle['noselect']}`}>To-do List</span>    
                </div>
                <TodoBody />
            </div>
        </div>
    )
}

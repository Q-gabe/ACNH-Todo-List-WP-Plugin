import React from 'react';
import Check from '../../assets/check.svg';
import style from './Checkbox.less';
import appStyle from '../../App.less';

export default function Checkbox(props) {
    return (
        <div className={style.checkbox} onClick={props.handleToggle}>
            {(props.complete === '0') || <Check className={`${style['checkbox-checkmark']} ${appStyle['noselect']}`} />}
        </div>
    )
}

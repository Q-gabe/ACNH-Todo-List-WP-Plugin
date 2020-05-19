import React, { useState, useRef, useEffect } from 'react';
import Checkbox from './Checkbox';
import style from './ListItem.less';
import appStyle from '../../App.less';
import Cross from '../../assets/times.svg';

export default function ListItem(props) {
    const [hover, setHover] = useState(false);
    const refTextArea = useRef(null);

    // Use ref to resize todo based on size on first load.
    useEffect(() => {
        refTextArea.current.style.height = '0px';
        refTextArea.current.style.height = `${refTextArea.current.scrollHeight - 3}px`;
    },[]);

    /*
    * UI Logic
    */

    // CHECKBOX
    const handleToggle = () => {
        let complete = props.complete !== '0' ? '0' : '1';
        props.handleEdit(props.id, props.text, complete);
    };

    // TEXTAREA
    // Dynamic textarea styling idea from https://stackoverflow.com/a/995374.
    const handleKeyUp = (e) => {
        e.target.style.height = '0px';
        e.target.style.height = `${e.target.scrollHeight - 3}px`; // 3 px hacky fix for scrollHeight inconsistency
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            refTextArea.current.blur();
            handleUserEdit(e.target.value);
        }
    }

    const handleBlur = (e) => {
        if (e.target.value === props.text) {
            // User did not edit text
            return;
        } else { 
            handleUserEdit(e.target.value);
        }
    }

    const handleUserEdit = (text) => {
        props.handleEdit(props.id, text, props.complete);
    }

    // DELETE
    const handleEnter = () => {
        setHover(true);
    }

    const handleLeave = () => {
         setHover(false);
    }

    const handleDelete = () => {
        props.handleDelete(props.id)
    }

    // Classname evaluations
    let className = props.isOdd ? `${style['listItem']} ${style['odd']}` : `${style['listItem']}`;
    className += props.complete !== '0' ? ` ${style['completed']}` : "";
    let inputClassName = props.isOdd ? `${style['todo-content']} ${style['odd']}` : `${style['todo-content']}`;

    return (
        <div className={className} onMouseEnter={handleEnter} onMouseLeave={handleLeave} >
            <Checkbox type="checkbox"
                complete={props.complete} 
                handleToggle={handleToggle} 
                handleDelete={props.handleDelete}
            />
            <textarea
                className={inputClassName}
                defaultValue={props.text}
                maxLength={255}
                onKeyUp={handleKeyUp}
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
                spellCheck="false"
                ref={refTextArea}
            ></textarea>
            { hover ? 
                <div className={style.delete} onClick={handleDelete}>
                    <Cross className={`${style['delete-cross']} ${appStyle['noselect']}`} />
                </div> 
            : "" }
        </div>
    )
}

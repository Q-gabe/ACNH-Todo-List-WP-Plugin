import React from 'react';
import style from './UserInput.less';

export default function UserInput(props) {
    return (
        <div>
            <input
                className={style['user-input']}
                id={style['user-input']}
                type="text"
                placeholder="What needs doing today?"
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        props.handleUserInput(e.target.value);
                        e.target.value = '';
                    }
                }}
                maxLength="255"
                spellCheck="false"
            />
        </div>
    )
}

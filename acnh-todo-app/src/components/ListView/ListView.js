import React from 'react';
import ListItem from './ListItem';
import style from './ListView.less';

export default function ListView(props) {
    // Initialize array of all posts
    const listItems = []
    for (let i = 0; i < props.posts.length; i++) {
        let post = props.posts[i]
        listItems.push(<ListItem 
                            key={post.todo_id} 
                            id={post.todo_id} 
                            text={post.todo_text} 
                            complete={post.todo_complete} 
                            handleEdit={props.handleEdit}
                            handleDelete={props.handleDelete}
                            isOdd={i%2===0}
                        />);
    }

    return (
        <div className={style.listView}>
            {listItems}
        </div>
    )
}

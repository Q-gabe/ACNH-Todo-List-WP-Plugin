import React, { useState, useEffect } from 'react';
import UserInput from '../components/UserInput/UserInput';
import ListView from '../components/ListView/ListView';
import ListFooter from '../components/ListFooter/ListFooter';
import * as Routes from '../api/apiRoutes';

export default function TodoBody() {
    const [posts, setPosts] = useState([]);

    // Update data from database on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Updates all posts. Called every CRUD transaction.
    async function fetchData() {
        const requestOptions = {
            method: 'GET',
        }
        const res = await fetch(Routes.todosRoute, requestOptions);
        const json = await res.json()
        setPosts(json);
    }

    // Callback for user input of todo. Submits a POST request for a new todo.
    const handleUserInput = (text) => {
        //[DEBUG]
        console.log("User submitted \"" + text + "\"")

        // Call POST API from Wordpress
        const requestOptions = {
            method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
            body: JSON.stringify({
                todo_text: text
            })
        }
        fetch(Routes.todosRoute, requestOptions)
            .then((res) => {
                res.json()
                .then((data) => {
                    console.log(data)
                    fetchData();
                });
            });
    }

    // Callback to edit a task
    const handleEdit = (id, text, complete) => {
        //[DEBUG]
        console.log(`User edited task ${id} to "${text}" and ${complete}`)

        // Call POST API (update) from Wordpress
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                todo_text: text,
                todo_complete: complete
            })
        }
        fetch(Routes.todosRoute+`/update/${id}`, requestOptions)
            .then((res) => {
                res.json()
                .then((data) => {
                    console.log(data)
                    fetchData();
                } );
            });   
    }

    // Callback to delete a task
    const handleDelete = (id) => {
        //[DEBUG]
        console.log(`User deleted task ${id}`)

        // Call POST API (delete) from Wordpress
        const requestOptions = {
            method: 'POST',
        }
        fetch(Routes.todosRoute+`/delete/${id}`, requestOptions)
            .then((res) => {
                res.json()
                .then((data) =>  {
                    console.log(data)   
                    fetchData();
                })
            });
    }

    // Callback to clear all tasks
    const handleClearAll = (e) => {
        //[DEBUG]
        console.log("User clicked to clear all todos.")

        // Call DELETE API
        const requestOptions = {
            method: 'POST',
        }
        fetch(Routes.todosRoute+'/clear', requestOptions)
            .then((res) => {
                res.json()
            .then((data) =>  {
                    console.log(data)   
                    fetchData();
                })
            });
    }

    return (
        <div className="todo-body">
            <UserInput handleUserInput={handleUserInput} />
            <ListView posts={posts} handleEdit={handleEdit} handleDelete={handleDelete} />
            <ListFooter handleClearAll={handleClearAll} handleRefresh={fetchData} />
        </div>
    )

    
}

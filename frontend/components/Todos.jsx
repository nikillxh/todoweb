import { useState } from "react";
import redoSymbol from "../images/redo-symbol.svg";
import deleteSymbol from "../images/delete-symbol.svg";
import "../src/App.css";
import { deleteButton } from "./TodoFunctions";
import { RiDeleteBin6Line } from "react-icons/ri";

export function Todos({todos}) {
    const [disabledButtons, setDisabledButtons] = useState([]);

    const handleButtonClick = async (uid) => {
        await fetch("http://localhost:3000/completed", {
            method: "PUT",
            body: JSON.stringify({
                id: uid
            }),
            headers: {
                "Content-type": "application/json"
            }
        });

        setDisabledButtons((prev) => [...prev,uid]);
        // alert("Todo updated");
        window.location.reload();
    };

    const redoButton = async (uid) => {
        try {
            await fetch("http://localhost:3000/redo", {
                method: "PUT",
                body: JSON.stringify({ id: uid }),
                headers: {
                    "Content-type": "application/json",
                },
            });
            
            setDisabledButtons((prev) => prev.filter((id) => id !== uid));
            window.location.reload();
        } catch (error) {
            console.error("Error during DELETE request:", error);
        }
    };

    return <div>
        {todos.map((todo) => (
            <div key={todo._id} className="bordert">
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                <button
                    onClick={() => handleButtonClick(todo._id)}
                    disabled={todo.completed == true || disabledButtons.includes(todo._id)}
                    style={{width: '200px'}}>
                        {todo.completed == true? <div><span>Completed</span> <span style={{fontSize: '15px',  verticalAlign: 'top', color: '#008000'}}>✔</span></div>: "Mark as complete"}
                    </button>
                <button 
                    onClick={() => redoButton(todo._id)}
                    disabled={todo.completed == false || disabledButtons.includes(todo._id)}>
                        <img src={redoSymbol} alt="Redo" style={{width: '14px', height: '14px'}}/>
                    </button>
                <button onClick={() => deleteButton(todo._id)}><RiDeleteBin6Line style={{color:"red"}}/></button>
            </div>
        ))}
    </div>
}


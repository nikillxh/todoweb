import { useState } from "react";

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

    return <div>
        {todos.map((todo) => (
            <div key={todo._id} className="bordert">
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                <button
                    onClick={() => handleButtonClick(todo._id)}
                    disabled={todo.completed == true || disabledButtons.includes(todo._id)}>
                        {todo.completed == true? "Completed" : "Mark as complete"}
                    </button>
                
            </div>
        ))}
    </div>
}


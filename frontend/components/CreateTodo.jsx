import { useState } from "react";

// import { modcount } from "../src/App";

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function ClearButton() {
        setTitle("");
        setDescription("");
    }

    return <div className="borderc">
        <h1>Add a Todo !</h1>
        <input type="text" placeholder="Todo Work" value={title} onChange={function(e) {
            const value = e.target.value;
            setTitle(e.target.value);
        }}
        style={{width: '75%'}}></input> <br />
        <textarea type="text" placeholder="Work Description" value={description} onChange={function(e) {
            const value = e.target.value;
            setDescription(e.target.value);
        }}
        style={{width: '65%'}}></textarea> <br />
        <button onClick={async () => {
            // modcount += 1;
            await fetch("http://localhost:3000/todo", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(async function(res){
                    const json = await res.json();
                    // alert("Todo added");
                    window.location.reload();
                })
            .catch(function(error) {
                console.error("Error", error);
            });

        }}>Add +</button>
        <button onClick={ClearButton}>Clear</button>
    </div>
}
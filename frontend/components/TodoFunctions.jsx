import { useState } from "react";

export const deleteButton = async(uid) => {
    await fetch("http://localhost:3000/deletetodo", {
        method: "DELETE",
        body: JSON.stringify({
            id: uid
        }),
        headers: {
            "Content-type": "application/json"
        }
    });
    window.location.reload()
}
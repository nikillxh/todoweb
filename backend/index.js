const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db")
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());


app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    console.log(createPayload);
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    // mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg: "Todo created"
    })
})

app.get("/todos", async function(req, res) {
    const todos = await todo.find({});
    
    res.json({
        todos
    })
})

app.put("/completed", async function(req, res) {
    const updatePayload = req.body;
    console.log(updatePayload);
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    await todo.findByIdAndUpdate(req.body.id,{
        $set:{completed:true}
    })
    res.json({
        msg: "Todo marked as completed"
    })
})

app.listen(3000);
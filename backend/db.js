const mongooose = require("mongoose")

mongooose.connect("mongo-db-here")

const todoSchema = mongooose.Schema({
    title: String,
    description: String,
    completed: {
        type: Boolean,
        default: false,
    }
})

const todo = mongooose.model('todos', todoSchema);

module.exports = {
    todo
}
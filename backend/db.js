const mongooose = require("mongoose")

mongooose.connect("mongodb+srv://admin:ntvePwt1kH8INFJU@cluster0.0mb5g.mongodb.net/")

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
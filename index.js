const express = require('express');
const todosRouter = require('./routes/todos')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log(`server listening on port 3000`)
})

app.use('/todos', todosRouter)
app.get('/', (req, res) => {
})
const express = require('express')
const pool = require('../database/db')
const router = express.Router()


// Routes

//get all 
router.get('/', async (req, res) => {
    try {
        const allTodos = await pool.query(
            'SELECT * from todo;',
        );
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//get one
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            'SELECT * FROM todo WHERE todo_id = $1;',
            [id]
        );
        res.json(todo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})


//create
router.post('/', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todo (description) VALUES ($1) RETURNING *;',
            [description]
        );
        res.json(newTodo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

//update
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            'UPDATE todo SET description = $1 WHERE todo_id = $2;',
            [description, id]
        );
        res.json({messsage: "todo updated"})
    } catch (error) {
        console.error(error.message)
    }
})


//delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            'DELETE FROM todo WHERE todo_id = $1;',
            [id]
        );
        res.json({message: "todo deleted"})
    } catch (error) {
        console.error(error.message)
    }
})

module.exports = router
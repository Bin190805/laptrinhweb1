const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Lấy tất cả các công việc (GET /todos)
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Không thể lấy danh sách công việc' });
    }
});

// Tạo mới một công việc (POST /todos)
router.post('/', async (req, res) => {
    const { title, description, due_date } = req.body;
    if (!title || !due_date) {
        return res.status(400).json({ error: 'Tất cả các trường đều bắt buộc' });
    }

    const newTodo = new Todo({ title, description, due_date, completed: false });
    
    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Không thể tạo công việc mới' });
    }
});

// Cập nhật công việc theo ID (PUT /todos/:id)
router.put('/:id', async (req, res) => {
    const { title, description, due_date, completed } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description, due_date, completed },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: 'Không tìm thấy công việc' });
        }

        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Không thể cập nhật công việc' });
    }
});

// Xoá một công việc (DELETE /todos/:id)
router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ error: 'Không tìm thấy công việc' });
        }
        res.json({ message: 'Xoá công việc thành công' });
    } catch (err) {
        res.status(500).json({ error: 'Không thể xoá công việc' });
    }
});

// Đánh dấu công việc hoàn thành (PUT /todos/:id/complete)
router.put('/:id/complete', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { completed: true },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: 'Không tìm thấy công việc' });
        }

        res.json({ message: 'Công việc đã được đánh dấu là hoàn thành', updatedTodo });
    } catch (err) {
        console.error('Error updating todo:', err);
        res.status(500).json({ error: 'Không thể cập nhật công việc' });
    }
});

// Export router để sử dụng trong file chính
module.exports = router;

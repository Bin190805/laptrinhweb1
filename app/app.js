// app.js
const express = require('express');
const todosRouter = require('./src/routes/todos');
const app = express();

app.use(express.json());

console.log("Express server setup completed.");
app.use('/todos', todosRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

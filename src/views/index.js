import axios from "axios";
import express from "express";
const router = express.Router();
import fs from 'fs';
import path from 'path';

router.use('/todos', (req, res) => {
    fs.readFile(path.join(__dirname, "templates/todo.html"), 'utf-8', async (err, data) => {
        if (err) {
            return res.send("Load ui error")
        }

        let tableContent = ``;

        let todos;

        await axios.get("http://localhost:3000/api/v1/todos")
            .then(res => {
                todos = res.data.data;
            })
            .catch(err => {
                todos = [];
            })
        todos.map((todo, index) => {
            const todoTitle = todo.completed
                ? `<del>${todo.title}</del>` // Nếu todo đã hoàn thành (completed là true) thì gạch ngang tiêu đề.
                : todo.title; // Nếu todo chưa hoàn thành (completed là false) thì hiển thị tiêu đề bình thường.
            tableContent += `
                        <tr>
                           
                            <td>
                                 ${todo.completed
                    ? `<input class="form-check-input me-2" type="checkbox" value="" checked="false" onChange={handleChange(event,${todo.id})} />`
                    : `<input class="form-check-input me-2" type="checkbox" value=""  onChange={handleChange(event,${todo.id})} />`}
                            </td>
                             <td>
                                ${!todo.completed ? `<span>${todo.title} </span>` : `<span style="text-decoration: line-through">${todo.title} </span>`}
                            </td>
                            <td>
                                <button onclick={deleteTodo(event,${todo.id})} type="button" class="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    `
        })
        // res.send(data.replace("{{tableContent}}", tableContent));
        const modifiedData = data.replace("{{tableContent}}", tableContent);
        res.setHeader("Content-Type", "text/html");
        res.send(modifiedData)
    })
})


module.exports = router;
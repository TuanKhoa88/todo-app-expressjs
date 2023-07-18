import express from 'express';
const router = express.Router();
import fs from 'fs';
import path from 'path';
import multiparty from 'multiparty';

router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, "todos.json"), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Get the failed todos!!"
            })
        }
        return res.status(200).json({
            message: "Get todos successfully!",
            data: JSON.parse(data)
        })
    })
})

router.delete('/:todoId', (req, res) => {
    if (req.params.todoId) {
        fs.readFile(path.join(__dirname, "todos.json"), 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Get the failed todos!"
                })
            }
            let todos = JSON.parse(data);
            todos = todos.filter(todo => todo.id != req.params.todoId);

            fs.writeFile(path.join(__dirname, "todos.json"), JSON.stringify(todos), (err) => {
                if (err) {
                    return res.status(500).json({
                        message: "File save failed!!"
                    })
                }
                res.sendStatus(200);
            })
        })
    } else {
        return res.status(500).json(
            {
                message: "Please pass todoId!!"
            }
        )
    }
})

router.post('/', (req, res) => {
    let form = new multiparty.Form();
    form.parse(req, (err, fields) => {
        if (err) {
            return res.status(500).send("Error reading form!")
        }
        let newtodo = {
            id: Date.now(),
            title: fields.title[0],
        }
        fs.readFile(path.join(__dirname, "todos.json"), 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).json(
                    {
                        message: "Read data failed!"
                    }
                )
            }
            let oldData = JSON.parse(data);
            oldData.unshift(newtodo)
            fs.writeFile(path.join(__dirname, "todos.json"), JSON.stringify(oldData), (err) => {
                if (err) {
                    return res.status(500).json(
                        {
                            message: "File recording failed!"
                        }
                    )
                }
                return res.redirect('/todos')
            })
        })

    })
})

router.patch('/:todoId', (req, res) => {
    if (!req.params.todoId) {
        return res.status(500).json({
            message: "Please transmit todoId you want to update"
        })
    }
    let todoId = req.params.todoId;
    let body = req.body;

    //Update the todo
    fs.readFile(path.join(__dirname, "todos.json"), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Getting todos failed"
            });
        }

        let todos = JSON.parse(data);
        let todo = todos.find(todo => todo.id == todoId);
        if (!todo) {
            return res.status(500).json({
                message: "Can't change todo with id" + todoId
            });
        }
        //Update the todo with the body data
        Object.assign(todo, body);

        //Save the updated todo
        fs.writeFile(path.join(__dirname, "todos.json"), JSON.stringify(todos), (err) => {
            if (err) {
                return res.status(500).json({
                    message: "File save failed!!"
                });
            }
            res.sendStatus(200);
        })
    })
})

module.exports = router;
const Todo = require('../models/Todo')
                                                                                
module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user.userName)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create(
              {
                todo: req.body.todoItem,
                completed: false,
                userId: req.user.id
              })
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
          
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    editTodo: async (req, res)=>{
      console.log(req.user.userName)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            const todoItem = await Todo.findOne({_id: req.params.id})
            console.log(todoItem)
            res.render('edit.ejs', { todo: todoItem, todos: todoItems, left: itemsLeft, user: req.user })
        }catch(err){
          console.log(err)
        }
    },
    editedTodo: async (req, res)=>{
      console.log(req.body)
      try{
          await Todo.findOneAndUpdate({_id: req.params.id }, { todo: req.body.todo })
          console.log('Todo has been edited!')
          res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    }
}  
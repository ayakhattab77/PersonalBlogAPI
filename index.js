//---------------------------------- required packages and defined consts -----------------------------------
const express = require('express');
const mongoose = require('mongoose');
const controllers = require('./controllers.js')
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const blogRouter = express.Router();

//---------------------------------- mongoose connection and app listen------------------------------
mongoose.set('strictQuery', false)
mongoose.connect("mongodb://127.0.0.1:27017/BlogDB")
    .then(() => {
        console.log("MongoDB is connected.")
        app.listen(process.env.port || port, () => {
            console.log(`Server is running on port ${port}`);
        });
        //The reason we start listening inside the then() func of the connection of moongose
        //is because we don't want any requests happening before the connection with the database
        //is established since it will only cause the application to crash
    
    })
    .catch((error) => {
        console.log(error);
    });


//------------------------------------ Middlewares --------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', blogRouter);

//-------Routes----------
//there are few routes so there is no need for a separate file
//there is a separate file for controllers
blogRouter.route('/')
        .get(controllers.getAllArticles)
        .post(controllers.postArticle);
//findById mw
blogRouter.use('/:articleID', controllers.findArticleByID);

blogRouter.route('/:articleID')
        .get(controllers.getOneArticle)
        .put(controllers.updateArticle)
        .delete(controllers.deleteArticle)
        .patch(controllers.patchArticle)
//---------END ROUTES----------

//Not found mw
app.use((request, response)=>{
    response.status(404).json({data: "Not found"});
});

//Error mw
app.use((error, request, response, next)=>{
    let status = error.status || 500;
    response.status(status).json({Error: error+""});
})
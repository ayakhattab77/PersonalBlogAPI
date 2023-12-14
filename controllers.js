const articleSchema = require("./articleModel");

exports.findArticleByID = (req, res, next) => {
    articleSchema.findById(req.params.articleID)
    .then((article) => {
        req.article = article;
        next();
    })
    .catch((error) => {
        next(error);
    });
    //we could use next(article) here but then article will be considered a fourth param and immediately move to error mw
    //so to carry article from this mw to the next, we will have to embed it inside req as a property
};

exports.getOneArticle = (req, res, next) => {
    res.status(200).json({article: req.article});
};

exports.getAllArticles = (req, res, next) => {
    const { query } = req;
    articleSchema.find(query)
    .then((article) => {
        res.status(200).json({article});
    })
    .catch((error) => {
        next(error);
    })
};

exports.postArticle = (req, res, next) => {
    const article = new articleSchema(req.body);
    article.save()
    .then(() => {
        res.status(201).json({article});
    })
    .catch((error) => {
        next(error);
    });    
};

exports.updateArticle = (req, res, next) => {
    let { article } = req;
    let { body } = req
    article.Title = body.Title;
    article.Content = body.Content;
    article.save()
    .then(() => {
        res.status(200).json({article});
    })
    .catch((error) => {
        next(error);
    })
};

exports.deleteArticle = (req, res, next) => {
    articleSchema.deleteOne(req.article)
    .then(() => {
        res.status(200).json({article: req.article});
    })
    .catch((error) => {
        next(error);
    })
};

exports.patchArticle = (req, res, next) => {
    let { article } = req;
    let { body } = req
    
    Object.entries(body).forEach((entry) => {
        const property = entry[0];
        const value = entry[1];
        article[property] = value; 
    })
    article.save()
    .then(() => {
        res.status(200).json({article});
    })
    .catch((error) => {
        next(error);
    })
};



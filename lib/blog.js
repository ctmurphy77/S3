const fs = require('fs');
const db = require('./mongo.js');
module.exports = function (req, res) {
    switch(req.params.post){
        case 'main':
            res.render('posts/main', { title: 'Posts' });
            break;
        case 'post':
            if(req.session.user == true){
                const testFolder = './public/images';
                const fs = require('fs');
                fs.readdir(testFolder, (err, files) => {
                    res.render('posts/post', { list: files, title: 'Post' });
                })
            }
            else{
                res.render('admin', { admin: false, title: 'ADMIN' });
            }
            break;
        case 'delete':
            if(req.session.user == true){
                var Blog = require('../models/Blog.js');
                Blog.remove({author: 'ctm'}, function(err){});
                Blog.find({}, function(err, posts) {
                    if (!err){
                        res.render('posts/delete', { list: posts, title: 'Delete a Post' });
                    } else {throw err;}
                });
            }
            else{
                res.render('admin', { admin: false, title: 'ADMIN' });
            }
            break;
        default:
           var Blog = require('../models/Blog.js');
           Blog.findOne({title: req.params.post},function(err, obj){
                if (err){
                	res.redirect(404, '404');
                }
                res.render('posts/outline', { title: req.params.post, thumbnail: obj.thumbnail, content: obj.post, edited: obj.date });
       	    });
            break;
    }
};
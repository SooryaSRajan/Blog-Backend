const express = require('express');
const router = express.Router();
const blogModel = require("../models/blog_model")

router.get("/getBlogs", (req, res) => {

    blogModel.find({}).select("-_id -__v").exec((err, data) => {
        if (err) {
            return res.status(500).send({
                message: "Something went wrong",
                err: err
            })
        }

        if (data) {
            return res.status(200).send({
                message: "Retrieved data successfully",
                data: data
            })
        } else {
            return res.status(400).send({
                message: "Could not retrieve data",
            })
        }

    })

});

router.post("/addBlog", (req, res) => {

    const {blog, authorName, blogTitle} = req.body

    if (!blog) {
        return res.status(400).send({
            message: "Please attach blog data",
        })
    }
    if (typeof blog !== 'string') {
        return res.status(400).send({
            message: "Blogs should be of type STRING",
        })
    }
    if (blog.length <= 100) {
        return res.status(400).send({
            message: "Blogs should have more than 100 characters",
        })
    }

    if (!authorName) {
        return res.status(400).send({
            message: "Please attach author name",
        })
    }
    if (typeof authorName !== 'string') {
        return res.status(400).send({
            message: "Author name should be of type STRING",
        })
    }
    if (/\d/.test(authorName)) {
        return res.status(400).send({
            message: "Author name should not have numbers",
        })
    }

    if (!blogTitle) {
        return res.status(400).send({
            message: "Please attach blog title",
        })
    }

    if (typeof blogTitle !== 'string') {
        return res.status(400).send({
            message: "Blog Title should be of type STRING",
        })
    }

    if (blogTitle.length < 3) {
        return res.status(400).send({
            message: "Blog name should be at least 3 characters log",
        })
    }


    const blogData = new blogModel({
        blog: blog,
        authorName: authorName,
        blogTitle: blogTitle
    });

    blogData.save(function (err) {
        if (err) {
            res.status(500).json({message: "Could not add blog to database, something went wrong", err: err});
            return;
        }

        res.status(200).json({message: "Blog has been added successfully"});
    });


})

module.exports = router

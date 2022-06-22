const express = require('express');
const router = express.Router();
const blogModel = require("../models/blog_model")

router.get("/getBlogs", (req, res) => {

    blogModel.find({}, (err, data) => {
        if(err){
            return res.status(500).send({
                message: "Something went wrong",
                err: err
            })
        }

        if(data){
            return res.status(200).send({
                message: "Retrieved data successfully",
                data: data
            })
        }
        else{
            return res.status(400).send({
                message: "Could not retrieve data",
            })
        }

    })

});

router.post("addBlog", (req, res) => {

})

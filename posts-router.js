const express = require("express")
const posts = require("./data/posts")

const router = express.Router()

router.get("/posts", (req, res) => {
    posts.find(req.query)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Post information could not be retrieved"
            })
        })
})

router.get("/posts/:id", (req,res) => {
    posts.findById(req.params.id)
        .then((post) => {
            if(post){
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "Post with the specified ID not found",
                })

            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Post information could not be retrieved"
            })
        })
})

router.get("/posts/:id/comments", (req,res) => {
    posts.findCommentById(req.params.id)
        .then((comment) => {
            if(comment){
                res.status(200).json(comment)
            } else {
                res.status(404).json({
                    message: "Post with the specified ID not found",
                })

            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Comment's information could not be retrieved"
            })
        })
})


router.post("/posts", (req, res) => {
    if (!req.body.title || !req.body.contens) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post.",
      })
    } posts
        .insert(req.body)
        .then((post) => {
            res.status(201).json(post);
         })
         .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "There was an error while saving post to database"
            })
         })
    })

    router.post("/posts/:id/comments", (req, res) => {
        if(!req.body.text) {
            return res.status(400).json({message: "Please provide text for the comment."})
        }
        posts
            .insertComment({...req.body, post_id: req.params.id})
            .then((post) => {
                if(post) {
                    res.status(201).json(post)
                } else {
                    res.status(404).json({message: "The post with the specified ID does not exist"})
                }
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    message: "There was an error saving comment to database!"
                })
            })
        })
    

router.delete("/posts/:id", (req, res) => {
  posts 
    .remove(req.params.id)
    .then((count) => {
        if (count > 0){
            res.status(200).json({
                message: "The post has been removed"
            })
        } else {
            res.status(404).json({
                message: "The post with this ID does not exist"
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "The post could not be removed"
        })
    })
})

router.put("/posts/:id", (req, res) => {
    const user = posts.getUserById(req.params.id)
    if(!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post!",
        })
    } 
    posts
    .update(req.params.id, req.body)
    .then((posts) => {
        if(post) {
            res.status(200).json(post)
        }
        else {
            res.status(404).json({
                message: "The post with this ID does not exist"
            })
           }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Post information could not be modified"
            })
    })
})

router.listen(8080, () =>{
    console.log("routers started on port 8080")
})

module.exports = router;
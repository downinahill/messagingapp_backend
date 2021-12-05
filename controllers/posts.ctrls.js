const db = require('../models')


const index = (req, res) => {
    db.Post.find({}, (error, posts) => {
        if (error) return res.status(400).json({ error: error.message })
        res.status(200).json(posts)
    })

}


//create
const create = (req, res) => {
    console.log(req.body)
    db.Post.create(req.body, (error, createdPost) => {
        if(error) return res.status(400).json({ error: error.message })

        return res.status(201).json(createdPost)
    })

}


// update
const update = (req, res) => {
    console.log(req.body)
    db.Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedPost) => {
            if (error) return res.status(400).json({ error: error.message })

            return res.status(200).json(updatedPost)

        
        }
    )
}



// delete
const destroy = (req, res) => {
    db.Post.findByIdAndDelete(req.params.id, (error, deletedPost) => {
        if (error) return res.status(400).json({ error: error.message })
        return res.status(200).json({
            message:`Post ${deletedPost.name} deleted successfully.`
        })
    })}





module.exports = {
    index,
    create,
    update,
    destroy,
}

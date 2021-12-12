const db = require('../models')


const index = (req, res) => {
    db.Messages.find({}, (error, messages) => {
        if (error) return res.status(400).json({ error: error.message })
        res.status(200).json(posts)
    })

}


//create
const create = (req, res) => {
    console.log(req.body)
    db.Messages.create(req.body, (error, createdMessages) => {
        if(error) return res.status(400).json({ error: error.message })

        return res.status(201).json(createdMessages)
    })

}


// update
const update = (req, res) => {
    console.log(req.body)
    db.Messages.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedMessage) => {
            if (error) return res.status(400).json({ error: error.message })

            return res.status(200).json(updatedMesssage)

        
        }
    )
}



// delete
const destroy = (req, res) => {
    db.Messages.findByIdAndDelete(req.params.id, (error, deletedMessages) => {
        if (error) return res.status(400).json({ error: error.message })
        return res.status(200).json({
            message:`Message ${deletedMessages.name} deleted successfully.`
        })
    })}





module.exports = {
    index,
    create,
    update,
    destroy,
}

import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    color:{
        type: String,
    },
    order:{
        type: Number,
    }
},{
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema);

export default Task
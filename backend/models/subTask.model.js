const mongoose = require("mongoose");

const subTaskSchema = mongoose.Schema({
     title: {
          type: String,
          required: true,
     },
     isCompleted: {
          type: Boolean,
          default: false
     }
}, { timestamps: true })

const SubTaskModel = mongoose.model('subtask', subTaskSchema);

module.exports = SubTaskModel;
const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
     user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          immutable: true,
     },
     name: {
          type: String,
          required: true,
     },
     tasks: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'task'
          }
     ]
}, { timestamps: true })

const BoardModel = mongoose.model('board', boardSchema);

module.exports = BoardModel;
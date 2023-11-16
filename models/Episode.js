const mongoose = require('mongoose')

const EpisodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  video_id: {
    type: String,
    required: true,
  },
  transcript: [{
    text: String,
    start: Number,
    duration: Number,
  }]
})

module.exports = mongoose.model('Episode', EpisodeSchema)
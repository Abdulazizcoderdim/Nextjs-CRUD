import mongoose, { Schema } from 'mongoose'

const topicSchema = new Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
)

// Agar model allaqachon mavjud bo'lsa, uni qayta yaratmaymiz.
const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema)

export default Topic

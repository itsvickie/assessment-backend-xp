import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    is_deleted: {
      type: Boolean,
      default: false
    }
  },
  {
    collection: 'category',
    timestamps: true
  }
)

export default mongoose.model('Category', categorySchema)

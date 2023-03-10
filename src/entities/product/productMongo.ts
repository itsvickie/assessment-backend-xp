import mongoose, { Schema } from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    categories: [
      {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Category'
      }
    ],
    is_deleted: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      require: true
    },
    sku: {
      type: String,
      require: true
    },
    price: {
      type: String,
      require: true
    },
    description: {
      type: String
    },
    quantity: {
      type: Number,
      require: true
    }
  },
  {
    collection: 'product',
    timestamps: true
  }
)

export default mongoose.model('Product', productSchema)

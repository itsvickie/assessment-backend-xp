
import { Types } from 'mongoose'

import { createFakeCategory } from './category'
import ProductMongo from '../entities/product/productMongo'

interface IProduct {
  name: string
  sku: string
  price: string
  quantity: number
  description?: string
  categories?: Types.ObjectId[]
}

export const createFakeProduct = async (product: IProduct) => {
  if (!product.categories) {
    const fakeCategory = await createFakeCategory('fake_category')
    product.categories = [fakeCategory._id]
  }

  return await ProductMongo.create({ 
    categories: product.categories,
    description: product.description, 
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    sku: product.sku
  })
}

export const createFakeProducts = async (products: IProduct[], diffCategories?: boolean) => {
  let categories: Types.ObjectId[]
  if (!diffCategories) {
    const fakeCategory = await createFakeCategory('fake_category')
    categories = [fakeCategory._id]
  }

  const productsCreated = []
  for (const product of products) {
    if (!categories.length && !product.categories.length) {
      const fakeCategory = await createFakeCategory(`${product.name}_category`)
      Object.assign(product, { categories: [fakeCategory._id] })
    }

    const newProduct = await createFakeProduct(product)
    productsCreated.push(newProduct)
  }

  return productsCreated
}

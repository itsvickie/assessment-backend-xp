import request from 'supertest'
import mongoose from 'mongoose'

import { app } from '../../../app'
import { ErrorMessages } from '../../../errors'
import { mongoServerInit } from '../../../tests/utils'
import { createFakeProduct } from '../../../tests/product'
import { createFakeCategory, deleteFakeCategory } from '../../../tests/category'
import { Category } from '../../../entities/category/category'
import ProductMongo from '../../../entities/product/productMongo'

const TEST_URL = '/api/v1/product'

describe('Create a product', () => {
  mongoServerInit()
  let category: Category
  let productData: any

  beforeEach(async () => {
    category = await createFakeCategory('fake_category')
    productData = {
      name: 'new_product',
      sku: '00100',
      price: '0290',
      description: 'new_description_product',
      quantity: 2,
      categories: [category._id]
    }
  })

  it('It should create a product if fields are corrects', async () => {
    await request(app)
      .post(TEST_URL)
      .send(productData)
      .expect(201)

    const productCreated = await ProductMongo.findOne({ sku: productData.sku })
    expect(productCreated.name).toBe(productData.name)
    expect(productCreated.price).toBe(productData.price)
    expect(productCreated.description).toBe(productData.description)
    expect(productCreated.quantity).toBe(productData.quantity)
  })

  it('It should fail if fields are not informed', async () => {
    const { body } = await request(app)
      .post(TEST_URL)
      .expect(422)

    const existsErrorNameRequired = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_REQUIRED_NAME_PRODUCT
    )
    const existsErrorSkuRequired = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_REQUIRED_SKU_PRODUCT
    )
    const existsErrorPriceRequired = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_REQUIRED_PRICE_PRODUCT
    )
    const existsErrorQuantityRequired = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_REQUIRED_QUANTITY_PRODUCT
    )
    const existsErrorCategoriesRequired = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_REQUIRED_CATEGORIES_PRODUCT
    )

    expect(
      existsErrorNameRequired &&
      existsErrorSkuRequired &&
      existsErrorPriceRequired &&
      existsErrorQuantityRequired &&
      existsErrorCategoriesRequired
    ).toBeTruthy()
  })

  it('It should fail if fields are invalid', async () => {
    productData.name = 123
    productData.sku = 240
    productData.price = 194.90
    productData.description = 123
    productData.quantity = '2a'
    productData.categories = 'invalid'

    const { body } = await request(app)
      .post(TEST_URL)
      .send(productData)
      .expect(422)

    const existsErrorNameInvalid = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_INVALID_NAME_PRODUCT
    )
    const existsErrorSkuInvalid = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_INVALID_SKU_PRODUCT
    )
    const existsErrorPriceInvalid = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_INVALID_PRICE_PRODUCT
    )
    const existsErrorDescriptionInvalid = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_INVALID_DESCRIPTION_PRODUCT
    )
    const existsErrorQuantityInvalid = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_INVALID_QUANTITY_PRODUCT
    )
    const existsErrorCategoriesInvalid = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_INVALID_CATEGORIES_PRODUCT
    )

    expect(
      existsErrorNameInvalid &&
      existsErrorSkuInvalid &&
      existsErrorPriceInvalid &&
      existsErrorDescriptionInvalid &&
      existsErrorQuantityInvalid &&
      existsErrorCategoriesInvalid
    ).toBeTruthy()
  })

  it('It should fail if is already registered a product with informed sku', async () => {
    await createFakeProduct(productData)

    const { body } = await request(app)
      .post(TEST_URL)
      .send(productData)
      .expect(422)

    const error = body.message[0]
    expect(error.msg).toBe(ErrorMessages.E_INVALID_QUANTITY_PRODUCT)
  })

  it('It should fail if product category informed not exists', async () => {
    const invalidId = new mongoose.Types.ObjectId()
    productData.categories = [invalidId]

    const { body } = await request(app)
      .post(TEST_URL)
      .send(productData)
      .expect(422)

    const error = body.message[0]
    expect(error.msg).toBe(ErrorMessages.E_NOT_FOUND_ONE_OR_MORE_CATEGORIES)
  })

  it('It should fail if product category is deleted', async () => {
    await deleteFakeCategory(category._id)

    const { body } = await request(app)
      .post(TEST_URL)
      .send(productData)
      .expect(422)

    const error = body.message[0]
    expect(error.msg).toBe(ErrorMessages.E_NOT_FOUND_ONE_OR_MORE_CATEGORIES)
  })
})

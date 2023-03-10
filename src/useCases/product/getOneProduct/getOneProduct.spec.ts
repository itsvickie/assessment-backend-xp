import request from 'supertest'
import mongoose from 'mongoose'

import { app } from '../../../app'
import { ErrorMessages } from '../../../errors'
import { mongoServerInit } from '../../../tests/utils'
import { createFakeProduct } from '../../../tests/product'

const TEST_URL = '/api/v1/product'

describe('Fetch one product', () => {
  mongoServerInit()
  let product: any

  beforeEach(async () => {
    product = await createFakeProduct({
      name: 'fake_product',
      price: '19.90',
      quantity: 12,
      sku: '00200',
    })
  })

  it('It should get product details by Id', async () => {
    const { body } = await request(app)
      .get(`${TEST_URL}/${product._id}`)
      .expect(200)

    expect(body._id.toString()).toBe(product._id.toString())
    expect(body.name).toBe(product.name)
    expect(body.sku).toBe(product.sku)
    expect(body.price).toBe(product.price)
    expect(body.quantity).toBe(product.quantity)
    expect(body.createdAt)

    const bodyProductCategories = body.categories[0]
    const fakeProductCategories = product.categories[0]
    expect(bodyProductCategories.length)
      .toBe(fakeProductCategories.length)
    expect(bodyProductCategories._id.toString())
      .toBe(fakeProductCategories._id.toString())
  })

  it('It should fail if productId informed is invalid', async () => {
    const invalidId = new mongoose.Types.ObjectId()

    const { body } = await request(app)
      .get(`${TEST_URL}/${invalidId}`)
      .expect(422)

    expect(body.message[0].msg).toBe(ErrorMessages.E_NOT_FOUND_PRODUCT)
  })
})

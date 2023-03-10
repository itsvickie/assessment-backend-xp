import request from 'supertest'
import mongoose from 'mongoose'

import { app } from '../../../app'
import { ErrorMessages } from '../../../errors'
import { mongoServerInit } from '../../../tests/utils'
import { createFakeProduct } from '../../../tests/product'
import MongoProduct from '../../../entities/product/productMongo'

const TEST_URL = '/api/v1/product'

describe('Delete product', () => {
  mongoServerInit()
  let product: any

  beforeEach(async () => {
    product = await createFakeProduct({
      name: 'fake_product',
      price: '109.90',
      quantity: 100,
      sku: '0240'
    })
  })

  it('It should delete a product by Id', async () => {
    expect(product.is_deleted).toBeFalsy()

    await request(app)
      .delete(`${TEST_URL}/${product._id}`)
      .expect(204)

    const verifyDeletedProduct = 
      await MongoProduct.findById(product._id)
    expect(verifyDeletedProduct.is_deleted).toBeTruthy()
  })

  it('It should fail if productId informed is invalid', async () => {
    const fakeId = new mongoose.Types.ObjectId()

    const { body } = await request(app)
      .delete(`${TEST_URL}/${fakeId}`)
      .expect(422)

    expect(body.message[0].msg).toBe(ErrorMessages.E_NOT_FOUND_PRODUCT)
  })
})
import request from 'supertest'
import mongoose from 'mongoose'

import { app } from '../../../app'
import { ErrorMessages } from '../../../errors'
import { mongoServerInit } from '../../../tests/utils'
import { createFakeProduct } from '../../../tests/product'
import { createFakeCategory } from '../../../tests/category'
import { Category } from '../../../entities/category/category'
import MongoCategory from '../../../entities/category/categoryMongo'

const TEST_URL = '/api/v1/category'

describe('Delete category', () => {
  mongoServerInit()
  let category: Category

  beforeEach(async () => {
    category = await createFakeCategory('fake_category')
  })

  it('It should delete a category by Id', async () => {
    expect(category.is_deleted).toBeFalsy()

    await request(app)
      .delete(`${TEST_URL}/${category._id}`)
      .expect(204)

    const verifyDeletedCategory = 
      await MongoCategory.findById(category._id)
    expect(verifyDeletedCategory.is_deleted).toBeTruthy()
  })

  it('It should fail if categoryId informed is invalid', async () => {
    const fakeId = new mongoose.Types.ObjectId()

    const { body } = await request(app)
      .delete(`${TEST_URL}/${fakeId}`)
      .expect(422)

    expect(body.message[0].msg).toBe(ErrorMessages.E_NOT_FOUND_CATEGORY)
  })

  it('It should fail if category informed is linked to a active product', async () => {
    await createFakeProduct({
      name: 'fake_product',
      sku: '04300',
      price: '190.90',
      quantity: 99,
      categories: [category._id]
    })

    const { body } = await request(app)
      .delete(`${TEST_URL}/${category._id}`)
      .expect(422)
    
    expect(body.message[0].msg).toBe(ErrorMessages.E_CANNOT_DELETE_CATEGORY)
  })
})
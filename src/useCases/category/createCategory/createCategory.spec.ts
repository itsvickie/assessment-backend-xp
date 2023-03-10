import request from 'supertest'

import { app } from '../../../app'
import { ErrorMessages } from '../../../errors'
import { mongoServerInit } from '../../../tests/utils'
import { createFakeCategory } from '../../../tests/category'
import CategoryMongo from '../../../entities/category/categoryMongo'

const TEST_URL = '/api/v1/category'

describe('Create successfully a category', () => {
  mongoServerInit()

  it('It should create a category if fields are corrects', async () => {
    const newCategoryName = 'New Category'

    await request(app)
      .post(TEST_URL)
      .send({ name: newCategoryName })
      .expect(201)

    const category = await CategoryMongo.findOne({ name: newCategoryName })
    expect(category.name).toBe(newCategoryName)
  })
})

describe('Create category validations', () => {
  mongoServerInit()

  it('It should fail if is already registered a category with informed name', async () => {
    const categoryName = 'New Category'
    await createFakeCategory(categoryName)

    const { body } = await request(app)
      .post(TEST_URL)
      .send({ name: categoryName })
      .expect(422)

    const error = body.message[0]
    expect(error.msg).toBe(ErrorMessages.E_UNIQUE_CATEGORY)
    expect(error.value).toBe(categoryName)
  })

  it('It should fail if name is not informed', async () => {
    const { body } = await request(app)
      .post(TEST_URL)
      .expect(422)

    const error = body.message[0]
    expect(error.msg).toBe(ErrorMessages.E_REQUIRED_NAME_CATEGORY)
  })
})

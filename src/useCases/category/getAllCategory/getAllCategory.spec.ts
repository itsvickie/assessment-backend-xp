import request from 'supertest'

import { app } from '../../../app'
import { ErrorMessages } from '../../../errors'
import { mongoServerInit } from '../../../tests/utils'
import { createFakeCategories, deleteFakeCategory } from '../../../tests/category'

const TEST_URL = '/api/v1/category'

describe('Fetch categories', () => {
  mongoServerInit()
  const categoriesNames: string[] = [
    'new_category1', 
    'new_category2', 
    'new_category3',
    'new_category4'
  ]

  beforeEach(async () => {
    await createFakeCategories(categoriesNames)
  })

  it('It should fetch categories in page zero', async () => {
    const page = 0
    const limit = 2

    const { body } = await request(app)
      .get(TEST_URL)
      .query({ 
        page, 
        limit
      })
      .expect(200)

    const totalItens = categoriesNames.length
    expect(body.meta.current_page).toBe(page)
    expect(body.meta.per_page).toBe(limit)
    expect(body.meta.total_itens).toBe(totalItens)
    expect(body.meta.total_page).toBe(Math.ceil(totalItens / limit))

    const itemZeroPageZero = body.data[0]
    const itemOnePageZero = body.data[1]
    expect(itemZeroPageZero.name).toBe(categoriesNames[0])
    expect(itemOnePageZero.name).toBe(categoriesNames[1])
  })

  it('It should fetch categories in page one', async () => {
    const page = 1
    const limit = 2

    const { body } = await request(app)
      .get(TEST_URL)
      .query({ 
        page, 
        limit
      })
      .expect(200)

    const itemZeroPageOne = body.data[0]
    const itemOnePageOne = body.data[1]
    expect(itemZeroPageOne.name).toBe(categoriesNames[2])
    expect(itemOnePageOne.name).toBe(categoriesNames[3])
  })

  it('It dont should return a deleted category', async () => {
    const page = 0
    const limit = 1

    var { body } = await request(app)
      .get(TEST_URL)
      .query({ 
        page, 
        limit
      })
      .expect(200)

    const categoryTarget = body.data[0]
    await deleteFakeCategory(categoryTarget._id)

    var { body } = await request(app)
      .get(TEST_URL)
      .query({ 
        page, 
        limit
      })
      .expect(200)

    const returnedCategory = body.data[0]
    expect(returnedCategory._id === categoryTarget._id).toBeFalsy()
  })
})

describe('Get all categories validations', () => {
  mongoServerInit()

  it('It should fail if page is not a number', async () => {
    const invalidPage = '1a'

    const { body } = await request(app)
      .get(TEST_URL)
      .query({ 
        page: invalidPage
      })
      .expect(422)

    const error = body.message[0]
    expect(error.msg).toBe(ErrorMessages.E_PAGE_PARAM_IS_NUMERIC)
  })

  it('It should fail if page is invalid number', async () => {
    const invalidPage = '-1'

    const { body } = await request(app)
      .get(TEST_URL)
      .query({ 
        page: invalidPage
      })
      .expect(422)

    const error = body.message[0]
    expect(error.msg).toBe(ErrorMessages.E_PAGE_PARAM_INVALID)
  })

  it('It should fail if limit is not a number', async () => {
    const invalidLimit = '1a'

    const { body } = await request(app)
      .get(TEST_URL)
      .query({ 
        limit: invalidLimit
      })
      .expect(422)

    const error = body.message[0]
    expect(error.msg).toBe(ErrorMessages.E_LIMIT_PARAM_IS_NUMERIC)
  })

  it('It should fail if limit is invalid number', async () => {
    const invalidLimit = '-1'

    const { body } = await request(app)
      .get(TEST_URL)
      .query({ 
        limit: invalidLimit
      })
      .expect(422)

    const error = body.message[0]
    expect(error.msg).toBe(ErrorMessages.E_LIMIT_PARAM_INVALID)
  })

  it('It should fail if order_name is invalid', async () => {
    const invalidOrderName = 'invalid_param'

    const { body } = await request(app)
      .get(TEST_URL)
      .query({ 
        order_name: invalidOrderName
      })
      .expect(422)

    const error = body.message[0]
    expect(error.msg).toBe(ErrorMessages.E_ORDER_NAME_PARAM_INVALID)
  })
})

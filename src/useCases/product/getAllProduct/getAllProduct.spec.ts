import request from 'supertest'

import { app } from '../../../app'
import { ErrorMessages } from '../../../errors'
import { mongoServerInit } from '../../../tests/utils'
import { createFakeProducts } from '../../../tests/product'

const TEST_URL = '/api/v1/product'

describe('Fetch products', () => {
  mongoServerInit()
  const productsData = [
    {
      name: 'fake_product1',
      sku: '0001',
      price: '10.90',
      quantity: 2
    },
    {
      name: 'fake_product2',
      sku: '0002',
      price: '20.90',
      quantity: 3
    },
    {
      name: 'fake_product3',
      sku: '0003',
      price: '30.90',
      quantity: 4
    }
  ]

  beforeEach(async () => {
    await createFakeProducts(productsData)
  })

  it('It should fetch products in page zero', async () => {
    const page = 0
    const limit = 2

    const { body } = await request(app)
      .get(TEST_URL)
      .query({
        page, 
        limit
      })
      .expect(200)

    const totalItens = productsData.length
    expect(body.meta.current_page).toBe(page)
    expect(body.meta.per_page).toBe(limit)
    expect(body.meta.total_itens).toBe(totalItens)
    expect(body.meta.total_page).toBe(Math.ceil(totalItens / limit))

    const itemZeroPageZero = body.data[0]
    const itemOnePageZero = body.data[1]
    expect(itemZeroPageZero.name).toBe(productsData[0].name)
    expect(itemOnePageZero.name).toBe(productsData[1].name)
  })

  it('It should fetch products in page one', async () => {
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
    const productTarget = productsData[2]
    expect(itemZeroPageOne.name).toBe(productTarget.name)
    expect(itemZeroPageOne.sku).toBe(productTarget.sku)
    expect(itemZeroPageOne.price).toBe(productTarget.price)
    expect(itemZeroPageOne.quantity).toBe(productTarget.quantity)
  })

  it('It should fail if queries are invalid', async () => {
    const query = {
      page: -1,
      limit: -1,
      order_name: 'invalid',
      order_price: 'invalid'
    }

    const { body } = await request(app)
      .get(TEST_URL)
      .query(query)
      .expect(422)

    const existsErrorPageInvalid = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_PAGE_PARAM_INVALID
    )
    const existsErrorLimitInvalid = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_LIMIT_PARAM_INVALID
    )
    const existsErrorOrderNameInvalid = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_ORDER_NAME_PARAM_INVALID
    )
    const existsErrorOrderPriceInvalid = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_ORDER_PRICE_PARAM_INVALID
    )

    expect(
      existsErrorPageInvalid &&
      existsErrorLimitInvalid &&
      existsErrorOrderNameInvalid &&
      existsErrorOrderPriceInvalid
    ).toBeTruthy()
  })

  it('It should fail if queries are numeric', async () => {
    const query = {
      page: '1a',
      limit: '1a'
    }

    const { body } = await request(app)
      .get(TEST_URL)
      .query(query)
      .expect(422)

    const existsErrorPageNumeric = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_PAGE_PARAM_IS_NUMERIC
    )
    const existsErrorLimitNumeric = body.message.find(
      (value: any) => value.msg === ErrorMessages.E_LIMIT_PARAM_IS_NUMERIC
    )

    expect(
      existsErrorPageNumeric &&
      existsErrorLimitNumeric
    ).toBeTruthy()
  })
})

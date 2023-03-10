import { Types } from 'mongoose'
import { Category } from '../entities/category/category'
import CategoryMongo from '../entities/category/categoryMongo'

export const createFakeCategory = async (name: string): Promise<Category> => {
  return await CategoryMongo.create({ name })
}

export const createFakeCategories = async (names: string[]): Promise<Category[]> => {
  let categoriesCreated: Category[] = []
  for (const name of names) {
    const newCategory = await createFakeCategory(name)
    categoriesCreated.push(newCategory)
  }

  return categoriesCreated
}

export const deleteFakeCategory = async (categoryId: Types.ObjectId): Promise<void> => {
  await CategoryMongo.findByIdAndUpdate(categoryId, { is_deleted: true })
}

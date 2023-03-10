export enum ErrorMessages {
  E_UNEXPECT_ERROR = 'Erro inesperado',

  E_UNIQUE_CATEGORY = 'Categoria com nome informado já existe',
  E_REQUIRED_NAME_CATEGORY = 'O campo nome deve ser informado',

  E_PAGE_PARAM_IS_NUMERIC = `O parâmetro 'page' deve ser numérico`,
  E_PAGE_PARAM_INVALID = `O parâmetro 'page' deve ser um número positivo`,
  E_LIMIT_PARAM_IS_NUMERIC = `O parâmetro 'limit' deve ser numérico`,
  E_LIMIT_PARAM_INVALID = `O parâmetro 'limit' deve ser um número positivo`,

  E_ORDER_NAME_PARAM_INVALID = `O parâmetro 'order_name' é inválido`,
  E_ORDER_PRICE_PARAM_INVALID = `O parâmetro 'order_price' é inválido`,
  
  E_CANNOT_DELETE_CATEGORY = 'Não é possível deletar essa categoria, há produtos vínculados!',
  E_NOT_FOUND_CATEGORY = 'Categoria não encontrada',

  E_REQUIRED_NAME_PRODUCT = 'O campo nome deve ser informado',
  E_INVALID_NAME_PRODUCT = 'O campo nome é inválido',
  E_REQUIRED_SKU_PRODUCT = 'O campo SKU deve ser informado',
  E_INVALID_SKU_PRODUCT = 'O campo SKU é inválido',
  E_UNIQUE_SKU_PRODUCT = 'Já existe um produto com o SKU informado',
  E_REQUIRED_PRICE_PRODUCT = 'O campo de preço deve ser informado',
  E_INVALID_PRICE_PRODUCT = 'O campo de preço é inválido',
  E_REQUIRED_QUANTITY_PRODUCT = 'O campo de quantidade deve ser informado',
  E_INVALID_QUANTITY_PRODUCT = 'O campo de quantidade é inválido',
  E_REQUIRED_CATEGORIES_PRODUCT = 'As categorias devem ser informadas',
  E_INVALID_CATEGORIES_PRODUCT = 'As categorias são inválidas',
  E_INVALID_DESCRIPTION_PRODUCT = 'A descrição do produto é inválida',

  E_NOT_FOUND_PRODUCT = 'Produto não encontrado',
  E_NOT_FOUND_ONE_OR_MORE_CATEGORIES = 'Uma ou mais categorias não foram encontradas'
}

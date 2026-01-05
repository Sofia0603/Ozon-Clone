export class PagesConfig {
  static readonly HOME = '/'
  static readonly LOGIN = '/login'
  static readonly ORDERS = '/orders'
  static readonly FAVORITES = '/favorites'
  static readonly CART = '/cart'

  static PRODUCT_DETAILS(slug: string) {
    return `/product/${slug}`
  }

}
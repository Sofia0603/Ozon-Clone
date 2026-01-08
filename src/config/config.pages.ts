export class PagesConfig {
  static readonly HOME = '/'
  
  static readonly ORDERS = '/orders'
  static readonly FAVORITES = '/favorites'
  static readonly CART = '/cart'

  static PRODUCT_DETAILS(slug: string) {
    return `/product/${slug}`
  }


  static readonly FRESH = '/fresh'
  static readonly OZON_CARD = '/ozon-card'
  static readonly AIR_TICKETS = '/air-tickets'
  static readonly FOR_BUSINESS = '/for-business'
  static readonly CLOTHING = '/clothing'
  static readonly ELECTRONICS = '/electronics'
  static readonly HOME_AND_GARDEN = '/home-and-garden'
  static readonly PRODUCTS_FOR_1_RUB = '/products-for-1-rub'
  static readonly CERTIFICATES = '/certificates'

}
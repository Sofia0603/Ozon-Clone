import { InferSelectModel } from 'drizzle-orm'
import { order, orderItem, product, review } from './schema'
import { User } from '../auth'

export type TProduct = InferSelectModel<typeof product>
export type TOrder = InferSelectModel<typeof order>
export type TOrderItem = InferSelectModel<typeof orderItem>
export type TReview = InferSelectModel<typeof review>

export type TProductWithReviews = TProduct & {
	reviews: TReview[]
}

export type TFullReview = TReview & {
	product: TProduct,
	user: User
}

export type TOrderWithItems = TOrder & {
	items: TOrderItem[]
}
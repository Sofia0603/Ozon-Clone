import { InferSelectModel } from 'drizzle-orm'
import { order, orderItem, product, review } from './schema'

export type TProduct = InferSelectModel<typeof product>
export type TOrder = InferSelectModel<typeof order>
export type TOrderItem = InferSelectModel<typeof orderItem>
export type TReview = InferSelectModel<typeof review>
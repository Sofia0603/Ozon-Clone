import {sqliteTable, text, integer, real, int} from "drizzle-orm/sqlite-core";
import {sql} from "drizzle-orm/sql/sql";

export const users = sqliteTable('users', {
  id: int('id').primaryKey({autoIncrement: true}),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name'),
  createdAtInteger: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()

    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
})

export const sessions = sqliteTable('sessions', {
  id: int('id').primaryKey({autoIncrement: true}),
  userId: int('userId')
    .notNull()
    .references(() =>  users.id, {onDelete: 'cascade'}),
  expiresAt: text('expires_at').notNull(),
})

export const reviews = sqliteTable('reviews', {
  id: int('id').primaryKey({autoIncrement: true}),
  userId: int('userId')
    .notNull()
    .references(() =>  users.id, {onDelete: 'cascade'}),
  productId: int('productId')
    .notNull()
    .references(() =>  products.id, {onDelete: 'cascade'}),
  rating:real('rating').notNull(),
  comment: text('comment'),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
})

export const products = sqliteTable('products', {
  id: int('id').primaryKey({autoIncrement: true}),
  name: text('name').notNull(),
  description: text('description'),
  price: text('price').notNull(),
  discountPrice: text('discount_price'),
  imageUrl: text('imageUrl').notNull(),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
})

export const orders = sqliteTable('orders', {
  id: int('id').primaryKey({autoIncrement: true}),
  userId: int('userId')
    .notNull()
    .references(() =>  users.id, {onDelete: 'cascade'}),
  total:integer('total').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
})

export const orderItems = sqliteTable('orderItems', {
  id: int('id').primaryKey({autoIncrement: true}),
  orderId: int('orderId')
    .notNull()
    .references(() =>  orders.id, {onDelete: 'cascade'}),
  productId: int('productId')
    .notNull()
    .references(() =>  products.id, {onDelete: 'cascade'}),
  quantity: integer('quantity').notNull().default(1),
  price: integer('price').notNull(),
})
import { sqliteTable, text, integer, real, int } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm/sql/sql';
import { relations } from 'drizzle-orm';

export const user = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('createdAt')
    .notNull()
    .$defaultFn(() => Date.now()),
  updatedAt: integer('updatedAt')
    .notNull()
    .$defaultFn(() => Date.now()),
});

export const account = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  providerId: text('providerId').notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  accessTokenExpires: integer('access_token_expires'),
  password: text('password'),
  scope: text('scope'),
  createdAt: integer('createdAt')
    .notNull()
    .$defaultFn(() => Date.now()),
  updatedAt: integer('updatedAt')
    .notNull()
    .$defaultFn(() => Date.now()),
});

export const session = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  expiresAt: text('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: integer('createdAt')
    .notNull()
    .$defaultFn(() => Date.now()),
  updatedAt: integer('updatedAt')
    .notNull()
    .$defaultFn(() => Date.now()),
  userAgent: text('userAgent'),
  ipAddress: text('ipAddress'),
});

export const review = sqliteTable('reviews', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  productId: text('productId')
    .notNull()
    .references(() => product.id, { onDelete: 'cascade' }),
  rating: real('rating').notNull(),
  comment: text('comment'),
  createdAt: integer('createdAt')
    .notNull()
    .$defaultFn(() => Date.now()),
});

export const product = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: text('price').notNull(),
  discountPrice: text('discount_price'),
  imageUrl: text('imageUrl').notNull(),
  createdAt: integer('createdAt')
    .notNull()
    .$defaultFn(() => Date.now()),
});

export const order = sqliteTable('orders', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  total: integer('total').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: integer('createdAt')
    .notNull()
    .$defaultFn(() => Date.now()),
});

export const orderItem = sqliteTable('orderItems', {
  id: text('id').primaryKey(),
  orderId: text('orderId')
    .notNull()
    .references(() => order.id, { onDelete: 'cascade' }),
  productId: text('productId')
    .notNull()
    .references(() => product.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull().default(1),
  price: integer('price').notNull(),
});

export const productRelation = relations(product, ({ many }) => ({
  reviews: many(review),
}));

export const reviewRelation = relations(review, ({ one }) => ({
  product: one(product, {
    fields: [review.productId],
    references: [product.id],
  }),
  user: one(user, {
    fields: [review.userId],
    references: [user.id],
  }),
}));

export const userRealtion = relations(user, ({ many }) => ({
  reviews: many(review),
  orders: many(order),
}));

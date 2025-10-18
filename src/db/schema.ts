import { text, integer, pgTable, index } from "drizzle-orm/pg-core";


export const puzzlesTable = pgTable('puzzles_table', {
  id: text().primaryKey(),
  fen: text().notNull(),
  solution: text().notNull(),
  rating: integer().notNull(),
  ratingDeviation: integer().notNull(),
  popularity: integer().notNull(),
  themes: text().notNull()
}, (table) => [
  index("rating-sorted").on(table.rating.asc())
])

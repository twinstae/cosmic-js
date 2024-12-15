import { Database } from "bun:sqlite";
import { relations } from 'drizzle-orm/relations';
import { eq } from 'drizzle-orm/sql/expressions';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/bun-sqlite';

import * as Batch from '../domain/Batch';
import { BatchRepo } from './types';
import { assertBatch } from '../typia';
import { sql } from 'drizzle-orm';

const batches = sqliteTable('batches', {
    id: text('id').primaryKey(),
    sku: text('sku').notNull(),
    quantity: integer('quantity').notNull(),
    eta: integer('eta')
})

const allocations = relations(batches, ({ many }) => ({
    allocations: many(orderLines),
}));

const orderLines = sqliteTable('order_lines', {
    orderId: text('order_id').primaryKey(),
    sku: text('sku').notNull(),
    quantity: integer('quantity').notNull(),
    batchId: text('batch_id'),
})

const allocated = relations(orderLines, ({ one }) => ({
    allocated: one(batches, {
        fields: [orderLines.batchId],
        references: [batches.id],
    }),
}));

function DrizzleSqliteBatchRepo(bunDb: Database): BatchRepo {
    const db = drizzle(bunDb, {
        schema: { batches, allocations, orderLines, allocated }
    });
    const preparedInsertBatch = db.insert(batches).values({
        id: sql.placeholder('id'),
        sku: sql.placeholder('sku'),
        quantity: sql.placeholder('quantity'),
        eta: sql.placeholder('eta'),
    }).prepare()
    const preparedInsertOrderLine = db.insert(orderLines).values({
        orderId: sql.placeholder('orderId'),
        sku: sql.placeholder('sku'),
        quantity: sql.placeholder('quantity'),
        batchId: sql.placeholder('batchId'),
    }).prepare()
    const preparedAll = db.query.batches.findMany({
        with: {
            allocations: {
                columns: {
                    batchId: false
                }
            }
        }
    }).prepare();
    const preparedGet = db.query.batches.findMany({
        with: {
            allocations: {
                columns: {
                    batchId: false
                }
            }
        },
        where: eq(batches.id, sql.placeholder('batchId')),
    }).prepare();
    const preparedFindBatchForOrderLine = db.query.orderLines.findMany({
        with: {
            allocated: {
                with: {
                    allocations: {
                        columns: {
                            batchId: false
                        }
                    }
                }
            }
        },
        where: eq(orderLines.orderId, sql.placeholder('orderId'))
    }).prepare();

    return {
        async add(batch: Batch.Type) {
            preparedInsertBatch.run(batch)
            for (const line of batch.allocations) {
                preparedInsertOrderLine.run({
                    ...line,
                    batchId: batch.id
                })
            }
        },
        async allocate(batchId, line) {
            preparedInsertOrderLine.run({
                ...line,
                batchId
            })
        },
        async get(batchId: string) {
            const batch = await preparedGet.execute({ batchId }).then(result => result.at(0))
            if (batch === undefined) {
                throw Error('does not exist')
            }
            return assertBatch(batch);
        },
        async findBatchForOrderLine(orderId: string) {
            const line = await preparedFindBatchForOrderLine.execute({ orderId }).then(result => result.at(0));
            if (typeof line !== 'object' || !line.allocated) {
                throw Error('does not exist')
            }
            return assertBatch(line.allocated);
        },
        async list() {
            return preparedAll.execute().then(result => result.map(assertBatch));
        }
    }
}

export default DrizzleSqliteBatchRepo;
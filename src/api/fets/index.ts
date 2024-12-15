import { createRouter, Response, Type as t } from 'fets'
import FakeBatchUnitOfWork from '../../persistence/FakeBatchUnitOfWork'
import FakeBatchRepo from '../../persistence/FakeBatchRepo'
import * as batchServices from '../../service/BatchServices'
import { batchDto, orderLineDto } from '../../schema/typebox/batch'

const repo = FakeBatchRepo()

export const router = createRouter()
.route({
  method: 'GET',
  path: '/batches',
  operationId: 'getBatches',
  description: '배치들을 가져옵니다',
  schemas: {
    responses: {
      200: t.Object({
        batchList: t.Array(batchDto)
      })
    }
  } as const,
  handler: async () => {
    const batchList = await repo.list()
    return Response.json({ batchList })
  }
})
.route({
  method: 'POST',
  path: '/batches',
  operationId: 'addBatch',
  description: '새로운 배치를 추가합니다',
  schemas: {
    request: {
      json: batchDto
    },
    responses: {
      200: t.Object({
        batchId: t.String()
      })
    }
  } as const,
  handler: async (req) => {
    const batch = await req.json()
    await repo.add(batch)
    return Response.json({ batchId: batch.id })
  }
})
.route({
  method: 'POST',
  path: '/batches/allocate',
  operationId: 'allocateOrderLine',
  description: '주문 라인을 배치에 할당합니다',
  schemas: {
    request: {
      json: orderLineDto,
    },
    responses: {
      200: t.Object({
        batchId: t.String()
      })
    }
  } as const,
  handler: async (req) => {
    const line = await req.json()
    const uow = FakeBatchUnitOfWork(repo)
    
    const batchId = await batchServices.allocate(line, uow)
    return Response.json({ batchId });
  }
})
.route({
  method: 'GET',
  path: '/batches/allocations/:orderId',
  operationId: 'getBatchByOrderId',
  description: '주문 ID로 배치를 찾습니다',
  schemas: {
    responses: {
      200: t.Object({
        batch: batchDto
      }),
      404: t.Object({
        message: t.String()
      })
    }
  } as const,
  handler: async (req) => {
    const { orderId } = req.params
    const batch = await repo.findBatchForOrderLine(orderId)
    if (batch) {
      return Response.json({ batch })
    } else {
      return Response.json({ message: 'Batch not found' }, { status: 404 })
    }
  }
})

// ... (rest of the code remains the same)

export default router
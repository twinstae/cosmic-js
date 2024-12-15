import { expect, it } from 'bun:test';
import FakeBatchRepo from '../persistence/FakeBatchRepo';
import FakeBatchUnitOfWork from '../persistence/FakeBatchUnitOfWork';
import { BATCH, ORDER_LINE } from '../domain/fixtures';
import * as service from './BatchServices.ts';

const repo = FakeBatchRepo()
const uow = FakeBatchUnitOfWork(repo)

it("실패한 경우 롤백할 수 있다", async () => {
    await repo.add(BATCH);

    expect(service.allocate({ ...ORDER_LINE, sku: "NOT-EXIST-SKU" }, uow)).rejects.toThrow("transaction failed!")
})
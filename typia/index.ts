import * as Batch from '../src/domain/Batch';
import typia from 'typia';

type BatchT = Batch.Type;

export const parseOrderLine = (text: string) => typia.json.assertParse<Batch.OrderLine>(text);

export const parseBatch = (text: string) => typia.json.assertParse<BatchT>(text);

export const assertBatch = (data: unknown) => typia.assert<BatchT>(data);

import * as __typia_transform__assertGuard from "typia/lib/internal/_assertGuard.js";
import * as Batch from "../domain/Batch";
import typia from "typia";
type BatchT = Batch.Type;
export const parseOrderLine = (text: string) =>
	(() => {
		const _io0 = (input: any): boolean =>
			"string" === typeof input.orderId &&
			"string" === typeof input.sku &&
			"number" === typeof input.quantity;
		const _ao0 = (
			input: any,
			_path: string,
			_exceptionable: boolean = true,
		): boolean =>
			("string" === typeof input.orderId ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.json.assertParse",
						path: _path + ".orderId",
						expected: "string",
						value: input.orderId,
					},
					_errorFactory,
				)) &&
			("string" === typeof input.sku ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.json.assertParse",
						path: _path + ".sku",
						expected: "string",
						value: input.sku,
					},
					_errorFactory,
				)) &&
			("number" === typeof input.quantity ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.json.assertParse",
						path: _path + ".quantity",
						expected: "number",
						value: input.quantity,
					},
					_errorFactory,
				));
		const __is = (input: any): input is Batch.OrderLine =>
			"object" === typeof input && null !== input && _io0(input);
		let _errorFactory: any;
		const __assert = (
			input: any,
			errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error,
		): Batch.OrderLine => {
			if (false === __is(input)) {
				_errorFactory = errorFactory;
				((input: any, _path: string, _exceptionable: boolean = true) =>
					((("object" === typeof input && null !== input) ||
						__typia_transform__assertGuard._assertGuard(
							true,
							{
								method: "typia.json.assertParse",
								path: _path + "",
								expected: "OrderLine",
								value: input,
							},
							_errorFactory,
						)) &&
						_ao0(input, _path + "", true)) ||
					__typia_transform__assertGuard._assertGuard(
						true,
						{
							method: "typia.json.assertParse",
							path: _path + "",
							expected: "OrderLine",
							value: input,
						},
						_errorFactory,
					))(input, "$input", true);
			}
			return input;
		};
		return (
			input: string,
			errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error,
		): import("typia").Primitive<Batch.OrderLine> =>
			__assert(JSON.parse(input), errorFactory) as any;
	})()(text);
export const parseBatch = (text: string) =>
	(() => {
		const _io0 = (input: any): boolean =>
			"string" === typeof input.id &&
			"string" === typeof input.sku &&
			"number" === typeof input.quantity &&
			(null === input.eta || "number" === typeof input.eta) &&
			Array.isArray(input.allocations) &&
			input.allocations.every(
				(elem: any) => "object" === typeof elem && null !== elem && _io1(elem),
			);
		const _io1 = (input: any): boolean =>
			"string" === typeof input.orderId &&
			"string" === typeof input.sku &&
			"number" === typeof input.quantity;
		const _ao0 = (
			input: any,
			_path: string,
			_exceptionable: boolean = true,
		): boolean =>
			("string" === typeof input.id ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.json.assertParse",
						path: _path + ".id",
						expected: "string",
						value: input.id,
					},
					_errorFactory,
				)) &&
			("string" === typeof input.sku ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.json.assertParse",
						path: _path + ".sku",
						expected: "string",
						value: input.sku,
					},
					_errorFactory,
				)) &&
			("number" === typeof input.quantity ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.json.assertParse",
						path: _path + ".quantity",
						expected: "number",
						value: input.quantity,
					},
					_errorFactory,
				)) &&
			(null === input.eta ||
				"number" === typeof input.eta ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.json.assertParse",
						path: _path + ".eta",
						expected: "(null | number)",
						value: input.eta,
					},
					_errorFactory,
				)) &&
			(((Array.isArray(input.allocations) ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.json.assertParse",
						path: _path + ".allocations",
						expected: "Array<OrderLine>",
						value: input.allocations,
					},
					_errorFactory,
				)) &&
				input.allocations.every(
					(elem: any, _index2: number) =>
						((("object" === typeof elem && null !== elem) ||
							__typia_transform__assertGuard._assertGuard(
								_exceptionable,
								{
									method: "typia.json.assertParse",
									path: _path + ".allocations[" + _index2 + "]",
									expected: "OrderLine",
									value: elem,
								},
								_errorFactory,
							)) &&
							_ao1(
								elem,
								_path + ".allocations[" + _index2 + "]",
								true && _exceptionable,
							)) ||
						__typia_transform__assertGuard._assertGuard(
							_exceptionable,
							{
								method: "typia.json.assertParse",
								path: _path + ".allocations[" + _index2 + "]",
								expected: "OrderLine",
								value: elem,
							},
							_errorFactory,
						),
				)) ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.json.assertParse",
						path: _path + ".allocations",
						expected: "Array<OrderLine>",
						value: input.allocations,
					},
					_errorFactory,
				));
		const _ao1 = (
			input: any,
			_path: string,
			_exceptionable: boolean = true,
		): boolean =>
			("string" === typeof input.orderId ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.json.assertParse",
						path: _path + ".orderId",
						expected: "string",
						value: input.orderId,
					},
					_errorFactory,
				)) &&
			("string" === typeof input.sku ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.json.assertParse",
						path: _path + ".sku",
						expected: "string",
						value: input.sku,
					},
					_errorFactory,
				)) &&
			("number" === typeof input.quantity ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.json.assertParse",
						path: _path + ".quantity",
						expected: "number",
						value: input.quantity,
					},
					_errorFactory,
				));
		const __is = (input: any): input is BatchT =>
			"object" === typeof input && null !== input && _io0(input);
		let _errorFactory: any;
		const __assert = (
			input: any,
			errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error,
		): BatchT => {
			if (false === __is(input)) {
				_errorFactory = errorFactory;
				((input: any, _path: string, _exceptionable: boolean = true) =>
					((("object" === typeof input && null !== input) ||
						__typia_transform__assertGuard._assertGuard(
							true,
							{
								method: "typia.json.assertParse",
								path: _path + "",
								expected: "T",
								value: input,
							},
							_errorFactory,
						)) &&
						_ao0(input, _path + "", true)) ||
					__typia_transform__assertGuard._assertGuard(
						true,
						{
							method: "typia.json.assertParse",
							path: _path + "",
							expected: "T",
							value: input,
						},
						_errorFactory,
					))(input, "$input", true);
			}
			return input;
		};
		return (
			input: string,
			errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error,
		): import("typia").Primitive<BatchT> =>
			__assert(JSON.parse(input), errorFactory) as any;
	})()(text);
export const assertBatch = (data: unknown) =>
	(() => {
		const _io0 = (input: any): boolean =>
			"string" === typeof input.id &&
			"string" === typeof input.sku &&
			"number" === typeof input.quantity &&
			(null === input.eta || "number" === typeof input.eta) &&
			Array.isArray(input.allocations) &&
			input.allocations.every(
				(elem: any) => "object" === typeof elem && null !== elem && _io1(elem),
			);
		const _io1 = (input: any): boolean =>
			"string" === typeof input.orderId &&
			"string" === typeof input.sku &&
			"number" === typeof input.quantity;
		const _ao0 = (
			input: any,
			_path: string,
			_exceptionable: boolean = true,
		): boolean =>
			("string" === typeof input.id ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.assert",
						path: _path + ".id",
						expected: "string",
						value: input.id,
					},
					_errorFactory,
				)) &&
			("string" === typeof input.sku ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.assert",
						path: _path + ".sku",
						expected: "string",
						value: input.sku,
					},
					_errorFactory,
				)) &&
			("number" === typeof input.quantity ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.assert",
						path: _path + ".quantity",
						expected: "number",
						value: input.quantity,
					},
					_errorFactory,
				)) &&
			(null === input.eta ||
				"number" === typeof input.eta ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.assert",
						path: _path + ".eta",
						expected: "(null | number)",
						value: input.eta,
					},
					_errorFactory,
				)) &&
			(((Array.isArray(input.allocations) ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.assert",
						path: _path + ".allocations",
						expected: "Array<OrderLine>",
						value: input.allocations,
					},
					_errorFactory,
				)) &&
				input.allocations.every(
					(elem: any, _index2: number) =>
						((("object" === typeof elem && null !== elem) ||
							__typia_transform__assertGuard._assertGuard(
								_exceptionable,
								{
									method: "typia.assert",
									path: _path + ".allocations[" + _index2 + "]",
									expected: "OrderLine",
									value: elem,
								},
								_errorFactory,
							)) &&
							_ao1(
								elem,
								_path + ".allocations[" + _index2 + "]",
								true && _exceptionable,
							)) ||
						__typia_transform__assertGuard._assertGuard(
							_exceptionable,
							{
								method: "typia.assert",
								path: _path + ".allocations[" + _index2 + "]",
								expected: "OrderLine",
								value: elem,
							},
							_errorFactory,
						),
				)) ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.assert",
						path: _path + ".allocations",
						expected: "Array<OrderLine>",
						value: input.allocations,
					},
					_errorFactory,
				));
		const _ao1 = (
			input: any,
			_path: string,
			_exceptionable: boolean = true,
		): boolean =>
			("string" === typeof input.orderId ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.assert",
						path: _path + ".orderId",
						expected: "string",
						value: input.orderId,
					},
					_errorFactory,
				)) &&
			("string" === typeof input.sku ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.assert",
						path: _path + ".sku",
						expected: "string",
						value: input.sku,
					},
					_errorFactory,
				)) &&
			("number" === typeof input.quantity ||
				__typia_transform__assertGuard._assertGuard(
					_exceptionable,
					{
						method: "typia.assert",
						path: _path + ".quantity",
						expected: "number",
						value: input.quantity,
					},
					_errorFactory,
				));
		const __is = (input: any): input is BatchT =>
			"object" === typeof input && null !== input && _io0(input);
		let _errorFactory: any;
		return (
			input: any,
			errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error,
		): BatchT => {
			if (false === __is(input)) {
				_errorFactory = errorFactory;
				((input: any, _path: string, _exceptionable: boolean = true) =>
					((("object" === typeof input && null !== input) ||
						__typia_transform__assertGuard._assertGuard(
							true,
							{
								method: "typia.assert",
								path: _path + "",
								expected: "T",
								value: input,
							},
							_errorFactory,
						)) &&
						_ao0(input, _path + "", true)) ||
					__typia_transform__assertGuard._assertGuard(
						true,
						{
							method: "typia.assert",
							path: _path + "",
							expected: "T",
							value: input,
						},
						_errorFactory,
					))(input, "$input", true);
			}
			return input;
		};
	})()(data);

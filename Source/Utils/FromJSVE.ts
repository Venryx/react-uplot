export function E<E1,E2,E3,E4,E5,E6,E7,E8,E9,E10,E11,E12,E13,E14,E15,E16,E17,E18,E19,E20>(
	e1?:E1,e2?:E2,e3?:E3,e4?:E4,e5?:E5,e6?:E6,e7?:E7,e8?:E8,e9?:E9,e10?:E10,
	e11?:E11,e12?:E12,e13?:E13,e14?:E14,e15?:E15,e16?:E16,e17?:E17,e18?:E18,e19?:E19,e20?:E20,
):E1&E2&E3&E4&E5&E6&E7&E8&E9&E10&E11&E12&E13&E14&E15&E16&E17&E18&E19&E20 {
	var result = {} as any;
	for (var extend of arguments) {
		Object.assign(result, extend);
	}
	return result;
	//return StyleSheet.create(result);
}

export function ToJSON(obj) { return JSON.stringify(obj); }
export function FromJSON(json) { return JSON.parse(json); }

export function RemoveDuplicates(items: any) {
	var result = [] as any[];
	for (let item of items) {
		if (result.indexOf(item) == -1) {
			result.push(item);
		}
	}
	return result;
}

export function Assert(condition, messageOrMessageFunc?: string | Function) {
	if (condition) return;

	var message = (messageOrMessageFunc as any) instanceof Function ? (messageOrMessageFunc as any)() : messageOrMessageFunc;

	//console.log(`Assert failed) ${message}\n\nStackTrace) ${GetStackTraceStr()}`);
	console.error("Assert failed) " + message);
	debugger;
	throw new Error("Assert failed) " + message);
}
export function AssertWarn(condition, messageOrMessageFunc?: string | Function) {
	if (condition) return;

	var message = messageOrMessageFunc instanceof Function ? messageOrMessageFunc() : messageOrMessageFunc;

	console.warn(`Assert-warn failed) ${message}\n\nStackTrace)`); // ${GetStackTraceStr()}`);
}

function IsArrayOfStrings(obj): obj is string[] { return obj instanceof Array && obj.every(a=>IsString(a)); }
function IsString(obj): obj is string { return typeof obj == "string"; }

export function Clone(obj, keepPrototype: boolean = false) {
	if (obj == null) return obj;
	
	let result = FromJSON(ToJSON(obj));
	if (keepPrototype == true) {
		Object.setPrototypeOf(result, Object.getPrototypeOf(obj));
	}
	return result;
}

export function IsNaN(obj) { return typeof obj == "number" && obj != obj; }
export function IsNumber(obj, allowNumberObj = false, allowNaN = false): obj is number {
	if (!allowNaN && IsNaN(obj)) return false;
	return typeof obj == "number" || (allowNumberObj && obj instanceof Number);
}
export function ToNumber(stringOrFloatVal: string|number|undefined|null, valIfConversionFails = NaN, allowParseNaN = false) {
	if (!IsString(stringOrFloatVal) && !IsNumber(stringOrFloatVal)) return valIfConversionFails;
	if (IsString(stringOrFloatVal) && stringOrFloatVal.length == 0) return valIfConversionFails;
	const result = Number(stringOrFloatVal);
	if (IsNaN(result) && !allowParseNaN) return valIfConversionFails;
	return result;
}

export function NumberCES_KeepBetween(s: Number, min: number, max: number, allowFixMinMax = true) {
	if (min > max && allowFixMinMax) {
		[min, max] = [max, min];
	}
	if (s < min) return min;
	if (s > max) return max;
	return s as number;
}

/*export function Math_Truncate(value: number) {
	if (value >= 0) return Math.floor(value);
	return Math.ceil(value);
}*/
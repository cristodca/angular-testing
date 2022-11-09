export class Calculator {
	multiply(a: number, b: number) {
		return a * b
	}	
	
	divide(a: number, b: number) {
		if (b === 0) {
			return `Can't divide by zero`
			// return undefined
		}
		return a / b 
	}
}
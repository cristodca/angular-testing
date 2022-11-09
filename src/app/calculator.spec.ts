import { Calculator } from "./calculator";

const calculator = new Calculator()

describe('Tests para calculadora', () => {
	describe('Tests para multiplicaciones', () => {
		it('#multiply should return a nine', () => {
			const rta = calculator.multiply(3, 3)
	
			expect(rta).toEqual(9)
		})
	
		it('#multiply should return a four ', () => {
			const rta = calculator.multiply(1,4)
	
			expect(rta).toEqual(4)
		})
	
	})

	describe('Tests para divisiones', () => {
		it('#divide should return some number ', () => {
			expect(calculator.divide(6, 3)).toEqual(2)
			expect(calculator.divide(5, 2)).toEqual(2.5)
		})
	
		it(`divide by zero should return an error message`, () => {
			expect(calculator.divide(0, 1)).toEqual(0)
			expect(calculator.divide(1, 0)).toEqual(`Can't divide by zero`)
		})
	})

	it('test matchers', () => {
		const name = 'Nicolas'
		let name2

		expect(name).toBeDefined()
		expect(name2).toBeUndefined()
	
		expect(1 + 3 === 4).toBeTrue()
		expect(1 + 1 === 3).toBeFalse()

		expect(5).toBeLessThan(10)
		expect(20).toBeGreaterThan(10)

		expect('123456').toMatch(/123/)
		expect(['apples', 'oranges', 'pears']).toContain('oranges')
	})
})
import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  	let service: ValueService;

	//   Ejecuta antes de cada prueba, por lo que el estado de una prueba anterior no afecta a una nueva prueba.
  	beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ ValueService ]
        })
		service = TestBed.inject(ValueService)
  	});

	//   Verifica que haya sido creada
  	it(`should be created`, () => {
    		expect(service).toBeTruthy();
  	});

	describe(`Tests para getValue`, () => {
		it(`should return 'my value' and change value`, () =>{
			expect(service.getValue()).toBe(`my value`)
			service.setValue(`change`)
			expect(service.getValue()).toBe(`change`)
		})
	})

	describe(`Tests para getPromiseValue`, () => {
		it(`should return 'promise value' from a promise`, (doneFn) =>{
			service.getPromiseValue().then((response) => {
				expect(response).toBe(`promise value`)
				doneFn() // Explícitamente decir que el test termine aquí
			})
		})
	})
});

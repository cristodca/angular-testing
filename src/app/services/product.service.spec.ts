import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ProductsService } from "./product.service"
import { Product } from "../models/product.model"
import { environment } from "src/environments/environment"
import { generateManyProducts } from "../models/product.mock"

fdescribe('Product Service', () => {
  let productService: ProductsService
  let httpController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            ProductsService
        ]
    })

    productService = TestBed.inject(ProductsService)
    httpController = TestBed.inject(HttpTestingController)
  })

  it('created successfully', () => {
    expect(productService).toBeTruthy()
  })

  describe('tests for getAllSimple()', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(2)
1
      productService.getAllSimple().subscribe((response) => {
        expect(response).toEqual(mockData)
        
        doneFn()
      })

      const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`)
      req.flush(mockData)
      httpController.verify()
    })

    it('response should be more than 4 products', (doneFn) => {
        const mockData: Product[] = generateManyProducts(5)

        productService.getAllSimple().subscribe((response) => {
          expect(response.length).toBeGreaterThan(4)
          doneFn()
        })

        const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`)
        req.flush(mockData)
        httpController.verify()
    })
  })

  
})
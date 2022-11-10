import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ProductsService } from "./product.service"
import { Product } from "../models/product.model"
import { environment } from "src/environments/environment"

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
      const mockData: Product[] = [{
        id: '123',
        title: 'title',
        price: 12,
        description: 'asdfasdf',
        category: { id: 132, name: 'asdfasdf' },
        images: ['img', 'img2']
      }]

      productService.getAllSimple().subscribe((response) => {
        expect(response).toEqual(mockData)
    
        doneFn()
      })

      const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`)
      req.flush(mockData)
      httpController.verify()
    })
  })
})
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './product.service';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';

fdescribe('Product Service', () => {
  let productService: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });

    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('created successfully', () => {
    expect(productService).toBeTruthy();
  });

  describe('tests for getAllSimple()', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(2);
      1;
      productService.getAllSimple().subscribe((response) => {
        expect(response).toEqual(mockData);

        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products`
      );
      req.flush(mockData);
      httpController.verify();
    });

    it('response should be more than 4 products', (doneFn) => {
      const mockData: Product[] = generateManyProducts(5);

      productService.getAllSimple().subscribe((response) => {
        expect(response.length).toBeGreaterThan(4);
        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products`
      );
      req.flush(mockData);
      httpController.verify();
    });
  });

  describe('tests for getAll()', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(2);
      1;
      productService.getAll().subscribe((response) => {
        expect(response.length).toEqual(mockData.length);

        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1`
      );
      req.flush(mockData);
      httpController.verify();
    });

    it('should return product list with taxes', (doneFn) => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 200,
        },
        {
          ...generateOneProduct(),
          price: 100,
        },
        {
          ...generateOneProduct(),
          price: 0,
        },
        {
          ...generateOneProduct(),
          price: -100,
        },
      ];

      productService.getAll().subscribe((response) => {
        expect(response[0].taxes).toEqual(32)
        expect(response[1].taxes).toEqual(16)
        expect(response[2].taxes).toEqual(0)
        expect(response[3].taxes).toEqual(0)

        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1`
      );
      req.flush(mockData);
      httpController.verify();
    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      const mockData: Product[] = generateManyProducts(2)
      const limit = 10
      const offset = 3

      productService.getAll(limit, offset).subscribe((response) => {
        expect()

        doneFn()
      })

      const req = httpController.expectOne(`${environment.API_URL}/api/v1?limit=${limit}&offset=${offset}`)
      req.flush(mockData)
      const params = req.request.params

      expect(params.get('limit')).toEqual(`${limit}`)
      expect(params.get('offset')).toEqual(`${offset}`)

      httpController.verify()
    })
  });
});

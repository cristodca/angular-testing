import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ProductsService } from "./product.service";
import { TokenService } from "./token.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "../interceptors/token.interceptor";
import { AuthService } from "./auth.service";
import { Auth } from "../models/auth.model";
import { environment } from "src/environments/environment";

fdescribe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        TokenService,
      ],
    });

    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService)
  });

  afterEach(() => {
    httpController.verify()
  })

  it('created successfully', () => {
    expect(authService).toBeTruthy();
  })

  describe('tests for log In', () => {
    it('should return a token', (doneFn) => {
      const mockData: Auth = {
        access_token: '121212'
      };
      const email = 'cristodca@gmail.com'
      const password = '1234'

      authService.login(email, password).subscribe((response) => {
        expect(response).toEqual(mockData);

        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/login`
      );
      req.flush(mockData);
    })

    it('should call save token with response', (doneFn) => {
      const mockData: Auth = {
        access_token: '121212'
      };
      const email = 'cristodca@gmail.com'
      const password = '1234'

      spyOn(tokenService, 'saveToken').and.callThrough()

      authService.login(email, password).subscribe((response) => {
        expect(response).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1)
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith(mockData.access_token)
        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/login`
      );
      req.flush(mockData);
    })
  })
})
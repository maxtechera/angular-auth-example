import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Credentials } from "./credentials";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Router } from "@angular/router";
export const TOKEN_NAME: string = "jwt_token";

@Injectable()
export class AuthService {
  private url: string = "http://localhost:5000/api";
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  isAuthorized(token?: string, requiredRole?: string): boolean {
    if (!token) token = this.getToken();
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    if (isExpired) {
      this.logout();
    }
    if (requiredRole) {
      const decodedToken = helper.decodeToken(token);
      return decodedToken.Role === requiredRole;
    }

    if (token) return true;
  }

  login(credentials: Credentials): Promise<string> {
    return this.http
      .post(`${this.url}/auth/login`, credentials, {
        headers: this.headers
      })
      .pipe(
        map((data: { token: string }) => data.token),
        tap(this.setToken),
        tap(() => this.router.navigate(["/"]))
      )
      .toPromise();
  }

  logout(): void {
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(["/"]);
  }
}

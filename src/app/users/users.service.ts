import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./user";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class UsersService {
  private url: string = "http://localhost:5000/api";
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.url}/users`, {
        headers: this.headers
      })
      .pipe(tap(x => console.log("Fetched users", x)));
  }
}

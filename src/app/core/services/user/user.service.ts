import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { User } from './../../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${environment.baseUrl}/usuarios`);
  }

  getUser(id: number) {
    return this.http.get<User>(`${environment.baseUrl}/usuarios/${id}`);
  }

  insertUser(user: User) {
    return this.http.post<User>(`${environment.baseUrl}/usuarios`, user);
  }

  updateUser(user: User) {
    return this.http.patch<User>(
      `${environment.baseUrl}/usuarios/${user.id}`,
      user
    );
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`${environment.baseUrl}/usuarios/${id}`);
  }
}

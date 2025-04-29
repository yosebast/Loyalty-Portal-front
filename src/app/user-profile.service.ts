import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserProfile } from './user-profile/user-profile/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private baseUrl = 'http://localhost:8080/api/user'; // <- Asegúrate que es tu backend

  constructor(private http: HttpClient) {}

  getUserProfile(userId: number): Observable<UserProfile> {
    const email = this.getEmailFromUserId(userId); // <- Este método es solo un ejemplo
    const params = new HttpParams().set('email', email);

    console.log('Llamando al backend con email:', email); // <- LOG de depuración
    
    return this.http.get<UserProfile>(`${this.baseUrl}/profile`, { params });
  }

  updateUserProfile(userId: number, updatedData: Partial<UserProfile>): Observable<any> {
    // Asumimos que el PUT será en /profile, si quieres lo podemos ajustar
    return this.http.put(`${this.baseUrl}/profile`, updatedData);
  }

  private getEmailFromUserId(userId: number): string {
    // 🚨 Solo ejemplo temporal: luego puedes pedir el email real del usuario logado
    return 'laura.martinez@technova.com';
  }
}
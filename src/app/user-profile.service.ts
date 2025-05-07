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

  getUserProfile(email: string): Observable<UserProfile> {
    const params = new HttpParams().set('email', email);

    console.log('Llamando al backend con email:', email); // <- LOG de depuración
    
    return this.http.get<UserProfile>(`${this.baseUrl}/profile`, { params });
  }

  updateUserProfile(email: string, userProfileData: Partial<UserProfile>): Observable<any> {
    return this.http.patch(`/api/user/profile?email=${email}`, userProfileData);  }

}
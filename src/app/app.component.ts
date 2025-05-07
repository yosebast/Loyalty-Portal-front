import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    // Simulación de un usuario logueado
    const existingEmail = sessionStorage.getItem('userEmail');
    if (!existingEmail) {
      sessionStorage.setItem('userEmail', 'laura.martinez@technova.com');
      console.log('Email de usuario simulado guardado en sessionStorage.');
    }
  }
  title = 'Loyalty-Portal-front';
}

import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserProfile } from './user-profile.model';
import { UserProfileService } from '../../user-profile.service';
import { provideHttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userProfile!: UserProfile;
  loggedInUserId: number = 123
  loading: boolean = true;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfileService.getUserProfile(this.loggedInUserId).subscribe((data) => {
      this.userProfile = data;
      this.buildForm(data);
      this.loading = false;
    });
  }

  buildForm(data: UserProfile): void {
    this.profileForm = new FormGroup(
      {
        phone: new FormControl(data.phone, [
          Validators.required,
          Validators.pattern(/^[0-9+()\s-]{6,20}$/)
        ]),
        interestAreas: new FormControl(data.interestAreas),
        password: new FormControl(''),
        repeatPassword: new FormControl('')
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator: ValidatorFn = (group: AbstractControl): { [key: string]: any } | null => {
    const password = group.get('password')?.value;
    const repeatPassword = group.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { passwordMismatch: true };
  };

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedProfile: UserProfile = {
        ...this.userProfile,
        ...this.profileForm.value
      };

      this.userProfileService.updateUserProfile(this.loggedInUserId, updatedProfile).subscribe((response) => {
        console.log('Perfil actualizado exitosamente:', response);
      });
    } else {
      console.warn('Formulario inválido');
    }
  }
}

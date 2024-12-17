import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { UserProfile } from '../Models/UserProfile';
import { ProfileServiceService } from '../profile-service.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userProfile: UserProfile | null = null;

  constructor(private profileService: ProfileServiceService) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(
      (profil) => this.userProfile = profil,
      (error) => console.error('Failed to fetch profile', error)
    );
  }
}
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConstants } from 'src/app/common/app-constants';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
	authUser: User;
	isUserLoggedIn: boolean = false;
	isProfilePage: boolean = false;
	notifications: Notification[] = [];
	hasUnseenNotification: boolean = false;
	resultPage: number = 1;
	resultSize: number = 5;
	hasMoreNotifications: boolean = false;
	fetchingResult: boolean = false;
	defaultProfilePhotoUrl = environment.defaultProfilePhotoUrl;
	
	private subscriptions: Subscription[] = [];

	constructor(
		private authService: AuthService,
		private matDialog: MatDialog,
		private matSnackbar: MatSnackBar) { }

	ngOnInit(): void {
		if (this.authService.isUserLoggedIn()) {
			this.isUserLoggedIn = true;
			this.authUser = this.authService.getAuthUserFromCache();
		} else {
			this.isUserLoggedIn = false;
		}


		this.authService.logoutSubject.subscribe(loggedOut => {
			if (loggedOut) {
				this.isUserLoggedIn = false;
			}
		});

		this.authService.loginSubject.subscribe(loggedInUser => {
			if (loggedInUser) {
				this.authUser = loggedInUser;
				this.isUserLoggedIn = true;
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}



}

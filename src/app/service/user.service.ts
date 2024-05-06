import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResetPassword } from '../model/reset-password';
import { UpdateUserEmail } from '../model/update-user-email';
import { UpdateUserInfo } from '../model/update-user-info';
import { UpdateUserPassword } from '../model/update-user-password';
import { User } from '../model/user';
import { UserResponse } from '../model/user-response';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private host = environment.apiUrl;
	private jwtService = new JwtHelperService();

	constructor(private httpClient: HttpClient) { }

	getUserById(userId: number): Observable<UserResponse | HttpErrorResponse> {
		return this.httpClient.get<UserResponse | HttpErrorResponse>(`${this.host}/users/${userId}`);
	}
	
	getUserFollowerList(userId: number, page: number, size: number): Observable<UserResponse[] | HttpErrorResponse> {
		const reqParams = new HttpParams().set('page', page).set('size', size);
		return this.httpClient.get<UserResponse[] | HttpErrorResponse>(`${this.host}/users/${userId}/follower`, { params: reqParams });
	}

	verifyEmail(token: string): Observable<HttpResponse<any> | HttpErrorResponse> {
		return this.httpClient.post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/verify-email/${token}`, null);
	}

	updateUserInfo(updateUserInfo: UpdateUserInfo): Observable<User | HttpErrorResponse> {
		return this.httpClient.post<User | HttpErrorResponse>(`${this.host}/account/update/info`, updateUserInfo);
	}

	updateUserEmail(updateUserEmail: UpdateUserEmail): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any | HttpErrorResponse>(`${this.host}/account/update/email`, updateUserEmail);
	}

	updateUserPassword(updateUserPassword: UpdateUserPassword): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any | HttpErrorResponse>(`${this.host}/account/update/password`, updateUserPassword);
	}

	updateProfilePhoto(profilePhoto: File): Observable<User | HttpErrorResponse> {
		const formData = new FormData();
		formData.append('profilePhoto', profilePhoto);
		return this.httpClient.post<User | HttpErrorResponse>(`${this.host}/account/update/profile-photo`, formData);
	}

	updateCoverPhoto(coverPhoto: File): Observable<User | HttpErrorResponse> {
		const formData = new FormData();
		formData.append('coverPhoto', coverPhoto);
		return this.httpClient.post<User | HttpErrorResponse>(`${this.host}/account/update/cover-photo`, formData);
	}

	forgotPassword(email: string): Observable<any | HttpErrorResponse> {
		const reqParams = new HttpParams().set('email', email);
		return this.httpClient.post<any | HttpErrorResponse>(`${this.host}/forgot-password`, null, { params: reqParams });
	}

	resetPassword(token: string, resetPassword: ResetPassword): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any | HttpErrorResponse>(`${this.host}/reset-password/${token}`, resetPassword);
	}
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router, private _snackBar: MatSnackBar) { }

  canActivate(): any {
    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/dashboard']);
      this._snackBar.open('You are already logged in','Close');

    } else {
      // this.toastrService.error('Please login and try again');
      return true;
    }
  }
}

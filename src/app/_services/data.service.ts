import { User } from './../_models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userData: User;
  submitted = false;

  constructor() { }

  getUserData() {
    return this.userData;
  }

  setUserData(userData: User) {
    this.userData = userData;
    this.submitted = true;
  }

  clear() {
    this.submitted = false;
  }
}

import { User } from './../_models/user.model';
import { DropdownService } from './../_services/dropdown.service';
import { DataService } from './../_services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.sass']
})
export class ConfirmationComponent implements OnInit {

  userDetails: User;

  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.userDetails = this.dataService.getUserData();
  }

  goBackToHome() {
    this.router.navigate(['home']);
  }

}

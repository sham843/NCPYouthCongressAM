import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { CallAPIService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allLatestEvent: any;

  constructor(private callAPIService: CallAPIService,private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute) {
   
     }

  ngOnInit(): void {
    this.latestEventShow();
  }

  latestEventShow() {
    // this.spinner.show();
    this.callAPIService.setHttp('get', 'Web_GetEventList_Display_1_0?UserId=0', false, false, false, 'ncpServiceForWeb');
    this.callAPIService.getHttp().subscribe((res: any) => {
      if (res.data == 0) {
        this.spinner.hide();
        this.allLatestEvent = res.data1;
      } else {
        this.spinner.hide();
        this._snackBar.open("Data is not available ");
      }
    })
  }

  redirectToEvent(eventId:any){
    localStorage.setItem('eventId',eventId);
    this.router.navigate(['../events/detail']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/models/Dashboard';
import { EndserviceService } from 'src/app/services/endservice.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  dash!:Dashboard
  constructor(private service:EndserviceService) { }

  ngOnInit(): void {

  }

  private getDashboard(){
    this.service.getDash().subscribe(
      res=>{console.log(res), this.dash=res}
    )
  }
}

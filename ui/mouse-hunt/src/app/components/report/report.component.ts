import { Component, OnInit } from '@angular/core';
import { Building } from 'src/app/models/building';
import { Dashboard } from 'src/app/models/Dashboard';
import { Table } from 'src/app/models/Table';
import { EndserviceService } from 'src/app/services/endservice.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  filterTypes:string[]
  listOfBuildings!:Building[]
  dash!:Dashboard
  table!:Table[]
  constructor(private service:EndserviceService) {
    this.filterTypes = ["Trap to Replace","Mouse Found","Traps Installed"]
   }

  ngOnInit(): void {

      this.getDashboard()
      this.getBuildings()
      this.getTable(null)
  }

  private getDashboard(){
    this.service.getDash().subscribe(
      res=>{this.dash=res}
    )
  }

  getTable(id:string|null){
    this.service.getTable(id).subscribe(
      res =>{this.table = res}
    )
  }
  private getBuildings(){
    this.service.getAllBuilding().subscribe(
      (res)=> this.listOfBuildings = res
    )
  }

  filterRoom(string:string){
    this.table = this.table.sort(function(a,b){
      return Number(a.rooms.RoomNo) - Number( b.rooms.RoomNo)
    })
    if(string === this.filterTypes[0]){
      this.table = this.table.sort(function(a,b){
        return -Number(a.rooms.NeedsReplaced) + Number( b.rooms.NeedsReplaced)
      })
      return
    }
    if(string === this.filterTypes[1]){
      this.table = this.table.sort(function(a,b){
        return  -Number(a.totalMice) + Number( b.totalMice)
      })
      return
    }
    if(string === this.filterTypes[2]){
      this.table = this.table.sort(function(a,b){
        return -Number(a.rooms.TrapsInstalled) + Number( b.rooms.TrapsInstalled)
      })
      return
    }
  }
}

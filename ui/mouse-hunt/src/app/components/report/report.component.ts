import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Building } from 'src/app/models/building';
import { Dashboard } from 'src/app/models/Dashboard';
import { Table } from 'src/app/models/Table';
import { EndserviceService } from 'src/app/services/endservice.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  dash!:Dashboard
  table!:Table[]
  filters:string[]
  buildings!:Building[]
  currentBuilding!:string
  @Input() filterval:string
  constructor(private service:EndserviceService) {
    this.filters = ["Room No","Mouse Found","Traps Needed"]

    this.getDashboard()
    this.getTable(null)
    this.filterval = this.filters[0]

  }
  ngOnInit(): void {
    this.service.getAllBuilding().subscribe(
      res=>{
        this.buildings = res
        console.log("here")
      }
    )
  }
  private getDashboard(){
    this.service.getDash().subscribe(
      res=>{this.dash=res[0]}
    )
  }

  getTable(buildingID:string|null){

    this.service.getTable(buildingID||"27").subscribe(
      res=>{this.table =res
        console.log(this.table[0].Floor)
        this.currentBuilding = this.table[0].BuildingName
      }
    )
  }

  applyFilter(filter:string){
    this.filterval = filter
    this.table = this.table.sort((first,second)=> 0 -(first.Floor.rooms.RoomNo > second.Floor.rooms.RoomNo ? -1:1))
    if(filter==this.filters[0]){
      return
    }
    if(filter == this.filters[1]){
      this.table = this.table.sort((first,second)=> 0 -(first.Floor.rooms.totalMice> second.Floor.rooms.totalMice? 1:-1))
    }
    if(filter == this.filters[2]){
      this.table = this.table.sort((first,second)=> 0 -(first.Floor.rooms.NeedsReplaced> second.Floor.rooms.NeedsReplaced? 1:-1))
    }
  }

}

import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EndserviceService } from 'src/app/services/endservice.service';
import { checklist } from 'src/app/models/checklist';
import { room } from 'src/app/models/rooms';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {
  listOFrooms!:room[]
  private bid!:string | null
  private level!:string|null
  listOfRoomDone!:Boolean[]
  mouseFound:number
  roomNo!:string
  options:number[]
  submitString:String
  loading:boolean


  constructor(private floorService:EndserviceService, private route:ActivatedRoute, private el:ElementRef, private router:Router) {
    this.options = [0,1,2]
    this.mouseFound=0
    this.submitString = "submit"
    this.loading = false
  }

  ngOnInit(): void {
    this.getrooms()
  }

  private getrooms():void{
    this.bid = this.route.snapshot.paramMap.get('bid')
    this.level= this.route.snapshot.paramMap.get('level')
    this.floorService.getRooms(this.bid,this.level).subscribe(rooms =>{this.listOFrooms =rooms
    })
  }

  submit(Croom:room){
    Croom["Done"] = true
    console.log(Croom)
    this.loading = true
    this.floorService.postChecklist(Croom,this.mouseFound).subscribe(
      (rooms)=> {this.listOFrooms = rooms,
      document.getElementById(`collapse${Croom.RoomNo}`)?.classList.remove('show')
      this.mouseFound = 0
      this.loading=false
    }

    )
  }
}

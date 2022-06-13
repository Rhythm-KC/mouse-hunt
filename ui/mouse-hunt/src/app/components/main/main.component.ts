import { Component, OnInit } from '@angular/core';
import { EndserviceService } from 'src/app/services/endservice.service';
import { Building } from 'src/app/building';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  buildings: Building[] = [];
  constructor(private service:EndserviceService) { }

  ngOnInit(): void {
    this.getBuildings
  }
   
  getBuildings(): void {
    this.service.getAllBuilding().subscribe((buildings) => this.buildings = buildings)
  }
}

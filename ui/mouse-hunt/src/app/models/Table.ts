import {room} from "./rooms"
export interface Table{
  BuildingID:string,
  BuildingName:string,
  Mnemonic:string,
  rooms:room,
  totalMice:number
}


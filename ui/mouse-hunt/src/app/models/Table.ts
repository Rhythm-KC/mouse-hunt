export interface Table{
  BuildingID:string,
  BuildingName:string,
  Mnemonic:string,
  Floor:{rooms:{
    _id:string,
    RoomNo:number,
    TrapsInstalled:number,
    NeedsReplaced:number,
    totalMice:number
  }}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AxielibService {

  axiedata_server_API:string = "https://axieinfinity.com/api/axies/";

  constructor(
    private http:HttpClient,
  ) {
  }

  /**
   * Returns axie data from the AI server for a specific Axie
   * @param {string} axie_id  
   */
  getAxie(axie_id:string):any{
    return this.http.get(this.axiedata_server_API + "/" + axie_id).pipe(
      tap(
        data => /*console.log("d", data)*/"",
        error => /*console.log("e", error)*/"",
      )
    )
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  url = 'https://localhost:5000/upload';

  constructor(private http: HttpClient) { }

getImagenes(){
  return this.http.get(this.url);
}

}

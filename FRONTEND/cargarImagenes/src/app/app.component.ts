import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cargarImagenes';
  images = '';
  imgUrl = 'assets/noimage.png';

  constructor(private http:HttpClient){}
  
  ngOnInit(): void {    
  }

  selectImage(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (event:any) => {
        this.imgUrl = event.target.result;
      }
      this.images = file;
    }
    
    //console.log(event);
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.images);
   

    this.http.post<any>('http://localhost:5000/file', formData).subscribe(
      (res) => console.log(res,  Swal.fire({
                icon: 'success',
                title: 'Imagen cargada!!',
                text: 'La imagen se subio correctamente!'
                }).then((result) => {
                            if (result) {
                                       location.reload();
                          }
               }) 
         ),
      (err) => Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Parece que no subio nada!!' 
                    })
    );
   this.imgUrl = '/assets/noimage.png';  
  }




}

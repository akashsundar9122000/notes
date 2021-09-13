import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Notes } from "./notes.model";

@Injectable({providedIn:'root'})
export class NotesService{

  notes:Notes[]=[];
  resu:any=[]
  id:any=[];
  listListner = new Subject<Notes[]>();

  constructor(private http:HttpClient,private router:Router){}

  putNotes(title:string,content:string){
    const postData:Notes={title:title,content:content};
    this.http.post<{data:any}>('http://localhost:3000/notes',postData).subscribe((res)=>{
      this.getNotes();
    })
  }

  getNotes(){
    this.http.get<{notes:any}>('http://localhost:3000/notes').subscribe((res)=>{
      this.resu=res;
      this.listListner.next(this.resu);
    })

  }
  updatePost(id:string,title:string,content:string){
    const postData:Notes={_id:id,title:title,content:content};
    this.http.put('http://localhost:3000/notes/'+id,postData).subscribe((response)=>{
        this.router.navigate(['/notes'])
    })
  }

  putId(id:any){
    this.id=id;
  }

  getId(){
    return this.id;
  }
  deleteNotes(id:any){
    this.http.delete('http://localhost:3000/notes/'+id).subscribe((res)=>{
      this.getNotes();
    })
  }

  getListener(){
    return this.listListner.asObservable();
  }

}

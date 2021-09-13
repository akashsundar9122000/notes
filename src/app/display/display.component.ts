import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Notes } from '../notes.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit,OnDestroy {

  lists:Notes[]=[]
  usersNotes:Notes[]=[];
  userId:string='';
  id:string='';
  authSubs: Subscription = new Subscription;
  constructor(private notesService:NotesService,private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
  this.userId=this.authService.getUserId();
   this.notesService.getNotes();
   this.authSubs = this.notesService.getListener().subscribe(res=>{
    this.lists=res;
  })
  }

  onEdit(id:any,title:string,content:string){
    const note=[id,title,content]
    this.notesService.putId(note);
    this.router.navigate(['/edit']);
  }

  onDelete(id:any){
    this.notesService.deleteNotes(id);

  }
  ngOnDestroy(){
    this.authSubs.unsubscribe();
  }

}

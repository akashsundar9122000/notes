import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
id:any;
email:any;
  constructor(private notesService:NotesService,private router:Router) { }

  ngOnInit(): void {

  }


  onSubmit(form:NgForm){
    this.notesService.putNotes(form.value.title,form.value.content);
    form.resetForm();
  }

}

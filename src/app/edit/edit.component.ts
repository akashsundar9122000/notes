import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  array:any=[];
  constructor(private notesService:NotesService) { }

  ngOnInit(): void {
    this.array=this.notesService.getId();
  }
  onSubmit(form:NgForm){
    this.notesService.updatePost(this.array[0],form.value.title,form.value.content);
  }


}

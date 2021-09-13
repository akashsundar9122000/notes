import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authServie:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.authServie.createUser(form.value.email,form.value.password);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
isAuth:boolean=false;
  authSub: Subscription = new Subscription;
  email:string=''
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.isAuth=this.authService.getIsAuth();
    this.authSub = this.authService.getIsAuthenticated().subscribe(res=>{
      this.isAuth=res;
    })
  }
  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authSub.unsubscribe();
  }


}

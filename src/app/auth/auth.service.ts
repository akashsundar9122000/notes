import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { User } from "./auth.model";

@Injectable({providedIn:'root'})
export class AuthService{
private token:any;
private tokenTimer:any;
userId:any;
isAuth:boolean=false;
error:string='An unknown error';


isAuthenticated = new Subject<boolean>();
  constructor(private http:HttpClient,private router:Router){}

  createUser(email:string,password:string){
    const user:User = {email:email,password:password}
    this.http.post('http://localhost:3000/user/signup',user).subscribe(res=>{
      this.router.navigate(['/']);
    },error=>{
      this.error=error.error.message;
      this.router.navigate(['/error']);
    })

  }

  getError(){
    return this.error;
  }

  loginUser(email:string,password:string){
    const user:User = {email:email,password:password};
    this.http.post<{token:string,expiresIn:number, userId:string}>('http://localhost:3000/user/login',user).subscribe(res=>{
      this.token=res.token;
      this.isAuthenticated.next(true);
      this.isAuth=true;
      this.userId=res.userId;
      const expiresInDuration = res.expiresIn;
      this.authSetTimer(expiresInDuration);
      const now = new Date();
      const expirationDate=new Date(now.getTime()+expiresInDuration*1000);
      this.saveAuthData(res.token,expirationDate,res.userId);
      this.router.navigate(['/notes']);
    },error=>{
      this.error=error.error.message;
      this.router.navigate(['/error']);
    })
  }
  private authSetTimer(duration:number){
    this.tokenTimer = setTimeout(()=>{
      this.logout();
    },duration*1000) //setTimeout works with milli seconds so seconds*1000
  }
  getUserId(){
    return this.userId;
  }

  getIsAuthenticated(){
    return this.isAuthenticated.asObservable();
  }

  getToken(){
    return this.token;
  }

  logout(){
    this.token=null;
    this.isAuthenticated.next(false);
    this.isAuth=false;
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }
  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now=new Date();
    const expiresIn=authInformation.expirationDate.getTime()-now.getTime();
    if(expiresIn>0){
      this.isAuthenticated.next(true);
      this.isAuth=true;
      this.token=authInformation.token;
      this.userId=authInformation.userId;
      this.authSetTimer(expiresIn/1000) //because the number passed to this function is in seconds

    }
  }

  getIsAuth(){
    return this.isAuth;
  }

  private saveAuthData(token:string,expirationDate:Date, userId:string){
    localStorage.setItem("token",token);
    localStorage.setItem("expiration",expirationDate.toISOString()); //date cannot be stored in local storage
    localStorage.setItem("userId",userId);
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId=localStorage.getItem("userId");
    if(!token || !expirationDate){
      return;
    }
    return{
      token:token,
      expirationDate:new Date(expirationDate),
      userId:userId
    }
  }
}

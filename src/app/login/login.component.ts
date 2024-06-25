import {Component, inject, OnInit} from '@angular/core';
import {Auth, GoogleAuthProvider, signInWithPopup, signOut, user} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements  OnInit {
  private  auth: Auth = inject(Auth);
  private  provider = new  GoogleAuthProvider();
  user$ = user(this.auth);
  constructor(private router:Router) {
  }

  ngOnInit(): void {}

  login() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const  credential = GoogleAuthProvider.credentialFromResult(result);
      return  credential;
    }).then(()=>{
      this.router.navigate(['/config']);
    })
  }

  logout() {
    signOut(this.auth).then(() => {
      console.log('signed out');}).catch((error) => {
      console.log('sign out error: ' + error);
    })
  }
}

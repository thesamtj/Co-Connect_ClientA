import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 /*
  user: Observable<User>;
  userSubcription: Subscription;
*/
  constructor(private router: Router) {}
/*
  ngOnInit(): void {
    this.user = this.authService.user;
    this.userSubcription = this.authService.findMe().subscribe(user => this.user = user);
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.userSubcription) {
      this.userSubcription.unsubscribe();
    }
  }
*/
}

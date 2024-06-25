import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  clockInterval: any;
  clock = new Date();
constructor(private router: Router) {
}
  ngOnInit(): void {
      this.clockInterval = setInterval(()=> {
        this.clock = new Date();
      }, 1000);
    }

  navigate() {
    this.router.navigate(['slide-show'])
  }
}

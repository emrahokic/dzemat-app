import {AfterContentInit, Component, OnInit} from '@angular/core';
import {FirebaseDataService} from "../services/firebase-data";
import { Observable } from "rxjs";
import {Schedule} from "../services/models/Schedule";

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit, AfterContentInit {
  slideIndex:number = 0;
  numberOfImages = 342;
  $data: any = null;
  $schedules: any;
  state: any;
  clockInterval: any;
  $schedulesOrdered: any;
constructor(private firebaseData: FirebaseDataService) {

}
  ngAfterContentInit(): void {
    this.slideInterval = setInterval(()=> {
      this.plusSlides(1);
    }, 10000); // Change image every 3 seconds
  }

  title = 'slideshow-dzemat-salzburg';

  slideshowContainer: any;
  fakeArray = new Array<any>(this.numberOfImages);
  ngOnInit(): void {
    this.$data = this.firebaseData.getDocData("config/default")as  Observable<any>;

    this.$schedules = this.firebaseData.getCollectionData<Schedule>("schedules") as Observable<Schedule[]>

    this.$schedules.subscribe((data: any) => {
      this.schedules = data.sort((a:any,b: any)=> a.Order - b.Order);
    })

    this.$data.subscribe((data: any) => {
      this.state = data.state;
      this.message = data.message;
    })
    this.clockInterval = setInterval(()=> {
      this.clock = new Date();
    }, 1000);
    this.slideIndex = Number(localStorage.getItem("currentItem"));
    this.slideshowContainer = document.querySelector('.slideshow-container');
  }
  //showSlides(slideIndex);c

  slideInterval :any= null;

  plusSlides(n: any) {
    var i = this.slideIndex += n;
    localStorage.setItem("currentItem", i)
    this.showSlides(i);
  }

  currentSlide(n:any) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n:any) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > this.numberOfImages) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = this.numberOfImages}
    for (i = 0; i < this.numberOfImages; i++) {
      // @ts-ignore
      slides[i].style.display = "none";
    }
    // @ts-ignore
    slides[this.slideIndex-1].style.display = "block";
  }

// Automatic slideshow


// Pause slideshow on hover
//slideshowContainer.addEventListener('mouseover', function() {
//  clearInterval(slideInterval);
//});
  message: any;
  clock = new Date();
  schedules :any[] = [];
  // schedules :any[] = [
  //   {
  //     name: "SUBOTA",
  //     time: "",
  //     timeString: "29. Jun '24"
  //   },
  //   {
  //     name: "Dječiji program",
  //     time: "",
  //     timeString: "10:00 - 14:00 sati"
  //   },
  //   {
  //     name: "Podjela paketića",
  //     time: "",
  //     timeString: "12:00 sati"
  //   },
  //   {
  //     name: "Kahva i kolači",
  //     time: "",
  //     timeString: "14:00 - 18:00 sati"
  //   },
  //   {
  //     name: "Vjerski program",
  //     time: "",
  //     timeString: "od 18:00 sati"
  //   }
  // ];
}

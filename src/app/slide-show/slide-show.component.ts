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
  numberOfImages = 199;
  $data: any = null;
  $schedules: any;
  state: any;
  clockInterval: any;
  $schedulesOrdered: any;
  sponzoriUrl: any;
  images:string[] = [];
  liveImage: any;
  liveImageIndex: number = 0;
  constructor(private firebaseData: FirebaseDataService) {

  }
  ngAfterContentInit(): void {
    this.slideInterval = setInterval(()=> {
      this.plusSlides(1);
    }, 1000*15); // Change image every 3 seconds
  }

  title = 'slideshow-dzemat-salzburg';
  getImages(){
    if(this.images.length == 0){
      this.firebaseData.getAllImages().then(res => {
        this.images = [...res];
        this.liveImageIndex = 0;
        this.liveImage = this.images[this.liveImageIndex];
        this.liveImageIndex++;
      });
    } else{
      this.firebaseData.getAllImages().then(res => {
        for (const resKey of res) {
          if (!this.images.includes(resKey))
            this.images.push(resKey)
        }
      });
    }
    console.log(this.images.length)
  }
  slideshowContainer: any;
  fakeArray = new Array<any>(this.numberOfImages);
  ngOnInit(): void {
    this.slideIndex = Number(localStorage.getItem("currentItem"));

    if(Number(localStorage.getItem("currentItem")) > 199){
      this.slideIndex = 0;
      localStorage.setItem("currentItem", "0");
    }

    this.slideshowContainer = document.querySelector('.slideshow-container');

    this.$data = this.firebaseData.getDocData("config/default")as  Observable<any>;

    this.$schedules = this.firebaseData.getCollectionData<Schedule>("schedules") as Observable<Schedule[]>

    this.$schedules.subscribe((data: any) => {
      this.schedules = data.sort((a:any,b: any)=> a.Order - b.Order);
    })

    this.$data.subscribe((data: any) => {
      this.state = data.state;
      this.message = data.message;
      this.sponzoriUrl = data.sponzoriUrl;

      if( this.state == 3){

      }
      else if(this.state == 5) {
        this.liveImageIndex = 0;

        if(this.getNewImagesInterval == null){
          this.getImages();
          this.getNewImagesInterval = setInterval(()=>{
            this.getImages();
          },1000*60*2)
        }

        if (this.slideIntervalLiveImages == null){
          if(this.images.length <= this.liveImageIndex){
            this.liveImageIndex = 0;
          }
          this.liveImage = this.images[this.liveImageIndex];
          this.liveImageIndex++;
          this.slideIntervalLiveImages = setInterval(()=> {
            if(this.images.length <= this.liveImageIndex){
              this.liveImageIndex = 0;
            }
            this.liveImage = this.images[this.liveImageIndex];
            this.liveImageIndex++;
          }, 1000 * 15); // Change image every 3 seconds
        }

      }else{
        clearInterval(this.slideIntervalLiveImages);
        clearInterval(this.getNewImagesInterval);
        this.slideIntervalLiveImages = null;
        this.getNewImagesInterval = null;
      }

    })
    this.clockInterval = setInterval(()=> {
      this.clock = new Date();
    }, 1000);

  }
  //showSlides(slideIndex);c

  slideInterval :any= null;
  slideIntervalLiveImages :any= null;
  getNewImagesInterval :any= null;

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
    let slides = document.getElementsByClassName("mySlides_show");
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

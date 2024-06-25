import {Component, Input, OnInit} from '@angular/core';
import {FirebaseDataService} from "../services/firebase-data";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {Schedule} from "../services/models/Schedule";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit{
  id:string|null = null;
  message = new FormControl('');
  sponzoriUrl = new FormControl('');
  // @ts-ignore
  $data: Observable<any> = null;
  data: any;
  selection = new FormControl('');

  ScheduleOrder= new FormControl('');
  ScheduleTimeText= new FormControl('');
  ScheduleName= new FormControl('');
  schedules :any[] = [];
  $schedules: any;
  schedule= new FormControl('');
  constructor(private firebaseService: FirebaseDataService) {
  }

  ngOnInit(): void {
    this.$data = this.firebaseService.getDocData("config/default") as Observable<any>;
    this.$data.subscribe((data: any) => {
      this.data = data;
      this.message.setValue(data.message);
      this.selection.setValue(data.state);
      this.sponzoriUrl.setValue(data.sponzoriUrl)
    })
    this.schedule.valueChanges.subscribe((data: any) => {
      console.log(data);
      this.ScheduleName.setValue(data[0].Name);
      this.ScheduleTimeText.setValue(data[0].TimeString);
      this.ScheduleOrder.setValue(data[0].Order);
      this.id = data[0].id;
    })
    this.$schedules = this.firebaseService.getCollectionData<Schedule>("schedules") as Observable<Schedule[]>

    this.$schedules.subscribe((data: any) => {
      this.schedules = data.sort((a:any,b: any)=> a.Order - b.Order);
    })

  }

  async save() {
    debugger
    this.data.message = this.message.value;
    this.data.state = this.selection.value;
    this.data.sponzoriUrl = this.sponzoriUrl.value;
    this.firebaseService.SetConfig(this.data).then((s) => {
      console.log('saving config', s);
    });
  }
  async save2() {
    if (this.id == null) {
      this.firebaseService.AddSchedule({
        Name: this.ScheduleName.value,
        Order: Number(this.ScheduleOrder.value),
        Time: null,
        TimeString: this.ScheduleTimeText.value,
      }).then((data: any) => {
        console.log(data);
      })
    }else{
      this.firebaseService.SetSchedule({
        Name: this.ScheduleName.value,
        Order: Number(this.ScheduleOrder.value),
        Time: null,
        TimeString: this.ScheduleTimeText.value,
      },this.id).then((data: any) => {
        console.log(data);
      })
    }

  }

  delete() {
    if(this.id != null){
      this.firebaseService.deleteSchedule(this.id).then((data: any) => {
        console.log(data);
        this.id = null;
        this.ScheduleOrder.setValue(null);
        this.ScheduleName.setValue(null);
        this.ScheduleTimeText.setValue(null);
        this.schedule.setValue(null);
      });
    }
  }
}

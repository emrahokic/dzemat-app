import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-live-info',
  templateUrl: './live-info.component.html',
  styleUrls: ['./live-info.component.css']
})
export class LiveInfoComponent {
@Input() message : any = ""
}

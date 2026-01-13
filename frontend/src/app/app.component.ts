import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeadlineComponent } from './deadline/deadline.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DeadlineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'deadline';
}

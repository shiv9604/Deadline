import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Observable, map, switchMap, takeWhile, timer } from 'rxjs';
import { DeadlineService } from './deadline.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deadline',
  standalone: true,
  imports: [CommonModule],
  template: `
     <p *ngIf="secondsLeft$ | async as seconds; else done">
        Seconds left to deadline: {{ seconds }}
    </p>
    <ng-template #done>
        Deadline reached
    </ng-template>
  `,
  styles: ``,
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class DeadlineComponent {
  private deadlineService = inject(DeadlineService);

  public secondsLeft$: Observable<number> = this.deadlineService.getSecondsLeft().pipe(
    switchMap((start:number) =>
      timer(0, 1000).pipe(
        map((secondsPassed:number) => start - secondsPassed),
        takeWhile((remaining:number) => remaining >= 0)
      )
    )
  );

}

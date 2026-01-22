import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

  // Fetch initial value once from backend and derive a countdown stream on the client.
  // The stream completes automatically when the countdown reaches zero.
  public secondsLeft$: Observable<number> = this.deadlineService.getSecondsLeft().pipe(
    switchMap(start =>
      timer(0, 1000).pipe(
        map(secondsPassed => start - secondsPassed),
        takeWhile(remaining => remaining >= 0)
      )
    )
  );
}

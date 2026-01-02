import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoContainerComponent } from './components/demo-container/demo-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DemoContainerComponent],
  template: `
    <div class="app-wrapper">
      <app-demo-container></app-demo-container>
    </div>
  `,
  styles: [`
    .app-wrapper {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
  `]
})
export class AppComponent {}
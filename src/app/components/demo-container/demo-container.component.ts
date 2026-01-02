import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMode } from '../../models/demo.model';
import { DemoVisualizationComponent } from '../demo-visualization/demo-visualization.component';

@Component({
  selector: 'app-demo-container',
  standalone: true,
  imports: [CommonModule, DemoVisualizationComponent],
  template: `
    <div class="demo-container">
      <!-- Header -->
      <div class="header">
        <h1 class="title">Angular SSR vs CSR Demo</h1>
        <p class="subtitle">Interactive visualization of Server-Side Rendering vs Client-Side Rendering</p>
      </div>

      <!-- Mode Switcher -->
      <div class="mode-switcher">
        <button 
          [class.active]="currentMode() === 'ssr'"
          (click)="switchMode('ssr')"
          class="mode-btn ssr-btn">
          <span class="icon">🚀</span>
          <span class="label">With SSR + Hydration</span>
        </button>
        <button 
          [class.active]="currentMode() === 'csr'"
          (click)="switchMode('csr')"
          class="mode-btn csr-btn">
          <span class="icon">🌐</span>
          <span class="label">Without SSR (CSR Only)</span>
        </button>
      </div>

      <!-- Demo Visualization -->
      <app-demo-visualization [mode]="currentMode()"></app-demo-visualization>
    </div>
  `,
  styles: [`
    .demo-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
      color: white;
    }

    .title {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }

    .subtitle {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .mode-switcher {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .mode-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      font-weight: 600;
      border: 3px solid white;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .mode-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .mode-btn.active {
      background: white;
      box-shadow: 0 6px 20px rgba(0,0,0,0.3);
      transform: translateY(-2px);
    }

    .mode-btn.active.ssr-btn {
      color: #10b981;
    }

    .mode-btn.active.csr-btn {
      color: #f97316;
    }

    .icon {
      font-size: 1.5rem;
    }

    @media (max-width: 768px) {
      .mode-switcher {
        flex-direction: column;
      }

      .title {
        font-size: 1.8rem;
      }
    }
  `]
})
export class DemoContainerComponent {
  currentMode = signal<DemoMode>('ssr');

  switchMode(mode: DemoMode) {
    this.currentMode.set(mode);
  }
}
import { Component, Input, OnChanges, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMode, Step } from '../../models/demo.model';
import { SSR_STEPS } from '../../data/ssr-steps.data';
import { CSR_STEPS } from '../../data/csr-steps.data';

@Component({
  selector: 'app-demo-visualization',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'visualization-container ' + mode">
      <!-- Progress Bar -->
      <div class="progress-section">
        <div class="progress-dots">
          @for (step of steps; track $index) {
            <div 
              [class.active]="$index <= currentStep()"
              [class.complete]="$index < currentStep()"
              class="dot">
              {{ $index + 1 }}
            </div>
          }
        </div>
        <div class="progress-bar-container">
          <div 
            class="progress-bar-fill"
            [style.width.%]="((currentStep() + 1) / steps.length) * 100">
          </div>
        </div>
      </div>

      <!-- Current Step Info -->
      <div class="current-step-card">
        <h3 class="step-title">{{ currentStepData().title }}</h3>
        <p class="step-description">{{ currentStepData().description }}</p>
      </div>

      <!-- Three Column Layout -->
      <div class="columns-grid">
        <!-- Server Column -->
        <div 
          class="column server-column"
          [class.highlight]="currentStepData().highlight === 'server' || currentStepData().highlight === 'request'">
          <h4 class="column-header">
            <span class="icon">🖥️</span>
            Server
          </h4>
          <div class="column-content">
            {{ currentStepData().server }}
          </div>
        </div>

        <!-- Browser Column -->
        <div 
          class="column browser-column"
          [class.highlight]="currentStepData().highlight === 'browser' || 
                            currentStepData().highlight === 'rendering' || 
                            currentStepData().highlight === 'hydration'">
          <h4 class="column-header">
            <span class="icon">🌐</span>
            Browser
          </h4>
          <div class="column-content">
            {{ currentStepData().browser }}
          </div>
        </div>

        <!-- User Sees Column -->
        <div 
          class="column user-column"
          [class.highlight]="currentStep() >= 3">
          <h4 class="column-header">
            <span class="icon">👁️</span>
            User Sees
          </h4>
          <div class="column-content">
            {{ currentStepData().userSees }}
          </div>
        </div>
      </div>

      <!-- Visual Flow -->
      <div class="visual-flow">
        <div class="flow-node" [class.active]="currentStepData().highlight === 'server'">
          <div class="node-icon">🖥️</div>
          <div class="node-label">Server</div>
        </div>
        
        <div class="flow-arrow" [class.active]="currentStepData().highlight === 'transfer'">
          @if (currentStepData().highlight === 'transfer') {
            <span class="arrow-icon">📦</span>
          }
        </div>
        
        <div class="flow-node" [class.active]="currentStepData().highlight === 'browser' || 
                                               currentStepData().highlight === 'rendering' || 
                                               currentStepData().highlight === 'hydration'">
          <div class="node-icon">🌐</div>
          <div class="node-label">Browser</div>
        </div>
        
        <div class="flow-arrow" [class.active]="currentStep() >= 3">
        </div>
        
        <div class="flow-node" [class.active]="currentStep() >= 3">
          <div class="node-icon">{{ currentStep() >= 6 ? '😊' : '😴' }}</div>
          <div class="node-label">User</div>
        </div>
      </div>

      <!-- Controls -->
      <div class="controls">
        <button (click)="togglePlay()" class="control-btn play-btn">
          {{ isPlaying() ? '⏸️ Pause' : '▶️ Play' }}
        </button>
        <button (click)="reset()" class="control-btn reset-btn">
          🔄 Reset
        </button>
        <button (click)="prevStep()" [disabled]="currentStep() === 0" class="control-btn nav-btn">
          ⏮️ Previous
        </button>
        <button (click)="nextStep()" [disabled]="currentStep() === steps.length - 1" class="control-btn nav-btn">
          ⏭️ Next
        </button>
      </div>

      <!-- Info Cards -->
      <div class="info-cards">
        @if (mode === 'ssr') {
          <div class="info-card benefits">
            <h5>✓ SSR Benefits:</h5>
            <ul>
              <li>User sees content immediately</li>
              <li>Better SEO (search engines read HTML)</li>
              <li>Faster perceived load time</li>
              <li>No screen flicker</li>
            </ul>
          </div>
          <div class="info-card hydration">
            <h5>✓ Hydration Benefits:</h5>
            <ul>
              <li>Reuses server HTML</li>
              <li>No re-rendering</li>
              <li>Smooth transition to interactive</li>
              <li>Better performance</li>
            </ul>
          </div>
        } @else {
          <div class="info-card problems">
            <h5>⚠️ CSR Problems:</h5>
            <ul>
              <li>User sees blank page for 3-5+ seconds</li>
              <li>Poor SEO (empty HTML)</li>
              <li>Slow on mobile/weak devices</li>
              <li>Large JavaScript bundles</li>
              <li>Bad on slow networks</li>
            </ul>
          </div>
          <div class="info-card comparison">
            <h5>📊 Timing Comparison:</h5>
            <ul>
              <li><strong>CSR:</strong> Wait ~3-5 seconds</li>
              <li><strong>SSR:</strong> Content in ~0.5s</li>
              <li><strong>Difference:</strong> 5-10x faster!</li>
              <li class="highlight-text">✓ SSR + Hydration is better!</li>
            </ul>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .visualization-container {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    }

    /* Progress Section */
    .progress-section {
      margin-bottom: 2rem;
    }

    .progress-dots {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    .dot {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 0.875rem;
      color: #9ca3af;
      transition: all 0.3s;
    }

    .ssr .dot.active {
      background: #10b981;
      color: white;
    }

    .csr .dot.active {
      background: #f97316;
      color: white;
    }

    .progress-bar-container {
      width: 100%;
      height: 8px;
      background: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      transition: width 0.5s ease;
    }

    .ssr .progress-bar-fill {
      background: #10b981;
    }

    .csr .progress-bar-fill {
      background: #f97316;
    }

    /* Current Step Card */
    .current-step-card {
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      border-left: 4px solid;
    }

    .ssr .current-step-card {
      background: #d1fae5;
      border-color: #10b981;
    }

    .csr .current-step-card {
      background: #fed7aa;
      border-color: #f97316;
    }

    .step-title {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: #1f2937;
    }

    .step-description {
      color: #4b5563;
    }

    /* Columns Grid */
    .columns-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .column {
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.3s;
      background: white;
    }

    .column.highlight {
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transform: translateY(-2px);
    }

    .ssr .server-column.highlight {
      border-color: #10b981;
      background: #f0fdf4;
    }

    .ssr .browser-column.highlight {
      border-color: #3b82f6;
      background: #eff6ff;
    }

    .ssr .user-column.highlight {
      border-color: #a855f7;
      background: #faf5ff;
    }

    .csr .server-column.highlight {
      border-color: #10b981;
      background: #f0fdf4;
    }

    .csr .browser-column.highlight {
      border-color: #f97316;
      background: #fff7ed;
    }

    .csr .user-column.highlight {
      border-color: #ef4444;
      background: #fef2f2;
    }

    .column-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: #1f2937;
    }

    .icon {
      font-size: 1.5rem;
    }

    .column-content {
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      background: #f9fafb;
      padding: 1rem;
      border-radius: 8px;
      white-space: pre-line;
      color: #374151;
      min-height: 80px;
    }

    /* Visual Flow */
    .visual-flow {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2rem;
      background: #f9fafb;
      border-radius: 12px;
      margin-bottom: 2rem;
    }

    .flow-node {
      text-align: center;
      transition: all 0.3s;
    }

    .node-icon {
      width: 80px;
      height: 80px;
      border-radius: 12px;
      background: #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin: 0 auto 0.5rem;
      transition: all 0.3s;
    }

    .flow-node.active .node-icon {
      animation: pulse 1s infinite;
    }

    .ssr .flow-node.active .node-icon {
      background: #10b981;
    }

    .csr .flow-node.active .node-icon {
      background: #f97316;
    }

    .node-label {
      font-weight: 600;
      color: #4b5563;
    }

    .flow-arrow {
      flex: 1;
      height: 2px;
      background: #e5e7eb;
      margin: 0 1rem;
      position: relative;
      transition: all 0.3s;
    }

    .flow-arrow.active {
      height: 4px;
    }

    .ssr .flow-arrow.active {
      background: #10b981;
    }

    .csr .flow-arrow.active {
      background: #f97316;
    }

    .arrow-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.5rem;
      animation: bounce 1s infinite;
    }

    /* Controls */
    .controls {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .control-btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 1rem;
    }

    .play-btn {
      background: #10b981;
      color: white;
    }

    .play-btn:hover {
      background: #059669;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }

    .reset-btn {
      background: #6b7280;
      color: white;
    }

    .reset-btn:hover {
      background: #4b5563;
      transform: translateY(-2px);
    }

    .nav-btn {
      background: #3b82f6;
      color: white;
    }

    .nav-btn:hover:not(:disabled) {
      background: #2563eb;
      transform: translateY(-2px);
    }

    .nav-btn:disabled {
      background: #e5e7eb;
      color: #9ca3af;
      cursor: not-allowed;
    }

    /* Info Cards */
    .info-cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .info-card {
      padding: 1.5rem;
      border-radius: 12px;
      border: 2px solid;
    }

    .info-card h5 {
      font-weight: bold;
      margin-bottom: 0.75rem;
      font-size: 1rem;
    }

    .info-card ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .info-card li {
      padding: 0.25rem 0;
      font-size: 0.875rem;
    }

    .benefits {
      background: #d1fae5;
      border-color: #10b981;
      color: #065f46;
    }

    .hydration {
      background: #dbeafe;
      border-color: #3b82f6;
      color: #1e40af;
    }

    .problems {
      background: #fee2e2;
      border-color: #ef4444;
      color: #991b1b;
    }

    .comparison {
      background: #fed7aa;
      border-color: #f97316;
      color: #9a3412;
    }

    .highlight-text {
      color: #10b981;
      font-weight: bold;
      margin-top: 0.5rem;
    }

    /* Animations */
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    @keyframes bounce {
      0%, 100% {
        transform: translate(-50%, -50%) translateY(0);
      }
      50% {
        transform: translate(-50%, -50%) translateY(-10px);
      }
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .columns-grid {
        grid-template-columns: 1fr;
      }

      .info-cards {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .controls {
        flex-direction: column;
      }

      .control-btn {
        width: 100%;
      }
    }
  `]
})
export class DemoVisualizationComponent implements OnChanges {
  @Input() mode: DemoMode = 'ssr';
  
  currentStep = signal(0);
  isPlaying = signal(false);
  steps: Step[] = [];
  private intervalId: any;

  constructor() {
    effect(() => {
      if (this.isPlaying()) {
        this.startAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    });
  }

  ngOnChanges() {
    this.steps = this.mode === 'ssr' ? SSR_STEPS : CSR_STEPS;
    this.reset();
  }

  currentStepData(): Step {
    return this.steps[this.currentStep()];
  }

  togglePlay() {
    this.isPlaying.set(!this.isPlaying());
  }

  reset() {
    this.stopAutoPlay();
    this.currentStep.set(0);
    this.isPlaying.set(false);
  }

  nextStep() {
    if (this.currentStep() < this.steps.length - 1) {
      this.currentStep.update(s => s + 1);
    } else {
      this.isPlaying.set(false);
    }
  }

  prevStep() {
    if (this.currentStep() > 0) {
      this.currentStep.update(s => s - 1);
    }
  }

  private startAutoPlay() {
    this.intervalId = setInterval(() => {
      if (this.currentStep() < this.steps.length - 1) {
        this.nextStep();
      } else {
        this.isPlaying.set(false);
      }
    }, 2000);
  }

  private stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }
}

// ============================================
// FILE: src/app/app.config.ts
// ============================================
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([])
  ]
};
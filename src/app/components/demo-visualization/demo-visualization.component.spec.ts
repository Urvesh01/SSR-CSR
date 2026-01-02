import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoVisualizationComponent } from './demo-visualization.component';

describe('DemoVisualizationComponent', () => {
  let component: DemoVisualizationComponent;
  let fixture: ComponentFixture<DemoVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoVisualizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

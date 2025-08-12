import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankerTableComponent } from './tanker-table.component';

describe('TankerTableComponent', () => {
  let component: TankerTableComponent;
  let fixture: ComponentFixture<TankerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TankerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

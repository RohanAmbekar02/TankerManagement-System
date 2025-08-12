import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankerFormComponent } from './tanker-form.component';

describe('TankerFormComponent', () => {
  let component: TankerFormComponent;
  let fixture: ComponentFixture<TankerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TankerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

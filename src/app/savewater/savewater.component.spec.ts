import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavewaterComponent } from './savewater.component';

describe('SavewaterComponent', () => {
  let component: SavewaterComponent;
  let fixture: ComponentFixture<SavewaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavewaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavewaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlvComponent } from './flv.component';

describe('FlvComponent', () => {
  let component: FlvComponent;
  let fixture: ComponentFixture<FlvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

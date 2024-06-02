import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedersMsgComponent } from './feeders-msg.component';

describe('FeedersMsgComponent', () => {
  let component: FeedersMsgComponent;
  let fixture: ComponentFixture<FeedersMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedersMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedersMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

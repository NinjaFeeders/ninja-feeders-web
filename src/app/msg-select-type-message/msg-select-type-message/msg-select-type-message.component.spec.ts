import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgSelectTypeMessageComponent } from './msg-select-type-message.component';

describe('MsgSelectTypeMessageComponent', () => {
  let component: MsgSelectTypeMessageComponent;
  let fixture: ComponentFixture<MsgSelectTypeMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgSelectTypeMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgSelectTypeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

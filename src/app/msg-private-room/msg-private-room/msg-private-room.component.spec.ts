import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgPrivateRoomComponent } from './msg-private-room.component';

describe('MsgPrivateRoomComponent', () => {
  let component: MsgPrivateRoomComponent;
  let fixture: ComponentFixture<MsgPrivateRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgPrivateRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgPrivateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlabelopenComponent } from './editlabelopen.component';

describe('EditlabelopenComponent', () => {
  let component: EditlabelopenComponent;
  let fixture: ComponentFixture<EditlabelopenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditlabelopenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlabelopenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

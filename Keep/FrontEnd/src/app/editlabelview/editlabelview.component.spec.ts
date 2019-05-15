import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlabelviewComponent } from './editlabelview.component';

describe('EditlabelviewComponent', () => {
  let component: EditlabelviewComponent;
  let fixture: ComponentFixture<EditlabelviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditlabelviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlabelviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

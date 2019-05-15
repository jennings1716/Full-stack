import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharenoteopenComponent } from './sharenoteopen.component';

describe('SharenoteopenComponent', () => {
  let component: SharenoteopenComponent;
  let fixture: ComponentFixture<SharenoteopenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharenoteopenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharenoteopenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

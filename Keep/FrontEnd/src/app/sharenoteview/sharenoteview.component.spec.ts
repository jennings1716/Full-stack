import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharenoteviewComponent } from './sharenoteview.component';

describe('SharenoteviewComponent', () => {
  let component: SharenoteviewComponent;
  let fixture: ComponentFixture<SharenoteviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharenoteviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharenoteviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

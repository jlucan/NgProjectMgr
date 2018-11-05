
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleDataTableComponent } from './example-data-table.component';

describe('ExampleDataTableComponent', () => {
  let component: ExampleDataTableComponent;
  let fixture: ComponentFixture<ExampleDataTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleDataTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

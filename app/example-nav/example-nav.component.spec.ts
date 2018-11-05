
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ExampleNavComponent } from './example-nav.component';

describe('ExampleNavComponent', () => {
  let component: ExampleNavComponent;
  let fixture: ComponentFixture<ExampleNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [ExampleNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

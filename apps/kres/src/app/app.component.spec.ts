import { TestBed } from '@angular/core/testing';
import { KResAppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('KResAppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [KResAppComponent],
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(KResAppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome kres');
  });

  it(`should have as title 'kres'`, () => {
    const fixture = TestBed.createComponent(KResAppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('kres');
  });
});

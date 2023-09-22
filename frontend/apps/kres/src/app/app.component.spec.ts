import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KResAppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('KResAppComponent', () => {
  let fixture: ComponentFixture<KResAppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [KResAppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(KResAppComponent);
  });

  it('should exist', () => {
    fixture.detectChanges();
    expect(KResAppComponent).toBeTruthy();
  });

  it(`should have as title 'kres'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('kres');
  });

  describe (`should have header`, () => {
    it (`with the name of restaurant`, () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('header')?.textContent).toContain('KAFE RESTAURANT');
    });
    it (`with the logo of restaurant`, () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('header img')).toBeTruthy();
    });
  });
});

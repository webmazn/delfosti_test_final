import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminaProductoComponent } from './elimina-producto.component';

describe('EliminaProductoComponent', () => {
  let component: EliminaProductoComponent;
  let fixture: ComponentFixture<EliminaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminaProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

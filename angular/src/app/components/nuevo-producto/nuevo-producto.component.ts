import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, of, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, catchError, switchMap, tap } from 'rxjs/operators';

import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';
import { MarcasService } from '../../services/marcas.service';
import { Producto } from '../../models/producto.model';

const EMPTY_PRODUCT: Producto = {
  id: undefined,
  name: '',
  category: {
    name: 'Por definir'
  },
  brand: {
    name: 'Por definir'
  },
  slug: '',
  status: true
};

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.scss']
})

export class NuevoProductoComponent implements OnInit {

  id: string;
  producto: Producto;
  previous: Producto = EMPTY_PRODUCT;
  formGroup: FormGroup = new FormGroup([]);
  errorMessage = '';

  optionsEstado:any = [{id: true, name: 'Habilitado'}, {id: false, name: 'Deshabilitado'}];
  filteredOptionsEstado: Observable<any>;
  optionsMarca:any = [];
  filteredOptionsMarca: Observable<any>;
  optionsCategoria:any = [];
  filteredOptionsCategoria: Observable<any>;
  private unsubscribe: Subscription[] = [];

  fechaRegistro: Date;

  constructor(
    private productoService: ProductosService,
    private categoriaService: CategoriasService,
    private marcaService: MarcasService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.cargarProducto();
  }

  cargarProducto(){
    const sb = this.route.paramMap.pipe(
      switchMap(params => {
        // TODO get id from URL
        this.id = params.get('id'); // 6310c84296319ad544079e62
        if (this.id) return this.productoService.traerProducto(this.id);
        return of(EMPTY_PRODUCT);
      }),
      catchError((errorMessage) => {
        this.errorMessage = errorMessage;
        return of(undefined);
      }),
    ).subscribe((res: Producto) => {
      if (!res) this.router.navigate(['/listado-productos'], { relativeTo: this.route });
      if (this.id) {
        this.producto = res;
      }else{
        this.reset();
      }
      this.loadForm();
    });
    this.unsubscribe.push(sb);
  }

  loadForm() {
    if (!this.producto) {
      return;
    }
    console.log('entramos');
    this.formGroup = this.fb.group({
      // nombre: [this.producto.name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(512)])],
      nombre: [this.producto.name, Validators.required],
      categoria: [this.producto.category, Validators.required],
      marca: [this.producto.brand, Validators.required],
      url: [this.producto.slug, Validators.required],
      estado: [{id: this.producto.status, name: (this.producto.status? 'Habilitado':'Deshabilitado')}, Validators.required],
    });
    this.fechaRegistro = new Date(this.producto.createdAt);
    this.llenarControles();
    this.cdRef.detectChanges();
    //this.formGroup.patchValue({ nombre: 'forzado' })
  }

  reset(){
    if (!this.previous) {
      return;
    } console.log('reset');
    this.producto = Object.assign({}, this.previous);
  }

  save(){
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }
    const formValues = this.formGroup.value;
    // console.log(formValues);
    this.producto = {
      name: formValues.nombre,
      category: formValues.categoria._id,
      brand: formValues.marca._id,
      slug: formValues.url,
      status: formValues.estado.id
    };
    // this.producto = Object.assign(this.producto, formValues);
    if (this.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const sbUpdate = this.productoService.actualizarProducto(this.id, this.producto).pipe(
      tap(() => this.router.navigate(['/listado-productos'])),
      catchError((errorMessage) => {
        console.error('ACTUALIZA ERROR', errorMessage);
        return of(this.producto);
      })
    ).subscribe(res => this.producto = res as Producto);
    this.unsubscribe.push(sbUpdate);
  }

  create() {
    const sbCreate = this.productoService.registrarProducto(this.producto).pipe(
      tap(() => this.router.navigate(['/listado-productos'])),
      catchError((errorMessage) => {
        console.error('REGISTRO ERROR', errorMessage);
        return of(this.producto);
      })
    ).subscribe(res => this.producto = res as Producto);
    this.unsubscribe.push(sbCreate);
  }

  llenarControles(){
    this.filteredOptionsEstado = this.formGroup.get('estado').valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : (<any>value).name),
        map(value => { const filterValue = value.toLowerCase();
          return this.optionsEstado.filter(option => option.name.toLowerCase().includes(filterValue));
        }
      )
    );

    const categorias = this.categoriaService.listarCategorias()
      .subscribe((v) => {
        this.optionsCategoria = v
        this.filteredOptionsCategoria = this.formGroup.get('categoria').valueChanges.pipe(
          debounceTime(500),
          distinctUntilChanged(),
          startWith(''),
          map(value => typeof value === 'string' ? value : (<any>value).name),
          map(value => {
            const filterValue = value.toLowerCase();
            return this.optionsCategoria.filter(option => option.name.toLowerCase().includes(filterValue));
          })
        );
      });
    this.unsubscribe.push(categorias);

    const marcas = this.marcaService.listarMarcas()
      .subscribe((v) => {
        this.optionsMarca = v
        this.filteredOptionsMarca = this.formGroup.get('marca').valueChanges.pipe(
          debounceTime(500),
          distinctUntilChanged(),
          startWith(''),
          map(value => typeof value === 'string' ? value : (<any>value).name),
          map(value => {
            const filterValue = value.toLowerCase();
            return this.optionsMarca.filter(option => option.name.toLowerCase().includes(filterValue));
          })
        );
      });
    this.unsubscribe.push(marcas);
  }

  displayFn(option): string | undefined {
    return option ? option.name : undefined;
  }

  ngOnDestroy(){
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }
}

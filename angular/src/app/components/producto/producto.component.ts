import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';
import { MarcasService } from '../../services/marcas.service';
import { Producto } from '../../models/producto.model';
import { Categoria } from '../../models/categoria.model';
import { Marca } from '../../models/marca.model';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input', {static: true}) input: ElementRef;

  productos: any = [];
  productosSuscritos: Subscription = new Subscription;
  displayedColumns = ['index', 'name', 'category', 'brand', 'slug', 'createdAt', 'status', 'actions'];
  dataSource = new MatTableDataSource<Producto>([]);

  categoria = new FormControl('');
  marca = new FormControl('');
  optionsMarca:any = [];
  filteredOptionsMarca: Observable<any>;
  optionsCategoria:any = [];
  filteredOptionsCategoria: Observable<any>;
  private unsubscribe: Subscription[] = [];

  constructor(
    private productosService: ProductosService,
    private categoriaService: CategoriasService,
    private marcaService: MarcasService
  ) { }

  ngOnInit(): void {
    this.productosSuscritos = this.productosService.listar().subscribe(
      (res: Producto) => {
        console.log(res);
        this.productos = res;
        this.dataSource.data = this.productos
      },err => console.error(err)
    );
    this.unsubscribe.push(this.productosSuscritos);

    this.llenarControles();
  }

  // buscarProductos(event: any) {
  //   let filterValue = event.target.value;
  //   filterValue = filterValue.trim().toLowerCase();
  //   this.dataSource.filter = filterValue;
  // }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (row: Producto, columnName: string) : string => {
      //console.log(row,columnName);
      if(columnName=="category") return String(row.category.name);
      if(columnName=="brand") return String(row.brand.name);
      var columnValue = row[columnName as keyof Producto] as string;
      return columnValue;
    }
    this.dataSource.sort = this.sort;

    fromEvent(this.input.nativeElement,'keyup')
    .pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe((palabra: any) => {
        let filterValue = palabra.target.value;
        filterValue = filterValue.trim().toLowerCase();
        this.dataSource.filter = filterValue;
      });
  }

  llenarControles(){
    const categorias = this.categoriaService.listar()
      .subscribe((v) => { this.optionsCategoria = v
        this.filteredOptionsCategoria = this.categoria.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : (<any>value).name),
          map(value => {
            const filterValue = value.toLowerCase();
            return this.optionsCategoria.filter(option => option.name.toLowerCase().includes(filterValue));
          })
        );
      })
    this.unsubscribe.push(categorias);

    const marcas = this.marcaService.listar()
      .subscribe((v) => { this.optionsMarca = v
        this.filteredOptionsMarca = this.marca.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : (<any>value).name),
          map(value => {
            const filterValue = value.toLowerCase();
            return this.optionsMarca.filter(option => option.name.toLowerCase().includes(filterValue));
          })
        );
      })
    this.unsubscribe.push(marcas);
  }

  displayFn(option): string | undefined {
    return option ? option.name : undefined;
  }

  ngOnDestroy(){
    this.productosSuscritos.unsubscribe();
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

}

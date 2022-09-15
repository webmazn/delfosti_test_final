import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';
import { MarcasService } from '../../services/marcas.service';
import { Producto } from '../../models/producto.model';
import { EliminaProductoComponent } from '../elimina-producto/elimina-producto.component';

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
    private marcaService: MarcasService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarProductos();
    this.llenarControles();
  }

  listarProductos(){
    this.productosSuscritos = this.productosService.listarProductos().subscribe(
      (res: Producto) => {
        console.log(res);
        this.productos = res;
        this.dataSource.data = this.productos
      },err => console.error(err)
    );
    this.unsubscribe.push(this.productosSuscritos);
  }

  ngAfterViewInit() {
    // TODO Filtrando ordenamiento en objeto anidado
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (row: Producto, columnName: string) : string => {
      //console.log(row,columnName);
      if(columnName=="category") return String(row.category.name);
      if(columnName=="brand") return String(row.brand.name);
      var columnValue = row[columnName as keyof Producto] as string;
      return columnValue;
    }
    this.dataSource.sort = this.sort;
    // TODO Filtrando dentro de objeto aninado
    this.dataSource.filterPredicate = (data, filter: string)  => {
      const accumulator = (currentTerm, key) => {
        // return key === 'category' ? currentTerm + data.category.name : currentTerm + data[key];
        if(key=="category") return currentTerm + data.category.name;
        if(key=="brand") return currentTerm + data.brand.name;
        return currentTerm + data[key];
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
    // TODO filtrar en todos los campos
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
    const categorias = this.categoriaService.listarCategorias()
      .subscribe((v) => {
        this.optionsCategoria = v
        this.filteredOptionsCategoria = this.categoria.valueChanges.pipe(
          debounceTime(500),
          distinctUntilChanged(),
          startWith(''),
          map(value => typeof value === 'string' ? value : (<any>value).name),
          map(value => {
            const filterValue = value.toLowerCase();
            this.dataSource.filter = filterValue;
            return this.optionsCategoria.filter(option => option.name.toLowerCase().includes(filterValue));
          })
        );
      })
    this.unsubscribe.push(categorias);

    const marcas = this.marcaService.listarMarcas()
      .subscribe((v) => {
        this.optionsMarca = v
        this.filteredOptionsMarca = this.marca.valueChanges.pipe(
          debounceTime(500),
          distinctUntilChanged(),
          startWith(''),
          map(value => typeof value === 'string' ? value : (<any>value).name),
          map(value => {
            const filterValue = value.toLowerCase();
            this.dataSource.filter = filterValue;
            return this.optionsMarca.filter(option => option.name.toLowerCase().includes(filterValue));
          })
        );
      })
    this.unsubscribe.push(marcas);
  }

  displayFn(option): string | undefined {
    return option ? option.name : undefined;
  }

  confirmarEliminacion(id): void {
    console.log(id);
    const dialogRef = this.dialog.open(EliminaProductoComponent, {
      // width: '250px'
      data: {id: id},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.listarProductos();
    });
  }

  ngOnDestroy(){
    this.productosSuscritos.unsubscribe();
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }
}

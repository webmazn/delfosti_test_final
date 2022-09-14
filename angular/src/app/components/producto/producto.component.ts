import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input', {static: true}) input!: ElementRef;

  productos: any = [];
  productosSuscritos: Subscription = new Subscription;
  displayedColumns = ['index', 'name', 'category', 'brand', 'slug', 'createdAt', 'status', 'actions'];
  dataSource = new MatTableDataSource<Producto>([]);

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productosSuscritos = this.productosService.listar().subscribe(
      (res: Producto) => {
        console.log(res);
        this.productos = res;
        this.dataSource.data = this.productos
      },
      err => console.error(err)
    );
  }

  // buscarProductos(event: any) {
  //   let filterValue = event.target.value;
  //   filterValue = filterValue.trim().toLowerCase();
  //   this.dataSource.filter = filterValue;
  // }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sortingDataAccessor = (item, property) => {
    //   console.log(item, property);
    //   switch(property) {
    //     case 'category.name': return item;
    //     case 'brand.name': return item;
    //     default: return item[property];
    //   }
    // };
    this.dataSource.sort = this.sort;


    fromEvent(this.input.nativeElement,'keyup')
    .pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe((palabra: any) => {
        console.log(palabra);
        let filterValue = palabra.target.value;
        filterValue = filterValue.trim().toLowerCase();
        this.dataSource.filter = filterValue;
      });
  }

  ngOnDestroy(){
    this.productosSuscritos.unsubscribe();
  }

}

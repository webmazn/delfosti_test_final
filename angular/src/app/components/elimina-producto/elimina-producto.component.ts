import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, delay, finalize, of, Subscription, tap } from 'rxjs';

import { ProductosService } from '../../services/productos.service';

export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-elimina-producto',
  templateUrl: './elimina-producto.component.html',
  styleUrls: ['./elimina-producto.component.scss']
})

export class EliminaProductoComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<EliminaProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productoService: ProductosService
  ) {}

  ngOnInit(): void {
    // console.log('Llegó el id: ',this.data.id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  eliminarProducto(): void {
    const sb = this.productoService.eliminarProducto(this.data.id).pipe(
      tap(() => this.dialogRef.close()),
      catchError((errorMessage) => {
        console.log(errorMessage);
        return of(undefined);
      }),
      finalize(() => {
      })
    ).subscribe();
    this.unsubscribe.push(sb);
  }

  ngOnDestroy(){
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }
}

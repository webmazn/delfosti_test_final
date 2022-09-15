import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoProductoComponent } from './components/nuevo-producto/nuevo-producto.component';
import { ProductoComponent } from './components/producto/producto.component';

const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'productos', component: ProductoComponent },
  { path: 'nuevo-producto', component: NuevoProductoComponent },
  { path: 'listado-productos', component: ProductoComponent },
  { path: 'nuevo-producto/editar/:id', component: NuevoProductoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

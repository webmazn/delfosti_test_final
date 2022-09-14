import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    //if(arg == '' || arg.length < 3) return value;
    const  resultProductos = []
    for(const producto of value){
      if( producto.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          producto.category.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          producto.slug.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultProductos.push(producto);
      }
    }
    return resultProductos;
  }

}

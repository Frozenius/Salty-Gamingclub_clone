import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serverIcon',
})
export class ServerIconPipe implements PipeTransform {
  transform(port: number, ...args: unknown[]): string {
    if (port >= 27100 && port <= 27149) {
      return 'mdi mdi-downasaur';
    }

    if (port >= 27200 && port <= 27249) {
      return 'mdi mdi-minecraft';
    }

    return 'pi pi-server';
  }
}

/**
 * @author Jonas Junker
 * @create date 2022-08-12
 * @description This class is used to log messages to the console.
 */

import * as moment from 'moment';

export const Log = (mode: 'log' | 'debug' | 'info' | 'warn' = 'log') => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const colorTrace = (msg: any) => {
      console[mode]('%c' + [moment().format('HH:mm:ss'), ...msg].join(''), 'color: white; background:darkslateblue');
    };
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      colorTrace(['- Called method START: ', target.constructor.name, ' => ', propertyKey, '( ', JSON.stringify(args), ' )'].join(''));
      const result = original.apply(this, args);
      colorTrace([' - Called method END: ', target.constructor.name, ' => ', propertyKey, ' return: ', result == undefined ? '-NO RESULT-' : JSON.stringify(result)].join(''));
      return result;
    };
    return descriptor;
  };
};

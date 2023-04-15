import { lazy } from 'react';

/**
 * ! path => require the path of the file but which should be reltive to this file
 * ! namedExport => if you're doing named export then send the 'name' of the component
 * this function will return a lazy loaded component
 * */ 
export default function lazyLoad(path, namedExport) {
     return lazy(() => {
          const promise = import(path);
          if (namedExport) {
               return promise.then(module => ({ default: module[namedExport] }));
          } else {
               return promise;
          }
     })
}
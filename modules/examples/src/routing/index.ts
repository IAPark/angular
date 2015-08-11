import {InboxApp} from './inbox-app';
import {bind} from 'angular2/angular2';
import {bootstrap} from 'angular2/bootstrap';
import {routerInjectables, HashLocationStrategy, LocationStrategy} from 'angular2/router';
import {HTTP_BINDINGS} from 'http/http';

import {reflector} from 'angular2/src/reflection/reflection';
import {ReflectionCapabilities} from 'angular2/src/reflection/reflection_capabilities';

export function main() {
  reflector.reflectionCapabilities = new ReflectionCapabilities();
  bootstrap(
      InboxApp,
      [routerInjectables, HTTP_BINDINGS, bind(LocationStrategy).toClass(HashLocationStrategy)]);
}

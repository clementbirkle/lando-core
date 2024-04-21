'use strict';

// Modules
const _ = require('lodash');

// adds required methods to ensure the lando v3 debugger can be injected into v4 things
module.exports = services => _(services)
  .map((service, name) => _.merge({}, {
    name,
    api: require('./get-service-api-version')(service.api),
    builder: service.type.split(':')[0] ?? 'lando',
    config: _.omit(service, ['api', 'meUser', 'moreHttpPorts', 'primary', 'scanner', 'sport', 'type']),
    legacy: {
      meUser: service.meUser ?? 'www-data',
      moreHttpPorts: service.moreHttpPorts ?? [],
      sport: service.sport ?? '443',
    },
    primary: service.primary ?? false,
    router: service.type.split(':')[1],
    scanner: service.scanner ?? false,
    type: service.type,
  }))
  .value();

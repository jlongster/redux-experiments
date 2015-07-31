const Transit = require('transit-js');
const Immutable = require('immutable');

let data = Immutable.Map({});
data = data.set(Immutable.Map({ foo: 1 }), 6);
console.log(data.get(Immutable.Map({ foo: 1 })));

var reader = Transit.reader('json', {
  arrayBuilder: {
    init: function () { return Immutable.List.of().asMutable(); },
    add: function (ret, val) { return ret.push(val); },
    finalize: function (ret) { return ret.asImmutable(); },
    fromArray: function (arr) { return Immutable.List(arr); }
  },
  mapBuilder: {
    init: function () { return Immutable.Map().asMutable(); },
    add: function (ret, key, val) { return ret.set(key, val);  },
    finalize: function (ret) { return ret.asImmutable(); }
  },
  handlers: {
    set: function (arr) {
      return Immutable.Set(arr);
    },
    orderedMap: function (arr) {
      return Immutable.OrderedMap(arr);
    }
  }
});

var writer = Transit.writer("json-verbose", {
  handlers: Transit.map([
    Immutable.List, Transit.makeWriteHandler({
      tag: function () { return 'array'; },
      rep: function (v) { return v; },
      stringRep: function () { return null; }
    }),
    Immutable.Map, Transit.makeWriteHandler({
      tag: function () { return 'map'; },
      rep: function (v) { return v; },
      stringRep: function () { return null; }
    }),
    Immutable.Set, Transit.makeWriteHandler({
      tag: function () { return 'set'; },
      rep: function (v) { return v.toArray(); },
      stringRep: function () { return null; }
    }),
    Immutable.OrderedMap, Transit.makeWriteHandler({
      tag: function () { return 'orderedMap'; },
      rep: function (v) { return v.toArray().filter(function (x) { return x; }); },
      stringRep: function () { return null; }
    })
  ])
});

function toTransit(val) {
      return writer.write(val);
}

function fromTransit(ts) {
  return reader.read(ts);
}

const unpacked = fromTransit(toTransit(data));
console.log(unpacked.get(Immutable.Map({ foo: 1 })));

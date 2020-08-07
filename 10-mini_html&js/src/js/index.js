import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.promise';
import 'core-js/modules/web.timers';

const add = function add(a, b) {
  return a + b;
};

const pro = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Done!!!', add(1, 2));
    resolve();
  }, 1000);
});
console.log(pro);

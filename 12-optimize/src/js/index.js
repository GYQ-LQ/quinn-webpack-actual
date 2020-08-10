// 引入样式资源
import '../style/index.scss';
import print from './print';

print('Print');
console.log('Index');

function add(a, b) {
  return a + b;
}

// eslint-disable-next-line no-console
console.log(add(1, 2));

import { concatURLs, splitURL } from 'core/url';
import { StatusCodes } from 'core/status-codes';

console.log(StatusCodes.OK);
console.log(splitURL(concatURLs('foo', 'bar', 'bla')));

import slugify from 'slugify';
import { paginate, cursorPaginate } from './pagination';

function createUrl(name: string): string {
  const options = {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.()'"!:@/|\/]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: 'uk', // language code of the locale to use
    trim: true,
  };

  const slug = slugify(name, options);

  return slug;
}

export { createUrl, paginate, cursorPaginate };

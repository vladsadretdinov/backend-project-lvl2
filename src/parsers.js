import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const parsers = {
  yaml: safeLoad,
  json: JSON.parse,
  ini: parse,
};

export default (content, format) => {
  const parseFunc = parsers[format];
  return parseFunc(content);
};

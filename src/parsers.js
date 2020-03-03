import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const SUPPORTED_FORMATS_MAP = {
  yaml: safeLoad,
  json: JSON.parse,
  ini: parse,
};

export const getParserByFormat = (format) => SUPPORTED_FORMATS_MAP[format];

export default (content, format) => {
  const parseFunc = getParserByFormat(format);
  return parseFunc(content);
};

import { safeLoad as yamlParse } from 'js-yaml';
import { parse as iniParse } from 'ini';

const SUPPORTED_FORMATS_MAP = {
  yaml: yamlParse,
  json: JSON.parse,
  ini: iniParse,
};

export const getParserByFormat = (format) => SUPPORTED_FORMATS_MAP[format];

export default (content, format) => {
  const parser = getParserByFormat(format);
  return parser(content);
};

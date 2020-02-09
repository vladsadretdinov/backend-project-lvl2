import { safeLoad as yamlParse } from 'js-yaml';
import { parse as iniParse } from 'ini';
import { has as _has } from 'lodash';

const SUPPORTED_FORMATS = {
  yaml: yamlParse,
  json: JSON.parse,
  ini: iniParse,
};

export const isFormatSupported = (format) => _has(SUPPORTED_FORMATS, format);

export const getParserByFormat = (format) => SUPPORTED_FORMATS[format];

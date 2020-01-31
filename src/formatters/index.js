import { has as _has } from 'lodash';
import standard from './standard';
import plain from './plain';
import json from './json';

const SUPPORTED_OUTPUT_FORMATS = {
  true: standard,
  undefined: standard,
  json,
  plain,
};

export const isValidFormat = (format) => format !== 'true' && _has(SUPPORTED_OUTPUT_FORMATS, format);

export default (format) => SUPPORTED_OUTPUT_FORMATS[format];

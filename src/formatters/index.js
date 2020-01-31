import { has as _has } from 'lodash';
import standard from './standard';
import plain from './plain';

const SUPPORTED_OUTPUT_FORMATS = {
  plain,
  true: standard,
  undefined: standard,
};

export const isValidFormat = (format) => format !== 'true' && _has(SUPPORTED_OUTPUT_FORMATS, format);

export default (format) => SUPPORTED_OUTPUT_FORMATS[format];

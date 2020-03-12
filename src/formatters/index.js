import { has } from 'lodash';
import pretty from './pretty';
import plain from './plain';
import json from './json';

const SUPPORTED_OUTPUT_FORMATS_MAP = {
  true: pretty,
  undefined: pretty,
  pretty,
  json,
  plain,
};

export const isValidFormat = (format) => format !== 'true' && has(SUPPORTED_OUTPUT_FORMATS_MAP, format);

export default (format) => SUPPORTED_OUTPUT_FORMATS_MAP[format];

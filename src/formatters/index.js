import { has } from 'lodash';
import pretty from './pretty';
import plain from './plain';

const SUPPORTED_OUTPUT_FORMATS_MAP = {
  json: JSON.stringify,
  pretty,
  plain,
};

export const isValidFormat = (format) => has(SUPPORTED_OUTPUT_FORMATS_MAP, format)
  || format === undefined;

export default (format) => SUPPORTED_OUTPUT_FORMATS_MAP[format];

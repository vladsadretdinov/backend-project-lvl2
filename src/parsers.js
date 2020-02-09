import { getParserByFormat } from './supportedFileFormats';

const getContentAsJSON = (content, format) => {
  try {
    return {
      contentAsJSON: getParserByFormat(format)(content),
      contentAsJSONError: null,
    };
  } catch (error) {
    return {
      contentAsJSON: null,
      contentAsJSONError: error,
    };
  }
};

export default (fileContent, fileFormat) => {
  const {
    contentAsJSON: fileContentAsJSON,
    contentAsJSONError: fileContentJSONError,
  } = getContentAsJSON(fileContent, fileFormat);

  return {
    fileContentAsJSON,
    fileContentJSONError,
  };
};

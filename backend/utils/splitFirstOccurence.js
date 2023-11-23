function splitFirstOccurrence(str, separator) {
  const [first, ...rest] = str.split(separator);

  const remainder = rest.join('/');

  return {first, remainder};
}

export default splitFirstOccurrence;

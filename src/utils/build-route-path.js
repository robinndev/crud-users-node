export const buildRoutePath = (path) => {
  // Regex
  // - Começamos uma regex pela //, após ela colocamos a condição
  // Nesse caso estou falando "Um lugar que contenha dois pontos, letras de a até z, e que possua mais de uma vez, o G é pra falar que se tiver mais vezes esse padrão pode considerar"
  const regexRoutePath = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replaceAll(regexRoutePath, '(?<$1>[a-z0-9-_]+)');

  // Nesse caso, o chapeuzinho significa "tem que começar por"
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);
  return pathRegex;
};

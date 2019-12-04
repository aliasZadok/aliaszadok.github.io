class Player {
  constructor (name, color, id, active = false) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.active = active;
    this.tokens = this.createTokens(21);
  }

/**
 * Creates token objects for player
 * @param  {integer} num - Number of token objects to be created
 * @return {array} tokens - an array of new token objects
 */
  createTokens(num) {
    const tokens = [];
    for (var i = 0; i < num; i++) {
      tokens.push(new Token(i, this));
    }
    return tokens;
  }

/**
 * Gets an array of unused tokens
 * @return {Array} An array of tokens whose dropped value is false
 */
  get unusedTokens() {
    return this.tokens.filter(token => !token.dropped);
  }

/**
 * Gets first unused token object to be used as the next active token
 * @return {Object}
 */
  get activeToken() {
    return this.unusedTokens[0];
  }

/**
 * Check if a player has any undropped tokens left
 * @return {Boolean}
 */
  checkTokens() {
    return this.unusedTokens.length == 0 ? false : true;
  }

}

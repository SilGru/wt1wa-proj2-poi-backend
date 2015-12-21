module.exports = {
  validateString : function(string) {
    if (!string || 0 === string.trim().size) {
      return false;
    }
    return true;
  }
};

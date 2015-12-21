module.exports = {
  validateString : function(string) {
    if (!string || 0 === string.trim().size) {
      return false;
    }
    return true;
  },

  validateLon : function(lon) {
    if (typeof lon === "string") {
      lon = parseFloat(lon);
    }
    if ((lon < -180) || (lon > 180)) return false;
    return true;
  }
};

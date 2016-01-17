module.exports = {

  validateEmail: function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  validatePassword: function(password) {
    var length = password.trim().size;
    if (!password) {
      return false;
    }
    if (64 < length || 4 > length) {
      return false;
    }
    return true;
  },

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
  },

  validateLat : function(lat) {
    if (typeof lat === "string") {
      lat = parseFloat(lat);
    }
    if ((lat < -90) || (lat > 90)) return false;
    return true;
  },

  validatePoi: function(poi) {
    var name = poi.name;
    var description = poi.description;
    var lat = poi.lat;
    var lon = poi.lon;

    //check poi validity
    if (!this.validateString(name)) {
      return {
        "success": false,
        "error": "empty name"
      }
    }

    if (!this.validateString(description)) {
      return {
        "success": false,
        "error": "empty description"
      }
    }

    if (!this.validateLon(lon)) {
      return {
        "success": false,
        "error": "lon invalid"
      }
    }

    if (!this.validateLon(lat)) {
      return {
        "success": false,
        "error": "lat invalid"
      }
    }

    return { "success": true }
  }

};

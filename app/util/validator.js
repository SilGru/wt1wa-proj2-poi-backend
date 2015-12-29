module.exports = {

  validatePoi: function(poi) {
    var name = poi.name;
    var description = poi.description;
    var lat = poi.lat;
    var lon = poi.lon;

    //check poi validity
    if (!validateString(name)) {
      return {
        "success": false,
        "error": "empty name"
      }
    }

    if (!validateString(description)) {
      return {
        "success": false,
        "error": "empty description"
      }
    }

    if (!validateLon(lon)) {
      return {
        "success": false,
        "error": "lon invalid"
      }
    }

    if (!validateLon(lat)) {
      return {
        "success": false,
        "error": "lat invalid"
      }
    }

    return { "success": true }
  }

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
  }
};

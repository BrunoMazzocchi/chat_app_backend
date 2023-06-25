class Bands { 
    constructor() {
        this.bands = [];
    }
    /// Adds a new band received as parameter to the array of bands
    addBand(band = new Band()) {
        this.bands.push(band);
    }
    /// Returns the array of bands
    getBands() {
        return this.bands;
    }
    /// Deletes a band
    deleteBand(id = '') {
        this.bands = this.bands.filter(band => band.id !== id);
        return this.bands;
    }
    /// Increases the number of votes of a band
    voteBand(id = '') {
        this.bands = this.bands.map(band => {
            if (band.id === id) {
                band.votes++;
                return band;
            } else {
                return band;
            }
        });
    }

}

module.exports = Bands;
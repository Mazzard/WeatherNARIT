//==============================================================================
// The JulianDate class.
//==============================================================================
// Copyright (c) 2016 Frank Hellwig
//==============================================================================

'use strict';

class JulianDate {

    constructor(date) {
        if (typeof date === 'undefined') {
            this._value = JulianDate.now();
        } else {
            this._value = Number(date);
        }
    }

    valueOf() {
        return this._value;
    }

    toDate() {
        return new Date((this._value - 2440587.5) * 86400000)
    }

    toString() {
        return this.toDate().toISOString();
    }

    static now() {
        return JulianDate.fromTime(Date.now()).valueOf();
    }

    static fromTime(t) {
        return new JulianDate(Number((t / 86400000 + 2440587.5).toFixed(6)));
    }
}

module.exports = JulianDate;

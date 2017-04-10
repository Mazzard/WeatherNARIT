# JulianDate

## Installation

```bash
npm install --save juliandate
```

## Usage

```javascript

// Create a new JulianDate object set to the current time.
const jd = new JulianDate();

// The primitive value of the JulianDate object.
console.log(jd.valueOf());
// Output: 2457530.910761

// Convert it to an ISO string.
console.log(jd.toString());
// Output: 2016-05-22T09:51:29.750Z

// Convert it to a JavaScript Date object.
const date = jd.toDate();
console.log(date);
// Output: Sun May 22 2016 05:51:29 GMT-0400 (Eastern Daylight Time)

// Convert milliseconds to a JulianDate object.
console.log(JulianDate.fromTime(date.getTime()).toString());
// Output: 2016-05-22T09:51:29.750Z

// Get the current time as a numeric Julian date value.
console.log(JulianDate.now());
// Output: 2457530.910761
```

Note that the static `now()` method returns a number and not an object. This is for consistency with the `Date.now()` method.

## License

MIT

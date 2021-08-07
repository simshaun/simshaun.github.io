const DateTime = require('luxon').DateTime

module.exports = {
  htmlDateString: function (dateObj) {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc',
    }).toFormat('yyyy-LL-dd')
  },

  formatDate: function (date, format, locale) {
    locale = locale ? locale : 'en'
    return DateTime.fromJSDate(date).toFormat(format, { locale })
  },

  dateIso: function (date) {
    return DateTime.fromJSDate(date).toISO()
  },

  easyDate: function (date) {
    if (date instanceof Date) {
      return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL)
    }
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)
  },

  jsonify: function (text) {
    return JSON.stringify(text) // E.g. May 31, 2019
  },

  spaceless: function (text) {
    return text.replace(/\s+/g, ' ').replace(/>\s</g, '><')
  },
}

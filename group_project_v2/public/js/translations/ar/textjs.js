

(function(globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function(count) { return (count == 1) ? 0 : 1; };
  

  /* gettext library */

  django.catalog = django.catalog || {};
  
  var newcatalog = {
    " Technical details: 403 error.": "\u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0641\u0646\u064a\u0629: \u062e\u0637\u0623 403.", 
    " Technical details: CSRF verification failed.": "\u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0641\u0646\u064a\u0629: \u062a\u0639\u0630\u0631 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 CSRF.", 
    "An error occurred while uploading your file. Please refresh the page and try again. If it still does not upload, please contact your Course TA.": "\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062b\u0646\u0627\u0621 \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0644\u0641. \u064a\u0631\u062c\u0649 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0635\u0641\u062d\u0629 \u0648\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649. \u0625\u0630\u0627 \u0644\u0645 \u064a\u062a\u0645 \u0627\u0644\u062a\u062d\u0645\u064a\u0644 \u0628\u0639\u062f\u060c \u0641\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0628\u0645\u0633\u0627\u0639\u062f \u0645\u062f\u0651\u0631\u0633 \u0627\u0644\u062f\u0648\u0631\u0629 \u0627\u0644\u062a\u062f\u0631\u064a\u0628\u064a\u0629.", 
    "Error": "\u062e\u0637\u0623", 
    "Error refreshing statuses": "\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062b\u0646\u0627\u0621 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u062d\u0627\u0644\u0627\u062a", 
    "Please select Group to review": "\u064a\u0631\u062c\u0649 \u062a\u062d\u062f\u064a\u062f \u0645\u062c\u0645\u0648\u0639\u0629 \u0644\u0644\u0645\u0631\u0627\u062c\u0639\u0629", 
    "Please select Teammate to review": "\u064a\u0631\u062c\u0649 \u062a\u062d\u062f\u064a\u062f \u0632\u0645\u064a\u0644 \u0641\u064a \u0627\u0644\u0641\u0631\u064a\u0642 \u0644\u0644\u0645\u0631\u0627\u062c\u0639\u0629", 
    "Resubmit": "\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0625\u0631\u0633\u0627\u0644", 
    "Submit": "\u0625\u0631\u0633\u0627\u0644", 
    "Thanks for your feedback!": "\u0634\u0643\u0631\u064b\u0627 \u0639\u0644\u0649 \u0645\u0644\u0627\u062d\u0638\u0627\u062a\u0643!", 
    "This task has been marked as complete.": "\u062a\u0645 \u0648\u0636\u0639 \u0639\u0644\u0627\u0645\u0629 \u0627\u0643\u062a\u0645\u0627\u0644 \u0639\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0645\u0647\u0645\u0629.", 
    "Upload cancelled by user.": "\u062a\u0645 \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062a\u062d\u0645\u064a\u0644 \u0645\u0646 \u0642\u0628\u0644 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645.", 
    "Upload cancelled.": "\u062a\u0645 \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062a\u062d\u0645\u064a\u0644.", 
    "We encountered an error loading your feedback.": "\u0644\u0642\u062f \u0635\u0627\u062f\u0641\u0646\u0627 \u062e\u0637\u0623 \u0641\u064a \u062a\u062d\u0645\u064a\u0644 \u0645\u0644\u0627\u062d\u0638\u0627\u062a\u0643.", 
    "We encountered an error saving your feedback.": "\u0644\u0642\u062f \u0635\u0627\u062f\u0641\u0646\u0627 \u062e\u0637\u0623 \u0641\u064a \u062d\u0641\u0638 \u0645\u0644\u0627\u062d\u0638\u0627\u062a\u0643.", 
    "We encountered an error saving your progress.": "\u0644\u0642\u062f \u0635\u0627\u062f\u0641\u0646\u0627 \u062e\u0637\u0623 \u0641\u064a \u062d\u0641\u0638 \u0627\u0644\u062a\u0642\u062f\u0645 \u0627\u0644\u0645\u062d\u0631\u0632.", 
    "We encountered an error.": "\u0644\u0642\u062f \u0635\u0627\u062f\u0641\u0646\u0627 \u062e\u0637\u0623 \u0641\u064a \u062d\u0641\u0638 \u0645\u0644\u0627\u062d\u0638\u0627\u062a\u0643."
  };
  for (var key in newcatalog) {
    django.catalog[key] = newcatalog[key];
  }
  

  if (!django.jsi18n_initialized) {
    django.gettext = function(msgid) {
      var value = django.catalog[msgid];
      if (typeof(value) == 'undefined') {
        return msgid;
      } else {
        return (typeof(value) == 'string') ? value : value[0];
      }
    };

    django.ngettext = function(singular, plural, count) {
      var value = django.catalog[singular];
      if (typeof(value) == 'undefined') {
        return (count == 1) ? singular : plural;
      } else {
        return value[django.pluralidx(count)];
      }
    };

    django.gettext_noop = function(msgid) { return msgid; };

    django.pgettext = function(context, msgid) {
      var value = django.gettext(context + '\x04' + msgid);
      if (value.indexOf('\x04') != -1) {
        value = msgid;
      }
      return value;
    };

    django.npgettext = function(context, singular, plural, count) {
      var value = django.ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
      if (value.indexOf('\x04') != -1) {
        value = django.ngettext(singular, plural, count);
      }
      return value;
    };

    django.interpolate = function(fmt, obj, named) {
      if (named) {
        return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
      } else {
        return fmt.replace(/%s/g, function(match){return String(obj.shift())});
      }
    };


    /* formatting library */

    django.formats = {
    "DATETIME_FORMAT": "N j, Y, P", 
    "DATETIME_INPUT_FORMATS": [
      "%Y-%m-%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M", 
      "%Y-%m-%d", 
      "%m/%d/%Y %H:%M:%S", 
      "%m/%d/%Y %H:%M:%S.%f", 
      "%m/%d/%Y %H:%M", 
      "%m/%d/%Y", 
      "%m/%d/%y %H:%M:%S", 
      "%m/%d/%y %H:%M:%S.%f", 
      "%m/%d/%y %H:%M", 
      "%m/%d/%y"
    ], 
    "DATE_FORMAT": "j F\u060c Y", 
    "DATE_INPUT_FORMATS": [
      "%Y-%m-%d", 
      "%m/%d/%Y", 
      "%m/%d/%y", 
      "%b %d %Y", 
      "%b %d, %Y", 
      "%d %b %Y", 
      "%d %b, %Y", 
      "%B %d %Y", 
      "%B %d, %Y", 
      "%d %B %Y", 
      "%d %B, %Y"
    ], 
    "DECIMAL_SEPARATOR": ",", 
    "FIRST_DAY_OF_WEEK": "0", 
    "MONTH_DAY_FORMAT": "j F", 
    "NUMBER_GROUPING": "0", 
    "SHORT_DATETIME_FORMAT": "m/d/Y P", 
    "SHORT_DATE_FORMAT": "d\u200f/m\u200f/Y", 
    "THOUSAND_SEPARATOR": ".", 
    "TIME_FORMAT": "g:i A", 
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S", 
      "%H:%M:%S.%f", 
      "%H:%M"
    ], 
    "YEAR_MONTH_FORMAT": "F Y"
  };

    django.get_format = function(format_type) {
      var value = django.formats[format_type];
      if (typeof(value) == 'undefined') {
        return format_type;
      } else {
        return value;
      }
    };

    /* add to global namespace */
    globals.pluralidx = django.pluralidx;
    globals.gettext = django.gettext;
    globals.ngettext = django.ngettext;
    globals.gettext_noop = django.gettext_noop;
    globals.pgettext = django.pgettext;
    globals.npgettext = django.npgettext;
    globals.interpolate = django.interpolate;
    globals.get_format = django.get_format;

    django.jsi18n_initialized = true;
  }

}(this));


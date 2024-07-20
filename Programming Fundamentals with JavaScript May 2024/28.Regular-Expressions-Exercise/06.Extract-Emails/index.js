function extractEmails(str) {
    const regex = /[` `]\b([a-z]+[._-]?\w*)@\b([a-z-?\.+[a-z]+\.?\b[a-z]+\.?[a-z]+)/g;

    console.log(str.match(regex).join('\n'));
}

extractEmails("Just send email to s.miller@mit.edu and j.hopking@york.ac.uk for more information.");
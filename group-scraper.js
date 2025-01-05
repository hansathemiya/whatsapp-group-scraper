var phoneNumbers = new Set();
var groupMembers = document.querySelectorAll('.copyable-text');

var phonePattern = /\+\d{1,3}[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}/g;

groupMembers.forEach(function(member) {
    var text = member.innerText.trim();
    var matches = text.match(phonePattern);
    if (matches) {
        matches.forEach(function(phoneNumber) {
            phoneNumbers.add(phoneNumber);
        });
    }
});

var filteredPhoneNumbers = Array.from(phoneNumbers);

if (window.phoneNumbersBlob) {
    URL.revokeObjectURL(window.phoneNumbersUrl);
    window.phoneNumbersBlob = null;
    window.phoneNumbersUrl = null;
}

window.phoneNumbersBlob = new Blob([filteredPhoneNumbers.join('\n')], { type: 'text/plain' });
window.phoneNumbersUrl = URL.createObjectURL(window.phoneNumbersBlob);

var a = document.createElement('a');
a.href = window.phoneNumbersUrl;
a.download = 'phone_numbers.txt';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);

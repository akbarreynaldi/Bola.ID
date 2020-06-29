let webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BIEyUCQUQ3EvtpEGzZ6_3arVALn-jVAxL9O3niSTI2oEwWPiZCkfBu3N2Qvmi9OPZWBdit_xtMikEAuv3qD-98I",
    "privateKey": "bf6qpDApcz5YGaAnpaiZFHQY8eY8glYobeZUZlyAVbc"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/c-XXdgE7bq8:APA91bFkIqhp7rOMTr8dQRO-W4jccNu4am6bB6zbuj_z3q9OMjJhSRdBD5atp6Hm6wMZFEYefDb-Akk6hSxVRgWPmauK0V7yUBVDx11XFszwfNKbp9n6KlCHHHF9QAcmXkt8tMkaDmTH",
    "keys": {
        "p256dh": "BMyQy6JswC3b1jgG6m6tx9/m3Q7HhhRCO6JQ0oK6KW4gDq6/ZgagYbBKADlyPKsgZA0gYHkcf3MfJsDKtia10uk=",
        "auth": "OsMa4Q1GrBtFvUlK5pJ4dg=="
    }
};
let payload = 'Hallo! Aplikasi Real Madrid telah mendapatkan update terbaru!';

let options = {
    gcmAPIKey: '610371441073',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
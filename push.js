var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BIEyUCQUQ3EvtpEGzZ6_3arVALn-jVAxL9O3niSTI2oEwWPiZCkfBu3N2Qvmi9OPZWBdit_xtMikEAuv3qD-98I",
    "privateKey": "bf6qpDApcz5YGaAnpaiZFHQY8eY8glYobeZUZlyAVbc"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cl5NgAKUYLM:APA91bFlOr52KaLLateCqd0V-o-JP3Pnetnjfn2Kc4edhtslY57UFb27RH-hDfSv6NJ-l0kQeGHIC681Bo97xzdzUa8k35ZlUuvzgJA_qLv-ufcSzR-6dm1CFMNoGSt6Fowk0RGKaAna",
    "keys": {
        "p256dh": "BEb15Rjlu1v0qIsAH2+AsvSYCnmSHsuiACBHZtfs0L82J4VRGeIDVV08u2cRXHRxq/Yv3n3s9jdbqhLUDZSLGLM=",
        "auth": "WNIfg6yVErPGt2EXZ+PeVQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '610371441073',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
# easywebhook
This makes using webhooks for Discord alot Easier!

## Usage

**create()**  
```js
const EasyWebhook = require('easywebhook'); // Require the Package from NPM
const webhook = new EasyWebhook('Your new Webhook Name', 'Your new Webhook Avatar');

webhook.create('Discord Bot Token', 'Channel ID').then(r => {
  console.log(r)
});

/*Returns
{
    "name": "test webhook",
    "channel_id": "199737254929760256",
    "token": "3d89bb7572e0fb30d8128367b3b1b44fecd1726de135cbe28a41f8b2f777c372ba2939e72279b94526ff5d1bd4358d65cf11",
    "avatar": null,
    "guild_id": "199737254929760256",
    "id": "223704706495545344",
    "user": {
        "username": "test",
        "discriminator": "7479",
        "id": "190320984123768832",
        "avatar": "b004ec1740a63ca06ae2e14c5cee11f3"
    }
}
*/
```

**send()**
```js
const EasyWebhook = require('easywebhook'); // Require the Package from NPM
const webhook = new EasyWebhook('Your new Webhook Name', 'Your new Webhook Avatar');

webhook.send(webhook_id, webhook_token, content).then(r => {
  console.log(r)
});

/*
webhook_id = webhook id
webhook_token = webhook token
content = embed or a message
*/
```

**modify()**
```js
const EasyWebhook = require('easywebhook'); // Require the Package from NPM
const webhook = new EasyWebhook('Your new Webhook Name', 'Your new Webhook Avatar');

webhook.modify(webhook_id, webhook_token, name, avatar).then(r => {
  console.log(r)
});

/*
webhook_id = webhook id
name = new name
avatar = new avatar
*/
```

**modifyWithToken()**
```js
const EasyWebhook = require('easywebhook'); // Require the Package from NPM
const webhook = new EasyWebhook('Your new Webhook Name', 'Your new Webhook Avatar');

webhook.modify(webhook_id, webhook_token, name, avatar).then(r => {
  console.log(r)
});

/*
webhook_id = webhook id
webhook_token = webhook token
name = new name
avatar = new avatar
*/
```

**delete()**
```js
const EasyWebhook = require('easywebhook'); // Require the Package from NPM
const webhook = new EasyWebhook('Your new Webhook Name', 'Your new Webhook Avatar');

webhook.delete(webhook_id).then(r => {
  console.log(r)
});

/*
webhook_id = webhook id
*/
```

**deleteWithToken()**
```js
const EasyWebhook = require('easywebhook'); // Require the Package from NPM
const webhook = new EasyWebhook('Your new Webhook Name', 'Your new Webhook Avatar');

webhook.deleteWithToken(webhook_id, webhook_token).then(r => {
  console.log(r)
});

/*
webhook_id = webhook id
webhook_token = webhook token
*/
```

## Credits
**Zelak#6169** - Helped me on Ratelimits  
**ExtasyMonst4#0001** - Helped me too on Ratelimits

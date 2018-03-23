const snek = require('snekfetch');

process.on('unhandledRejection', error => {
  console.log(error.stack)
});

class EasyWebhook {
	constructor(name, avatar) {
		this.name = name;
		this.avatar = avatar;
		
		if (!this.name) throw Error('Please supply a Webhook Name!');
	}
	
	/**
	 * Creates a Webhook
	 * @param {string} bot_token
	 * @param {string} channelID
	 * @returns {Promise<Object>}
	 */
	 
	create(bot_token, channel) {
		if (typeof channel !== 'string') throw Error('Channel must be an ID!');
		if (typeof bot_token !== 'string') throw Error('You must supply a Bot Token!');
		return new Promise((resolve, error) => {
		
			snek.post(`https://discordapp.com/api/channels/${channel}/webhooks`)
				.set('Authorization', `Bot ${bot_token}`)
				.send({ name: this.name, avatar: this.avatar })
			.then(response => resolve(response.text));
		});
	}
	
	/**
	 * Send messages using a Webhook
	 * @param {string} webhook_id
	 * @param {string} webhook_token
	 * @param {string|array} content
	 * @returns {Promise<Message>}
	 */
	 
    send(webhook_id, webhook_token, content) {
		if (typeof webhook_id !== 'string' || typeof webhook_token !== 'string') throw Error('Both Parameters (webhook_id webhook_token) must be a String!');
        return new Promise((resolve, error) => {
            if (typeof content !== 'object' || !Array.isArray(content)) { 
                snek.post(`https://discordapp.com/api/webhooks/${webhook_id}/${webhook_token}`)
                    .send({ content: content })
                    .then(response => {
						if (response.headers['x-ratelimit-remaining'] === '0') {
							return console.log('You are being ratelimited!');
						} else {
							resolve(response);
						}
					})
            } else {
                snek.post(`https://discordapp.com/api/webhooks/${webhook_id}/${webhook_token}`)
                .send({ embeds: content })
                .then(response => resolve(response))
            }
        });
    }
	
	/**
	 * Modifies a Webhook
	 * @param {string} webhook_id
	 * @param {string} webhook_token
	 * @param {string} name
	 * @param {string} avatar
	 * @returns {Promise<Object>}
	 */
	
	modify(webhook_id, webhook_token, name, avatar) {
		if (typeof webhook_id !== 'string' || typeof webhook_token !== 'string' || typeof name !== 'string' || typeof avatar !== 'string') throw Error('All Parameters must be a String!');
		return new Promise((resolve, error) => {
			snek.patch(`https://discordapp.com/api/webhooks/${webhook_id}/${webhook_token}`)
				.send({ name: name, avatar: avatar })
				.then(response => resolve(response))
		})
	}
	
	/**
	 * Deletes a Webhook by id
	 * @param {string} webhook_id
	 * @returns {Promise<Object>}
	 */
	
	delete(webhook_id) {
		if (typeof webhook_id !== 'string') throw Error('Parameter must be a String!');
		return new Promise((resolve, error) => {
			snek.delete(`https://discordapp.com/api/webhooks/${webhook_id}`)
				.set('Authorization', `Bot ${this.token}`)
				.then(response => resolve(response));
		})
	}
	
	/**
	 * Deletes a Webhook by id and token
	 * @param {string} webhook_id
	 * @param {string} webhook_token
	 * @returns {Promise<Object>}
	 */
	
	deleteWithToken(webhook_id, webhook_token) {
		if (typeof webhook_id !== 'string' || typeof webhook_token !== 'string') throw Error('Both Parameters must be a String!');
		return new Promise((resolve, error) => {
			snek.delete(`https://discordapp.com/api/webhooks/${webhook_id}/${webhook_token}`)
				.then(response => resolve(response));
		})
	}
};

module.exports = EasyWebhook;

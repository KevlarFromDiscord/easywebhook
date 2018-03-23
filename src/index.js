const snek = require('snekfetch');

class EasyWebhook {
	constructor(token, name, avatar) {
		this.token = token;
		this.name = name;
		this.avatar = avatar;
		
		if (!this.name) throw Error('Please supply a Webhook Name!');
		if (!this.token) throw Error('You need a Bot Token to use this!');
	}
	
	/**
	 * Creates a Webhook
	 * @param {string} channeID
	 * @returns {Promise<Object>}
	 */
	 
	create(channel) {
		if (typeof channel !== 'string') throw Error('Channel must be an ID!');
		return new Promise((resolve, error) => {
		
			snek.post(`https://discordapp.com/api/channels/${channel}/webhooks`)
				.set('Authorization', `Bot ${this.token}`)
				.send({ name: this.name, avatar: this.avatar })
				.then(response => resolve(JSON.parse(response.text)))
		});
	}
	
	/**
	 * Send messages using a Webhook
	 * @param {string} webhook_id
	 * @param {string} webhook_token
	 * @param {string|array} content
	 * @returns {Promise<Message>}
	 */
	 
    send(message, webhook_id, webhook_token, content) {
		if (typeof webhook_id !== 'string' && typeof webhook_token !== 'string') throw Error('Both Parameters (webhook_id webhook_token) must be a String!');
        return new Promise((resolve, error) => {
            if (message.webhookID) return;
            if (typeof content !== 'object' || !Array.isArray(content)) { 
                snek.post(`https://discordapp.com/api/webhooks/${webhook_id}/${webhook_token}`)
                    .send({ content: content })
                    .then(response => resolve(response))
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
		if (typeof webhook_id !== 'string' && typeof webhook_token !== 'string' && typeof name !== 'string' && typeof avatar !== 'string') throw Error('All Parameters must be a String!');
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
		if (typeof webhook_id !== 'string' && typeof webhook_token !== 'string') throw Error('Both Parameters must be a String!');
		return new Promise((resolve, error) => {
			snek.delete(`https://discordapp.com/api/webhooks/${webhook_id}/${webhook_token}`)
				.then(response => resolve(response));
		})
	}
};

module.exports = EasyWebhook;
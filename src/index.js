const snek = require('snekfetch');


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
		return new Promise((resolve, reject) => {
		
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
        if (!content) throw Error('Cannot send an Empty Message!');	
		return new Promise((resolve, reject) => {
            if (typeof content !== 'object' || !Array.isArray(content)) { 
                snek.post(`https://discordapp.com/api/webhooks/${webhook_id}/${webhook_token}`)
                    .send({ content: content })
                    .then(response => {
						if (response.headers['x-ratelimit-remaining'] !== '0') {
							resolve(response);
						} else {
							return reject(Error('You are being rate limited!'));
						}
					}).catch(e => console.log(e.body.message))
            } else {
                snek.post(`https://discordapp.com/api/webhooks/${webhook_id}/${webhook_token}`)
                .send({ embeds: content })
                .then(response => {
					if (response.headers['x-ratelimit-remaining'] !== '0') {
						resolve(response);
					} else {
						return reject(Error('You are being rate limited!'));
					}
				}).catch(e => console.log(e.body.message))
            }
        });
    }
	
	/**
	 * Modifies a Webhook
	 * @param {string} webhook_id
	 * @param {string} name
	 * @param {string} avatar
	 * @returns {Promise<Object>}
	 */
	
	modify(webhook_id, name, avatar) {
		if (typeof webhook_id !== 'string' || typeof name !== 'string' || typeof avatar !== 'string') throw Error('All Parameters must be a String!');
		return new Promise((resolve, reject) => {
			snek.patch(`https://discordapp.com/api/webhooks/${webhook_id}`)
				.send({ name: name, avatar: avatar })
				.then(response => resolve(response))
		})
	}
	
	/**
	 * Modifies a Webhook with it's token
	 * @param {string} webhook_id
	 * @param {string} webhook_token
	 * @param {string} name
	 * @param {string} avatar
	 * @returns {Promise<Object>}
	 */
	 
	modifyWithToken(webhook_id, webhook_token, name, avatar) {
		if (typeof webhook_id !== 'string' || typeof webhook_token !== 'string' || typeof name !== 'string' || typeof avatar !== 'string') throw Error('All Parameters must be a String!');
		return new Promise((resolve, reject) => {
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
		return new Promise((resolve, reject) => {
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
		return new Promise((resolve, reject) => {
			snek.delete(`https://discordapp.com/api/webhooks/${webhook_id}/${webhook_token}`)
				.then(response => resolve(response));
		})
	}
	
	/**
	 * Gets a User or Bot through their id
	 * @param {string} bot_token
	 * @param {string} user_id
	 * @returns {Promise<Object|User>}
	 */
	
	getUser(bot_token, user_id) {
		return new Promise((resolve, reject) => {
			if (user_id === '1') {
				var user_obj = {
					username: 'Clyde',
					id: '1',
					discriminator: '0000',
					avatar: 'f78426a064bc9dd24847519259bc42af',
					tag: 'Clyde#0000'
				};
				resolve(user_obj);
			}
			snek.get(`https://discordapp.com/api/users/${user_id}`)
				.set('Authorization', `Bot ${bot_token}`)
			.then(response => {
				if (response.headers['x-ratelimit-remaining'] !== '0') {
					var user_obj = JSON.parse(response.text);
					user_obj['tag'] = `${user_obj.username}#${user_obj.discriminator}`
				
					resolve(user_obj);
				} else {
					return reject(Error('You are being rate limited!'));
				}
			}).catch(e => console.log(e.message));
		});
	}
};

module.exports = EasyWebhook;

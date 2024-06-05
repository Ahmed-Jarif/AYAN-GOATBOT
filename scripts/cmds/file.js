const fs = require('fs');

module.exports = {
	config: {
		name: "file",
		aliases: ["files", "sendfile"],
		version: "1.0",
		author: "MR.AYAN", //** original author fb I'd : https://m.me/NOOBS.DEVELOPER.AYAN **//
		countDown: 5,
		role: 0,
		shortDescription: "Send bot script",
		longDescription: "Send bot specified file ",
		category: "𝗢𝗪𝗡𝗘𝗥",
		guide: "{pn} file name. Ex: .{pn} filename"
	},

	onStart: async function ({ message, args, api, event }) {
		const permission = ["100004085390255""61553151694837""100081020948690",];
		if (!permission.includes(event.senderID)) {
			return api.sendMessage("You have no permission this cmd only my admin used this command..", event.threadID, event.messageID);
		}

		const fileName = args[0];
		if (!fileName) {
			return api.sendMessage("Please provide a file name.", event.threadID, event.messageID);
		}

		const filePath = __dirname + `/${fileName}.js`;
		if (!fs.existsSync(filePath)) {
			return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
		}

		const fileContent = fs.readFileSync(filePath, 'utf8');
		api.sendMessage({ body: fileContent }, event.threadID);
	}
}; 

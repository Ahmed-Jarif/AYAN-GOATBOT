const fs = require("fs-extra");

module.exports = {
	config: {
		name: "restart",
		version: "1.1",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "Khởi động lại bot",
			en: "Restart bot"
		},
		category: "Owner",
		guide: {
			vi: "   {pn}: Khởi động lại bot",
			en: "   {pn}: Restart bot"
		}
	},

	langs: {
		vi: {
			restartting: "🔄 | Đang khởi động lại bot..."
		},
		en: {
			restartting: "𝗦𝗶𝗿 𝗣𝗹𝗲𝗮𝘀𝗲 𝗪8 𝗔 𝗠𝗶𝗻𝘂𝘁𝗲 𝗦𝘆𝘀𝘁𝗲𝗺 𝗪𝗶𝗹𝗹 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴..."
		}
	},

	onLoad: function ({ api }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		if (fs.existsSync(pathFile)) {
			const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
			api.sendMessage('𝗦𝗶𝗿 𝗕𝗼𝘁 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗲𝗱 𝗗𝗼𝗻𝗲 💟\n⏰ | 𝗧𝗶𝗺𝗲: ${(Date.now() - time) / 1000}s`, tid);
			fs.unlinkSync(pathFile);
		}
	},

	onStart: async function ({ message, event, getLang }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);
		await message.reply(getLang("restartting"));
		process.exit(2);
	}
};

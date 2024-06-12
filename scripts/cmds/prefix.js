const fs = require("fs-extra");

module.exports = {
  config: {
    name: "prefix",
    version: "1.0",
    author: "NTKhang | ArYAN",
    countDown: 5,
    role: 0,
    longDescription: {
      en: "Check Goat bot system prefix you can use for commands"
    },
    category: "box chat",
    guide: {
      en: "   {pn} <new prefix>: change the prefix in your box chat"
        + "\n   Example:"
        + "\n    {pn} #"
        + "\n\n   {pn} <new prefix> -g: change the prefix in the system bot (only admin bot)"
        + "\n   Example:"
        + "\n    {pn} # -g"
        + "\n\n   {pn} reset: reset the prefix in your box chat to default"
    }
  },

  langs: {
    en: {
      reset: "Your prefix has been reset to default: %1",
      onlyAdmin: "Only admin can change the prefix of the system bot",
      confirmGlobal: "Please react to this message to confirm changing the prefix of the system bot",
      confirmThisThread: "Please react to this message to confirm changing the prefix in your box chat",
      successGlobal: "Changed the prefix of the system bot to: %1",
      successThisThread: "Changed the prefix in your box chat to: %1",
      myPrefix: "🤖 𝗚𝗼𝗮𝘁𝗕𝗼𝘁 𝘃2\n━━━━━━━━━━━━\n\✨𝗛𝗶 𝗙𝗿𝗶𝗲𝗻𝗱!✨\n\✨𝗧𝗵𝗶𝘀 𝗶𝘀 𝗺𝘆 𝗣𝗿𝗲𝗳𝗶𝘅[ %2 ]\n𝗧𝗢 𝗩𝗜𝗘𝗪 𝗔𝗟𝗟 𝗢𝗙 𝗧𝗛𝗘\n𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘  𝗖𝗢𝗠𝗠𝗔𝗡𝗗, 𝗧𝗬𝗣𝗘 [-𝗛𝗘𝗟𝗣]\n\n👑 𝗗𝗲𝘃: 𝗔𝗵𝗺𝗲𝗱 𝗦𝗼𝗷𝗶𝗯 💟"
    }
  },

  onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
    if (!args[0])
      return message.SyntaxError();

    if (args[0] === 'reset') {
      await threadsData.set(event.threadID, null, "data.prefix");
      return message.reply(getLang("reset", global.GoatBot.config.prefix));
    }

    const newPrefix = args[0];
    const formSet = {
      commandName,
      author: event.senderID,
      newPrefix
    };

    if (args[1] === "-g") {
      if (role < 2)
        return message.reply(getLang("onlyAdmin"));
      else
        formSet.setGlobal = true;
    } else {
      formSet.setGlobal = false;
    }

    return message.reply(args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisThread"), (err, info) => {
      formSet.messageID = info.messageID;
      global.GoatBot.onReaction.set(info.messageID, formSet);
    });
  },

  onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
    const { author, newPrefix, setGlobal } = Reaction;
    if (event.userID !== author)
      return;
    if (setGlobal) {
      global.GoatBot.config.prefix = newPrefix;
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      return message.reply(getLang("successGlobal", newPrefix));
    }
    else {
      await threadsData.set(event.threadID, newPrefix, "data.prefix");
      return message.reply(getLang("successThisThread", newPrefix));
    }
  },

  onChat: async function ({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "prefix") {
      return () => {
        return message.reply(getLang("myPrefix", global.GoatBot.config.prefix, utils.getPrefix(event.threadID)));
      };
    }
  }
};

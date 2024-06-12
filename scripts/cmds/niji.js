const axios = require("axios");

module.exports = {
  config: {
    name: "niji",
    version: "3.8",
    author: "ArYAN",
    countDown: 10,
    category: "media",
    longDescription: {
      en: 'Generate Images using NIJI API',
    },
    guide: {
      en: '${p}niji [ prompt ]'
    }
  },
  onStart: async function ({ message, api, args, event }) {
    const text = args.join(' ');
    if (!text) {
      return message.reply("⛔|𝗜𝗻𝘃𝗮𝗹𝗶𝗱 \n━━━━━━━━━━━━\n\n➤ Please provide a prompt with model");
    }
    
    const baseURL = `https://itsaryan.onrender.com/api/niji?prompt=${text}`;
 
   message.reply("Generating your image, please wait a few moments.", async (err, info) => {
      
   const startTime = new Date().getTime(); // Define startTime
    

    api.setMessageReaction("⏳", event.messageID, () => {}, true);
   
    const endTime = new Date().getTime(); // Move endTime inside the asynchronous block
      const timeTaken = (endTime - startTime) / 1000; 
      
    message.reply({ 
        body: `🖼️ [ 𝗡𝗜𝗝𝗜 ]\n\nHere is your generated image\nTime taken: ${timeTaken} seconds`,
        attachment: await global.utils.getStreamFromURL(baseURL)
      });

      let ui = info.messageID;
      message.unsend(ui);
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    });
  }
};

const imageHash = require('image-hash');
const fetch = require('node-fetch');

class DiscordEmojiUtils {
    constructor() {
        this.emojis = [];
    }

    addEmoji(emoji) {
        this.emojis.push(emoji);
    }

    removeDuplicateEmojis() {
        const uniqueEmojis = [];
        const emojiMap = new Map();

        for (const emoji of this.emojis) {
            const emojiKey = `${emoji.id}-${emoji.name}`;
            if (!emojiMap.has(emojiKey)) {
                emojiMap.set(emojiKey, true);
                uniqueEmojis.push(emoji);
            }
        }

        this.emojis = uniqueEmojis;
    }

    async computeImageHash(imageUrl) {
        const response = await fetch(imageUrl);
        const imageData = await response.buffer();
        const hash = await imageHash.hash(imageData);
        return hash;
    }

    async removeDuplicateEmojisByImageHash() {
        const uniqueEmojis = [];
        const emojiMap = new Map();

        for (const emoji of this.emojis) {
            const imageHash = await this.computeImageHash(emoji.imageUrl);
            if (!emojiMap.has(imageHash)) {
                emojiMap.set(imageHash, true);
                uniqueEmojis.push(emoji);
            }
        }

        this.emojis = uniqueEmojis;
    }

    getEmojis() {
        return this.emojis;
    }

    async downloadEmojis(destinationFolder) {
        const downloads = [];

        for (const emoji of this.emojis) {
            const response = await fetch(emoji.imageUrl);
            const emojiData = await response.buffer();
            const filePath = `${destinationFolder}/${emoji.name}.png`;
            downloads.push({ emojiName: emoji.name, filePath });
            await fs.promises.writeFile(filePath, emojiData);
        }

        return downloads;
    }

    async uploadEmojis(client, guildId, emojiDownloads) {
        const guild = client.guilds.cache.get(guildId);

        if (!guild) {
            throw new Error(`Guild with ID ${guildId} not found.`);
        }

        const uploadedEmojis = [];

        for (const download of emojiDownloads) {
            const emojiName = download.emojiName;
            const filePath = download.filePath;
            const emojiData = await fs.promises.readFile(filePath);

            const emoji = await guild.emojis.create(emojiData, emojiName);
            uploadedEmojis.push(emoji);
        }

        return uploadedEmojis;
    }
}

module.exports = DiscordEmojiUtils;

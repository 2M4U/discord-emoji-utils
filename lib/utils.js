const sharp = require('sharp');
const axios = require('axios');

class EmojiUtils {
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
      const { id, name } = emoji;
      const emojiKey = `${id}:${name}`;

      if (!emojiMap.has(emojiKey)) {
        emojiMap.set(emojiKey, emoji);
        uniqueEmojis.push(emoji);
      }
    }

    this.emojis = uniqueEmojis;
  }

  async removeDuplicateEmojisByImageHash() {
    const uniqueEmojis = [];
    const imageHashes = new Set();

    for (const emoji of this.emojis) {
      const { imageUrl } = emoji;
      const imageHash = await this.computeImageHash(imageUrl);

      if (!imageHashes.has(imageHash)) {
        imageHashes.add(imageHash);
        uniqueEmojis.push(emoji);
      }
    }

    this.emojis = uniqueEmojis;
  }

  async computeImageHash(imageUrl) {
    const imageBuffer = await this.downloadImage(imageUrl);
    const imageMetadata = await sharp(imageBuffer).metadata();
    const { width, height } = imageMetadata;

    const resizedImageBuffer = await sharp(imageBuffer)
      .resize(width * 0.1, height * 0.1)
      .grayscale()
      .raw()
      .toBuffer();

    const imageHash = resizedImageBuffer.reduce((hash, pixel) => hash + pixel, 0);

    return imageHash.toString();
  }

  async downloadImage(imageUrl) {
    try {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      return response.data;
    } catch (error) {
      console.error(`Failed to download image from ${imageUrl}: ${error.message}`);
      throw error;
    }
  }

  getEmojis() {
    return this.emojis;
  }
}

module.exports = EmojiUtils;

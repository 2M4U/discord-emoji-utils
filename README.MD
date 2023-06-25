# Discord Emoji Utils

Discord Emoji Utils is a utility library for managing custom emoji cache in Discord applications. It provides functions to add emojis, remove duplicate emojis based on their ID and name or by their image hash, and perform additional operations such as emoji download and upload.

## Installation


Install the package using npm:

```shell
npm install discord-emoji-utils
```

## Usage

```javascript
const { EmojiUtils } = require('discord-emoji-utils');

// Create an instance of EmojiUtils
const emojiUtils = new EmojiUtils();

// Add emojis to the utility
emojiUtils.addEmoji({ id: '1', name: 'emoji1', imageUrl: 'https://example.com/emoji1.png' });
emojiUtils.addEmoji({ id: '2', name: 'emoji2', imageUrl: 'https://example.com/emoji2.png' });
emojiUtils.addEmoji({ id: '3', name: 'emoji3', imageUrl: 'https://example.com/emoji3.png' });

// Remove duplicate emojis by ID and name
emojiUtils.removeDuplicateEmojis();

// Remove duplicate emojis by image hash
emojiUtils.removeDuplicateEmojisByImageHash();

// Get the updated emoji list
const updatedEmojis = emojiUtils.getEmojis();
console.log(updatedEmojis);

// Perform other operations such as emoji download and upload
```

## API

### `addEmoji(emoji)`

Adds an emoji to the utility.

- `emoji` (object): An object representing the emoji with properties `id`, `name`, and `imageUrl`.

### `removeDuplicateEmojis()`

Removes duplicate emojis from the cache based on their ID and name.

### `removeDuplicateEmojisByImageHash()`

Removes duplicate emojis from the cache based on their image hash.

### `getEmojis()`

Returns the updated list of emojis after removing duplicates.

### `downloadImage(imageUrl)`

Downloads the image from the specified URL and returns a promise that resolves with the image data as a buffer.

- `imageUrl` (string): The URL of the image to download.

### `computeImageHash(imageUrl)`

Computes the image hash for the specified image URL using image processing techniques. Returns a promise that resolves with the computed image hash.

- `imageUrl` (string): The URL of the image for which to compute the hash.

## Examples

### Downloading Emojis

```javascript
const { EmojiUtils } = require('discord-emoji-utils');

const emojiUtils = new EmojiUtils();

// Add emojis to the utility
emojiUtils.addEmoji({ id: '1', name: 'emoji1', imageUrl: 'https://example.com/emoji1.png' });
emojiUtils.addEmoji({ id: '2', name: 'emoji2', imageUrl: 'https://example.com/emoji2.png' });
emojiUtils.addEmoji({ id: '3', name: 'emoji3', imageUrl: 'https://example.com/emoji3.png' });

// Download emojis to a folder
const destinationFolder = './emojis';
emojiUtils.downloadEmojis(destinationFolder)
  .then(downloads => {
    console.log('Emojis downloaded:', downloads);
  })
  .catch(error => {
    console.error('Failed to download emojis:', error);
  });
```

### Uploading Emojis

```javascript
const { EmojiUtils } = require('discord-emoji-utils');
const Discord = require('discord.js');

const emojiUtils = new EmojiUtils();
const client = new Discord.Client();
const guildId = '1234567890'; // Replace with the desired guild ID

// Add emojis to the utility
emojiUtils.addEmoji({ id: '1', name: 'emoji1', imageUrl: 'https://example.com/emoji1.png' });
emojiUtils.addEmoji({ id: '2', name: 'emoji2', imageUrl: 'https://example.com/emoji2.png' });
emojiUtils.addEmoji({ id: '3', name: 'emoji3', imageUrl: 'https://example.com/emoji3.png' });

// Upload emojis to a Discord guild
const uploadEmojis = async () => {
try {
await client.login('YOUR_DISCORD_TOKEN');
const guild = await client.guilds.fetch(guildId);
// Get the updated list of emojis
const updatedEmojis = emojiUtils.getEmojis();

// Upload emojis to the guild
for (const emoji of updatedEmojis) {
  const { id, name, imageUrl } = emoji;
  const imageBuffer = await emojiUtils.downloadImage(imageUrl);
  const uploadedEmoji = await guild.emojis.create(imageBuffer, name);
  console.log('Uploaded emoji:', uploadedEmoji);
}

// Logout the client
await client.logout();
} catch (error) {
console.error('Failed to upload emojis:', error);
}
};

uploadEmojis();
```
# License
This project is licensed under the [MIT License](#LICENSE).
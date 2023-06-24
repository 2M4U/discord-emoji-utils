# Discord Emoji Utils

Discord Emoji Utils is an advanced utility library for managing custom emoji cache in Discord applications. It provides functions to remove duplicate emojis based on their ID and name or by their image hash. It also offers additional features such as emoji download and upload capabilities.

## Installation
```bash
npm install discord-emoji-utils
```
*Note, Not published yet!*
## Usage
```js
const DiscordEmojiUtils = require('discord-emoji-utils');

// Create an instance of DiscordEmojiUtils
const emojiUtils = new DiscordEmojiUtils();

// Add emojis to the utility
const emoji1 = { id: '1', name: 'emoji1', imageUrl: 'https://example.com/emoji1.png' };
const emoji2 = { id: '2', name: 'emoji2', imageUrl: 'https://example.com/emoji2.png' };
const emoji3 = { id: '3', name: 'emoji3', imageUrl: 'https://example.com/emoji3.png' };

emojiUtils.addEmoji(emoji1);
emojiUtils.addEmoji(emoji2);
emojiUtils.addEmoji(emoji3);

// Remove duplicate emojis by ID and name
emojiUtils.removeDuplicateEmojis();

// Remove duplicate emojis by image hash
emojiUtils.removeDuplicateEmojisByImageHash();

// Get the updated emoji list
const updatedEmojis = emojiUtils.getEmojis();
console.log(updatedEmojis);

// Download emojis to a folder
const destinationFolder = './emojis';
const downloads = await emojiUtils.downloadEmojis(destinationFolder);
console.log('Emojis downloaded:', downloads);

// Assuming 'client' is a Discord.js client instance
const guildId = '1234567890'; // Replace with the desired guild ID
const uploadedEmojis = await emojiUtils.uploadEmojis(client, guildId, downloads);
console.log('Emojis uploaded:', uploadedEmojis);
```
## API

`addEmoji(emoji)`

Adds an emoji to the utility.

`emoji (object)`: An object representing the emoji with properties id, name, and imageUrl.

`removeDuplicateEmojis()`

Removes duplicate emojis from the cache based on their ID and name.

`removeDuplicateEmojisByImageHash()`

Removes duplicate emojis from the cache based on their image hash.

`getEmojis()`

Returns the updated list of emojis after removing duplicates.

`computeImageHash(imageUrl)`

Computes the image hash for the specified image URL.

`imageUrl` (string): The URL of the image.

`downloadEmojis(destinationFolder)`

Downloads the custom emojis from their image URLs and saves them to the specified destination folder. It returns an array of objects containing the emoji name and file path of each downloaded emoji.

`destinationFolder (string)`: The destination folder path for saving the downloaded emojis.

`uploadEmojis(client, guildId, emojiDownloads)`

Uploads the downloaded custom emojis to a Discord guild with the specified ID. It requires a Discord client instance (client), the `guild ID (guildId)`, and the array of emoji downloads obtained from the downloadEmojis method. It returns an array of uploaded emojis.

`client (object)`: The Discord.js client instance.
`guildId (string)`: The ID of the guild where the emojis will be uploaded.
`emojiDownloads (array)`: An array of objects containing the emoji name and file path of each downloaded emoji.

## Contributing

Contributions are welcome! Please check out the contribution guidelines for more details.

## License

This project is licensed under the [MIT License](#LICENSE).

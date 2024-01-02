- need to have a config.json file at root with this format:
```
{
  "token":"YOUR_TOKEN_HERE",
  "clientId": "YOUR_APPLICATION_ID_HERE",
  "guildId": "GUILD_ID_HERE",
  "DISCORD_PUBLIC_KEY":"YOUR_KEY_HERE",
  "OPENAI_TOKEN":"YOUR_TOKEN_HERE"
}
  ```
- to register slash commands, run `node deploy-commands.js` at root
- run project via `node .`

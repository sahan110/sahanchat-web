const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const express = require("express");

const CLIENT_ID = "1537935687855243324";
const TOKEN = process.env.DISCORD_TOKEN;
const PORT = process.env.PORT || 3000;
const UPDATE_CHANNEL_ID = process.env.UPDATE_CHANNEL_ID;

if (!TOKEN) {
  console.error("❌ DISCORD_TOKEN is missing");
  process.exit(1);
}

console.log("✅ Configuration loaded");
console.log(`🆔 Client ID: ${CLIENT_ID}`);
console.log(`🌐 Port: ${PORT}`);
console.log(`📢 Update Channel: ${UPDATE_CHANNEL_ID || "Not configured"}`);


// Discord Client
// /update command
// GitHub webhook
// Express server
// client.login(TOKEN)

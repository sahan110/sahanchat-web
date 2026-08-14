const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const express = require("express");

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const PORT = process.env.PORT || 3000;

if (!TOKEN || !CLIENT_ID) {
  console.error("Missing DISCORD_TOKEN or CLIENT_ID");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

// ----------------------
// Slash Commands
// ----------------------

const commands = [
  new SlashCommandBuilder()
    .setName("update")
    .setDescription("Send a Sahan Bot update")
    .addStringOption(option =>
      option
        .setName("version")
        .setDescription("Update version")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("changes")
        .setDescription("What changed?")
        .setRequired(true)
    )
].map(command => command.toJSON());

// ----------------------
// Register Commands
// ----------------------

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );

    console.log("Slash commands registered.");
  } catch (error) {
    console.error(error);
  }
})();

// ----------------------
// Bot Ready
// ----------------------

client.once("ready", () => {
  console.log(`Sahan Bot online as ${client.user.tag}`);
});

// ----------------------
// /update
// ----------------------

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "update") {

    const version = interaction.options.getString("version");
    const changes = interaction.options.getString("changes");

    const embed = new EmbedBuilder()
      .setTitle("🆕 Sahan Bot Update")
      .setDescription("A new update has been released!")
      .addFields(
        {
          name: "📦 Version",
          value: version,
          inline: true
        },
        {
          name: "✨ Changes",
          value: changes,
          inline: false
        }
      )
      .setTimestamp()
      .setFooter({
        text: "Sahan Bot"
      });

    await interaction.reply({
      embeds: [embed]
    });
  }
});

// ----------------------
// GitHub Webhook
// ----------------------

const app = express();

app.use(express.json());

app.post("/github", async (req, res) => {

  try {

    const payload = req.body;

    const channelId = process.env.UPDATE_CHANNEL_ID;

    if (!channelId) {
      return res.status(500).send("UPDATE_CHANNEL_ID missing");
    }

    const channel = await client.channels.fetch(channelId);

    if (!channel) {
      return res.status(404).send("Channel not found");
    }

    const repo = payload.repository?.full_name || "Unknown repository";
    const branch = payload.ref
      ? payload.ref.replace("refs/heads/", "")
      : "Unknown";

    const commit = payload.head_commit;

    const message =
      commit?.message || "New GitHub update";

    const author =
      commit?.author?.name || "Unknown";

    const embed = new EmbedBuilder()
      .setTitle("🚀 New Sahan Update")
      .setDescription(message)
      .addFields(
        {
          name: "📦 Repository",
          value: repo,
          inline: true
        },
        {
          name: "🌿 Branch",
          value: branch,
          inline: true
        },
        {
          name: "👤 Author",
          value: author,
          inline: true
        }
      )
      .setTimestamp()
      .setFooter({
        text: "Sahan Bot • GitHub Updates"
      });

    await channel.send({
      embeds: [embed]
    });

    res.status(200).send("Update sent");

  } catch (error) {

    console.error(error);

    res.status(500).send("Webhook error");
  }
});

app.get("/", (req, res) => {
  res.send("Sahan Bot is online!");
});

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

// ----------------------
// Login
// ----------------------

client.login(TOKEN);

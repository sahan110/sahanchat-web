const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const express = require("express");

// ======================
// Environment Variables
// ======================

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const UPDATE_CHANNEL_ID = process.env.UPDATE_CHANNEL_ID;
const PORT = process.env.PORT || 3000;

// ======================
// Check Environment
// ======================

if (!TOKEN) {
  console.error("❌ DISCORD_TOKEN is missing");
  process.exit(1);
}

if (!CLIENT_ID) {
  console.error("❌ CLIENT_ID is missing");
  process.exit(1);
}

// UPDATE_CHANNEL_ID is only needed for GitHub webhook.
// The bot can still start without it.

// ======================
// Discord Client
// ======================

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ======================
// Slash Commands
// ======================

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

// ======================
// Register Slash Commands
// ======================

const rest = new REST({ version: "10" }).setToken(TOKEN);

async function registerCommands() {
  try {
    console.log("🔄 Registering slash commands...");

    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );

    console.log("✅ Slash commands registered.");
  } catch (error) {
    console.error("❌ Slash command registration failed:");
    console.error(error);
  }
}

// ======================
// Bot Ready
// ======================

client.once("ready", async () => {
  console.log("=================================");
  console.log(`✅ Sahan Bot online as ${client.user.tag}`);
  console.log(`🆔 Client ID: ${CLIENT_ID}`);
  console.log("=================================");

  await registerCommands();
});

// ======================
// /update Command
// ======================

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "update") {
    try {
      const version =
        interaction.options.getString("version");

      const changes =
        interaction.options.getString("changes");

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

    } catch (error) {
      console.error("❌ /update error:", error);

      if (!interaction.replied) {
        await interaction.reply({
          content: "❌ Something went wrong.",
          ephemeral: true
        });
      }
    }
  }
});

// ======================
// Express Web Server
// ======================

const app = express();

app.use(express.json());

// ======================
// Home
// ======================

app.get("/", (req, res) => {
  res.status(200).send("🟢 Sahan Bot is online!");
});

// ======================
// Health Check
// ======================

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "online",
    bot: client.isReady(),
    name: client.user?.tag || null
  });
});

// ======================
// GitHub Webhook
// ======================

app.post("/github", async (req, res) => {
  try {
    if (!UPDATE_CHANNEL_ID) {
      console.error("❌ UPDATE_CHANNEL_ID is missing");
      return res
        .status(500)
        .send("UPDATE_CHANNEL_ID missing");
    }

    if (!client.isReady()) {
      return res
        .status(503)
        .send("Discord bot is not ready");
    }

    const payload = req.body;

    const channel =
      await client.channels.fetch(UPDATE_CHANNEL_ID);

    if (!channel) {
      return res
        .status(404)
        .send("Channel not found");
    }

    const repo =
      payload.repository?.full_name ||
      "Unknown repository";

    const branch =
      payload.ref
        ? payload.ref.replace("refs/heads/", "")
        : "Unknown";

    const commit =
      payload.head_commit;

    const message =
      commit?.message ||
      "New GitHub update";

    const author =
      commit?.author?.name ||
      "Unknown";

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

    console.log("✅ GitHub update sent to Discord");

    res.status(200).send("Update sent");

  } catch (error) {
    console.error("❌ GitHub webhook error:");
    console.error(error);

    res.status(500).send("Webhook error");
  }
});

// ======================
// Start Web Server
// ======================

app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});

// ======================
// Login Discord
// ======================

client.login(TOKEN)
  .then(() => {
    console.log("🔐 Discord login successful");
  })
  .catch(error => {
    console.error("❌ Discord login failed:");
    console.error(error);
    process.exit(1);
  });

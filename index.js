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
// Discord Configuration
// ======================

const CLIENT_ID = "1537935687855243324";
const TOKEN = process.env.DISCORD_TOKEN;
const PORT = process.env.PORT || 3000;
const UPDATE_CHANNEL_ID = process.env.UPDATE_CHANNEL_ID;

if (!TOKEN) {
  console.error("❌ DISCORD_TOKEN is missing");
  process.exit(1);
}

if (!CLIENT_ID) {
  console.error("❌ CLIENT_ID is missing");
  process.exit(1);
}

console.log("✅ Client ID loaded");
console.log("🔐 Discord token loaded from Render");

// ======================
// Discord Client
// ======================

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ======================
// Slash Command
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
// Register Commands
// ======================

const rest = new REST({ version: "10" }).setToken(TOKEN);

async function registerCommands() {
  try {
    console.log("🔄 Registering slash commands...");

    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );

    console.log("✅ Slash commands registered");
  } catch (error) {
    console.error("❌ Command registration failed:", error);
  }
}

// ======================
// Bot Ready
// ======================

client.once("ready", async () => {
  console.log(`🟢 Sahan Bot online as ${client.user.tag}`);
  await registerCommands();
});

// ======================
// /update
// ======================

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

// ======================
// Express Server
// ======================

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("🟢 Sahan Bot is online!");
});

app.get("/health", (req, res) => {
  res.json({
    status: "online",
    bot: client.isReady(),
    clientId: CLIENT_ID
  });
});

// ======================
// GitHub Webhook
// ======================

app.post("/github", async (req, res) => {
  try {
    if (!UPDATE_CHANNEL_ID) {
      return res.status(500).send("UPDATE_CHANNEL_ID missing");
    }

    if (!client.isReady()) {
      return res.status(503).send("Discord bot is not ready");
    }

    const payload = req.body;

    const channel = await client.channels.fetch(
      UPDATE_CHANNEL_ID
    );

    const repo =
      payload.repository?.full_name || "Unknown repository";

    const branch =
      payload.ref?.replace("refs/heads/", "") || "Unknown";

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

    console.log("✅ GitHub update sent");

    res.status(200).send("Update sent");

  } catch (error) {
    console.error("❌ GitHub webhook error:", error);
    res.status(500).send("Webhook error");
  }
});

// ======================
// Start Server
// ======================

app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});

// ======================
// Discord Login
// ======================

client.login(TOKEN)
  .then(() => {
    console.log("🔐 Discord login successful");
  })
  .catch(error => {
    console.error("❌ Discord login failed:", error);
    process.exit(1);
  });

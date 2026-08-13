/* =====================================
   SAHANCHAT APP
===================================== */


/* PAGE TITLES */

const pageTitles = {

  home: "Home",

  messages: "Messages",

  community: "Community",

  videos: "Videos",

  live: "🔴 Live",

  status: "Status",

  discover: "Discover",

  wallet: "SahanWallet",

  creator: "Creator Center",

  settings: "Settings",

  help: "Help & Support"

};


/* =====================================
   PAGE CONTENT
===================================== */

const content = document.getElementById("content");

const pageTitle = document.getElementById("pageTitle");


/* =====================================
   SHOW PAGE
===================================== */

function showPage(page){

  pageTitle.textContent =
    pageTitles[page] || "SahanChat";

  content.innerHTML =
    pages[page] || pages.home;

  document
    .querySelectorAll(".nav-btn")
    .forEach(button => {

      button.classList.remove("active");

      if(button.dataset.page === page){

        button.classList.add("active");

      }

    });


  document
    .querySelectorAll(".mobile-nav button")
    .forEach(button => {

      button.classList.remove("mobile-active");

      if(button.dataset.page === page){

        button.classList.add("mobile-active");

      }

    });


  /* Close mobile sidebar */

  document
    .querySelector(".sidebar")
    .classList.remove("open");


  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

}


/* =====================================
   NAVIGATION
===================================== */

document.addEventListener(
  "click",
  function(e){

    const button =
      e.target.closest("[data-page]");

    if(!button) return;

    const page =
      button.dataset.page;

    showPage(page);

  }
);


/* =====================================
   MOBILE MENU
===================================== */

const mobileMenu =
  document.getElementById("mobileMenu");

mobileMenu.addEventListener(
  "click",
  function(){

    document
      .querySelector(".sidebar")
      .classList.toggle("open");

  }
);


/* =====================================
   NOTIFICATIONS
===================================== */

document
  .getElementById("notificationBtn")
  .addEventListener(
    "click",
    function(){

      showToast(
        "🔔 Wax notification cusub ma jiro."
      );

    }
  );


/* =====================================
   TOAST
===================================== */

function showToast(message){

  const toast =
    document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(
    function(){

      toast.classList.remove("show");

    },
    2500
  );

}


/* =====================================
   PAGE TEMPLATES
===================================== */

const pages = {


/* =====================================
   HOME
===================================== */

home: `

<section class="page">

  <div class="welcome">

    <h1>🇸🇴 Ku soo dhawoow SahanChat</h1>

    <p>
      Isku xir dadka Soomaaliya iyo dunida oo dhan 🌍
    </p>

  </div>


  <input
    class="search"
    placeholder="🔎 Raadi qof ama community..."
  >


  <div class="card">

    <h3 class="card-title">
      🌍 Discover
    </h3>

    <div class="countries">

      <div class="country">
        <div>🇸🇴</div>
        <small>Somalia</small>
      </div>

      <div class="country">
        <div>🇰🇪</div>
        <small>Kenya</small>
      </div>

      <div class="country">
        <div>🇪🇹</div>
        <small>Ethiopia</small>
      </div>

      <div class="country">
        <div>🇩🇯</div>
        <small>Djibouti</small>
      </div>

      <div class="country">
        <div>🇹🇿</div>
        <small>Tanzania</small>
      </div>

    </div>

  </div>


  <div class="card">

    <h3 class="card-title">
      💬 Recent Chats
    </h3>

    <div class="chat">

      <div class="chat-avatar">
        👨🏾
      </div>

      <div class="chat-info">

        <strong>
          Ahmed 🇸🇴
        </strong>

        <small>
          Asc, sidee tahay?
        </small>

      </div>

      <span class="chat-time">
        19:20
      </span>

    </div>


    <div class="chat">

      <div class="chat-avatar">
        👩🏾
      </div>

      <div class="chat-info">

        <strong>
          Hodan 🇸🇴
        </strong>

        <small>
          Community-ga eeg
        </small>

      </div>

      <span class="chat-time">
        18:45
      </span>

    </div>

  </div>

</section>

`,


/* =====================================
   MESSAGES
===================================== */

messages: `

<section class="page">

  <h1>💬 Messages</h1>

  <p class="page-description">
    La hadal asxaabtaada iyo communities-ka.
  </p>


  <input
    class="search"
    placeholder="🔎 Search messages..."
  >


  <div class="card">

    <div class="chat">

      <div class="chat-avatar">
        👨🏾
      </div>

      <div class="chat-info">

        <strong>
          Ahmed 🇸🇴
        </strong>

        <small>
          Asc, sidee tahay?
        </small>

      </div>

      <span class="chat-time">
        19:20
      </span>

    </div>


    <div class="chat">

      <div class="chat-avatar">
        👩🏾
      </div>

      <div class="chat-info">

        <strong>
          Hodan 🇸🇴
        </strong>

        <small>
          Waan joogaa 👋
        </small>

      </div>

      <span class="chat-time">
        18:45
      </span>

    </div>


    <div class="chat">

      <div class="chat-avatar">
        👨🏽
      </div>

      <div class="chat-info">

        <strong>
          Mohamed 🇸🇴
        </strong>

        <small>
          Video cusub eeg 🎥
        </small>

      </div>

      <span class="chat-time">
        17:31
      </span>

    </div>

  </div>

</section>

`,


/* =====================================
   COMMUNITY
===================================== */

community: `

<section class="page">

  <h1>👥 Community</h1>

  <p class="page-description">
    Ku biir communities aad xiisaynayso.
  </p>


  <div class="community-grid">

    <div class="community-card">

      <div class="community-icon">
        🇸🇴
      </div>

      <h3>
        Somali Community
      </h3>

      <p>
        Isku xir dadka Soomaaliyeed.
      </p>

      <strong>
        12.5K Members
      </strong>

      <br><br>

      <button class="primary-btn">
        Join Community
      </button>

    </div>


    <div class="community-card">

      <div class="community-icon">
        🎮
      </div>

      <h3>
        Somali Gamers
      </h3>

      <p>
        Gaming, tournaments & friends.
      </p>

      <strong>
        8.2K Members
      </strong>

      <br><br>

      <button class="primary-btn">
        Join Community
      </button>

    </div>


    <div class="community-card">

      <div class="community-icon">
        ⚽
      </div>

      <h3>
        Somali Football
      </h3>

      <p>
        Football news and discussions.
      </p>

      <strong>
        5.7K Members
      </strong>

      <br><br>

      <button class="primary-btn">
        Join Community
      </button>

    </div>


    <div class="community-card">

      <div class="community-icon">
        💻
      </div>

      <h3>
        Somali Developers
      </h3>

      <p>
        Developers helping each other.
      </p>

      <strong>
        2.4K Members
      </strong>

      <br><br>

      <button class="primary-btn">
        Join Community
      </button>

    </div>

  </div>

</section>

`,


/* =====================================
   VIDEOS
===================================== */

videos: `

<section class="page">

  <h1>🎥 Videos</h1>

  <p class="page-description">
    Daawo videos-ka dadka aad raacdo.
  </p>


  <div class="video-tabs">

    <button class="active">
      For You
    </button>

    <button>
      Following
    </button>

    <button>
      Trending
    </button>

    <button>
      Upload
    </button>

  </div>


  <div class="video-grid">

    <div class="video-card">

      ▶️

      <div class="video-info">
        @Ahmed 🇸🇴<br>
        ❤️ 2.4K &nbsp; 💬 245
      </div>

    </div>


    <div class="video-card">

      ▶️

      <div class="video-info">
        @Hodan 🇸🇴<br>
        ❤️ 1.8K &nbsp; 💬 123
      </div>

    </div>


    <div class="video-card">

      ▶️

      <div class="video-info">
        @Mohamed 🇸🇴<br>
        ❤️ 950 &nbsp; 💬 76
      </div>

    </div>

  </div>

</section>

`,


/* =====================================
   LIVE
===================================== */

live: `

<section class="page">

  <h1>🔴 Live</h1>

  <p class="page-description">
    Daawo dadka hadda Live-ka ku jira.
  </p>


  <div class="live-main">

    <span class="live-badge">
      🔴 LIVE NOW
    </span>


    <div class="live-screen">
      🎥
    </div>


    <div class="live-details">

      <h3>
        @Ahmed 🇸🇴
      </h3>

      <small>
        👥 2.4K watching
      </small>

      <div class="live-actions">

        <button>
          ❤️ 1.2K
        </button>

        <button>
          💬 245
        </button>

        <button>
          🎁 Gift
        </button>

      </div>

    </div>

  </div>


  <button
    class="primary-btn"
    id="goLiveBtn">

    🔴 Go Live

  </button>

</section>

`,


/* =====================================
   STATUS
===================================== */

status: `

<section class="page">

  <h1>📢 Status</h1>

  <p class="page-description">
    Status-ka wuxuu dhacayaa 24 saac kadib.
  </p>


  <div class="card">

    <h3 class="card-title">
      My Status
    </h3>

    <button
      class="primary-btn"
      id="addStatusBtn">

      ＋ Add Status

    </button>

  </div>


  <div class="status-row">

    <div class="status-user">

      <div class="status-avatar">
        👨🏾
      </div>

      <small>
        Ahmed
      </small>

    </div>


    <div class="status-user">

      <div class="status-avatar">
        👩🏾
      </div>

      <small>
        Hodan
      </small>

    </div>


    <div class="status-user">

      <div class="status-avatar">
        👨🏽
      </div>

      <small>
        Mohamed
      </small>

    </div>


    <div class="status-user">

      <div class="status-avatar">
        👩🏽
      </div>

      <small>
        Ayaan
      </small>

    </div>

  </div>

</section>

`,


/* =====================================
   DISCOVER
===================================== */

discover: `

<section class="page">

  <h1>🌍 Discover</h1>

  <p class="page-description">
    Soo hel dadka, communities iyo countries.
  </p>


  <input
    class="search"
    placeholder="🔎 Search people or communities..."
  >


  <div class="discover-grid">

    <div class="discover-card">

      <div class="big-icon">
        🇸🇴
      </div>

      <h3>
        Somalia
      </h3>

      <p>
        Somali communities
      </p>

      <button class="secondary-btn">
        Explore
      </button>

    </div>


    <div class="discover-card">

      <div class="big-icon">
        🇰🇪
      </div>

      <h3>
        Kenya
      </h3>

      <p>
        Kenyan communities
      </p>

      <button class="secondary-btn">
        Explore
      </button>

    </div>


    <div class="discover-card">

      <div class="big-icon">
        🇪🇹
      </div>

      <h3>
        Ethiopia
      </h3>

      <p>
        Ethiopian communities
      </p>

      <button class="secondary-btn">
        Explore
      </button>

    </div>

  </div>

</section>

`,


/* =====================================
   WALLET
===================================== */

wallet: `

<section class="page">

  <h1>🪙 SahanWallet</h1>

  <p class="page-description">
    Maamul coins, gifts iyo creator earnings.
  </p>


  <div class="wallet">

    <small>
      Your Balance
    </small>

    <div class="balance">
      🪙 12,500
    </div>


    <div class="wallet-buttons">

      <button
        class="buy-coins"
        id="buyCoinsBtn">

        ＋ Buy Coins

      </button>


      <button
        class="withdraw-btn"
        id="withdrawBtn">

        Withdraw

      </button>

    </div>

  </div>


  <div class="card">

    <h3 class="card-title">
      🎁 Send Gifts
    </h3>


    <div class="gifts">

      <div class="gift">

        <div class="gift-icon">
          🌹
        </div>

        <strong>
          Rose
        </strong>

        <small>
          10 🪙
        </small>

      </div>


      <div class="gift">

        <div class="gift-icon">
          💎
        </div>

        <strong>
          Diamond
        </strong>

        <small>
          500 🪙
        </small>

      </div>


      <div class="gift">

        <div class="gift-icon">
          👑
        </div>

        <strong>
          Crown
        </strong>

        <small>
          2,000 🪙
        </small>

      </div>

    </div>

  </div>


  <div class="card">

    <h3>
      📊 Transactions
    </h3>

    <br>

    <p>
      🪙 +1,000 Coins
      <small>Today</small>
    </p>

    <br>

    <p>
      🎁 -500 Coins
      <small>Yesterday</small>
    </p>

  </div>

</section>

`,


/* =====================================
   CREATOR
===================================== */

creator: `

<section class="page">

  <h1>🎥 Creator Center</h1>

  <p class="page-description">
    Halkaan ka maamul creator account-kaaga.
  </p>


  <div class="creator-stats">

    <div class="stat">

      <small>
        Followers
      </small>

      <strong>
        12.4K
      </strong>

    </div>


    <div class="stat">

      <small>
        Videos
      </small>

      <strong>
        245
      </strong>

    </div>


    <div class="stat">

      <small>
        Views
      </small>

      <strong>
        1.2M
      </strong>

    </div>


    <div class="stat">

      <small>
        Earnings
      </small>

      <strong>
        $42.50
      </strong>

    </div>


    <div class="stat">

      <small>
        Coins
      </small>

      <strong>
        25.4K
      </strong>

    </div>


    <div class="stat">

      <small>
        Live Viewers
      </small>

      <strong>
        2.4K
      </strong>

    </div>

  </div>


  <div class="card">

    <h3>
      📊 Analytics
    </h3>

    <br>

    <p>
      Video views, engagement, followers
      iyo Live analytics ayaa halkan ka muuqan doona.
    </p>

  </div>

</section>

`,


/* =====================================
   SETTINGS
===================================== */

settings: `

<section class="page">

  <h1>⚙️ Settings</h1>

  <p class="page-description">
    Maamul account-ka iyo SahanChat preferences-kaaga.
  </p>


  <div class="profile-card">

    <div class="profile-avatar">
      👤
    </div>

    <div class="profile-info">

      <strong>
        @Ahmed
      </strong>

      <small>
        🇸🇴 Somalia
      </small>

    </div>


    <button
      class="secondary-btn"
      id="editProfileBtn">

      Edit Profile

    </button>

  </div>


  <!-- ACCOUNT -->

  <div class="section-title">
    ACCOUNT
  </div>

  <div class="card">

    ${setting(
      "👤",
      "Edit Profile",
      "Name, username & bio"
    )}

    ${setting(
      "📧",
      "Email",
      "ahmed@email.com"
    )}

    ${setting(
      "📱",
      "Phone",
      "+252 ••••••••"
    )}

    ${setting(
      "🔐",
      "Security",
      "Password & login"
    )}

    ${setting(
      "💰",
      "SahanWallet",
      "Coins & earnings"
    )}

  </div>


  <!-- APP -->

  <div class="section-title">
    APP
  </div>

  <div class="card">

    ${setting(
      "🌐",
      "Language",
      "Somali / English / Arabic"
    )}

    ${setting(
      "🌙",
      "Appearance",
      "Dark / Light / System"
    )}

    ${setting(
      "🔔",
      "Notifications",
      "Messages & alerts"
    )}

    ${toggleSetting(
      "📶",
      "Data Saver",
      "Reduce video data usage"
    )}

  </div>


  <!-- PRIVACY -->

  <div class="section-title">
    PRIVACY & SAFETY
  </div>

  <div class="card">

    ${setting(
      "🛡️",
      "Privacy",
      "Control your privacy"
    )}

    ${setting(
      "🚫",
      "Blocked Users",
      "Manage blocked accounts"
    )}

    ${setting(
      "👁️",
      "Online Status",
      "Show when you're online"
    )}

    ${setting(
      "🔒",
      "Two-Step Verification",
      "Extra account protection"
    )}

    ${toggleSetting(
      "🟢",
      "Read Receipts",
      "Show when messages are read"
    )}

    ${setting(
      "🔎",
      "Discoverability",
      "Who can find you"
    )}

  </div>


  <!-- CREATOR -->

  <div class="section-title">
    CREATOR
  </div>

  <div class="card">

    ${setting(
      "🎥",
      "Creator Center",
      "Grow your audience"
    )}

    ${setting(
      "💰",
      "Earnings",
      "View your earnings"
    )}

    ${setting(
      "🪙",
      "Coins",
      "SahanCoins"
    )}

    ${setting(
      "🏦",
      "Withdraw",
      "Creator payout"
    )}

    ${setting(
      "📊",
      "Analytics",
      "Views, followers & engagement"
    )}

  </div>


  <!-- SUPPORT -->

  <div class="section-title">
    SUPPORT
  </div>

  <div class="card">

    ${setting(
      "❓",
      "Help Center",
      "Get help with SahanChat"
    )}

    ${setting(
      "📢",
      "Report Problem",
      "Tell us about an issue"
    )}

    ${setting(
      "💬",
      "Contact SahanChat",
      "Talk to support"
    )}

    ${setting(
      "📄",
      "Terms",
      "SahanChat Terms"
    )}

    ${setting(
      "🔐",
      "Privacy Policy",
      "How we protect your data"
    )}

    ${setting(
      "ℹ️",
      "About SahanChat",
      "Version 1.0.0"
    )}

  </div>


  <div class="card">

    <div
      class="setting-row logout"
      id="logoutBtn">

      <div class="setting-icon">
        🚪
      </div>

      <div class="setting-info">

        <strong>
          Log Out
        </strong>

        <small>
          Sign out of SahanChat
        </small>

      </div>

      <span class="arrow">
        ›
      </span>

    </div>

  </div>

</section>

`,


/* =====================================
   HELP
===================================== */

help: `

<section class="page">

  <h1>❓ Help & Support</h1>

  <p class="page-description">
    Waxaan diyaar u nahay inaan kaa caawino SahanChat.
  </p>


  <div class="card help-card">

    <div class="help-icon">
      🛠️
    </div>

    <h2>
      Need Help?
    </h2>

    <p>
      Haddii aad dhibaato qabto ama su'aal
      kaa jirto, la xiriir SahanChat Support.
    </p>

    <button
      class="primary-btn"
      id="supportBtn">

      💬 Contact Support

    </button>

  </div>


  <div class="card">

    <div class="setting-row">

      <div class="setting-icon">
        ❓
      </div>

      <div class="setting-info">

        <strong>
          Help Center
        </strong>

        <small>
          Find answers to common questions
        </small>

      </div>

      <span class="arrow">
        ›
      </span>

    </div>


    <div class="setting-row">

      <div class="setting-icon">
        📢
      </div>

      <div class="setting-info">

        <strong>
          Report Problem
        </strong>

        <small>
          Report bugs or inappropriate content
        </small>

      </div>

      <span class="arrow">
        ›
      </span>

    </div>


    <div class="setting-row">

      <div class="setting-icon">
        📄
      </div>

      <div class="setting-info">

        <strong>
          Terms
        </strong>

        <small>
          SahanChat Terms of Service
        </small>

      </div>

      <span class="arrow">
        ›
      </span>

    </div>


    <div class="setting-row">

      <div class="setting-icon">
        🔐
      </div>

      <div class="setting

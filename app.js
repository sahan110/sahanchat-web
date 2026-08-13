/* =========================================
   SAHANCHAT - APP.JS
========================================= */

/* =========================================
   SUPABASE
========================================= */

const SUPABASE_URL =
  "https://amqulcvdqloezjbfvfbu.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_AhhcBuUV280wLtaRula9bg_EVOt1FPd";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/* =========================================
   GLOBAL
========================================= */

let currentUser = null;
let currentProfile = null;


/* =========================================
   DOM
========================================= */

const authOverlay =
  document.getElementById("authOverlay");

const loginForm =
  document.getElementById("loginForm");

const registerForm =
  document.getElementById("registerForm");

const content =
  document.getElementById("content");

const pageTitle =
  document.getElementById("pageTitle");

const sidebarUsername =
  document.getElementById("sidebarUsername");

const sidebar =
  document.getElementById("sidebar");

const toast =
  document.getElementById("toast");


/* =========================================
   START APP
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    setupNavigation();

    setupAuthButtons();

    setupMobileMenu();

    await checkSession();

  }
);


/* =========================================
   SESSION
========================================= */

async function checkSession() {

  const {
    data,
    error
  } = await supabaseClient.auth.getSession();

  if (error) {

    console.error(error);

    showLogin();

    return;
  }

  currentUser =
    data.session?.user || null;


  if (currentUser) {

    await loadProfile();

    hideAuth();

    loadPage("home");

  } else {

    showAuth();

  }
}


/* =========================================
   AUTH UI
========================================= */

function showAuth() {

  authOverlay.style.display = "flex";

}

function hideAuth() {

  authOverlay.style.display = "none";

}


/* =========================================
   SHOW LOGIN
========================================= */

function showLogin() {

  loginForm.style.display = "block";

  registerForm.style.display = "none";

  document.getElementById(
    "loginError"
  ).textContent = "";

}


/* =========================================
   SHOW REGISTER
========================================= */

function showRegister() {

  loginForm.style.display = "none";

  registerForm.style.display = "block";

  document.getElementById(
    "registerError"
  ).textContent = "";

}


/* =========================================
   AUTH BUTTONS
========================================= */

function setupAuthButtons() {

  document
    .getElementById("showRegisterBtn")
    ?.addEventListener(
      "click",
      showRegister
    );


  document
    .getElementById("showLoginBtn")
    ?.addEventListener(
      "click",
      showLogin
    );


  document
    .getElementById("loginBtn")
    ?.addEventListener(
      "click",
      login
    );


  document
    .getElementById("registerBtn")
    ?.addEventListener(
      "click",
      register
    );

}


/* =========================================
   REGISTER
========================================= */

async function register() {

  const username =
    document
      .getElementById(
        "registerUsername"
      )
      .value
      .trim()
      .toLowerCase();

  const displayName =
    document
      .getElementById(
        "registerName"
      )
      .value
      .trim();

  const email =
    document
      .getElementById(
        "registerEmail"
      )
      .value
      .trim();

  const country =
    document
      .getElementById(
        "registerCountry"
      )
      .value;

  const password =
    document
      .getElementById(
        "registerPassword"
      )
      .value;


  const errorBox =
    document.getElementById(
      "registerError"
    );


  errorBox.textContent = "";


  if (!username ||
      !email ||
      !password) {

    errorBox.textContent =
      "Fadlan buuxi dhammaan meelaha.";

    return;
  }


  if (username.length < 3) {

    errorBox.textContent =
      "Username-ku ugu yaraan 3 characters ha noqdo.";

    return;
  }


  if (password.length < 8) {

    errorBox.textContent =
      "Password-ku ugu yaraan 8 characters ha noqdo.";

    return;
  }


  const button =
    document.getElementById(
      "registerBtn"
    );

  button.disabled = true;

  button.textContent =
    "Creating account...";


  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth.signUp({

        email: email,

        password: password,

        options: {

          data: {

            username:
              username,

            display_name:
              displayName ||
              username,

            country:
              country

          }

        }

      });


    if (error)
      throw error;


    if (!data.user)
      throw new Error(
        "Account lama abuurin."
      );


    /*
      Profile trigger-ku wuxuu
      sameynayaa profile-ka.
    */

    showToast(
      "Account-ka waa la sameeyay 🎉"
    );


    /*
      Email confirmation haddii
      Supabase uu shidan yahay.
    */

    if (!data.session) {

      errorBox.style.color =
        "#075e54";

      errorBox.textContent =
        "Hubi email-kaaga si aad account-ka u xaqiijiso.";

      showLogin();

    } else {

      currentUser =
        data.user;

      await loadProfile();

      hideAuth();

      loadPage("home");

    }


  } catch (error) {

    console.error(error);

    errorBox.style.color =
      "#e53935";

    errorBox.textContent =
      getAuthError(error);

  }


  button.disabled = false;

  button.textContent =
    "📝 Create Account";

}


/* =========================================
   LOGIN
========================================= */

async function login() {

  const email =
    document
      .getElementById(
        "loginEmail"
      )
      .value
      .trim();

  const password =
    document
      .getElementById(
        "loginPassword"
      )
      .value;


  const errorBox =
    document.getElementById(
      "loginError"
    );


  errorBox.textContent = "";


  if (!email ||
      !password) {

    errorBox.textContent =
      "Geli email iyo password.";

    return;
  }


  const button =
    document.getElementById(
      "loginBtn"
    );

  button.disabled = true;

  button.textContent =
    "Logging in...";


  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth
        .signInWithPassword({

          email:
            email,

          password:
            password

        });


    if (error)
      throw error;


    currentUser =
      data.user;


    await loadProfile();


    hideAuth();

    loadPage("home");


    showToast(
      "Soo dhawoow SahanChat 👋"
    );


  } catch (error) {

    console.error(error);

    errorBox.textContent =
      getAuthError(error);

  }


  button.disabled = false;

  button.textContent =
    "🔐 Login";

}


/* =========================================
   LOGOUT
========================================= */

async function logout() {

  await supabaseClient.auth.signOut();

  currentUser = null;

  currentProfile = null;

  showAuth();

  showLogin();

  showToast(
    "Waad ka baxday SahanChat."
  );

}


/* =========================================
   LOAD PROFILE
========================================= */

async function loadProfile() {

  if (!currentUser)
    return;


  const {
    data,
    error
  } =
    await supabaseClient
      .from("profiles")
      .select("*")
      .eq(
        "id",
        currentUser.id
      )
      .maybeSingle();


  if (error) {

    console.error(error);

    return;
  }


  currentProfile =
    data;


  if (currentProfile) {

    sidebarUsername.textContent =
      "@" +
      currentProfile.username;

  }

}


/* =========================================
   NAVIGATION
========================================= */

function setupNavigation() {

  document
    .querySelectorAll(
      "[data-page]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const page =
            button.dataset.page;

          loadPage(page);

          sidebar.classList.remove(
            "open"
          );

        }
      );

    });

}


/* =========================================
   LOAD PAGE
========================================= */

async function loadPage(page) {

  const titles = {

    home: "Home",

    messages: "Messages",

    community: "Community",

    videos: "Videos",

    live: "Live",

    status: "Status",

    discover: "Discover",

    wallet: "SahanWallet",

    creator: "Creator Center",

    settings: "Settings",

    help: "Help & Support"

  };


  pageTitle.textContent =
    titles[page] ||
    "SahanChat";


  document
    .querySelectorAll(
      ".nav-btn"
    )
    .forEach(btn => {

      btn.classList.toggle(
        "active",
        btn.dataset.page === page
      );

    });


  document
    .querySelectorAll(
      ".mobile-nav button"
    )
    .forEach(btn => {

      btn.classList.toggle(
        "mobile-active",
        btn.dataset.page === page
      );

    });


  switch (page) {

    case "home":

      renderHome();

      break;


    case "messages":

      renderMessages();

      break;


    case "community":

      renderCommunity();

      break;


    case "videos":

      await renderVideos();

      break;


    case "live":

      renderLive();

      break;


    case "status":

      await renderStatus();

      break;


    case "discover":

      await renderDiscover();

      break;


    case "wallet":

      renderWallet();

      break;


    case "creator":

      renderCreator();

      break;


    case "settings":

      renderSettings();

      break;


    case "help":

      renderHelp();

      break;


    default:

      renderHome();

  }

}


/* =========================================
   HOME
========================================= */

function renderHome() {

  const name =
    currentProfile?.display_name ||
    currentProfile?.username ||
    "SahanChat";


  content.innerHTML = `

    <div class="welcome-card">

      <h1>
        Ku soo dhawoow, ${escapeHTML(name)} 👋
      </h1>

      <p>
        Isku xir dadka Soomaaliya iyo dunida 🌍
      </p>

    </div>


    <div class="search-box">

      🔎

      <input
        type="text"
        placeholder="Raadi qof ama community..."
        id="globalSearch"
      >

    </div>


    <div class="card">

      <div class="card-title">
        🌍 Discover
      </div>


      <div class="grid">

        <div class="feature-card">

          <div class="feature-icon">
            🇸🇴
          </div>

          <strong>
            Somalia
          </strong>

          <small>
            Communities & people
          </small>

        </div>


        <div class="feature-card">

          <div class="feature-icon">
            🇰🇪
          </div>

          <strong>
            Kenya
          </strong>

          <small>
            Discover users
          </small>

        </div>


        <div class="feature-card">

          <div class="feature-icon">
            🇪🇹
          </div>

          <strong>
            Ethiopia
          </strong>

          <small>
            Discover communities
          </small>

        </div>

      </div>

    </div>


    <div class="card">

      <div class="card-title">
        ⚡ Quick Access
      </div>


      <div class="grid">

        <div
          class="feature-card"
          data-page="messages">

          <div class="feature-icon">
            💬
          </div>

          <strong>
            Messages
          </strong>

          <small>
            Chat with people
          </small>

        </div>


        <div
          class="feature-card"
          data-page="videos">

          <div class="feature-icon">
            🎥
          </div>

          <strong>
            Videos
          </strong>

          <small>
            Watch videos
          </small>

        </div>


        <div
          class="feature-card"
          data-page="live">

          <div class="feature-icon">
            🔴
          </div>

          <strong>
            Live
          </strong>

          <small>
            Live streams
          </small>

        </div>

      </div>

    </div>

  `;


  content
    .querySelectorAll(
      "[data-page]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => loadPage(
          button.dataset.page
        )
      );

    });

}


/* =========================================
   MESSAGES
========================================= */

function renderMessages() {

  content.innerHTML = `

    <div class="chat-container">

      <div class="chat-list">

        <div class="chat-item">

          <div class="avatar">
            👤
          </div>

          <div>

            <strong>
              SahanChat
            </strong>

            <small>
              Welcome 👋
            </small>

          </div>

        </div>

      </div>


      <div class="chat-window">

        <div class="chat-messages">

          <div class="empty-state">

            <div class="empty-icon">
              💬
            </div>

            <h3>
              Your Messages
            </h3>

            <p>
              Raadi qof si aad chat u bilowdo.
            </p>

          </div>

        </div>


        <div class="chat-input">

          <input
            id="messageInput"
            placeholder="Qor fariin..."
          >

          <button
            class="primary-btn"
            id="sendMessageBtn">

            Send

          </button>

        </div>

      </div>

    </div>

  `;

}


/* =========================================
   COMMUNITY
========================================= */

function renderCommunity() {

  content.innerHTML = `

    <div class="welcome-card">

      <h1>
        👥 Communities
      </h1>

      <p>
        Samee ama ku biir community.
      </p>

    </div>


    <div class="grid">

      <div class="feature-card">

        <div class="feature-icon">
          ➕
        </div>

        <strong>
          Create Community
        </strong>

        <small>
          Abuur community cusub
        </small>

      </div>


      <div class="feature-card">

        <div class="feature-icon">
          🔎
        </div>

        <strong>
          Discover
        </strong>

        <small>
          Raadi communities
        </small>

      </div>


      <div class="feature-card">

        <div class="feature-icon">
          👥
        </div>

        <strong>
          My Communities
        </strong>

        <small>
          Communities-kaaga
        </small>

      </div>

    </div>

  `;

}


/* =========================================
   VIDEOS
========================================= */

async function renderVideos() {

  const {
    data,
    error
  } =
    await supabaseClient
      .from("videos")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false
        }
      )
      .limit(20);


  if (error) {

    console.error(error);

  }


  const videos =
    data || [];


  content.innerHTML = `

    <div class="welcome-card">

      <h1>
        🎥 SahanChat Videos
      </h1>

      <p>
        Watch, share and discover.
      </p>

    </div>


    <div class="video-grid">

      ${
        videos.length
        ?
        videos.map(video => `

          <div class="video-card">

            <div class="video-thumbnail">

              ▶️

            </div>

            <div class="video-info">

              <strong>
                ${escapeHTML(
                  video.caption ||
                  "SahanChat Video"
                )}
              </strong>

              <small>
                👁️ ${video.views || 0}
              </small>

            </div>

          </div>

        `).join("")

        :

        `

          <div class="empty-state">

            <div class="empty-icon">
              🎥
            </div>

            <h3>
              No videos yet
            </h3>

            <p>
              Videos-ka ugu horreeya adiga soo geli.
            </p>

          </div>

        `
      }

    </div>

  `;

}


/* =========================================
   LIVE
========================================= */

function renderLive() {

  content.innerHTML = `

    <div class="welcome-card">

      <h1>
        🔴 Live
      </h1>

      <p>
        Daawo Live ama bilow Live-gaaga.
      </p>

    </div>


    <div class="grid">

      <div class="feature-card">

        <div class="feature-icon">
          🔴
        </div>

        <strong>
          Live Now
        </strong>

        <small>
          Live streams hadda socda
        </small>

      </div>


      <div class="feature-card">

        <div class="feature-icon">
          ⭐
        </div>

        <strong>
          Following Live
        </strong>

        <small>
          Dadka aad follow-gareyso
        </small>

      </div>


      <div class="feature-card">

        <div class="feature-icon">
          🎥
        </div>

        <strong>
          Go Live
        </strong>

        <small>
          Bilow live stream
        </small>

      </div>

    </div>

  `;

}


/* =========================================
   STATUS
========================================= */

async function renderStatus() {

  const {
    data
  } =
    await supabaseClient
      .from("status")
      .select("*")
      .gt(
        "expires_at",
        new Date().toISOString()
      )
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  const statuses =
    data || [];


  content.innerHTML = `

    <div class="welcome-card">

      <h1>
        📢 Status
      </h1>

      <p>
        Status-ku wuxuu dhacayaa 24 saac kadib.
      </p>

    </div>


    <div class="card">

      <div class="status-row">

        <div class="status-item">

          <div class="status-avatar">
            ➕
          </div>

          <small>
            Add Status
          </small>

        </div>


        ${
          statuses.map(status => `

            <div class="status-item">

              <div class="status-avatar">
                👤
              </div>

              <small>
                Status
              </small>

            </div>

          `).join("")
        }

      </div>

    </div>

  `;

}


/* =========================================
   DISCOVER
========================================= */

async function renderDiscover() {

  const {
    data,
    error
  } =
    await supabaseClient
      .from("profiles")
      .select(
        "id, username, display_name, country, bio"
      )
      .limit(20);


  if (error)
    console.error(error);


  const users =
    data || [];


  content.innerHTML = `

    <div class="welcome-card">

      <h1>
        🌍 Discover
      </h1>

      <p>
        Raadi dadka SahanChat.
      </p>

    </div>


    <div class="grid">

      ${
        users.map(user => `

          <div class="feature-card">

            <div class="profile-avatar">

              👤

            </div>

            <strong>

              ${escapeHTML(
                user.display_name ||
                user.username
              )}

            </strong>

            <small>

              @${escapeHTML(
                user.username
              )}

              <br>

              ${escapeHTML(
 

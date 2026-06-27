/* =========================
   ELEMENTS
========================= */

const modal = document.getElementById("createPostModal");
const openBtn = document.getElementById("newPostBtn");
const closeBtn = document.getElementById("closeModalBtn");

const form = document.getElementById("createPostForm");
const imageInput = document.getElementById("postImages");
const previewBox = document.getElementById("imagePreview");

const titleInput = document.getElementById("postTitle");
const descInput = document.getElementById("postDescription");
const categoryInput = document.getElementById("postCategory");
const hashtagInput = document.getElementById("postHashtags");
const autoHashtag = document.getElementById("autoHashtag");

const searchInput = document.getElementById("searchInput");
const postsContainer = document.getElementById("postsContainer");

/* =========================
   MODAL OPEN / CLOSE
========================= */

openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

/* click outside modal */
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});

/* =========================
   IMAGE PREVIEW
========================= */

imageInput.addEventListener("change", (e) => {
    previewBox.innerHTML = "";

    const files = Array.from(e.target.files);

    files.forEach(file => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = document.createElement("img");
            img.src = event.target.result;
            previewBox.appendChild(img);
        };

        reader.readAsDataURL(file);
    });
});

/* =========================
   AUTO HASHTAG GENERATOR
========================= */

function generateHashtag(title) {
    if (!title) return "#campusbuzz";

    return "#" + title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .slice(0, 20);
}

titleInput.addEventListener("input", () => {
    const tag = generateHashtag(titleInput.value);
    autoHashtag.textContent = tag;
});

/* =========================
   FORM SUBMIT (FRONTEND DEMO)
========================= */

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", titleInput.value);
    formData.append("description", descInput.value);
    formData.append("category", categoryInput.value);
    formData.append("location", document.getElementById("postLocation").value);
    formData.append("maxParticipants", document.getElementById("postMaxParticipants").value);
    formData.append("expiry", document.getElementById("postExpiry").value);
    formData.append("hashtags", hashtagInput.value || autoHashtag.textContent);

    // images
    const files = imageInput.files;
    for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
    }

    try {
        const res = await fetch("/posts/create", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (data.success) {
            modal.classList.add("hidden");

            form.reset();
            previewBox.innerHTML = "";
            autoHashtag.textContent = "#campusbuzz";

            // reload feed instantly
            loadFeed();
        }

    } catch (err) {
        console.log("Create post error:", err);
    }
});

/* =========================
   CREATE POST CARD (DYNAMIC)
========================= */

function createPostCard(data) {

    const card = document.createElement("div");
    card.className = "post-card";

    card.innerHTML = `
        <div class="post-header">
            <div class="user-info">
                <img src="${data.avatar}" class="avatar">
                <div class="meta">
                    <h4 class="author">${data.author}</h4>
                    <span class="time">${data.created}</span>
                </div>
            </div>
        </div>

        <div class="post-title">
            <h3>${data.title}</h3>
        </div>

        ${data.image ? `
        <div class="post-image">
            <img src="${data.image}">
        </div>` : ""}

        <div class="post-description">
            <p>${data.description}</p>
        </div>

        <div class="post-meta">
            <span class="location">📍 ${data.location}</span>
            <span class="hashtag">${data.hashtag}</span>
        </div>

        <div class="post-stats">
            <div>👥 ${data.joined}/${data.total}</div>
            <div>❤️ ${data.likes} 💬 ${data.comments}</div>
        </div>

        <div class="post-actions">
            <button class="tag-btn">${data.hashtag}</button>
            <button class="join-btn">Join Room</button>
        </div>
    `;

    return card;
}

/* =========================
   SEARCH FILTER
========================= */

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    document.querySelectorAll(".post-card").forEach(card => {
        const text = card.innerText.toLowerCase();

        if (text.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

/* =========================
   CLICK EVENTS (DELEGATION)
========================= */

document.addEventListener("click", (e) => {

    // Join Room button
    if (e.target.classList.contains("join-btn")) {
        alert("Joining Room (Backend in Phase 2)");
    }

    // Hashtag click
    if (e.target.classList.contains("tag-btn")) {
        const tag = e.target.innerText;
        alert(`Open Room for ${tag} (Socket.IO later)`);
    }

});

/* =========================
   LOAD POSTS FROM BACKEND
========================= */

document.addEventListener("DOMContentLoaded", loadFeed);

async function loadFeed() {

    try {
        const res = await fetch("/posts/feed");
        const posts = await res.json();

        postsContainer.innerHTML = "";

        posts.forEach(post => {

            const card = createPostCard({
                author: "User",
                avatar: "/images/profile.png",
                title: post.title,
                description: post.description,
                hashtag: post.hashtags?.[0] || "#campus",
                location: post.location,
                image: post.images?.[0] || "",
                joined: post.participants,
                total: post.maxParticipants,
                likes: 0,
                comments: 0,
                created: new Date(post.createdAt).toLocaleString()
            });

            postsContainer.appendChild(card);
        });

    } catch (err) {
        console.log("Feed error:", err);
    }
}


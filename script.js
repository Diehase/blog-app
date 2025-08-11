// Загружаем посты из LocalStorage
let posts = JSON.parse(localStorage.getItem("posts")) || [];

// Элементы
const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("posts");

// Отображаем посты
function renderPosts() {
    postsContainer.innerHTML = "";
    posts.forEach((post, index) => {
        const postEl = document.createElement("div");
        postEl.classList.add("post");

        postEl.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>
        `;

        postsContainer.appendChild(postEl);
    });
}

// Добавление нового поста
postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    posts.push({ title, content });
    localStorage.setItem("posts", JSON.stringify(posts));

    postForm.reset();
    renderPosts();
});

// Редактирование поста
function editPost(index) {
    const newTitle = prompt("Edit title:", posts[index].title);
    const newContent = prompt("Edit content:", posts[index].content);

    if (newTitle && newContent) {
        posts[index] = { title: newTitle, content: newContent };
        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();
    }
}

// Удаление поста
function deletePost(index) {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
}

// Первоначальный рендер
renderPosts();
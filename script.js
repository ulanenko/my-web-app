// Your table data goes here
const tableData = [
  { title: "Article 1", content: "Content of Article 1." },
  { title: "Article 2", content: "Content of Article 2." },
  // Add more articles as needed
];

const articlesDiv = document.getElementById("articles");

function displayArticles(articles) {
  articlesDiv.innerHTML = "";
  articles.forEach((article) => {
    const articleElement = document.createElement("article");
    articleElement.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.content}</p>
    `;
    articlesDiv.appendChild(articleElement);
  });
}

document.getElementById("search").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filteredArticles = tableData.filter((article) =>
    article.title.toLowerCase().includes(query)
  );
  displayArticles(filteredArticles);
});

// Display all articles initially
displayArticles(tableData);

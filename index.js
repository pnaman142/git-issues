const issuesList = document.getElementById("issues-list");
const pageNumber = document.getElementById("page-number");
let currentPage = 1;

function displayIssues() {
  fetch(
    `https://api.github.com/repositories/1296269/issues?page=${currentPage}&per_page=5`
  )
    .then((response) => response.json())
    .then((issues) => {
      issuesList.innerHTML = issues
        .map((issue) => `<li>${issue.title}</li>`)
        .join("");
      pageNumber.innerText = `Git Issues (page-${currentPage})`;
      currentPage > 1
        ? issuesList.setAttribute("start", `${(currentPage - 1) * 5 + 1}`)
        : issuesList.setAttribute("start", "1");
    })
    .catch((error) => console.error(error));
}

displayIssues();

document.getElementById("load-next").addEventListener("click", () => {
  currentPage++;
  displayIssues();
});

document.getElementById("load-prev").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayIssues();
  }
});

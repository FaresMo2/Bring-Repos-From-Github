"use strict";

let theInput = document.querySelector(".get-repo input"),
  theButton = document.querySelector(".get-repo .get-button"),
  reposData = document.querySelector(".show-data");

theButton.onclick = function () {
  getRepo();
};

// Create Function To Get Repo
function getRepo() {
  // Check The State Of Input Value

  if (theInput.value === "") {
    reposData.innerHTML = "<span>Sorry Value Can't Be Empty.</span>";
    reposData.style.color = "red";
  } else {
    // Get Repos
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((result) => result.json())

      .then((repos) => {
        reposData.innerHTML = ``;

        repos.forEach((repo) => {
          // Create Main Div Element
          let mainDiv = document.createElement("div");

          // Text Inside Main Div
          let repoName = document.createTextNode(repo.name);

          // Appent Text Inside Main Div
          mainDiv.appendChild(repoName);

          // Create Repo Link
          let theUrl = document.createElement("a");

          // The Url Text
          let theUrlText = document.createTextNode("Visit");

          // Appent theUrlText Inside theUrl
          theUrl.appendChild(theUrlText);

          // The Url Link "href"
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

          // Target Blank To The Link
          theUrl.setAttribute("target", "_blank");

          // Create Stars Count Element
          let theStars = document.createElement("span");

          // Create Star Count Text
          let theStarsText = document.createTextNode(
            `Starts ${repo.stargazers_count}`
          ); // ==> Error

          // Appent StarsText Inside Stars
          theStars.appendChild(theStarsText);

          // Create Div To put a and span inside For Styling
          let aspanCountainer = document.createElement("div");

          // Append The a(Url) And Span(Starts) inside aspanCountainer
          aspanCountainer.appendChild(theUrl);
          aspanCountainer.appendChild(theStars);

          // Create Class For aspanCountainer
          aspanCountainer.className = "aspan";

          // Append aspanCountainer Inside Main Div
          mainDiv.appendChild(aspanCountainer);

          mainDiv.className = "repo-box";

          // Appen MainDiv inside Show Data
          reposData.appendChild(mainDiv);
        });
      });
  }
}

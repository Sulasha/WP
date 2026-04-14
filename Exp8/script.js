const input = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const loader = document.getElementById("loader");

let debounceTimer;

function debounceSearch(query){

clearTimeout(debounceTimer);

debounceTimer = setTimeout(()=>{
fetchAnime(query);
},400);

}

async function fetchAnime(query){

if(query === ""){
suggestions.innerHTML="";
return;
}

loader.innerText="Searching anime...";

try{

const response = await fetch(
`https://api.jikan.moe/v4/anime?q=${query}&limit=5`
);

const data = await response.json();

displayResults(data.data);

loader.innerText="";

}
catch(error){

loader.innerText="Error fetching data";

}

}

function displayResults(animeList){

suggestions.innerHTML="";

animeList.forEach(anime => {

const card = document.createElement("div");
card.classList.add("card");

card.innerHTML=`

<img src="${anime.images.jpg.image_url}">

<div>
<div class="title">${anime.title}</div>
<div class="rating">
⭐ ${anime.score ?? "N/A"} | Episodes: ${anime.episodes ?? "?"}
</div>
</div>

`;

card.addEventListener("click",()=>{
showDetails(anime);
});

suggestions.appendChild(card);

});

}

function showDetails(anime){

suggestions.innerHTML=`

<div style="padding:15px">

<h3>${anime.title}</h3>

<img src="${anime.images.jpg.large_image_url}" width="200">

<p><b>Episodes:</b> ${anime.episodes ?? "Unknown"}</p>

<p><b>Rating:</b> ${anime.score ?? "N/A"}</p>

<p><b>Synopsis:</b> ${anime.synopsis.slice(0,200)}...</p>

</div>

`;

}

input.addEventListener("input",function(){

const query = this.value.trim();

debounceSearch(query);

});

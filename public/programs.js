// programs.js
const programs = [
  {
    name: "Beginner Fat Burn",
    category: "weight-loss",
    image: "images/fatburn.jpg",
    description: "A 2-week kickstart for your weight loss journey. No equipment needed."
  },
  {
    name: "Full Body Toning",
    category: "toning",
    image: "images/toning.jpg",
    description: "Strengthen and tone every part of your body in just 3 weeks."
  },
  {
    name: "Muscle Gain Challenge",
    category: "muscle-gain",
    image: "images/muscle.jpg",
    description: "A 4-week hypertrophy program with gym & home options."
  },
];

const grid = document.getElementById("programGrid");
const search = document.getElementById("searchProgram");
const filter = document.getElementById("goalFilter");

function displayPrograms(data) {
  grid.innerHTML = "";
  data.forEach(prog => {
    grid.innerHTML += `
      <div class="program-card">
        <img src="${prog.image}" alt="${prog.name}" />
        <div class="info">
          <h3>${prog.name}</h3>
          <p>${prog.description}</p>
        </div>
      </div>
    `;
  });
}

search.addEventListener("input", () => {
  const searchTerm = search.value.toLowerCase();
  const filtered = programs.filter(p => p.name.toLowerCase().includes(searchTerm));
  displayPrograms(filtered);
});

filter.addEventListener("change", () => {
  const val = filter.value;
  const filtered = val === "all" ? programs : programs.filter(p => p.category === val);
  displayPrograms(filtered);
});

displayPrograms(programs);

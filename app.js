// Selecting DOM elements
const skillNameInput = document.getElementById("skill-name");
const skillCategoryInput = document.getElementById("skill-category");
const skillLevelInput = document.getElementById("skill-level");
const addSkillForm = document.getElementById("add-skill-form");
const skillsList = document.getElementById("skills-list");
const filterCategoryInput = document.getElementById("filter-category");
const filterLevelInput = document.getElementById("filter-level");
const applyFilterButton = document.getElementById("apply-filter");
const totalSkillsElement = document.getElementById("total-skills");
const beginnerSkillsElement = document.getElementById("beginner-skills");
const intermediateSkillsElement = document.getElementById("intermediate-skills");
const advancedSkillsElement = document.getElementById("advanced-skills");
const toggleThemeButton = document.getElementById("toggle-theme");

let skills = []; // Array to store skills

// Function to render the skills list
function renderSkills() {
  skillsList.innerHTML = "";

  const filteredCategory = filterCategoryInput.value;
  const filteredLevel = filterLevelInput.value;

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = filteredCategory === "All" || skill.category === filteredCategory;
    const matchesLevel = filteredLevel === "All" || skill.level === filteredLevel;
    return matchesCategory && matchesLevel;
  });

  if (filteredSkills.length === 0) {
    skillsList.innerHTML = "<li class='list-group-item'>No skills found.</li>";
    return;
  }

  filteredSkills.forEach((skill, index) => {
    const skillItem = document.createElement("li");
    skillItem.className = "list-group-item";

    skillItem.innerHTML = `
      <div class="skill-info">
        <span><strong>${skill.name}</strong></span>
        <span class="category">Category: ${skill.category}</span>
        <span class="level">Level: ${skill.level}</span>
      </div>
      <div class="buttons">
        <button class="btn btn-warning btn-sm" onclick="editSkill(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteSkill(${index})">Delete</button>
      </div>
    `;

    skillsList.appendChild(skillItem);
  });

  updateStatistics();
}

// Function to update statistics
function updateStatistics() {
  totalSkillsElement.textContent = skills.length;

  const beginnerCount = skills.filter((skill) => skill.level === "Beginner").length;
  const intermediateCount = skills.filter((skill) => skill.level === "Intermediate").length;
  const advancedCount = skills.filter((skill) => skill.level === "Advanced").length;

  beginnerSkillsElement.textContent = beginnerCount;
  intermediateSkillsElement.textContent = intermediateCount;
  advancedSkillsElement.textContent = advancedCount;
}

// Function to add a new skill
addSkillForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const skillName = skillNameInput.value.trim();
  const skillCategory = skillCategoryInput.value;
  const skillLevel = skillLevelInput.value;

  if (skillName === "") {
    alert("Skill name cannot be empty.");
    return;
  }

  skills.push({
    name: skillName,
    category: skillCategory,
    level: skillLevel,
  });

  skillNameInput.value = ""; // Clear input
  renderSkills();
});

// Function to delete a skill
function deleteSkill(index) {
  if (confirm("Are you sure you want to delete this skill?")) {
    skills.splice(index, 1);
    renderSkills();
  }
}

// Function to edit a skill
function editSkill(index) {
  const skill = skills[index];

  const newName = prompt("Enter new name:", skill.name);
  const newCategory = prompt("Enter new category:", skill.category);
  const newLevel = prompt("Enter new level (Beginner, Intermediate, Advanced):", skill.level);

  if (newName && newCategory && newLevel) {
    skills[index] = {
      name: newName,
      category: newCategory,
      level: newLevel,
    };

    renderSkills();
  } else {
    alert("Invalid input. No changes made.");
  }
}

// Function to apply filter
applyFilterButton.addEventListener("click", () => {
  renderSkills();
});

// Toggle dark mode
toggleThemeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    document.body.style.backgroundColor = "#343a40";
    document.body.style.color = "#f8f9fa";
    toggleThemeButton.textContent = "Light Mode";
  } else {
    document.body.style.backgroundColor = "#f8f9fa";
    document.body.style.color = "#343a40";
    toggleThemeButton.textContent = "Dark Mode";
  }
});

// Initial render
renderSkills();
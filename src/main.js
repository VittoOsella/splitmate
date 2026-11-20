console.log("SplitMate está funcionando");
const groupForm = document.querySelector(".group-form");
const groupsList = document.querySelector("#groups-list");
const emptyMessage = document.querySelector(".empty-message");
let groups = [];
function renderGroups() {
  groupsList.innerHTML = "";
  emptyMessage.style.display = groups.length === 0 ? "block" : "none";

  groups.forEach(function (groupName) {
    const groupElement = document.createElement("div");

    groupElement.textContent = groupName;
    groupElement.classList.add("group-item");

    groupsList.appendChild(groupElement);
  });
}
groups = JSON.parse(localStorage.getItem("groups")) || [];
groupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const groupName = document.querySelector("#group-name").value.trim();
  if (groupName.trim() === "") {
    alert("Por favor, ingresá un nombre para el grupo");
    return;
  }
  const groupExists = groups.some(function (existingGroup) {
    return existingGroup.toLowerCase() === groupName.toLowerCase();
  });
  if (groupExists) {
    alert("Ya existe un grupo con ese nombre");
    return;
  }
  console.log("Nombre del grupo:", groupName);
  console.log("Se intentó crear un grupo con el nombre:", groupName);
  groups.push(groupName);

  localStorage.setItem("groups", JSON.stringify(groups));
  groupForm.reset();
  renderGroups();
});
renderGroups();

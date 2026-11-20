console.log("SplitMate está funcionando");
const groupForm = document.querySelector(".group-form");
const groupsList = document.querySelector("#groups-list");
const emptyMessage = document.querySelector(".empty-message");
let groups = [];
function renderGroups() {
  groupsList.innerHTML = "";
  emptyMessage.style.display = groups.length === 0 ? "block" : "none";

  groups.forEach(function (group, index) {
    const groupElement = document.createElement("div");

    groupElement.textContent = group.name;
    groupElement.classList.add("group-item");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function () {
      const confirmDelete = confirm("¿Seguro que querés eliminar este grupo?");

      if (!confirmDelete) {
        return;
      }
      groups.splice(index, 1);
      localStorage.setItem("groups", JSON.stringify(groups));
      renderGroups();
    });

    groupElement.appendChild(deleteButton);
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
    return existingGroup.name.toLowerCase() === groupName.toLowerCase();
  });
  if (groupExists) {
    alert("Ya existe un grupo con ese nombre");
    return;
  }
  console.log("Nombre del grupo:", groupName);
  console.log("Se intentó crear un grupo con el nombre:", groupName);
  const newGroup = {
    id: Date.now(),
    name: groupName,
    participants: [],
  };

  groups.push(newGroup);

  localStorage.setItem("groups", JSON.stringify(groups));
  groupForm.reset();
  renderGroups();
});
renderGroups();

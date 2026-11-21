console.log("SplitMate está funcionando");
const groupForm = document.querySelector(".group-form");
const groupsList = document.querySelector("#groups-list");
const emptyMessage = document.querySelector(".empty-message");
const homeView = document.querySelector("#home-view");
const groupView = document.querySelector("#group-view");
const groupTitle = document.querySelector("#group-title");
const backButton = document.querySelector("#back-button");
let groups = [];
const participantForm = document.querySelector(".participant-form");
let currentGroup = null;
const participantsList = document.querySelector("#participants-list");
const participantsEmpty = document.querySelector(".participants-empty");
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
    deleteButton.addEventListener("click", function (event) {
      event.stopPropagation();
      const confirmDelete = confirm("¿Seguro que querés eliminar este grupo?");

      if (!confirmDelete) {
        return;
      }
      groups.splice(index, 1);
      localStorage.setItem("groups", JSON.stringify(groups));
      renderGroups();
    });
    groupElement.addEventListener("click", function () {
      openGroup(group);
    });

    groupElement.appendChild(deleteButton);
    groupsList.appendChild(groupElement);
  });
}

function renderParticipants() {
  participantsList.innerHTML = "";
  participantsEmpty.style.display =
    currentGroup.participants.length === 0 ? "block" : "none";

  currentGroup.participants.forEach(function (participant) {
    const participantElement = document.createElement("div");

    participantElement.textContent = participant.name;
    participantElement.classList.add("participant-item");

    participantsList.appendChild(participantElement);
  });
}

function openGroup(group) {
  currentGroup = group;
  groupTitle.textContent = group.name;
  renderParticipants();
  homeView.hidden = true;
  groupView.hidden = false;
}

backButton.addEventListener("click", function () {
  groupView.hidden = true;
  homeView.hidden = false;
});
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
participantForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const participantName = document
    .querySelector("#participant-name")
    .value.trim();

  const newParticipant = {
    id: Date.now(),
    name: participantName,
  };

  currentGroup.participants.push(newParticipant);
  localStorage.setItem("groups", JSON.stringify(groups));
  participantForm.reset();
  renderParticipants();
});

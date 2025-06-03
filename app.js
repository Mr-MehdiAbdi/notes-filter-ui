const notes = [
  { title: "Buy milk", completed: true, createdAt: "2024-12-01" },
  { title: "Code project", completed: false, createdAt: "2025-01-15" },
  { title: "Call mom", completed: true, createdAt: "2025-02-05" },
  { title: "Do exercise", completed: false, createdAt: "2025-03-20" },
];

function filterNotes(notes, searchText, status, sortBy) {
  const filteredText = notes.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase().trim())
  );
  const filteredStatus = filteredText.filter((note) =>
    status === "ALL"
      ? true
      : status === "COMPLETED"
      ? note.completed
      : !note.completed
  );
  const sortedNotes = filteredStatus.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortBy === "latest" ? dateB - dateA : dateA - dateB;
  });
  return sortedNotes;
}

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const sortFilter = document.getElementById("sortFilter");
const notesList = document.getElementById("notesList");

function render() {
  const searchText = searchInput.value;
  const status = statusFilter.value;
  const sortBy = sortFilter.value;
  const result = filterNotes(notes, searchText, status, sortBy);
  notesList.innerHTML = "";
  result.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = `${note.title} (${note.completed ? "✅" : "❌"})`;
    notesList.appendChild(li);
  });
}
searchInput.addEventListener("input", render);
statusFilter.addEventListener("change", render);
sortFilter.addEventListener("change", render);
render();

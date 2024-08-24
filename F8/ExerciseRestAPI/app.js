var coursesApi = "http://localhost:3000/courses";
var listCourses = document.getElementById("list-courses");

function start() {
  getCourses(renderCourses);
  handleCreateForm();
}

start();

function getCourses(callback) {
  fetch(coursesApi)
    .then((response) => {
      return response.json();
    })
    .then(callback);
}

function renderCourses(courses) {
  let htmls = courses
    .map((course) => {
      return `
        <li class="course-item-${course.id}">
            <h3 class="name-${course.id}">${course.name}</h3>
            <p class="description-${course.id}">${course.description}</p>
            <button onclick="handleDeleteCourse(${course.id})">Delete</button>
            <button onclick="handleUpdateCourse(${course.id})">Update</button>
        </li>
    `;
    })
    .join("");

  listCourses.innerHTML = htmls;
}

function handleCreateForm() {
  var createBtn = document.getElementById("create");

  createBtn.onclick = (event) => {
    event.preventDefault();
    var name = document.querySelector('input[name="name"]').value;
    var description = document.querySelector('input[name="description"]').value;
    var formData = {
      name: name,
      description: description,
    };
    createCourse(formData, () => {
      getCourses(renderCourses);
    });
  };
}

function createCourse(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(coursesApi, options)
    .then((response) => {
      return response.json();
    })
    .then(callback);
}

// Delete method:
function handleDeleteCourse(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(coursesApi + "/" + id, options)
    .then((response) => {
      return response.json();
    })
    .then(() => {
      var courseItem = document.querySelector(".course-item-" + id);
      if (courseItem) {
        courseItem.remove();
      } else {
      }
    });
}

// Update method
function handleUpdateCourse(id) {
  // Value
  var name = document.querySelector(`.name-${id}`).textContent;
  var description = document.querySelector(`.description-${id}`).textContent;

  // TextField
  var txtName = document.querySelector('input[name="name"]');
  var txtDescription = document.querySelector('input[name="description"]');

  // Value -> TextField
  txtName.value = name;
  txtDescription.value = description;

  // Enable / Disable button
  var createBtn = document.getElementById("create");
  var updateBtn = document.getElementById("update");
  createBtn.style.display = "none";
  updateBtn.style.display = "block";

  updateBtn.onclick = () => {
    // Data
    var formData = {
      name: txtName.value,
      description: txtDescription.value,
    };

    console.log(formData);

    updateCourse(formData, id, () => {
      getCourses(renderCourses);
    });
  };
}

function updateCourse(data, id, callback) {
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(coursesApi + "/" + id, options)
    .then((response) => {
      return response.json();
    })
    .then(callback);
}

document.getElementById("reload").onclick = () => {
  location.reload();
};

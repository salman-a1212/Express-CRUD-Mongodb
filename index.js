// User Add
const addUser = () => {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;
  axios
    .post("https://crud-app-mongodb-1.herokuapp.com/user", {
      name: name,
      email: email,
      address: address,
    })
    .then(function (response) {
      console.log(response);
      getUsers();
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getUsers = () => {
  const result = document.getElementById("result");
  axios
    .get("https://crud-app-mongodb-1.herokuapp.com/users")
    .then(function (response) {
      console.log(response.data);
      const users = response.data;
      // console.log(users)
      const userList = users.map((user) => {
        return ` <tr> <td> ${user.name} </td> <td> ${user.email} </td> <td> ${user.address} </td></tr>`;
      });
      result.innerHTML = "";
      result.innerHTML = userList.join("");
    })
    .catch(function (error) {
      console.log(error);
    });
};

let addBtn = document.getElementById("add");
let viewBtn = document.getElementById("view");
let updateBtn = document.getElementById("update");
let deletBtn = document.getElementById("delete");

addBtn.addEventListener("click", addUser);

// update data
const updateData = async () => {
  let userid = document.getElementById("userid").value;
  console.log("userid", userid);
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;

  if (name) {
    axios
      .put(`https://crud-app-mongodb-1.herokuapp.com/user/${userid}`, { name })
      .then((res) => getUsers());
  }
  if (email) {
    axios
      .put(`https://crud-app-mongodb-1.herokuapp.com/user/${userid}`, { email })
      .then((res) => getUsers());
  }
  if (address) {
    axios
      .put(`https://crud-app-mongodb-1.herokuapp.com/user/${userid}`, {
        address,
      })
      .then((res) => getUsers());
  }
};

updateBtn.addEventListener("click", updateData);

// delete user
const deleteUser = () => {
  let userid = document.getElementById("userid").value;
  const result = document.getElementById("result");
  if (userid) {
    axios
      .delete(`https://crud-app-mongodb-1.herokuapp.com/user/${userid}`)
      .then(() => getUsers());
  }
  result.innerHTML = "";
};

deletBtn.addEventListener("click", deleteUser);

// search a single user
const getUser = () => {
  let userid = document.getElementById("userid").value;
  const result = document.getElementById("result");
  axios
    .get(`https://crud-app-mongodb-1.herokuapp.com/user/${userid}`)
    .then(function (response) {
      console.log(response.data);
      const users = response.data;
      result.innerHTML = ` <tr> <td> ${users.name} </td> <td> ${users.email} </td> <td> ${users.address} </td></tr>`;
    })
    .catch(function (error) {
      console.log(error);
    });
};

viewBtn.onclick = function viewRun() {
  let userid = document.getElementById("userid").value;
  if (userid === "") {
    getUsers();
  } else {
    getUser();
  }
};

// // User Add
// const addUser = () => {
//   let name = document.getElementById("name").value;
//   let email = document.getElementById("email").value;
//   let address = document.getElementById("address").value;
//   axios
//     .post("https://crud-app-mongodb-1.herokuapp.com/user", {
//       name: name,
//       email: email,
//       address: address,
//     })
//     .then(function (response) {
//       console.log(response);
//       getUsers();
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// const getUsers = () => {
//   const result = document.getElementById("result");
//   axios
//     .get("https://crud-app-mongodb-1.herokuapp.com/users")
//     .then(function (response) {
//       console.log(response.data);
//       const users = response.data;
//       // console.log(users)
//       const userList = users.map((user) => {
//         return ` <tr> <td> ${user._id} </td><td> ${user.name} </td> <td> ${user.email} </td> <td> ${user.address} </td></tr>`;
//       });
//       result.innerHTML = "";
//       result.innerHTML = userList.join("");
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// let addBtn = document.getElementById("add");
// let viewBtn = document.getElementById("view");
// let updateBtn = document.getElementById("update");
// let deletBtn = document.getElementById("delete");

// addBtn.addEventListener("click", addUser);

// // update data
// const updateData = async () => {
//   let userid = document.getElementById("userid").value;
//   console.log("userid", userid);
//   let name = document.getElementById("name").value;
//   let email = document.getElementById("email").value;
//   let address = document.getElementById("address").value;

//   if (name) {
//     axios
//       .put(`https://crud-app-mongodb-1.herokuapp.com/user/${userid}`, { name })
//       .then((res) => getUsers());
//   }
//   if (email) {
//     axios
//       .put(`https://crud-app-mongodb-1.herokuapp.com/user/${userid}`, { email })
//       .then((res) => getUsers());
//   }
//   if (address) {
//     axios
//       .put(`https://crud-app-mongodb-1.herokuapp.com/user/${userid}`, {
//         address,
//       })
//       .then((res) => getUsers());
//   }
// };

// updateBtn.addEventListener("click", updateData);

// // delete user
// const deleteUser = () => {
//   let userid = document.getElementById("userid").value;
//   const result = document.getElementById("result");
//   if (userid) {
//     axios
//       .delete(`https://crud-app-mongodb-1.herokuapp.com/user/${userid}`)
//       .then(() => getUsers());
//   }
//   result.innerHTML = "";
// };

// deletBtn.addEventListener("click", deleteUser);

// // search a single user
// const getUser = () => {
//   let userid = document.getElementById("userid").value;
//   const result = document.getElementById("result");
//   axios
//     .get(`https://crud-app-mongodb-1.herokuapp.com/user/${userid}`)
//     .then(function (response) {
//       console.log(response.data);
//       const users = response.data;
//       result.innerHTML = ` <tr> <td> ${users._id} </td><td> ${users.name} </td> <td> ${users.email} </td> <td> ${users.address} </td></tr>`;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// viewBtn.onclick = function viewRun() {
//   let userid = document.getElementById("userid").value;
//   if (userid === "") {
//     getUsers();
//   } else {
//     getUser();
//   }
// };

import axios from 'axios'

let users = [];

function createUser() {
  let name = document.getElementById("inputName").value;
  let email = document.getElementById("inputEmail").value;
  let address = document.getElementById("inputAddress").value;

  axios
    .post("https://crud-app-mongodb-1.herokuapp.com/user", {
      name,
      email,
      address,
    })
    .then(function (response) {
      console.log(response);

      document.getElementById("inputName").value = "";

      getAllUser();

      document.getElementById(
        "alert"
      ).innerHTML = `<div class="alert alert-success" role="alert">
                            User Created Success!
                        </div>`;

      setTimeout(() => {
        document.getElementById("alert").innerHTML = "";
      }, 3000);
    });
}

function getAllUser() {
  axios
    .get("https://crud-app-mongodb-1.herokuapp.com/users")
    .then(function (response) {
      console.log(response);

      users = response.data;

      document.getElementById("tableBody").innerHTML = "";

      users.map((eachUser, index) => {
        document.getElementById(
          "tableBody"
        ).innerHTML += `<tr id="${eachUser._id}">
                                <th scope="row">${eachUser._id}</th>
                                <td>${eachUser.name}</td>
                                <td>${eachUser.email}</td>
                                <td>${eachUser.address}</td>
                                <td>
                                    <button type="button" onclick="editUser('${eachUser._id}', ${index})" class="btn btn-primary">Edit</button>
                                    <button type="button" onclick="deleteUser('${eachUser._id}')" class="btn btn-danger">Delete</button>
                                </td>
                            </tr>`;
      });
    });
}

function editUser(_id, index) {
  console.log(_id, index);

  const userObject = users[index];

  console.log("userObject: ", userObject);

  document.getElementById(_id).innerHTML = `
            <tr id="${_id}"> 
                
                    <th scope="row">${_id}</th>
                    <td><input type="text" id="${_id}-name" value="${userObject.name}" /></td>
                    <td><input type="text" id="${_id}-email" value="${userObject.email}" /></td>
                    <td><input type="text" id="${_id}-address" value="${userObject.address}" /></td>
                    <td>
                        <button type="button" onclick="updateUser('${_id}')" class="btn btn-success">Update</button>
                    </td>
                </tr>`;
}

function deleteUser(_id) {
  axios
    .delete(`https://crud-app-mongodb-1.herokuapp.com/user/${_id}`)
    .then(function (response) {
      console.log(response);

      getAllUser();

      document.getElementById(
        "alert"
      ).innerHTML = `<div class="alert alert-danger" role="alert">
                            User Deleted Success!
                        </div>`;

      setTimeout(() => {
        document.getElementById("alert").innerHTML = "";
      }, 3000);
    });
}

function updateUser(_id) {
  const name = document.getElementById(`${_id}-name`).value;
  const email = document.getElementById(`${_id}-email`).value;
  const address = document.getElementById(`${_id}-address`).value;

  axios
    .put(`https://crud-app-mongodb-1.herokuapp.com/user/${_id}`, {
      name,
      email,
      address,
    })
    .then(function (response) {
      console.log(response);

      getAllUser();

      document.getElementById(
        "alert"
      ).innerHTML = `<div class="alert alert-success" role="alert">
                            User Updated Success!
                        </div>`;

      setTimeout(() => {
        document.getElementById("alert").innerHTML = "";
      }, 3000);
    });
}

getAllUser();

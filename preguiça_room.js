const firebaseConfig = {
  apiKey: "AIzaSyBC_He8nX4oecCST9r_aByIP99A-lfgATQ",
  authDomain: "http://preguisajpregusa.firebaseapp.com",
  databaseURL: "https://preguisajpregusa-default-rtdb.firebaseio.com",
  projectId: "preguisajpregusa",
  storageBucket: "http://preguisajpregusa.appspot.com",
  messagingSenderId: "23446210620",
  appId: "1:23446210620:web:25abaf8b9cca5921e79b39"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Bem-vindo(a) " + user_name + "!";

function addRoom() {

  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adicionar sala"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "preguiça_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}
// Para obter os dados do banco de dados e exibi-los na página de salas do preguiça
getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "preguiça_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}

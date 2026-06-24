import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSHvk26GbK778W4xAM9rIYoNN2u0m8JVU",
  authDomain: "siteunhas-9154d.firebaseapp.com",
  projectId: "siteunhas-9154d",
  storageBucket: "siteunhas-9154d.firebasestorage.app",
  messagingSenderId: "1074891474865",
  appId: "1:1074891474865:web:2aa85054df7710a8ad5f90",
  measurementId: "G-SK77DHXTFY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("agendamentoForm");
const lista = document.getElementById("listaAgendamentos");

async function carregarAgendamentos() {

  lista.innerHTML = "";

  const querySnapshot = await getDocs(
    collection(db, "agendamentos")
  );

  querySnapshot.forEach((documento) => {

    const dados = documento.data();

    const div = document.createElement("div");
    div.classList.add("agendamento");

    div.innerHTML = `
      <div>
        <strong>${dados.nome}</strong><br>
        ${dados.data} - ${dados.horario}
      </div>

      <button class="excluir">
        Excluir
      </button>
    `;

    div.querySelector(".excluir")
      .addEventListener("click", async () => {

        await deleteDoc(
          doc(db, "agendamentos", documento.id)
        );

        carregarAgendamentos();
      });

    lista.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const data = document.getElementById("data").value;
  const horario = document.getElementById("horario").value;

  const snapshot = await getDocs(
    collection(db, "agendamentos")
  );

  let ocupado = false;

  snapshot.forEach((doc) => {

    const dados = doc.data();

    if (
      dados.data === data &&
      dados.horario === horario
    ) {
      ocupado = true;
    }
  });

  if (ocupado) {
    alert("Horário já ocupado!");
    return;
  }

  await addDoc(
    collection(db, "agendamentos"),
    {
      nome,
      data,
      horario
    }
  );

  const mensagem =
document.getElementById("mensagemSucesso");

mensagem.style.display = "block";

setTimeout(() => {
    mensagem.style.display = "none";
}, 5000);

  form.reset();

  carregarAgendamentos();
});

carregarAgendamentos();
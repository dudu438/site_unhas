import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    deleteDoc,
    doc
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "SUA_API_KEY",
  authDomain: "siteunhas-9154d.firebaseapp.com",
  projectId: "siteunhas-9154d",
  storageBucket: "siteunhas-9154d.firebasestorage.app",
  messagingSenderId: "1074891474865",
  appId: "1:1074891474865:web:2aa85054df7710a8ad5f90"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.entrar = async function(){

    const senha =
    document.getElementById("senha").value;

    if(senha !== "marina123"){
        alert("Senha incorreta");
        return;
    }

    document.getElementById("login")
    .style.display = "none";

    document.getElementById("painel")
    .style.display = "block";

    carregarAgendamentos();
};

async function carregarAgendamentos(){

    const lista =
    document.getElementById("listaAdmin");

    lista.innerHTML = "";

    const snapshot =
    await getDocs(
        collection(db,"agendamentos")
    );

    snapshot.forEach((documento)=>{

        const dados = documento.data();

        const div =
        document.createElement("div");

        div.classList.add("agendamento");

        div.innerHTML = `
            <div>
                <strong>${dados.nome}</strong><br>
                ${dados.data}<br>
                ${dados.horario}
            </div>

            <button
            class="excluir">
            Excluir
            </button>
        `;

        div.querySelector(".excluir")
        .addEventListener("click", async()=>{

            await deleteDoc(
                doc(
                    db,
                    "agendamentos",
                    documento.id
                )
            );

            carregarAgendamentos();
        });

        lista.appendChild(div);
    });
}
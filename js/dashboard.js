document.addEventListener("DOMContentLoaded", async () => {
    const logout = document.getElementById("logout");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    logout.addEventListener("click", () => {
        alert("Saindo...");
        localStorage.removeItem("user");
        window.location.href = "index.html";
    });

    const p1 = document.createElement("p");

    p1.textContent = `Nome: ${user.nome}`;
    document.body.appendChild(p1);

    try {
        const res = await fetch("http://localhost:5000/itens", { method: "GET" });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            localStorage.setItem("itens", JSON.stringify(data.itens));

            const lista = document.createElement("ul");

            data.itens.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `${item.nome} - Tipo: ${item.tipo} - Tamanho: ${item.tamanho} - numero de serie: ${item.numero_serie} - data de validade: ${item.data_validade} - Estoque atual: ${item.estoque_atual} - Estoque minimo: ${item.estoque_minimo}`;
                lista.appendChild(li);
            });

            document.body.appendChild(lista);
        } else {
            console.log("Erro ao pegar itens:" || data.error);
        }
    } catch (err) {
        console.log("Erro interno:", err);
    }
});
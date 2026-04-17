/* global $ */
window.sendCodice = function () {
    var code = $("#codice").val();
    var nome = $("#nome").val();
    if (nome.length < 3) {
        window.myalert("Attenzione", "Inserire un nome di almeno 3 caratteri")
        return;
    }
    $.ajax({
        url: "verificacodice_" + code,
        async: false,
        success: function (res_page) {
            console.log(res_page)
            $.ajax(
                {
                    url: "inseriscinome_" + nome,
                    async: false,
                    success: function (result) {
                        nome = result.nome;
                        window.player.setName(nome);
                        window.location.href = "/game_" + result.uuid;
                    }
                })
        },
        error: function (err) {
            window.myalert("Attenzione!", "Il codice inserito non è corretto");
            console.error(err)
        }
    })
}
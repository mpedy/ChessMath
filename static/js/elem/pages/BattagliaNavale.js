import { DrawGame } from "../../Utility/DrawGame.js";

var battaglia_navale = new DrawGame({
    piece_position: {},
    caselle_corrette: ["A3", "E8", "F4", "B5"],
    with_timer: true,
    title: "Seleziona le caselle A3, E8, F4, B5",
    time: 60,
    name: "Battaglia navale"
})

export { battaglia_navale };
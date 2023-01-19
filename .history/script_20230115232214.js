import {Graph} from "./graph.js";
import {kruskals} from "./kruskals.js";
import {prims} from "./prims.js";

let canvas;
let ctx;
let graph;

const RADIUS = 5;

function draw_circle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, RADIUS, 0, 2 * Math.PI);
    ctx.fill();
}

function draw_line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function draw_kruskals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(const vertex of graph.vertices)
        draw_circle(vertex.x, vertex.y);
    const mst = kruskals(graph.edges.slice());
    for(const edge of mst) {
        draw_line(edge.v1.x, edge.v1.y, edge.v2.x, edge.v2.y);
    }
}

function draw_prims() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(const vertex of graph.vertices)
        draw_circle(vertex.x, vertex.y);
    const mst = prims(graph.adj_list);
    for(const edge of mst) {
        draw_line(edge.v1.x, edge.v1.y, edge.v2.x, edge.v2.y);
    }
}

function canvas_click(event) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    const y = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    graph.add_vertex(x, y);
    draw_circle(x, y);
    console.log(graph.adj_list);
}

function main() {
    graph = new Graph();
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

    canvas.addEventListener("click", (event) => canvas_click(event));

    let kruskals_button = document.getElementById("kruskals_button");
    kruskals_button.addEventListener("click", () => draw_kruskals());

    let prims_button = document.getElementById("prims_button");
    prims_button.addEventListener("click", () => draw_prims());
}

main();
import {Vertex} from "./vertex.js";
import {Edge} from "./edge.js";

export class Graph {
    constructor() {
        this.vertices = [];
        this.edges = [];
    }

    add_vertex(x, y) {
        const new_vertex = new Vertex(this.edges.length, x, y);
        for(let old_vertex of this.vertices) {
            let dist = Math.sqrt(Math.pow(old_vertex.x - x, 2) 
                                + Math.pow(old_vertex.y - y, 2));
            this.edges.push(new Edge(old_vertex, new_vertex, dist));
        }
        this.vertices.push(new_vertex);
    }
}
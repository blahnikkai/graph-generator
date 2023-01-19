import {DisjointSet} from "./disjoint_set.js";

function add_sorted(list, edge) {
    let i = 0;
    while(i < list.length && list[i].w >= edge.w)
        ++i;
    list.splice(i, 0, edge);
}

export function prims(adj_list) {
    let visited = new Array(adj_list.length).fill(false);
    let pq = [];
    for(const edge of adj_list[0])
        add_sorted(pq, edge);
    let mst = [];
    let considered = [];
    while(pq.length != 0) {
        const new_edge = pq.pop();
        if(visited[new_edge.v2.n])
            continue;
        visited[new_edge.v2.n] = true;
        mst.push(new_edge);
        for(const adj_edge of adj_list[new_edge.v2.n])
            add_sorted(pq, adj_edge);
    }
    return [mst, considered];
}
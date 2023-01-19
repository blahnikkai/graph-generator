import {DisjointSet} from "./disjoint_set.js";

export function kruskals(graphics, delay, edges) {
    edges.sort((a, b) => a.w - b.w);
    let ds = new DisjointSet(edges.length);
    let mst = [];
    let i = 0;
    function step() {
        if(i >= edges.length)
            return;
        edge = 
        if(ds.find(edge.v1.n) === ds.find(edge.v2.n))
            step();
        mst.push(edge);
        ds.merge(edge.v1.n, edge.v2.n);
        ++i;
        setTimeout(() => step(), delay);
    }
    for(const edge of edges) {
        
    }
    return mst;
}
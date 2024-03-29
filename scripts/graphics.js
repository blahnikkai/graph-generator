export const RADIUS = 10
const LINE_WIDTH = 4

export class Graphics {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.ctx.fillStyle = 'white'
        this.ctx.strokeStyle = 'white'
        this.ctx.font = '24px sans-serif'
        this.ctx.lineWidth = LINE_WIDTH
        this.timeout_id = undefined
        this.draw_nums = false
    }

    clear() {
        clearTimeout(this.timeout_id)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    draw_vertices(vertices) {
        for(const vertex of vertices)
            this.draw_vertex(vertex)
    }

    draw_vertex(vertex) {
        this.draw_circle(vertex.x, vertex.y)
        if(this.draw_nums)
            this.ctx.fillText(vertex.n, vertex.x + 2 * RADIUS, vertex.y)
    }

    draw_edges(edges, color) {
        for(const edge of edges)
            this.draw_edge(edge, color)
    }

    draw_edge(edge, color) {
        this.draw_line(edge.v1.x, edge.v1.y, edge.v2.x, edge.v2.y, color)
    }

    draw_circle(x, y) {
        this.ctx.beginPath()
        this.ctx.arc(x, y, RADIUS, 0, 2 * Math.PI)
        this.ctx.fill()
    }

    draw_line(x1, y1, x2, y2, color) {
        this.ctx.strokeStyle = color
        this.ctx.beginPath()
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        this.ctx.stroke()
    }

    async draw_process(graph, considered, delay) {
        this.clear()
        this.draw_vertices(graph.vertices)
        let i = 0
        let drawn_edges = []
        const step = () => {
            if(i >= considered.length)
                return
            const [edge, in_mst] = considered[i]
            this.clear()
            this.draw_vertices(graph.vertices)
            this.draw_edges(drawn_edges, 'white')
            if(in_mst) {
                this.draw_edge(edge, 'white')
                drawn_edges.push(edge)
            }
            else
                this.draw_edge(edge, 'blue')
            ++i
            return new Promise((resolve) => this.timeout_id = setTimeout(() => resolve(step()), delay))
        }
        await new Promise((resolve) => this.timeout_id = setTimeout(() => resolve(step()), delay))
        this.clear()
        this.draw_vertices(graph.vertices)
        this.draw_edges(drawn_edges, 'white')
    }

    async draw_states(graph, states, delay) {
        this.clear()
        this.draw_vertices(graph.vertices)
        let i = 0
        const step = () => {
            if(i >= states.length)
                return
            this.clear()
            this.draw_vertices(graph.vertices)
            for(let [edge, clr] of states[i])
                this.draw_edge(edge, clr)
            ++i
            return new Promise((resolve) => this.timeout_id = setTimeout(() => resolve(step()), delay))
        }
        await new Promise((resolve) => this.timeout_id = setTimeout(() => resolve(step()), delay))
    }
}
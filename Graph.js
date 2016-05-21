var Graph = function() {

    var vertices = [];

    var vertex = function(x, n) {
        this.data = x;
        this.neighbor = [].concat(n);

        this.addNeighbor = function(n) {
            this.neighbor = this.neighbor.concat(n);
        };

        this.removeNeighbor = function(n) {
            this.neighbor.splice(this.neighbor.indexOf(n), 1);
        };
    };

    var BFS = function(f) {
        if (vertices.length == 0)
            return
        
        var visited = {};
        var q = [];

        q.push(vertices[0]);

        while(q.length>0) {
            var current = q.shift();
            visited[current.data] = true;
            f.apply(current);
            for(var i in current.neighbor) {
                var n = current.neighbor[i];
                if(visited[n.data] != null)
                    q.push(n);
            }
        }
    };

    var DFS = function(f) {
        if(vertices.length == 0)
            return;

        var visited = {};
        var s = [];

        s.push(vertices[0]);

        while(s.length > 0) {
            var current = s.pop();
            visited[current.data] = true;
            f.apply(current);
            for(var i in current.neighbor) {
                var n = current.neighbor[i];
                if(visited[n.data] != null)
                    s.push(n);
            }
        }
    };

    this.add = function(x, n) {
        var v = vertices.filter(function(x) {
            return n.includes(x.data);
        });

        var out = new vertex(x,v);

        v.forEach(function(x) {
            x.addNeighbor(out);
        });

        return vertices.push(out);

    };


    this.print = function () {
        BFS(function(x) {
            console.log(x);
        });
    };

    
};

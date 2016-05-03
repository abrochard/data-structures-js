

var LinkedList = function() {

    var node = function(x) {
        this.data = x;
        this.next = null;
        this.prev = null;
    };
    
    this.head = null;
    this.tail = null;

    var init = function(x) {
        this.head = new node(x);
        this.tail = this.head;
    };

    this.add = function (x) {
        if(this.head == null) {
            init(x);
        } else {
            var t = new node(x);
            t.next = this.head;
            this.head = t;
        }
    };

    this.pop = function () {
        var t = this.head;
        this.head = this.head.next;
        this.head.prev = null;
        return t.data;
    }

    this.peek = function () {
        return this.head.data;
    }

    this.addLast = function (x) {
        if(this.head == null) {
            init(x);
        } else {
            var t = new node(x);
            t.prev = this.tail;
            this.tail.next = t;
            this.tail = t;
        }
    }

    this.removeLast = function () {
        var t = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        return t.data;
    }
    
    this.print = function () {
        var p = this.head;
        var l = [];
        while(p != null) {
            l.push(p.data);
            p = p.next;
        }
        return l;
    };

    this.traverse = function(f) {
        var p = this.head;
        while(p != null) {
            f.apply(p.data);
            p = p.next;
        }
    };
}

var BinaryTree = function(x) {

    var node = function(x, p, l, r) {
        this.x = x;
        this.lchild = l;
        this.rchild = r;
        this.parent = p;
    };

    this.head = new node(x, null, null, null);

    this.add = function(x) {
        return addNode(x, this.head);
    };

    var addNode = function(x,n) {
        if(x > n.x) {
            if(n.rchild != null) {
                return addNode(x, n.rchild);
            } else {
                n.rchild = new node(x, n, null, null);
                return n.rchild;
            }
        } else {
            if(n.lchild != null) {
                return addNode(x, n.lchild);
            } else {
                n.lchild = new node(x, n, null, null);
                return n.lchild;
            }
        }

    };

    this.print = function() {
        printGraph(this.head);
    };

    var printGraph = function(n) {
        if(n == null)
            return;
        
        console.log(n.x);
        printGraph(n.lchild);
        printGraph(n.rchild);
    };

    this.remove = function(x) {
        return removeNode(x, this.head);
    };

    var removeNode = function(x, n) {
        if(n.x < x)
            return removeNode(x, n.rchild);
        else if(n.x > x)
            return removeNode(x, n.lchild);

        // we are at the node we want to remove
        var p = n.parent;

        if(p == null) {
            var temp = n;
            this.head = n.lchild != null ? n.lchild : n.rchild;
            if(this.head != null)
                this.head.parent = null;
            return temp;
        }
        
        var child = n.lchild == null ? n.rchild : n.lchild;
        if(p.lchild == n)
            p.lchild = child;
        else if(p.rchild == n)
            p.rchild = child;

        if(child != null)
            child.parent = p;

        return n;
    };

    this.check = function() {
        return checkBalance(this.head);
    };

    var checkBalance = function(n) {
        if(n == null)
            return true;

        if(n.lchild != null && n.rchild != null && n.lchild.x > n.rchild.x)
            return false;
        
        return checkBalance(n.lchild) && checkBalance(n.rchild);
    };

};

var Stack = function(){

    this.s = new LinkedList();

    var add = function(x) {
        this.s.add(x);
    };

    var pop = function() {
        return this.s.pop();
    };

    var peek = function() {
        return this.s.peek();
    };    
};


var Queue = function() {

    this.q = new LinkedList();

    this.enqueue = function(x) {
        this.q.addLast(x);
    };

    this.dequeue = function() {
        return this.q.pop();
    };
    
};

var Heap = function() {

    var arr = [0];

    this.add = function(x) {
        arr.push(x);
        percolateUp(arr.length-1);
    };

    var percolateUp = function(index) {
        var parent = Math.floor(index/2);
        if(parent == 0)
            return;
        
        if(arr[parent]>arr[index]) {
            var t = arr[index];
            arr[index] = arr[parent];
            arr[parent] = t;
            percolateUp(parent);
        }
    };

    this.deleteMin = function() {
        var x = arr[1];
        arr[1] = arr.pop();
        percolateDown(1);
        return x;
    };

    var percolateDown = function(index) {
        var left = index * 2;
        var right = index * 2 + 1;
        var total = arr.length-1;

        if(total>=left && total>=right) {
            var child = arr[left] < arr[right] ? left : right;
        } else if(total>=left) {
            var child = left;
        } else {
            // no children
            return;
        }

        if(arr[index]>arr[child]) {
            var t = arr[index];
            arr[index] = arr[child];
            arr[child] = t;
            percolateDown(child);
        }
        
    };

    this.remove = function(x) {
        
    };

    this.print = function() {
        for(var i = 1; i<arr.length; i++){
            console.log(arr[i]);
        }
        
    };
    

    this.buildHeap = function(list) {
        arr = [0];
        for(var i in list) {
            this.add(list[i]);
        }
    };

    this.hasMin = function() {
        if(arr.length>1)
            return true;
        else
            return false;
    };
    
};


var heapSort = function(list) {
    var h = new heap();
    h.buildHeap(list);
    h.print();
    var sorted = [];
    while(h.hasMin()) {
        sorted.push(h.deleteMin());
    }
    return sorted;
};

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

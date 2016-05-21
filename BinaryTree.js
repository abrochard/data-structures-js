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

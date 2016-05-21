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

var Queue = function() {

    this.q = new LinkedList();

    this.enqueue = function(x) {
        this.q.addLast(x);
    };

    this.dequeue = function() {
        return this.q.pop();
    };
    
};

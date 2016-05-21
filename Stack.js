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

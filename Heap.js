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

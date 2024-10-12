(function arrayExtension() {
    Array.prototype.last = function() {
        return this[this.length - 1];
    }

    Array.prototype.skip = function(n) {
        if (typeof n === 'number') {
            let result = [];
    
            for (let i = n; i < this.length; i++) {
                result.push(this[i]);
            }
            
            return result;
        }
    }

    Array.prototype.take = function(n) {
        if (typeof n === 'number') {
            return this.slice(0, n);
        }
    }

    Array.prototype.sum = function() {
        return this.reduce((acc, curr) => acc + curr, 0);
    }

    Array.prototype.average = function() {
        return this.sum() / this.length;
    }
})();
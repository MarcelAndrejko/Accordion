function ndCycler(aSize, aStart, aWaitInterval, aOnChange) {
    var onChange = (typeof aOnChange === "function") ? aOnChange : function() {};
    var size = aSize;
    var counter = aStart % aSize;
    var waitInterval = aWaitInterval;
    var timeOutHandler = null;
    this.disable = false;

    function changeValue(index) {
        fromValue = counter;
        toValue = index % size;
        counter = toValue;
        onChange(fromValue, toValue);
    }

    this.stop = function() {
        if (timeOutHandler===null)
            return;
        clearTimeout(timeOutHandler);
        timeOutHandler = null;
    }

    this.start = function() {
        this.stop();
        timeOutHandler = setInterval(function() {
            if (!this.disable)
                changeValue(counter + 1);
        }, waitInterval);
    }

    this.change = function(index) {
        if (timeOutHandler === null) {
            changeValue(index);
        } else {
            this.stop();
            changeValue(index);
            this.start();
        }
    }

}










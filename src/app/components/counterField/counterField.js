class Counter {
    constructor(item, itemMaxValue, itemMinValue, itemStepValue) {
        this.item = item;
        this.itemMaxValue = itemMaxValue;
        this.itemMinValue = itemMinValue
        this.itemStepValue = itemStepValue;
    }

    increaseValue() {
        if (this.item.value != this.itemMaxValue) {
            this.item.value = +this.item.value + this.itemStepValue;
        }
    }

    decreaseValue() {
        if (this.item.value !== this.itemMinValue) {
            this.item.value = +this.item.value - this.itemStepValue;
        }
    }

    //public API method set counters values
    static setValue(item, value) {
        return item.value = value;
    }

    //public API method refresh counters value to default
    static resetValue(item) {
        item.value = item.min;
    }
}

export { Counter };

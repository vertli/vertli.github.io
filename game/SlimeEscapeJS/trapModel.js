class TrapModel extends ObjectModel {

    constructor(x, y, triggered) {
        super(x, y);
        this.triggered = triggered;
    } // end constructor()

    setTriggerStatus(triggered) {
        this.triggered = triggered;
    } // end setTriggerStatus()

    isTriggered() {
        return this.isTriggered;
    } // end isTriggered()

} // end class TrapModel
class PubSub {
    constructor() {
        this.handlers = [];
    }

    on(event, handler) {
        this.handlers.push({
            event: event,
            handler: handler
        });
    }

    trigger(event) {
        for (var i = 0; i < this.handlers.length; i++) {
            if (this.handlers[i].event === event) {
                this.handlers[i].handler.call();
            }
        }
    }
}

export default PubSub;
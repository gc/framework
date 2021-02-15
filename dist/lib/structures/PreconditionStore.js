"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreconditionStore = void 0;
const pieces_1 = require("@sapphire/pieces");
const Result_1 = require("../parsers/Result");
const Precondition_1 = require("./Precondition");
class PreconditionStore extends pieces_1.Store {
    constructor() {
        super(Precondition_1.Precondition, { name: 'preconditions' });
        this.globalPreconditions = [];
    }
    async run(message, command, context = {}) {
        for (const precondition of this.globalPreconditions) {
            const result = await precondition.run(message, command, context);
            if (!result.success)
                return result;
        }
        return Result_1.ok();
    }
    set(key, value) {
        if (value.position !== null) {
            const index = this.globalPreconditions.findIndex((precondition) => precondition.position >= value.position);
            // If a middleware with lower priority wasn't found, push to the end of the array
            if (index === -1)
                this.globalPreconditions.push(value);
            else
                this.globalPreconditions.splice(index, 0, value);
        }
        return super.set(key, value);
    }
    delete(key) {
        const index = this.globalPreconditions.findIndex((precondition) => precondition.name === key);
        // If the middleware was found, remove it
        if (index !== -1)
            this.globalPreconditions.splice(index, 1);
        return super.delete(key);
    }
    clear() {
        this.globalPreconditions.length = 0;
        return super.clear();
    }
}
exports.PreconditionStore = PreconditionStore;
//# sourceMappingURL=PreconditionStore.js.map
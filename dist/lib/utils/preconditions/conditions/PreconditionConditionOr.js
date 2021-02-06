"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreconditionConditionOr = void 0;
const Result_1 = require("../../../parsers/Result");
/**
 * An [[IPreconditionCondition]] which runs all containers similarly to doing (V0 || V1 [|| V2 [|| V3 ...]]).
 * @since 1.0.0
 */
exports.PreconditionConditionOr = {
    async sequential(message, command, entries, context) {
        let error = null;
        for (const child of entries) {
            const result = await child.run(message, command, context);
            if (Result_1.isOk(result))
                return result;
            error = result;
        }
        return error !== null && error !== void 0 ? error : Result_1.ok();
    },
    async parallel(message, command, entries, context) {
        const results = await Promise.all(entries.map((entry) => entry.run(message, command, context)));
        let error = null;
        for (const result of results) {
            if (Result_1.isOk(result))
                return result;
            error = result;
        }
        return error !== null && error !== void 0 ? error : Result_1.ok();
    }
};
//# sourceMappingURL=PreconditionConditionOr.js.map
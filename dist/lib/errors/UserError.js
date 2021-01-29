"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserError = void 0;
/**
 * The UserError class to be emitted in the pieces.
 * @property name This will be `'UserError'` and can be used to distinguish the type of error when any error gets thrown
 */
class UserError extends Error {
    /**
     * Constructs an UserError.
     * @param type The identifier, useful to localize emitted errors.
     * @param message The error message.
     */
    constructor(options) {
        var _a;
        super(options.message);
        this.identifier = options.identifier;
        this.context = (_a = options.context) !== null && _a !== void 0 ? _a : null;
    }
    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    get name() {
        return 'UserError';
    }
}
exports.UserError = UserError;
//# sourceMappingURL=UserError.js.map
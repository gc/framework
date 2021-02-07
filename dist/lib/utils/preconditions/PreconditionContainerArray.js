"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreconditionContainerArray = exports.PreconditionRunCondition = exports.PreconditionRunMode = void 0;
const discord_js_1 = require("discord.js");
const PreconditionConditionAnd_1 = require("./conditions/PreconditionConditionAnd");
const PreconditionConditionOr_1 = require("./conditions/PreconditionConditionOr");
const PreconditionContainerSingle_1 = require("./PreconditionContainerSingle");
/**
 * The run mode for a [[PreconditionContainerArray]].
 * @since 1.0.0
 */
var PreconditionRunMode;
(function (PreconditionRunMode) {
    /**
     * The entries are run sequentially, this is the default behaviour and can be slow when doing long asynchronous
     * tasks, but is performance savvy.
     * @since 1.0.0
     */
    PreconditionRunMode[PreconditionRunMode["Sequential"] = 0] = "Sequential";
    /**
     * All entries are run in parallel using `Promise.all`, then the results are processed after all of them have
     * completed.
     * @since 1.0.0
     */
    PreconditionRunMode[PreconditionRunMode["Parallel"] = 1] = "Parallel";
})(PreconditionRunMode = exports.PreconditionRunMode || (exports.PreconditionRunMode = {}));
/**
 * The condition for a [[PreconditionContainerArray]].
 */
var PreconditionRunCondition;
(function (PreconditionRunCondition) {
    /**
     * Defines a condition where all the entries must pass. This uses [[PreconditionConditionAnd]].
     * @since 1.0.0
     */
    PreconditionRunCondition[PreconditionRunCondition["And"] = 0] = "And";
    /**
     * Defines a condition where at least one entry must pass. This uses [[PreconditionConditionOr]].
     * @since 1.0.0
     */
    PreconditionRunCondition[PreconditionRunCondition["Or"] = 1] = "Or";
})(PreconditionRunCondition = exports.PreconditionRunCondition || (exports.PreconditionRunCondition = {}));
function isSingle(entry) {
    return typeof entry === 'string' || Reflect.has(entry, 'name');
}
/**
 * An [[IPreconditionContainer]] that defines an array of multiple [[IPreconditionContainer]]s.
 *
 * By default, array containers run either of two conditions: AND and OR ([[PreconditionRunCondition]]), the top level
 * will always default to AND, where the nested one flips the logic (OR, then children arrays are AND, then OR...).
 *
 * This allows `['Connect', ['Moderator', ['DJ', 'SongAuthor']]]` to become a thrice-nested precondition container, where:
 * - Level 1: [Single(Connect), Array] runs AND, both containers must return a successful value.
 * - Level 2: [Single(Moderator), Array] runs OR, either container must return a successful value.
 * - Level 3: [Single(DJ), Single(SongAuthor)] runs AND, both containers must return a successful value.
 *
 * In other words, it is identical to doing:
 * ```typescript
 * Connect && (Moderator || (DJ && SongAuthor));
 * ```
 * @remark More advanced logic can be accomplished by adding more [[IPreconditionCondition]]s (e.g. other operators),
 * see [[PreconditionContainerArray.conditions]] for more information.
 * @since 1.0.0
 */
class PreconditionContainerArray {
    constructor(data = [], parent = null) {
        var _a;
        this.entries = [];
        this.runCondition = (parent === null || parent === void 0 ? void 0 : parent.runCondition) === PreconditionRunCondition.And ? PreconditionRunCondition.Or : PreconditionRunCondition.And;
        if (Array.isArray(data)) {
            const casted = data;
            this.mode = (_a = parent === null || parent === void 0 ? void 0 : parent.mode) !== null && _a !== void 0 ? _a : 0 /* Sequential */;
            this.parse(casted);
        }
        else {
            const casted = data;
            this.mode = casted.mode;
            this.parse(casted.entries);
        }
    }
    /**
     * Adds a new entry to the array.
     * @since 1.0.0
     * @param entry The value to add to the entries.
     */
    add(entry) {
        this.entries.push(entry);
        return this;
    }
    /**
     * Runs the container.
     * @since 1.0.0
     * @param message The message that ran this precondition.
     * @param command The command the message invoked.
     */
    run(message, command, context = {}) {
        return this.mode === 0 /* Sequential */
            ? this.condition.sequential(message, command, this.entries, context)
            : this.condition.parallel(message, command, this.entries, context);
    }
    /**
     * Parses the precondition entry resolvables, and adds them to the entries.
     * @since 1.0.0
     * @param entries The entries to parse.
     */
    parse(entries) {
        for (const entry of entries) {
            this.add(isSingle(entry) //
                ? new PreconditionContainerSingle_1.PreconditionContainerSingle(entry)
                : new PreconditionContainerArray(entry, this));
        }
        return this;
    }
    /**
     * Retrieves a condition from [[PreconditionContainerArray.conditions]], assuming existence.
     * @since 1.0.0
     */
    get condition() {
        return PreconditionContainerArray.conditions.get(this.runCondition);
    }
}
exports.PreconditionContainerArray = PreconditionContainerArray;
/**
 * The preconditions to be run. Extra ones can be added by augmenting [[PreconditionRunCondition]] and then
 * inserting [[IPreconditionCondition]]s.
 * @since 1.0.0
 * @example
 * ```typescript
 * // Adding more kinds of conditions
 *
 * // Set the new condition:
 * PreconditionContainerArray.conditions.set(2, PreconditionConditionRandom);
 *
 * // Augment Sapphire to add the new condition, in case of a JavaScript
 * // project, this can be moved to an `Augments.d.ts` (or any other name)
 * // file somewhere:
 * declare module '(at)sapphire/framework' {
 *   export enum PreconditionRunCondition {
 *     Random = 2
 *   }
 * }
 * ```
 */
PreconditionContainerArray.conditions = new discord_js_1.Collection([
    [PreconditionRunCondition.And, PreconditionConditionAnd_1.PreconditionConditionAnd],
    [PreconditionRunCondition.Or, PreconditionConditionOr_1.PreconditionConditionOr]
]);
//# sourceMappingURL=PreconditionContainerArray.js.map
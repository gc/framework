"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'channel' });
    }
    run(argument, context) {
        const channel = (context.message.guild ? context.message.guild.channels : this.context.client.channels).cache.get(argument);
        if (!channel) {
            return this.error(argument, 'ArgumentChannelMissingChannel', 'The argument did not resolve to a channel.');
        }
        return this.ok(channel);
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreChannel.js.map
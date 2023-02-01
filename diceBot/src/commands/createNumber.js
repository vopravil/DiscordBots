import { SlashCommandBuilder } from '@discordjs/builders';
const createNuber = new SlashCommandBuilder()
  .setName('createnumber')
  .setDescription('create number from x to y')
  .addIntegerOption((option) =>
    option
    .setName('from')
    .setDescription('from')
    .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
    .setName('to')
    .setDescription('to')
    .setRequired(true))

export default createNuber.toJSON();
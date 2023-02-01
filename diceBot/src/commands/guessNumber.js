import { SlashCommandBuilder } from '@discordjs/builders';
const guessNuber = new SlashCommandBuilder()
  .setName('guessnumber')
  .setDescription('Guess number')
  .addIntegerOption((option) =>
    option
    .setName('number')
    .setDescription('pick number')
    .setRequired(true)
  )
  

export default guessNuber.toJSON();
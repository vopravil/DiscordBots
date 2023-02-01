import { SlashCommandBuilder } from '@discordjs/builders';
const rollCommand = new SlashCommandBuilder()
  .setName('rolldice')
  .setDescription('rolls the dice')


  .addIntegerOption((option) =>
        option
        .setName('dice')
        .setDescription('dice value')
        .setRequired(true)
              .addChoices(
                
                  {
                    name: '4',
                    value: 4,
                  },
                  {
                    name: '6',
                    value: 6,
    
                  },
                  {
                    name: '8',
                    value: 8,
                  },
                  {
                    name: '10',
                    value: 10,
                  },
                  {
                    name: '12',
                    value: 12,
                  },
                  {
                    name: '20',
                    value: 20,
                  },
                  {
                    name: '100',
                    value: 100,
                  },
    )
    )
  .addStringOption((option) => 
         option 
                .setName('advantage')
                .setDescription('dis/advantage')
                .addChoices({name: 'true', value : 'true'},{name: 'folse', value: 'false'},{name: 'none' , value: 'none'}),
                

  )

  .addIntegerOption((option) =>
      option
              .setName('count')
              .setDescription(' count of dice')
             
              
              
    )


    

    .addIntegerOption((option) =>
                      option
                      .setName('bonus')
                      .setDescription('+/- bonus')


      )
export default rollCommand.toJSON();
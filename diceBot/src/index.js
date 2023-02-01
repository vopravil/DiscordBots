import { config, parse  } from 'dotenv';
import {Client, CommandInteraction, ContextMenuCommandAssertions, GatewayIntentBits,Message,Routes} from 'discord.js';
import { REST } from '@discordjs/rest';
import GuessNumber from './commands/guessNumber.js';
import CreateNumber from './commands/createNumber.js';
import RollNumber from './commands/rollComand.js';


config();
const client  = new Client({intents: [GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,]});

const TOKEN = process.env.TUTORIAL_BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID= process.env.GUILD_ID;
const rest = new REST({version:'10'}).setToken(TOKEN);
var wrongAnsw =0 ;
const emojiTrue = '✅';
const emojiFalse = '❌';
var rndNumber ;
var guessNumberHelp = true;



//client.login(TOKEN);
//client.on('ready', () =>{console.log(`${client.user.tag} has log in!!!`);});

client.on('ready', () => console.log(`${client.user.tag} has logged in!`));
client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {
      const { commandName } = interaction;
      console.log("hi wrd");           
      if ( commandName === 'rolldice') {
        
      
      var advantage = interaction.options.getString('advantage');
      var dice = interaction.options.getInteger('dice');
      var count = interaction.options.getInteger('count');
      var bonus = interaction.options.getInteger('bonus');


     
     interaction.reply( roll(advantage,count,dice,bonus));
     /*console.log(roll(advantage,count,dice,bonus));
     console.log(advantage);
     console.log(dice);
     console.log(count);
     console.log(bonus);*/
     // interaction.reply({content:'roll = ' + getRandomInt(6)});
    }
    else if(commandName ==='help')
    {
      interaction.reply('noup');
    }
    if(commandName ==='guessnumber')
    {
      
      
      var guess = interaction.options.getInteger('number');
      
      
      
      
      
      
      if (guess == rndNumber && wrongAnsw < 3 && guessNumberHelp == false ) {
        interaction.reply(emojiTrue);
        guessNumberHelp =true;
      }
      else if (guess != rndNumber && rndNumber != undefined && wrongAnsw < 3 && guessNumberHelp == false){
        wrongAnsw++;
        if(wrongAnsw == 3){
          interaction.reply(emojiFalse +" " +wrongAnsw + '/3\n'+'you failed number was: ' + rndNumber);
          guessNumberHelp = true;
        }
        else{
          
        interaction.reply(emojiFalse +" " +wrongAnsw + '/3');    
        console.log(rndNumber);  
        }
      }
      else{
        interaction.reply('You must first create random number /createnumber');
  
      }


      



      
    }
    

    if(commandName ==='createnumber' && guessNumberHelp == true){
      rndNumber = getRandomNumber(interaction.options.getInteger('from'),interaction.options.getInteger('to'));
      console.log(rndNumber);
      guessNumberHelp = false;
      wrongAnsw =0;
      interaction.reply('number was created');
    }
    else if (commandName ==='createnumber'){
      interaction.reply('number was alredy created, you must guess it /guessnumber');
      
    }
    }
  }); 

 

  function  roll(advantage, count, dice, bonus){
    var advantage = advantage;
    var dice = dice;
    var count = count;
    var bonus = bonus;
    var roll = '';
    var total = 0;
    var randomInt ;
    var rollMessage = '';
    if ( count == null ) {
      count = 1;      
    }
    if (bonus == null) {
      bonus = 0;
    }


    if(advantage == 'true' || advantage == 'false'){
      for (let index = 0; index < 2; index++) {
        
        roll = '';
        total = 0;
      
      for (let index = 0; index < count; index++) {
        randomInt = getRandomInt(dice);
        roll +=  randomInt + ', ';
        total += randomInt; 
        
      }
      total += bonus;
      roll += ' + bonus: ' + bonus + '\n= ' + total;
      rollMessage += roll + '\n';
    }
   
    console.log(rollMessage); 
    console.log(advantage);
    console.log(dice);
    console.log(count);
    console.log(bonus);
    return rollMessage;
  
    }
    else
    {
      for (let index = 0; index < count; index++) {
        randomInt = getRandomInt(dice);
        roll +=  randomInt + ', ';
        total += randomInt; 
        
      }
      total += bonus;
      roll += ' + bonus: ' + bonus + '\n= ' + total;   
       
      rollMessage += roll + '\n';
      console.log(rollMessage); 
      console.log(advantage);
      console.log(dice);
      console.log(count);
      console.log(bonus);
      
      return rollMessage;

    }

  }

  function getRandomInt(max) {
    return  Math.floor(Math.random() * (max)+ 1 );
  }
  function getRandomNumber(min, max) {
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



  


async function main(){

    const commands = [GuessNumber,CreateNumber,RollNumber]
    
    

    try{
        console.log('Started refreshing application (/) commands.');
     

        await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), { body: commands, });
        client.login(TOKEN);
    }
    catch(err)
    {
        console.log(err);

    }
}
main();
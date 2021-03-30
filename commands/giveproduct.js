module.exports = {
  aliases: [],
	async run(client, message, args, sendError) {
    const Discord = require("discord.js");
    let productname = args.slice(1).join(' ')

    if(!message.member.hasPermission('ADMINISTRATOR')){
      return message.channel.send('❌ You need the `Administrator` permission to run this command.')
    }

    if(!args[0]) return sendError('What\'s the ID of the person to give the product to?||giveproduct <id> <productname>')
    if(!productname) return sendError('What is the product\'s name? (Case-Sensitive)||giveproduct <id> <productname>')

    //Check ID
    try {
      await client.users.fetch(args[0])
    } catch (error) {
      return sendError('That\'s not a valid user. Make sure the ID is correct.||giveproduct <id> <productname>')
    }

    await client.usersdb.ensure(`${args[0]}`, {})
    await client.usersdb.ensure(`${args[0]}.${message.guild.id}`, [])
    await client.products.ensure(message.guild.id)

    if(await client.products.get(`${message.guild.id}.${productname}`)){
      let theirproducts = await client.usersdb.get(`${args[0]}.${message.guild.id}`)
      if(!theirproducts.includes(productname)){
        await client.usersdb.push(`${args[0]}.${message.guild.id}`, productname)

        const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Product Given')
        .addField('User', `${args[0]} (<@${args[0]}>)`)
        .addField('Product', productname)
        message.channel.send(embed)
      }else{
        return sendError('This user already owns this product.||giveproduct <id> <productname>')
      }
    }else{
      return sendError('That\'s not a valid product. Make sure you spelt it correctly (Case-Sensitive).||giveproduct <id> <productname>')
    }
  }
};
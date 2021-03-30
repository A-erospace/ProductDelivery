module.exports = {
  aliases: [],
	async run(client, message, args, sendError) {
    const Discord = require("discord.js");

    await client.products.ensure(`${message.author.id}.${message.guild.id}`, [])
    await client.products.ensure(message.guild.id)
    let allproducts = await client.products.get(message.guild.id)
    let myproducts = await client.usersdb.get(`${message.author.id}.${message.guild.id}`)

    let productnames = []
    for (key in allproducts) {
      productnames.push(allproducts[key].name)
    }

    let myproductnames = []
    for (key in myproducts) {
      if(productnames.includes(myproducts[key])){
        myproductnames.push(myproducts[key])
      }
    }

    const embed = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTitle('Your Products')
    .setDescription(myproductnames.join('\n') || '**None**')
    .setTimestamp()
    message.channel.send(embed)
  }
};
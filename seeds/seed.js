const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userSeed = require('./userSeed.json');
const blogposts = require('./blogposts.json');

const seedDB = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeed, {
        individualHooks: true,
        returning: true
    });

    for (const blogpost of blogposts) {
        await Post.create({
            ...blogpost,
            user_id: users[Math.floor(Math.random() * users.length)].id
        });
    }

    process.exit(0);
};

seedDB();
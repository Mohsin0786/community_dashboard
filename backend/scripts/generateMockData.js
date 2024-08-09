require('dotenv').config();
const mongoose = require('mongoose');

const { faker } = require('@faker-js/faker');
const User = require('../models/User');
const Message = require('../models/Message');
const DB_URI = process.env.MONGO_URI;

const generateUsers = async (numUsers) => {
    const users = [];
  for (let i = 0; i < numUsers; i++) {
    const joinDate = faker.date.past({ years: 1 });
    users.push(new User({
      username: faker.internet.userName(),
      joinDate,
      lastActive:  faker.date.between({ from: joinDate, to: new Date()}),
      messageCount: faker.number.int({ min: 10, max: 100 })
    }));
  }
  await User.insertMany(users);
  console.log(`${numUsers} users created.`);
};

const generateMessages = async (numMessages) => {
  const users = await User.find();
  const messages = [];
  for (let i = 0; i < numMessages; i++) {
    const user = faker.helpers.arrayElement(users);
    messages.push(new Message({
      userId: user._id,
      content: faker.lorem.sentence(),
      timestamp: faker.date.between({ from: user.joinDate, to: new Date()})
    }));
  }
  // console.log(messages)
  await Message.insertMany(messages);
  console.log(`${numMessages} messages created.`);
};

const generateMockData = async () => {
  await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  console.log('Connected to MongoDB.');

  await User.deleteMany({});
  await Message.deleteMany({});

  await generateUsers(150);
  await generateMessages(9000);

  mongoose.disconnect();
  console.log('Mock data generated and MongoDB disconnected.');
};

generateMockData();

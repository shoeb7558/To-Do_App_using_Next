import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await MongoClient.connect('mongodb+srv://shoebshaikh:bepositive@cluster1.zxfllfq.mongodb.net/tasks?retryWrites=true&w=majority', {
        
      });

      const db = client.db();
      const tasksCollection = db.collection('tasks');

      // Fetch all documents from the 'tasks' collection
      const tasks = await tasksCollection.find({}).toArray();

      client.close();
      res.status(200).json({ tasks });
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;

import { MongoClient } from "mongodb";

async function handler4(req, res) {
  console.log(req.body)
  if (req.method === 'POST') {
    const data = req.body;
    console.log(data)

    try {
      const client = await MongoClient.connect('mongodb+srv://shoebshaikh:bepositive@cluster1.zxfllfq.mongodb.net/tasks?retryWrites=true&w=majority', {
        
      });

      const db = client.db();
      const tasksCollection = db.collection('tasks');
      
      const result = await tasksCollection.insertOne(data);
      console.log(result);
      
      client.close();
      res.status(201).json({ message: 'tasks inserted' });
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default handler4;

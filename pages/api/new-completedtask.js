import { MongoClient } from "mongodb";

async function handler(req, res) {
  console.log(req.body)
  if (req.method === 'POST') {
    const data = req.body;
    console.log(data)

    try {
      const client = await MongoClient.connect('mongodb+srv://shoebshaikh:bepositive@cluster1.zxfllfq.mongodb.net/completedtasks?retryWrites=true&w=majority', {
        
      });

      const db = client.db();
      const completedtasksCollection = db.collection('completedtasks');
      
      const result = await completedtasksCollection.insertOne(data);
      console.log(result);
      
      client.close();
      res.status(201).json({ message: 'completedtasks inserted' });
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default handler;

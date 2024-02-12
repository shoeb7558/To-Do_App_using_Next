// Import necessary dependencies
import { MongoClient } from "mongodb";

// Define your API handler function
async function handler2(req, res) {
    if (req.method === 'GET') {
        try {
            // Connect to MongoDB
            const client = await MongoClient.connect('mongodb+srv://shoebshaikh:bepositive@cluster1.zxfllfq.mongodb.net/tasks?retryWrites=true&w=majority');
            const db = client.db();
            
            // Fetch tasks with completed status set to false
            const tasks = await db.collection('tasks').find({ completed: false }).toArray();
            
            // Close MongoDB connection
            client.close();

            // Send tasks data as response
            res.status(200).json({ tasks });
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' }); // Return method not allowed for unsupported HTTP methods
    }
}

export default handler2;



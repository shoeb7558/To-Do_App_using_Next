// Import necessary dependencies
import { MongoClient, ObjectId } from "mongodb";

// Define your API handler function
async function handler1(req, res) {
    if (req.method === 'DELETE') {
        const taskId = req.body.taskId; // Extract taskId from the request body

        try {
            // Connect to MongoDB
            const client = await MongoClient.connect('mongodb+srv://shoebshaikh:bepositive@cluster1.zxfllfq.mongodb.net/tasks?retryWrites=true&w=majority');
            const db = client.db();
            
            // Delete the task with the specified taskId
            const result = await db.collection('tasks').deleteOne({ _id: ObjectId(taskId) });
            
            // Close MongoDB connection
            client.close();

            if (result.deletedCount === 1) {
                res.status(200).json({ message: 'Task deleted successfully' });
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' }); // Return method not allowed for unsupported HTTP methods
    }
}

export default handler1;

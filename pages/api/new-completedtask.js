import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'PUT') {
        const { taskId } = req.query;
        

        try {
            const client = await MongoClient.connect('mongodb+srv://shoebshaikh:bepositive@cluster1.zxfllfq.mongodb.net/tasks?retryWrites=true&w=majority');
            const db = client.db();
            const tasksCollection = db.collection('tasks');

            const result = await tasksCollection.updateOne(
                { _id: taskId },
                { $set: { completed: true } } // Set completed to true for the specified task
            );

            client.close();

            if (result.modifiedCount === 1) {
                res.status(200).json({ message: 'Task completed successfully' });
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default handler;

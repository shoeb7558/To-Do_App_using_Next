import { MongoClient } from "mongodb";

async function handler5(req, res) {
    if (req.method === 'PUT') {
        const { taskId } = req.query;
        const { text } = req.body; // Extract the new text from the request body

        try {
            const client = await MongoClient.connect('mongodb+srv://shoebshaikh:bepositive@cluster1.zxfllfq.mongodb.net/tasks?retryWrites=true&w=majority');
            const db = client.db();
            const tasksCollection = db.collection('tasks');

            const result = await tasksCollection.updateOne(
                { _id: taskId },
                { $set: { task: text } } // Update the task field with the new text
            );

            client.close();

            if (result.modifiedCount === 1) {
                res.status(200).json({ message: 'Task updated successfully' });
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default handler5;

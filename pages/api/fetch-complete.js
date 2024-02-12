// Update your server-side code to handle the request for fetching completed tasks
async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const client = await MongoClient.connect('mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority');
            const db = client.db();
            const tasksCollection = db.collection('tasks');

            // Find tasks where completed is true
            const completedTasks = await tasksCollection.find({ completed: true }).toArray();

            client.close();

            res.status(200).json({ completedTasks });
        } catch (error) {
            console.error('Error fetching completed tasks:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}

export default handler;

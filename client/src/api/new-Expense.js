// /src/api/new-Expense
import { MongoClient }from 'mongodb';


export default async function handler(req, res) {
    try {
        const client = await MongoClient.connect('mongodb+srv://smash:smash0321@project1.7s6wwcj.mongodb.net/Expenses_db?appName=Project1');
        if (!client) {
            return res.status(500).json({ error: 'Failed to connect to database' });
        }
        const db = client.db();
        const Expense = db.collection('Expenses');


        if (req.method === 'GET') {
            const expenses = await Expense.find().sort({ date: -1 });
            return res.status(200).json(expenses);
        }

        if (req.method === 'POST') {
            const data = req.body;
            if (!data.title || data.amount == null || !data.date) {
                return res.status(400).json({ error: 'title, amount and date are required' });
            }


            const result = await  Expense.insertOne(data);
            console.log('Expense inserted with ID:', result.insertedId);
            client.close();

            return res.status(201).json(data);
        }

        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

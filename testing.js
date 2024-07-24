const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');


const superbaseUrl = 'https://kdcwsxgqlmzeyfszmhvz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkY3dzeGdxbG16ZXlmc3ptaHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4NDQ5MzYsImV4cCI6MjAzNzQyMDkzNn0.AEuiTUkQJICcN2svKaQ0Yu7vL_o2I83Zg6_Ptajr1vA';
const supabase = createClient(superbaseUrl, supabaseKey);

app.use(bodyParser.json());

app.get('/inventory', (req, res) => {
	res.json({value: 10});
})

app.post('/inventory', async (req, res) => {
	const { value } = req.body;
	try {
		const { data, error } = await supabase
			.from('sensor_data')
			.insesrt([{ value }]);
		if (error) throw error;
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

server.listen(3000, () => {
	console.log('listening on *:3003');
});
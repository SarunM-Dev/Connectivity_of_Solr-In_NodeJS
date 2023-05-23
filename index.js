const express = require('express');
const fs = require('fs');
const SolrNode = require('solr-node');

const app = express();
const port = 4000;
const solrUrl = 'http://localhost:8983/solr';
const collectionName = 'Solr_sample_core'; // Replace with your collection name

app.post('/update', (req, res) => {
  try {
    // Read the JSON file
    const jsonData = fs.readFileSync('./data.json', 'utf8');
    // Parse the JSON data
    const parsedData = JSON.parse(jsonData);
    console.log(parsedData);

    // Create a Solr client
    const solrClient = new SolrNode({
      host: 'localhost',
      port: '8983',
      core: collectionName,
      protocol: 'http',
      debugLevel: 'ERROR' // Set the desired debug level
    });

    // Index the JSON data
    solrClient.update(parsedData, (err, result) => {
      if (err) {
        console.error('Error indexing documents:', err);
        res.status(500).json({ error: 'Error indexing documents' });
      } else {
        console.log('Documents indexed successfully.');
        res.json({ message: 'Documents indexed successfully' });
      }
    });
  } catch (err) {
    console.error('Error reading JSON file:', err);
    res.status(500).json({ error: 'Error reading JSON file' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

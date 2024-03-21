// Import the required libraries
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'studentDB';

// Create a MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to the database');

        // Get the database instance
        const db = client.db(dbName);

        // Define the academic records collection schema
        const academicCollection = db.collection('academic_records');

        // Define the co-curricular activities collection schema
        const coCurricularCollection = db.collection('co_curricular_activities');

        // Define sample academic records data
        const sampleAcademicData = [
            { studentID: 1, name: 'Alice', grades: { math: 90, science: 85, english: 88 }, subjects: ['math', 'science', 'english'] },
            { studentID: 2, name: 'Bob', grades: { math: 78, science: 80, english: 75 }, subjects: ['math', 'science', 'english'] },
            // Add more sample academic data here
        ];

        // Insert sample academic records data into the academic collection
        await academicCollection.insertMany(sampleAcademicData);
        console.log('Sample academic records data inserted');

        // Define sample co-curricular activities data
        const sampleCoCurricularData = [
            { studentID: 1, name: 'Alice', activityType: 'Music Club', duration: '2 years', achievements: ['Best Singer Award'] },
            { studentID: 2, name: 'Bob', activityType: 'Sports Club', duration: '3 years', achievements: ['Football Team Captain'] },
            // Add more sample co-curricular data here
        ];

        // Insert sample co-curricular activities data into the co-curricular collection
        await coCurricularCollection.insertMany(sampleCoCurricularData);
        console.log('Sample co-curricular activities data inserted');

        // Test data retrieval from academic records collection
        const academicData = await academicCollection.find({}).toArray();
        console.log('Academic records data:');
        console.log(academicData);

        // Test data retrieval from co-curricular activities collection
        const coCurricularData = await coCurricularCollection.find({}).toArray();
        console.log('Co-curricular activities data:');
        console.log(coCurricularData);

        // Perform CRUD operations as needed
        // Example: Update a student's academic record
        await academicCollection.updateOne({ studentID: 1 }, { $set: { grades: { math: 95, science: 88, english: 90 } } });
        console.log('Academic record updated for student with ID 1');

        // Example: Delete a co-curricular activity record
        await coCurricularCollection.deleteOne({ studentID: 2, activityType: 'Sports Club' });
        console.log('Co-curricular activity record deleted for student with ID 2');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the connection
        await client.close();
        console.log('Connection closed');
    }
}

// Run the main function
main();

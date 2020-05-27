const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')  //returns a promise
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

const courseSchema = new mongoose.Schema({   //object
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    Price: Number
});

const Course = mongoose.model('Course', courseSchema); 

async function updateCourse(id) {
    //Approach: Query first
    //findById(), modify, save
    const course = await Course.findById(id);
    if (!course) return;
    course.isPublished = true;
    course.author = 'Another person';
    const result = await course.save();
    console.log(result);
}

updateCourse('5ece4b3462e210fd0289cbd5');
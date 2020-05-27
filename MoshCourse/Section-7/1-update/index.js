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

// async function updateCourse(id) {
//     //Approach: Query first
//     //findById(), modify, save
//     const course = await Course.findById(id);
//     if (!course) return;
//     course.isPublished = true;
//     course.author = 'Another person';
//     const result = await course.save();
//     console.log(result);
// }

// updateCourse('5ece4b3462e210fd0289cbd5');

async function updateCourse(id) {
    //Approach: Update first
    const result = await Course.update({ _id: id}, { //to get the un-updated document, use: findByIdAndUpdate
        $set: {                                      //to get the updaated document, use: findByIdAndUpdate and add a 3rd parameter
            author: 'Shan',                             // after $set, { new: true }
            isPublished: false                       // result => course
        }
    });
    console.log(result);
}

updateCourse('5ece4b3462e210fd0289cbd5');

async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id }); //deletes the 1st document with that id (use deleteMany to delete multiple documents)
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

// removeCourse('5ece4b3462e210fd0289cbd5');
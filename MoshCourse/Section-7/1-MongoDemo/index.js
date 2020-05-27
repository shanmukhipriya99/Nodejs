const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')  //returns a promise
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Coild not connect to MongoDB...'));

const courseSchema = new mongoose.Schema({   //object
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);  //class

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Shanmukhi',
        tags: ['angular', 'backend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}
//createCourse();
async function getCourses() {
    // const courses = await Course.find();  //method to query documents
    // const courses = await Course.find({ author: 'Shanmukhi}, isPublished: true});  filters can be added
    const courses = await Course
    .find({ author: 'Shanmukhi', isPublished: true})
    //.find({ price: { $gte: 10, $lte: 20} })  (price <=20 & >=10)
    //.find({ price: { $in: [10, 15, 20] } })  (price=10||15||20)
    //.or([ {author:'Shanmukhi' }, {ispublished: true} ]) OR logical operator
    // .find({ author: /^Shan/ })  (starts with Shan)
    // .find({ author: /mukhi$/ }) (ends with mukhi)
    // .find({ author: /.*muk.*/ })(contains muk)
    .limit(10)
    .sort({ name: 1 })  //1->ascending, -1-> descending
    .select({ name: 1, tags: 1 })
    // .count(); counts the number of documents
    console.log(courses);
}

getCourses();

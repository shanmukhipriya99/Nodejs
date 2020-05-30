const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')  //returns a promise
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

const courseSchema = new mongoose.Schema({   //object
    name: { 
        type: String, 
        required: true,  // use this for validation
        minlength: 5,
        maxlength: 255,
        // match: /pattern/    /checking for pattern
     },  
    //  category: {    //look @ enum!!
    //     type: String,
    //     required: true,
    //     enum: [ 'web', 'mobile', 'network']
    //  },
    author: String,
    tags: {
        type: String,
        validate: {                       //custom validator
            validator: function(v) {      // v->value
                return v && v.length>0;   // should have a value with length>0
            },
            message: 'A course should have atleast one tag.'
        }
    },
    // tags: {           for async validation
    //     type: String,
    //     validate: {                       //custom validator
    //         isAsync: true,
    //         validator: function(v, callback) {      // use callback
    //             setTimeout(() => {
    //               const result = return v && v.length>0;
    //               callback(result);
    //             }, 4000);
    //         },
    //         message: 'A course should have atleast one tag.'
    //     }
    // },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; } //returned only if isPublished is true, this cannot be an arrow function.
    }
});

const Course = mongoose.model('Course', courseSchema);  //class

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        // category: '-'; would give an error as value doesnt match enum values
        author: 'Shanmukhi',
        tags: ['angular', 'backend'],
        isPublished: true,
        price: 15
    });

    const result = await course.save();  // add a try, catch block to handle errors incase of validation
    console.log(result);
    // try {
    //     const result = await course.save();  
    //     console.log(result);
    // }
    // catch (ex) {                // displays error message for each field, if any
    //     for (field in ex.errors)
    //         console.log(ex.errors[field].message);
    // }
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


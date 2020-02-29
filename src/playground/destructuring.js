// Object destructuring

const person = {
    // name: 'Ahroo',
    age: 26,
    location: {
        city: 'Jaffna',
        temp: 92
    }
};

// console.log(`${person.name} is ${person.age} and is from ${person.location.city}
//     which has a temperature of ${person.location.temp}`);

// object destructuring -> can set default values
const {name = 'barbossa', age} = person;

// we can destructure person.location as it is also an object
// we can rename object properties like this -> temp: temperature
// temp: temperature = 88 -> assigning different variable and adding default value
const {city, temp: temperature = 88} = person.location;

city && temperature && console.log(`${name} is ${age} and is from ${city} which has a temperature of ${temperature}`);


// Array destructuring

const address = ['No.20', 'Parameshwara lane', 'Thirunelvely', 'Jaffna', 123456];

// method 1
console.log(`You are in ${address[2]}, ${address[3]}`);

// method 2 -> with assigned variables for each element of array
const apartment = address[0];
const lane = address[1];
const current_city = address[2];
const district = address[3];
const zip = address[4];

console.log(`You are in ${current_city}, ${district}`);

/*
* method 3 -> using array destructuring
* we can leave any items unnecessary in the last part of array -> like 'zip'
* for first parts in array -> leave the items but retain the commas
* can add defaults to array elements
*/
const [, , new_current_city, new_district = 'Colombo'] = address;

console.log(`You are in ${new_current_city}, ${new_district}`);
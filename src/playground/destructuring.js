
// Destructuring - pull off the object properties
const person = {
    name:'John',
    age:29,
    location:{
        city:'LA',
        temp:88
    }
}

const { name:firstName = 'Anonymous', age } = person;

const { city,temp:temperature} = person.location;

console.log(`${firstName} is ${age}`);

console.log(`It's ${temperature} in ${city}`);

const book ={
    title:'ego is Enemy',
    author:'Ryan Holiday',
    publisher:{
        name:'Penguin'
    }
}

const { name:publisherName = 'self-published'} = book.publisher;

console.log(publisherName);


class card extends React.Component{
    render(){
        return(
            <div>
                <h1 className="">Hello world</h1>
            </div>
        )
    }
}


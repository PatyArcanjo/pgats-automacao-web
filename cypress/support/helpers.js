import { faker } from '@faker-js/faker';


export function getRandomNumber() { 
    return  faker.number.hexadecimal({ length: 5 });
}

export function getRandomEmail() {
    return faker.internet.email();
}

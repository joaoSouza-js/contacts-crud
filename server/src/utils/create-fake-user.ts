import { createdFakeCpf } from "./create-fake-cpf";
import { faker } from "@faker-js/faker";

type createFakeUserProps = {
    name: string;
    email: string;
    phone: string;
    photoUrl: string;
    cpf: string;
};

export function createFakeUser(cpf?: createFakeUserProps) {
    const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        photoUrl: faker.image.avatar(),
        cpf: cpf ?? createdFakeCpf().digitsOnly,
    };

    return user;
}

export default function axiosMock(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(data), 1000); //act like we do a 1 second call
    });
}

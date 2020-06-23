const user = {
    name: "Ahmad Muzakki",
    email: "zakki@iam.com",
    password: "rahasia"
}

const book = {
    title: "id is not defined",
    tag: "vuejs",
    resolved: "id belum di inisialisasi atau variable id belum di buat",
    link_resolved: "https://stackoverflow.com",
    level: "hard",
    start_resolve: new Date(),
    done_resolve: new Date(),
    status: "done",
    userId: 1
}

const tokenId9999 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OTk5LCJpYXQiOjE1ODQ2MzM2MDl9.c785POcUNSt5TFOcWK5UMc11RKL_3jdcMZkJ_LjxvvA"
const tokenNotValid = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OTk5LCJpYXQiOjE1ODQ2MzM2MDl9.c785POcUNSt5TFOcWK5UMc11RKL_3j"

module.exports = {
    user,
    book,
    tokenId9999,
    tokenNotValid
}
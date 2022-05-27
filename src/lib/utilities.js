export default {
    mysqlDate: date => {
        return new Date(date).toISOString().slice(0, 10)
    }
}

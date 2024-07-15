let map = new Map();

module.exports.setUser = (user,uuid) => {
    map.set(user, uuid);
}

module.exports.getUser = (user) => {
    return map.get(user);
}
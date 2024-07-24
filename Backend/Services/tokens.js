let map = new Map();

module.exports.setUser = (user,uuid) => {
    console.log(map);
    map.set(user, uuid);
}

module.exports.getUser = (user) => {
    
    console.log("asking getUser and got "+map.get(user));
    return map.get(user);
}
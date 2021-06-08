// query 7: Find the city average friend count per user using MapReduce
// Using the same terminology in query6, we are asking you to write the mapper,
// reducer and finalizer to find the average friend count for each city.


var city_average_friendcount_mapper = function() {
  // implement the Map function of average friend count
        
    /*
    
    for(i = 0; i < this.friends.length; i++) {
        friend_live_in_hometown = db.users.find( { "user_id" : this.friends[i] }, {hometown:1}).map(function(u){
            if (u.hometown.city == this.hometown.city) {
                return true;
            }
            return false;
        } );
        if (friend_live_in_hometown) {
            friendCount += 1;
        }
    }
    */
    
    emit(this.hometown.city, {"count": 1, "friends": this.friends.length});
};

var city_average_friendcount_reducer = function(key, values) {
  // implement the reduce function of average friend count
    
    friendCount = 0;
    
    count = 0;
    
    for(i = 0; i < values.length; i++) {
        count += values[i]['count'];
        friendCount += values[i]['friends'];
    }
    
    return {"count": count, "friends": friendCount};
};

var city_average_friendcount_finalizer = function(key, reduceVal) {
  // We've implemented a simple forwarding finalize function. This implementation 
  // is naive: it just forwards the reduceVal to the output collection.
  // Feel free to change it if needed.
  var ret = reduceVal['friends'] / reduceVal['count'];
  return ret;
}

// find the oldest friend for each user who has a friend. 
// For simplicity, use only year of birth to determine age, if there is a tie, use the one with smallest user_id
// return a javascript object : key is the user_id and the value is the oldest_friend id
// You may find query 2 and query 3 helpful. You can create selections if you want. Do not modify users collection.
//
//You should return something like this:(order does not matter)
//{user1:userx1, user2:userx2, user3:userx3,...}

function oldest_friend(dbname){
    db = db.getSiblingDB(dbname);
    var results = {};

    db.createCollection("flat_users2");
    
    db.users.find().forEach( function (myDoc) {
        // friends array
        Object.keys(myDoc.friends).forEach(function(key) {
            db.flat_users2.insert({"user_id": myDoc.user_id, "friends": myDoc.friends[key] });  
            db.flat_users2.insert({"user_id": myDoc.friends[key] , "friends": myDoc.user_id });  
        });
    });
    
    db.createCollection("user_friends");
    
    user_ids = db.users.distinct("user_id");
    
    db.users.find().forEach( function (myDoc) {
        var user_array = db.flat_users2.find( { "user_id" : myDoc.user_id }, {friends:1}).map(function(u){ return u.friends; } );
                
        if (user_array.length != 0) {
        
            minYearFriend = user_array[0];
            minYear = db.users.find({"user_id": user_array[0]}, {YOB:1}).map(function(u) { return u.YOB; });


            for(i = 0; i < user_array.length; i++) {
                yearOfBirth = db.users.find({"user_id": user_array[i]}, {YOB:1}).map(function(u) {
                    return u.YOB;
                });

                if (yearOfBirth < minYear) {
                    minYear = yearOfBirth;
                    minYearFriend = user_array[i];
                } else if (yearOfBirth == minYear) {
                    if (user_array[i] < minYearFriend) {
                        minYearFriend = user_array[i];
                    }
                }
            }

            results[myDoc.user_id] = minYearFriend;
        }
                
    });

    // TODO: implement oldest friends
    // return an javascript object described above
    return results
}
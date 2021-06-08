// query2 : unwind friends and create a collection called 'flat_users' 
// where each document has the following schema:
/*
{
  user_id:xxx
  friends:xxx
}
*/

function unwind_friends(dbname){
    db = db.getSiblingDB(dbname);
    // TODO: unwind friends
    
    db.createCollection("flat_users");
    
    db.users.find().forEach( function (myDoc) {
        // friends array
        arr = Object.keys(myDoc.friends).map(function(key){return myDoc.friends[key] });
    Object.keys(myDoc.friends).forEach(function(key) {
        db.flat_users.insert({"user_id": myDoc.user_id, "friends": myDoc.friends[key] });    
    });
    });

    
    // returns nothing. It creates a collection instead as specified above.
}
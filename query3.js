//query3
//create a collection "cities" to store every user that lives in every city
//Each document(city) has following schema:
/*
{
  _id: city
  users:[userids]
}
*/

function cities_table(dbname) {
    db = db.getSiblingDB(dbname);
    // TODO: implemente cities collection here
    
    db.createCollection("cities");
    
    city_array = db.users.distinct("current.city");
    
    for (i = 0; i < city_array.length; i++) {
        user_array = db.users.find( { "current.city" : city_array[i] }, {user_id:1}).map(function(u){ return u.user_id; } );
        db.cities.insert({"_id" : city_array[i], "users": user_array});
    }


    // Returns nothing. Instead, it creates a collection inside the datbase.

}

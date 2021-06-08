
// query 4: find user pairs (A,B) that meet the following constraints:
// i) user A is male and user B is female
// ii) their Year_Of_Birth difference is less than year_diff
// iii) user A and B are not friends
// iv) user A and B are from the same hometown city
// The following is the schema for output pairs:
// [
//      [user_id1, user_id2],
//      [user_id1, user_id3],
//      [user_id4, user_id2],
//      ...
//  ]
// user_id is the field from the users collection. Do not use the _id field in users.
  
function suggest_friends(year_diff, dbname) {
    db = db.getSiblingDB(dbname);
    var pairs = [];
    
    
    /*
    
    db.users.find().forEach( function (A) {
        
        if (A.gender == "Male") {
            db.users.find().forEach( function (A) {
                if (B.gender == "Female" && abs(A.YOB - B.YOB) < year_diff && A.friends.indexOf(B.user_id) == -1 && B.friends.indexOf(A.user_id) == -1 && A.user_id != B.user_id && A.hometown.city == B.hometown.city) {
                    pairs.push([A.user_id, B.user_id]);
                }
            });
        }
    });
    
    */
    
    db.users.find().forEach( function (A) {
        
        if (A.gender == "male") {
            db.users.find().forEach( function (B) {
                if (B.gender == "female" && Math.abs(A.YOB - B.YOB) < year_diff && A.friends.indexOf(B.user_id) == -1 && B.friends.indexOf(A.user_id) == -1 && A.user_id != B.user_id && A.hometown.city == B.hometown.city) {
                    pairs.push([A.user_id, B.user_id]);
                }
            });
        }
    });
    
    
    // TODO: implement suggest friends
    // Return an array of arrays.
    return pairs;
}

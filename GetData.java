import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.TreeSet;
import java.util.Vector;



//json.simple 1.1
// import org.json.simple.JSONObject;
// import org.json.simple.JSONArray;

// Alternate implementation of JSON modules.
import org.json.JSONObject;
import org.json.JSONArray;

public class GetData{
	
    static String prefix = "project3.";
	
    // You must use the following variable as the JDBC connection
    Connection oracleConnection = null;
	
    // You must refer to the following variables for the corresponding 
    // tables in your database

    String cityTableName = null;
    String userTableName = null;
    String friendsTableName = null;
    String currentCityTableName = null;
    String hometownCityTableName = null;
    String programTableName = null;
    String educationTableName = null;
    String eventTableName = null;
    String participantTableName = null;
    String albumTableName = null;
    String photoTableName = null;
    String coverPhotoTableName = null;
    String tagTableName = null;

    // This is the data structure to store all users' information
    // DO NOT change the name
    JSONArray users_info = new JSONArray();		// declare a new JSONArray

	
    // DO NOT modify this constructor
    public GetData(String u, Connection c) {
	super();
	String dataType = u;
	oracleConnection = c;
	// You will use the following tables in your Java code
	cityTableName = prefix+dataType+"_CITIES";
	userTableName = prefix+dataType+"_USERS";
	friendsTableName = prefix+dataType+"_FRIENDS";
	currentCityTableName = prefix+dataType+"_USER_CURRENT_CITIES";
	hometownCityTableName = prefix+dataType+"_USER_HOMETOWN_CITIES";
	programTableName = prefix+dataType+"_PROGRAMS";
	educationTableName = prefix+dataType+"_EDUCATION";
	eventTableName = prefix+dataType+"_USER_EVENTS";
	albumTableName = prefix+dataType+"_ALBUMS";
	photoTableName = prefix+dataType+"_PHOTOS";
	tagTableName = prefix+dataType+"_TAGS";
    }
	
	
	
	
    //implement this function

    @SuppressWarnings("unchecked")
    public JSONArray toJSON() throws SQLException{ 

    	JSONArray users_info = new JSONArray();
        
        String QUERY = "SELECT U.USER_ID, U.FIRST_NAME, U.LAST_NAME, U.YEAR_OF_BIRTH, " +
            "U.MONTH_OF_BIRTH, U.DAY_OF_BIRTH, U.GENDER FROM " + userTableName + " U" ;
        
        String Q = "SELECT U.USER_ID, U.FIRST_NAME, U.LAST_NAME, U.YEAR_OF_BIRTH, " +
            "U.MONTH_OF_BIRTH, U.DAY_OF_BIRTH, U.GENDER, NVL(H.CITY_NAME, 'N/A') AS HOMETOWN_CITY, H.STATE_NAME AS HOMETOWN_STATE, H.COUNTRY_NAME AS HOMETOWN_COUNTRY, " +
            "NVL(C.CITY_NAME, 'N/A') AS CURRENT_CITY, C.STATE_NAME AS CURRENT_STATE, C.COUNTRY_NAME AS CURRENT_COUNTRY FROM " + userTableName + " U " +
            "LEFT JOIN " + currentCityTableName + " Q ON Q.USER_ID = U.USER_ID " +
            "JOIN " + cityTableName + " C ON Q.CURRENT_CITY_ID = C.CITY_ID " +
            "LEFT JOIN " + hometownCityTableName + " G ON G.USER_ID = U.USER_ID " +
            "JOIN " + cityTableName + " H ON G.HOMETOWN_CITY_ID = H.CITY_ID ";
        
        Statement stmt = oracleConnection.createStatement();
        ResultSet rs = stmt.executeQuery(Q);	
        
        while(rs.next()){
            //Display values
            JSONObject obj = new JSONObject();

            obj.put("MOB", rs.getInt("MONTH_OF_BIRTH"));
            
            JSONObject c_city = new JSONObject();
            
            if (rs.getString("CURRENT_CITY") != "N/A") {
                
                c_city.put("country", rs.getString("CURRENT_COUNTRY"));
                c_city.put("city", rs.getString("CURRENT_CITY"));
                c_city.put("state", rs.getString("CURRENT_STATE"));
                
                obj.put("current", c_city);
            } else {
                obj.put("current", c_city);
            }
            
            JSONObject h_city = new JSONObject();
            
            if (rs.getString("HOMETOWN_CITY") != "N/A") {
                
                h_city.put("country", rs.getString("HOMETOWN_COUNTRY"));
                h_city.put("city", rs.getString("HOMETOWN_CITY"));
                h_city.put("state", rs.getString("HOMETOWN_STATE"));
                
                obj.put("hometown", h_city);
            } else {
                obj.put("hometown", h_city);
            }
            
            
            obj.put("gender", rs.getString("GENDER"));
            
            obj.put("user_id", rs.getInt("USER_ID"));
            obj.put("DOB", rs.getInt("DAY_OF_BIRTH"));
            obj.put("last_name", rs.getString("LAST_NAME"));
            obj.put("first_name", rs.getString("FIRST_NAME"));
            obj.put("YOB", rs.getInt("YEAR_OF_BIRTH"));
            
            
            JSONArray friends = new JSONArray();
            /*
            ResultSet f = stmt.executeQuery("SELECT U.USER_ID1 AS USER_ID FROM " + friendsTableName + " U WHERE U.USER_ID2 = " + rs.getInt("USER_ID") + " UNION SELECT F.USER_ID2 AS USER_ID FROM " + friendsTableName + " F WHERE F.USER_ID1 = " + rs.getInt("USER_ID"));
            
            while(f.next) {
                friends.put(f.getInt("USER_ID"));
            }
            
            */
            obj.put("friends", friends);
            
            users_info.put(obj);
            
        }
        
		
	// Your implementation goes here....		
    	
		
		return users_info;
    }

    // This outputs to a file "output.json"
    public void writeJSON(JSONArray users_info) {
	// DO NOT MODIFY this function
	try {
	    FileWriter file = new FileWriter(System.getProperty("user.dir")+"/output.json");
	    file.write(users_info.toString());
	    file.flush();
	    file.close();

	} catch (IOException e) {
	    e.printStackTrace();
	}
		
    }
}

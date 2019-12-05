const uuidv4 = require('uuid/v4')

/*
*	createUser
*	Creates a user.
*	@prop id {string}
*	@prop name {string}
*	@param {object} 
*		name {string}
*/
const createUser = ({name = "", socketId = null } = {})=>(
	{
		id:uuidv4(),
		name,
		socketId
		
	}
)

/*
*	createMessage
*	Creates a messages object.
* 	@prop id {string}
* 	@prop time {Date} the time in 24hr format i.e. 14:22
* 	@prop message {string} actual string message
* 	@prop sender {string} sender of the message
*	@param {object} 
*		message {string}
*		sender {string}
*/
const createMessage = ({message = "", sender = ""} = { })=>(
		{
			id:uuidv4(),
			time:getTime(new Date(Date.now())),
			message,
			sender	
		}

	)

/*
*	createChat
*	Creates a Chat object
* 	@prop id {string}
* 	@prop name {string}
* 	@prop messages {Array.Message}
* 	@prop users {Array.string}
*	@param {object} 
*		messages {Array.Message}
*		name {string}
*		users {Array.string}
* 
*/
const createChat = ({messages = [], name = "Community", users = [], isCommunity = false } = {})=>(
	{
		id:uuidv4(),
		name: isCommunity ? "Community" : createChatNameFromUsers(users),
		messages,
		users,
		typingUsers:[],
		isCommunity
	}
)

/*
* createChatNameFromUsers
* @param users {Array.string}
* @param excludedUser {string} user to exclude from list of names
* @param {string} users names concatenated by a '&'  or "Empty Chat" if no users
*/
const createChatNameFromUsers = (users, excludedUser = "")=>{
	return users.filter(u => u !== excludedUser).join(' & ') || "Chat Room"
}


/*
*	@param date {Date}
*	@return a string represented in 24hr time i.e. '11:30', '19:30'
*/
const getTime = (date) => {
	// Creating variables to hold time.
    var TimeType, hour, minutes, seconds, fullTime;
 
    // Creating Date() function object.
    date = new Date();
 
    // Getting current hour from Date object.
    hour = date.getHours(); 
 
    // Checking if the Hour is less than equals to 11 then Set the Time format as AM.
    if(hour <= 11)
    {
 
      TimeType = 'AM';
 
    }
    else{
 
      // If the Hour is Not less than equals to 11 then Set the Time format as PM.
      TimeType = 'PM';
 
    }
 
 
    // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
    if( hour > 12 )
    {
      hour = hour - 12;
    }
 
    // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format. 
    if( hour === 0 )
    {
        hour = 12;
    } 
 
 
    // Getting the current minutes from date object.
    minutes = date.getMinutes();
 
    // Checking if the minutes value is less then 10 then add 0 before minutes.
    if(minutes < 10)
    {
      minutes = '0' + minutes.toString();
    }
 
 
    //Getting current seconds from date object.
    seconds = date.getSeconds();
 
    // If seconds value is less than 10 then add 0 before seconds.
    if(seconds < 10)
    {
      seconds = '0' + seconds.toString();
    }
 
 
    // Adding all the variables in fullTime variable.
    fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString() + ' ' + TimeType.toString();

    return fullTime;
}

module.exports = {
	createMessage,
	createChat,
	createUser,
	createChatNameFromUsers
}


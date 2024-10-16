
function f(arr) {
	return arr
	.map(str => str.trim())						// remove leading and trailing spaces
	.map(str => str.replace(/\s+/, ' '))		// regex to identify multple spaces and replace with a single space
    .map(str => 		
    	str.toLowerCase()		 			// first make all characters lower case
		.split(' ')							// split into single word array
		.map(word => 			
			word.charAt(0).toUpperCase() + word.slice(1))	// for each word get the first character and make it upper case, then join with the remainder of the word
		.join(' '))											// rejoin back into array of strings
	.sort()													// use js array sort to sort by first letter of word in ascending order
}


// test cases
console.log(f(['  nice', 'hey there     ', '   woah       man '])); 
console.log(f(['hi'])); 
console.log(f([])); 
console.log(f(['hey', '    hey', 'hey   ']));
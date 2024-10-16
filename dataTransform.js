
// custom comparitor to get the date diff
function compareDates(a, b) {
  return new Date(a.x) - new Date(b.x);
}


function transform(response) {
  // new object to group the plays by the date
  const dayPlayCounter = {};

  // get plays for each station and group with their play date and count the number of plays
  response.forEach(station => {
    station.tracks.forEach( track => {
      if (!dayPlayCounter[track.timestp]){
        dayPlayCounter[track.timestp] = {};
      }

      if (!dayPlayCounter[track.timestp][track.trackName]) {
        dayPlayCounter[track.timestp] [track.trackName] = 1;
      } else {
        dayPlayCounter[track.timestp] [track.trackName]++;
      }
    })
  })


  // prep the data and generate the tooltip string
  const result = Object.entries(dayPlayCounter).map(([day, tracks]) => {

    let plays = 0;

    for (const playCount of Object.values(tracks)) {
      plays += playCount;
    }
    
    // join track name and the play count
    const tooltip = Object.entries(tracks)
      .map(([trackName, count]) => `${trackName} (${count})`)
      .join(', ');

    // return the new object into result
    return {
      x: day,
      y: plays,
      tooltip
    };
  });

  // sort result using custom comparitor
  return result.sort(compareDates);
};



// test case

const response = [
  {
    id: 1293487,
    name: "KCRW",  // radio station callsign
    tracks: [{ timestp: "2021-04-08", trackName: "Peaches" }]
  },
  {
    id: 12923,
    name: "KQED",
    tracks: [
      { timestp: "2021-04-09", trackName: "Savage" },
      { timestp: "2021-04-09", trackName: "Savage (feat. Beyonce)" },
      { timestp: "2021-04-08", trackName: "Savage" },
      { timestp: "2021-04-08", trackName: "Savage" },
      { timestp: "2021-04-08", trackName: "Savage" }
    ]
  },
  {
    id: 4,
    name: "WNYC",
    tracks: [
      { timestp: "2021-04-09", trackName: "Captain Hook" },
      { timestp: "2021-04-08", trackName: "Captain Hook" },
      { timestp: "2021-04-07", trackName: "Captain Hook" }
    ]
  }
];


console.log(transform(response));















import './App.css';
import Card from './Cards'

function App(){
    return(
        <div className = "App">
            <h1>🏀 NBA Finals 2024: Celtics vs. Mavericks</h1>
            <p>Check the schedule below for game times and locations!</p>

            <div className = "card-grid">
                <Card game="Game 1" date="June 6" time="8:30 PM ET" location="TD Garden, Boston" />
                <Card game="Game 2" date="June 9" time="8:00 PM ET" location="TD Garden, Boston" />
                <Card game="Game 3" date="June 12" time="8:30 PM ET" location="American Airlines Center, Dallas" />
                <Card game="Game 4" date="June 14" time="8:30 PM ET" location="American Airlines Center, Dallas" />
                <Card game="Game 5" date="June 17" time="8:30 PM ET" location="TD Garden, Boston" />
                <Card game="Game 6" date="June 20" time="8:30 PM ET" location="American Airlines Center, Dallas" />
                <Card game="Game 7" date="June 23" time="8:00 PM ET" location="TD Garden, Boston" />
                <Card
                game="Media Day"
                date="June 5"
                time="2:00 PM ET"
                location="NBA Headquarters"
                link="https://nba.com"
                />

                <Card
                game="MVP Ceremony"
                date="June 24"
                time="7:00 PM ET"
                location="TBD"
                link="https://nba.com/mvp"
                />

                <Card
                game="Fan Watch Party 🎉"
                date="June 14"
                time="8:30 PM ET"
                location="Downtown Dallas Plaza"
                link="https://nba.com/watchparty"
                />
            </div>
        </div>
    );
}

export default App;
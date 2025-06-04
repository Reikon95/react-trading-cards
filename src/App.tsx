import { TradingCardStack } from "./trading-cards/TradingCardStack";

function App() {
  return (
    <>
      Trading Cards
      <div>
        <h1>Pro Footballers</h1>
        <TradingCardStack
          cardsToDisplay={[
            {
              name: "Lionel Messi",
              facts: [
                "Won FIFA World Cup 2022 with Argentina",
                "8-time Ballon d'Or winner",
                "All-time top scorer in La Liga",
              ],
              stats: [
                { value: "821", label: "Career Goals" },
                { value: "350", label: "Assists" },
                { value: "42", label: "Trophies" },
              ],
              imageURL:
                "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
            },
            {
              name: "Cristiano Ronaldo",
              facts: [
                "5-time Champions League winner",
                "5-time Ballon d'Or winner",
                "All-time top international goalscorer",
              ],
              stats: [
                { value: "850", label: "Career Goals" },
                { value: "230", label: "Assists" },
                { value: "34", label: "Trophies" },
              ],
              imageURL:
                "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
            },
            {
              name: "Erling Haaland",
              facts: [
                "Premier League record 36 goals in debut season",
                "Youngest player to reach 30 Champions League goals",
                "Won treble with Manchester City in 2023",
              ],
              stats: [
                { value: "200", label: "Career Goals" },
                { value: "1.12", label: "Goals per Game" },
                { value: "23", label: "Age" },
              ],
              imageURL:
                "https://upload.wikimedia.org/wikipedia/commons/2/24/Erling_Haaland_2023_%28cropped%29.jpg",
            },
          ]}
        />
      </div>
    </>
  );
}

export default App;

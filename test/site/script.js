

import NumberRM from "../../testSdk/numbersapi_com/NumberRM";

window.NumberRM = NumberRM;

NumberRM.Trivia.getTriviaInfo({number:94685654654, notFactText:"not interesting fact"}).then(console.warn, console.err)

// NumberRM.Trivia.getTriviaInfo({})

export default NumberRM

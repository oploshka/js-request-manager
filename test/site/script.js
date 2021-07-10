

import RmNumber from "js-request-manager/example/openApiIntegration/numbersapi_com/RmNumber";

window.NumberRM = RmNumber;

RmNumber.Trivia.getTriviaInfo({number:94685654654, notFactText:"not interesting fact"}).then(console.warn, console.err)

// NumberRM.Trivia.getTriviaInfo({})

export default RmNumber

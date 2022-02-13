
// import RmNumber from "js-request-manager/example/openApiIntegration/numbersapi_com/RmNumber";
// window.RmNumber = RmNumber;

import RmReqres from "js-request-manager/example/openApiIntegration/reqres_in/RmReqres";
window.RmReqres = RmReqres;

//
// RmNumber.Trivia.getTriviaInfo({number:94685654654, notFactText:"not interesting fact"}).then(console.warn, console.err)
// RmNumber.Trivia.getTriviaInfo({})

RmReqres.Test.getTestJson({});

export default {}


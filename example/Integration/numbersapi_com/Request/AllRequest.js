
import MethodInfo from "js-request-manager/src/Class/MethodInfo";

/**
 * @name NumberAPIRequestSchemaObject
 */
const NumberAPIRequestSchema =  {
  Test: {
    getTestText: () => {
      return new MethodInfo({
        name  : 'getTestText',
        type  : 'GET',
        url   : 'http://numbersapi.com/2/29/date',
      });
    },
    getTestJson: () => {
      return new MethodInfo({
        name  : 'getTestJson',
        type  : 'GET',
        url   : 'http://numbersapi.com/random/year?json',
      });
    },
  },
  
  Trivia: {
    /**
     *
     * @param {Number} number (integer)
     * @param {String} notfound [ default | floor | ceil ]
     * @param {String} notFactText
     * @return {MethodInfo}
     */
    getTriviaInfo: ({number, notfound=null, notFactText=null }) => {
      return new MethodInfo({
        name  : 'getTriviaInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${number}/trivia?json`,
        get   : {
          // json: '',
          notfound,
          'default': notFactText
        }
      });
    },
    getTriviaRangeInfo: ({range}) => {
      return new MethodInfo({
        name  : 'getTriviaRangeInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${range.join(',')}/trivia?json`,
      });
    },
    getRandomTriviaInfo: ({min = null , max = null}) => {
      return new MethodInfo({
        name  : 'getRandomTriviaInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/random/trivia?json`,
        params:{
          get: {min, max}
        }
      });
    },
  },
  
  Math: {
    getMathInfo: ({number}) => {
      return new MethodInfo({
        name  : 'getMathInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${number}/math?json`,
      });
    },
    getMathRangeInfo: ({range}) => {
      return new MethodInfo({
        name  : 'getMathRangeInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${range.join(',')}/math?json`,
      });
    },
    getRandomMathInfo: ({min = null , max = null}) => {
      return new MethodInfo({
        name  : 'getRandomMathInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/random/math?json`,
        params:{
          get: {min, max}
        }
      });
    },
  },
  
  Year: {
    getYearInfo: ({number}) => {
      return new MethodInfo({
        name  : 'getYearInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${number}/year?json`,
      });
    },
    getYearRangeInfo: ({range}) => {
      return new MethodInfo({
        name  : 'getYearRangeInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${range.join(',')}/year?json`,
      });
    },
    getRandomYearInfo: ({min = null , max = null}) => {
      return new MethodInfo({
        name  : 'getRandomYearInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/random/year?json`,
        params:{
          get: {min, max}
        }
      });
    },
  },
  
  Date: {
    getDateInfo: ({month, day}) => {
      return new MethodInfo({
        name  : 'getYearInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${month}/${day}/date?json`,
      });
    },
    getRandomDateInfo: ({min = null , max = null}) => {
      return new MethodInfo({
        name  : 'getRandomYearInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/random/date?json`,
        params:{
          get: {min, max}
        }
      });
    },
  },
  
};

export default NumberAPIRequestSchema;

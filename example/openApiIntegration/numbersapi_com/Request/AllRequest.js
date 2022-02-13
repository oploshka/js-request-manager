
import MethodSchema from "js-request-manager/src/Class/MethodSchema";

/**
 * @name NumberAPIRequestSchemaObject
 */
const NumberAPIRequestSchema =  {
  Test: {
    getTestText: () => {
      return new MethodSchema({
        name  : 'getTestText',
        type  : 'GET',
        url   : 'http://numbersapi.com/2/29/date',
      });
    },
    getTestJson: () => {
      return new MethodSchema({
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
     * @return {MethodSchema}
     */
    getTriviaInfo: ({number, notfound=null, notFactText=null }) => {
      return new MethodSchema({
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
      return new MethodSchema({
        name  : 'getTriviaRangeInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${range.join(',')}/trivia?json`,
      });
    },
    getRandomTriviaInfo: ({min = null , max = null}) => {
      return new MethodSchema({
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
      return new MethodSchema({
        name  : 'getMathInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${number}/math?json`,
      });
    },
    getMathRangeInfo: ({range}) => {
      return new MethodSchema({
        name  : 'getMathRangeInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${range.join(',')}/math?json`,
      });
    },
    getRandomMathInfo: ({min = null , max = null}) => {
      return new MethodSchema({
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
      return new MethodSchema({
        name  : 'getYearInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${number}/year?json`,
      });
    },
    getYearRangeInfo: ({range}) => {
      return new MethodSchema({
        name  : 'getYearRangeInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${range.join(',')}/year?json`,
      });
    },
    getRandomYearInfo: ({min = null , max = null}) => {
      return new MethodSchema({
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
      return new MethodSchema({
        name  : 'getYearInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${month}/${day}/date?json`,
      });
    },
    getRandomDateInfo: ({min = null , max = null}) => {
      return new MethodSchema({
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

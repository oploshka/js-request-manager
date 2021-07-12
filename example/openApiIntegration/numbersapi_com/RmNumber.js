import RequestClass   from "js-request-manager/src/Class/RequestClass";
import RequestManager from "js-request-manager/src/RequestManager";

import axios from 'axios';

/**
 * @name NumberAPIRequestSchemaObject
 */
const NumberAPIRequestSchema =  {
  Test: {
    getTestText: () => {
      return new RequestClass({
        name  : 'getTestText',
        type  : 'GET',
        url   : 'http://numbersapi.com/2/29/date',
      });
    },
    getTestJson: () => {
      return new RequestClass({
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
     * @return {RequestClass}
     */
    getTriviaInfo: ({number, notfound=null, notFactText=null }) => {
      return new RequestClass({
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
      return new RequestClass({
        name  : 'getTriviaRangeInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${range.join(',')}/trivia?json`,
      });
    },
    getRandomTriviaInfo: ({min = null , max = null}) => {
      return new RequestClass({
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
      return new RequestClass({
        name  : 'getMathInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${number}/math?json`,
      });
    },
    getMathRangeInfo: ({range}) => {
      return new RequestClass({
        name  : 'getMathRangeInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${range.join(',')}/math?json`,
      });
    },
    getRandomMathInfo: ({min = null , max = null}) => {
      return new RequestClass({
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
      return new RequestClass({
        name  : 'getYearInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${number}/year?json`,
      });
    },
    getYearRangeInfo: ({range}) => {
      return new RequestClass({
        name  : 'getYearRangeInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${range.join(',')}/year?json`,
      });
    },
    getRandomYearInfo: ({min = null , max = null}) => {
      return new RequestClass({
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
      return new RequestClass({
        name  : 'getYearInfo',
        type  : 'GET',
        url   : `http://numbersapi.com/${month}/${day}/date?json`,
      });
    },
    getRandomDateInfo: ({min = null , max = null}) => {
      return new RequestClass({
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

/**
 * @alias NumberAPIRequestSchemaObject need fix return value {RequestClass} in {Promise}
 */
export default RequestManager(NumberAPIRequestSchema,{
  RequestClient: {
    async send(obj) { return await axios(obj); }
  }
});

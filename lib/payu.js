'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uuidv4 = require('uuid/v4');
var axios = require('axios');
var payumoney = require('payumoney-node');

var isNull = function isNull(val) {
  if (typeof val === 'string') {
    val = val.trim();
  }
  if (val === undefined || val === null || typeof val === 'undefined' || val === '' || val === 'undefined') {
    return true;
  }
  return false;
};

var masterCredentials = {};

var PayU = function () {
  function PayU(config) {
    _classCallCheck(this, PayU);

    this.config = config;
    masterCredentials["MID"] = this.config.MID;
    masterCredentials["KEY"] = this.config.KEY;
    masterCredentials["SALT"] = this.config.SALT;
    masterCredentials["AUTH_HEADER"] = this.config.AUTH_HEADER;
    masterCredentials["PRODUCTION_MODE"] = this.config.PRODUCTION_MODE;

    payumoney.setKeys(this.config.KEY, this.config.SALT, this.config.AUTH_HEADER);

    payumoney.isProdMode(this.config.PRODUCTION_MODE); // production = true, test = false

    // let rootDir = process.mainModule.paths[0].split('server')[0].slice(0, -1);
    // let  = require(rootDir + '/services/paymentsources.json');
  }

  _createClass(PayU, [{
    key: 'createMerchant',
    value: function createMerchant(payloadJson) {
      return new Promise(function (resolve, reject) {

        resolve({ "success": true, "body": { "merchant": { "mid": uuidv4() } } });
      });
    }
  }, {
    key: 'updateMerchant',
    value: function updateMerchant(payloadJson) {
      return 'This is from Integrity';
    }
  }, {
    key: 'deleteMerchant',
    value: function deleteMerchant(payloadJson) {
      return 'This is from Integrity';
    }
  }, {
    key: 'getMerchantId',
    value: function getMerchantId(payloadJson) {
      return 'this is tes';
    }
  }, {
    key: 'getMerchantActionvationStatus',
    value: function getMerchantActionvationStatus(payloadJson) {
      return new Promise(function (resolve, reject) {

        resolve({ "success": true, "body": { "activationStatus": true } });
      });
    }
  }, {
    key: 'getMerchantProfile',
    value: function getMerchantProfile(payloadJson) {
      return 'this is test';
    }
  }, {
    key: 'createPayer',
    value: function createPayer(payloadJson) {
      return new Promise(function (resolve, reject) {
        resolve({ "success": true, "body": { "gatewayBuyerId": uuidv4() } });
      });
    }
  }, {
    key: 'editPayer',
    value: function editPayer(payloadJson) {

      return new Promise(function (resolve, reject) {
        resolve({ "success": true, "body": { "gatewayBuyerId": payloadJson["payeeInfo"]["gatewayBuyerId"] } });
      });
    }
  }, {
    key: 'removePayer',
    value: function removePayer(payloadJson) {
      return new Promise(function (resolve, reject) {
        resolve({ "success": true, "body": { "gatewayBuyerId": payloadJson["payeeInfo"]["gatewayBuyerId"] } });
      });
    }
  }, {
    key: 'bulkUploadPayers',
    value: function bulkUploadPayers(payloadJson) {
      return 'this is test';
    }
  }, {
    key: 'makeDirectPayment',
    value: function makeDirectPayment(payloadJson) {
      return new Promise(function (resolve, reject) {

        if (!isNull(payloadJson["paymentInfo"])) {
          payloadJson = payloadJson["paymentInfo"];
        }

        var paymentData = {
          productinfo: payloadJson["orderTitle"],
          txnid: payloadJson["orderNumber"],
          amount: payloadJson["amount"],
          email: payloadJson["email"],
          phone: payloadJson["phone"],
          lastname: payloadJson["lastname"],
          firstname: payloadJson["firstname"],
          surl: payloadJson["successUrl"],
          furl: payloadJson["failureUrl"]
        };
        //https://medium.com/@swapnilnakhate/payumoney-payment-gateway-integration-with-nodejs-f715e5fc25a
        console.log(paymentData);

        payumoney.makePayment(paymentData, function (error, response) {
          if (error) {
            // Some error
            console.log(error);
            reject({ "success": false, "body": error });
          } else {
            // Payment redirection link
            console.log(error);
            console.log(response);
            resolve({ "success": true, "payURedirectUrl": response });
          }
        });
      });
    }
  }, {
    key: 'makePayment',
    value: function makePayment(payloadJson) {
      return new Promise(function (resolve, reject) {
        soap.createClient(MASTER_MERCHANT_ACCESS["TransactionsURL"], soap_client_options, function (err, client) {
          //  TODO : Here we have to use newly created merchant Info and not master info.
          console.log(err);
          console.log(client);
          // var paymentJson = {
          //          "Username":MASTER_MERCHANT_ACCESS["UserName"],
          //          "Password":MASTER_MERCHANT_ACCESS["Password"],
          //          "Vendor": MASTER_MERCHANT_ACCESS["Vendor"],
          //          "CcInfoKey": payloadJson["cardInfo"]["gatewayCardId"],
          //          "Amount": payloadJson["paymentInfo"]["totalAmount"],
          //          "InvNum":payloadJson["paymentInfo"]["transactionId"], 
          //          "ExtData":""
          //        };
          var paymentJson = {
            "Username": MASTER_MERCHANT_ACCESS["UserName"],
            "Password": MASTER_MERCHANT_ACCESS["Password"],
            "Vendor": MASTER_MERCHANT_ACCESS["Vendor"],
            "TransType": "Sale",
            "CardNum": payloadJson["cardInfo"]["cardNumber"],
            "ExpDate": payloadJson["cardInfo"]["expDate"],
            "MagData": "",
            "NameOnCard": payloadJson["cardInfo"]["cardHolderName"],
            "Amount": payloadJson["paymentInfo"]["totalAmount"],
            "InvNum": payloadJson["paymentInfo"]["transactionId"],
            "PNRef": "",
            "Zip": "",
            "Street": "",
            "CVNum": payloadJson["cardInfo"]["cvv"],
            "ExtData": ""
          };

          console.log(paymentJson);

          try {

            client.ProcessCreditCard(paymentJson, function (err, result, body) {
              console.log(JSON.stringify(result) + ":::" + result["ProcessCreditCardResult"]["Result"]);
              if (result && _typeof(result["ProcessCreditCardResult"]) !== undefined && _typeof(result["ProcessCreditCardResult"]["Result"]) !== undefined) {
                if (result["ProcessCreditCardResult"]["Result"] == "0") {
                  resolve({
                    "success": true,
                    "body": { "gatewayTransactionId": result["ProcessCreditCardResult"]["PNRef"] }
                  });
                } else {
                  var _msg = "";
                  if (!isNull(result["ProcessCreditCardResult"]["Message"])) {
                    _msg = result["ProcessCreditCardResult"]["Message"];
                  } else {
                    _msg = result["ProcessCreditCardResult"]["RespMSG"];
                  }
                  reject({ "success": false, "message": _msg });
                }
              } else {
                reject({ "success": false, "message": err });
              }
            });
          } catch (err) {
            reject({ "success": false, "message": err });
          }
        });
      });
    }
  }, {
    key: 'getPayersListing',
    value: function getPayersListing(payloadJson) {
      return 'this is test';
    }
  }, {
    key: 'saveCardForPayer',
    value: function saveCardForPayer(payloadJson) {
      return new Promise(function (resolve, reject) {
        soap.createClient(MASTER_MERCHANT_ACCESS["RecurringURL"], soap_client_options, function (err, client) {
          //  TODO : Here we have to use newly created merchant Info and not master info.
          var cardNumber = payloadJson["cardInfo"]["cardNumber"];
          cardNumber = cardNumber.replace(" ", "").replace(" ", "").replace(" ", "");

          var cardHolderName = payloadJson["cardInfo"]["cardHolderName"];
          var expDate = payloadJson["cardInfo"]["expDate"];

          var creditCardInfo = {
            "Username": MASTER_MERCHANT_ACCESS["UserName"],
            "Password": MASTER_MERCHANT_ACCESS["Password"],
            "TransType": "ADD",
            "Vendor": MASTER_MERCHANT_ACCESS["Vendor"],
            "CustomerKey": payloadJson["payerInfo"]["gatewayBuyerId"],
            "CardInfoKey": "",
            "CcAccountNum": cardNumber,
            "CcExpDate": expDate,
            "CcNameOnCard": cardHolderName,
            "CcStreet": "",
            "CcZip": "",
            "ExtData": ""
          };

          try {
            client.ManageCreditCardInfo(creditCardInfo, function (err, result, body) {
              console.log(JSON.stringify(result) + ":::" + result["ManageCreditCardInfoResult"]["CcInfoKey"]);
              if (result && _typeof(result["ManageCreditCardInfoResult"]) !== undefined && _typeof(result["ManageCreditCardInfoResult"]["CcInfoKey"]) !== undefined) {
                resolve({
                  "success": true,
                  "body": { "gatewayCardId": result["ManageCreditCardInfoResult"]["CcInfoKey"] }
                });
              } else {
                reject({ "success": false, "message": err });
              }
            });
          } catch (err) {
            reject({ "success": false, "message": err });
          }
        });
      });
    }
  }, {
    key: 'removeCard',
    value: function removeCard(payloadJson) {
      return new Promise(function (resolve, reject) {
        soap.createClient(MASTER_MERCHANT_ACCESS["RecurringURL"], soap_client_options, function (err, client) {
          //  TODO : Here we have to use newly created merchant Info and not master info.
          var cardNumber = payloadJson["cardInfo"]["cardNumber"];
          cardNumber = cardNumber.replace(" ", "").replace(" ", "").replace(" ", "");

          var cardHolderName = payloadJson["cardInfo"]["cardHolderName"];
          var expDate = payloadJson["cardInfo"]["expDate"];

          var creditCardInfo = {
            "Username": MASTER_MERCHANT_ACCESS["UserName"],
            "Password": MASTER_MERCHANT_ACCESS["Password"],
            "TransType": "DELETE",
            "Vendor": MASTER_MERCHANT_ACCESS["Vendor"],
            "CustomerKey": payloadJson["payerInfo"]["gatewayBuyerId"],
            "CardInfoKey": payloadJson["cardInfo"]["gatewayCardId"],
            "CcAccountNum": cardNumber,
            "CcExpDate": expDate,
            "CcNameOnCard": cardHolderName,
            "CcStreet": "",
            "CcZip": "",
            "ExtData": ""
          };

          try {
            client.ManageCreditCardInfo(creditCardInfo, function (err, result, body) {
              console.log(JSON.stringify(result) + ":::" + result["ManageCreditCardInfoResult"]["CcInfoKey"]);
              if (result && _typeof(result["ManageCreditCardInfoResult"]) !== undefined && _typeof(result["ManageCreditCardInfoResult"]["CcInfoKey"]) !== undefined) {
                resolve({
                  "success": true,
                  "body": { "gatewayCardId": result["ManageCreditCardInfoResult"]["CcInfoKey"] }
                });
              } else {
                reject({ "success": false, "message": err });
              }
            });
          } catch (err) {
            reject({ "success": false, "message": err });
          }
        });
      });
    }
  }, {
    key: 'getPayersTransactions',
    value: function getPayersTransactions(payloadJson) {
      return 'this is test';
    }
  }]);

  return PayU;
}();

exports.default = PayU;
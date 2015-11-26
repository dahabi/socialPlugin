'use strict';

(function (angular, buildfire) {
    angular.module('socialPluginWidget')
        .provider('Buildfire', [function () {
            var Buildfire = this;
            Buildfire.$get = function () {
                return buildfire
            };
            return Buildfire;
        }])
        .factory("SocialDataStore", ['Buildfire', '$q', 'SERVER_URL', '$http', function (Buildfire, $q, SERVER_URL, $http) {
            return {
                createPost: function (postData) {
                    var deferred = $q.defer();
                    var postDataObject = {};
                    console.log('buildfire is: >>>>>', Buildfire.context);
                    postDataObject.id = '1';
                    postDataObject.method = 'thread/add';
                    postDataObject.params = postData || {};
                    postDataObject.params.appId = '551ae57f94ed199c3400002e' || Buildfire.context.appId;
                    postDataObject.params.secureToken = null;
                    postDataObject.params.userToken = 'ouOUQF7Sbx9m1pkqkfSUrmfiyRip2YptbcEcEcoX170=' || localStorage.getItem('user') && localStorage.getItem('user').userToken;
                    postDataObject.params.parentThreadId = '564f676cfbe10b9c240002ff' || Buildfire.context.appId + Buildfire.context.instanceId;
                    postDataObject.userToken = null;
                    console.log(postDataObject);
                    if(localStorage.getItem('user'))
                    postData.params.userToken = localStorage.getItem('user').userToken;
                    var successCallback = function (response) {
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link+'?data='+ JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    /*$http.get('http://social.kaleoapps.com/src/server.js?data={"id":1,"method":"thread/add","params":{"appId":"551ae57f94ed199c3400002e","parentThreadId":"564f676cfbe10b9c240002ff","userToken":"ouOUQF7Sbx9m1pkqkfSUrmfiyRip2YptbcEcEcoX170=","text":"testThread","title":"","imageUrl":null,"secureToken":null},"userToken":null}').then(successCallback, errorCallback);*/
                    return deferred.promise;
                },
                getPosts: function () {
                    var deferred = $q.defer();
                    var postDataObject = {};
                    postDataObject.id = '2';
                    postDataObject.method = 'thread/findByPage';
                    postDataObject.params = {};
                    postDataObject.params.appId = '551ae57f94ed199c3400002e' || Buildfire.context.appId;
                    postDataObject.params.parentThreadId = '564f676cfbe10b9c240002ff' || Buildfire.context.appId + Buildfire.context.instanceId;
                    postDataObject.params.lastThreadId = null;
                    postDataObject.userToken = null;
                    var successCallback = function (response) {
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link+'?data='+ JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    return deferred.promise;
                },
                addComment:function(data){

                   /* var data1={"id":1,"method":"threadComments/add",
                        "params":{
                        "appId":socailAppId,
                            "threadId":threadId,
                            "userToken":userToken,
                            "comment":”text text text”,
                        "attachedImage":null},"userToken":null};*/

                    var deferred = $q.defer();
                    var postDataObject = {};
                    postDataObject.id = '1';
                    postDataObject.method = 'threadComments/add';
                    postDataObject.params = {};
                    postDataObject.params.appId = '551ae57f94ed199c3400002e' || Buildfire.context.appId;
                    postDataObject.params.threadId = data.threadId;
                    postDataObject.params.userToken = null;
                    postDataObject.params.comment = data.comment;
                    postDataObject.params.attachedImage = null;
                    postDataObject.userToken = null;
                    var successCallback = function (response) {
                        console.log('Add Comment callback recieved--------------',response);
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        console.log('Add Comment callback recieved--Error------------',err);
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link+'?data='+ JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    return deferred.promise;
                },
                getThreadByUniqueLink:function(threadUniqueLink){
                    /*{
                     "id":1,
                     "method":"thread/getThread",
                     "params":{
                     "appId":socailAppId,
                     "uniqueLink":uniqueLink,
                     "title":title,
                     "userToken":userToken
                     },
                     "userToken":null
                     }
                     */
                    var deferred = $q.defer();
                    var postDataObject = {};
                    postDataObject.id = '1';
                    postDataObject.method = 'thread/getThread';
                    postDataObject.params = {};
                    postDataObject.params.appId = '551ae57f94ed199c3400002e' || Buildfire.context.appId;
                    postDataObject.params.uniqueLink = threadUniqueLink;
                    postDataObject.params.userToken = null;
                    postDataObject.params.title = null;
                    postDataObject.userToken = null;
                    var successCallback = function (response) {
                        console.log('get Post callback recieved--------------',response);
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        console.log('get Post callback recieved--Error------------',err);
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link+'?data='+ JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    return deferred.promise;
                }
               /* uploadImage:function(image){

                }*/
            }
        }])
})(window.angular, window.buildfire);
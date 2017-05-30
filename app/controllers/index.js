(function controller(args) {
  'use strict';

  //Set events
  ['simplePost', 'basicAuthPost'].forEach(function (proxy) {
    $.addListener($[proxy], 'click', prepareRequest);
  });

  /**
   * @method  prepareRequest
   * @param   {object}       e Callback event
   */
  function prepareRequest(e) {
    var withCredentials = true;

    if (e.source.id === 'simplePost') {
      withCredentials = false;
    }

    request(withCredentials);
  }

  /**
   * Make a request
   * @method  request
   * @param   {boolean} withCredentials Flag for make a auth request or not
   */
  function request(withCredentials) {
    var client,
      config,
      url,
      data;

    data = {
      message: 'This is my message'
    };

    config = {
      onload: success,
      onerror: error,
      timeout: 5000
    };

    if (withCredentials) {
      url = 'https://srvasic.upv.es/recursos/error401.asp';
      config.withCredentials = true;
      config.username = 'user';
      config.password = 'p$wd';
    } else  {
      url = 'https://httpbin.org/post';
    }

    console.log('HTTP CLIENT CONFIG ' + JSON.stringify(config));

    client = Ti.Network.createHTTPClient(config);

    try {
      console.log('URL: ' + url);
      client.open('POST', url);
    } catch (e) {
      console.log('error opening client');
      console.log(JSON.stringify(e));
    }

    try {
      client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    } catch (e) {
      console.log('error setting request headers');
      console.log(JSON.stringify(e));
    }

    try {
      client.send(data);
    } catch (e) {
      console.log('error sending data');
      console.log(JSON.stringify(e));
    }
  }

  /**
   * HttpClient Success Callback
   * @method  success
   * @param   {object} e Callback Event
   */
  function success(e) {
    console.log('Success callback: ' + this.responseText);
  }

  /**
   * HttpClient Error Callback
   * @method  error
   * @param   {object} e Callback Event
   */
  function error(e) {
    console.log('Error callback : ' + e.error);
  }

  $.index.open();

})(arguments[0] || {});
